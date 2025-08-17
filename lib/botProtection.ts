// Bot Protection System for OneTimeEmail
// Detects and blocks suspicious bot activity

interface BotDetectionResult {
  isBot: boolean;
  reason: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  shouldBlock: boolean;
}

interface RateLimitConfig {
  maxInboxesPerFingerprint: number;
  maxInboxesPerIP: number;
  maxInboxesPerUserPerHour: number;
  maxInboxesPerUserPerDay: number;
  minIntervalSeconds: number;
}

// Default rate limits - Updated to stricter policy
const DEFAULT_LIMITS: RateLimitConfig = {
  maxInboxesPerFingerprint: 3,     // Same device/browser
  maxInboxesPerIP: 3,              // Same IP address
  maxInboxesPerUserPerHour: 7,     // Per user per hour
  maxInboxesPerUserPerDay: 50,     // Per user per day
  minIntervalSeconds: 60,          // 60 seconds between creations
};

export class BotProtection {
  private limits: RateLimitConfig;

  constructor(customLimits?: Partial<RateLimitConfig>) {
    this.limits = { ...DEFAULT_LIMITS, ...customLimits };
  }

  /**
   * Check if user should be blocked based on tracking data
   */
  async checkUserSafety(trackingData: {
    user_id: string;
    fingerprint: string;
    ip_address: string;
    creation_interval: number;
    user_agent: string;
  }): Promise<BotDetectionResult> {
    
    // Check multiple factors
    const checks = await Promise.all([
      this.checkFingerprintAbuse(trackingData.fingerprint),
      this.checkIPAbuse(trackingData.ip_address),
      this.checkUserRateLimit(trackingData.user_id),
      this.checkCreationSpeed(trackingData.creation_interval),
      this.checkUserAgent(trackingData.user_agent),
    ]);

    // Determine overall risk
    const highRiskChecks = checks.filter(c => c.riskLevel === 'high' || c.riskLevel === 'critical');
    const mediumRiskChecks = checks.filter(c => c.riskLevel === 'medium');

    let finalResult: BotDetectionResult;

    if (highRiskChecks.length > 0) {
      finalResult = {
        isBot: true,
        reason: highRiskChecks.map(c => c.reason).join('; '),
        riskLevel: 'critical',
        shouldBlock: true,
      };
    } else if (mediumRiskChecks.length >= 2) {
      finalResult = {
        isBot: true,
        reason: mediumRiskChecks.map(c => c.reason).join('; '),
        riskLevel: 'high',
        shouldBlock: true,
      };
    } else if (mediumRiskChecks.length === 1) {
      finalResult = {
        isBot: false,
        reason: mediumRiskChecks[0].reason,
        riskLevel: 'medium',
        shouldBlock: false,
      };
    } else {
      finalResult = {
        isBot: false,
        reason: 'Normal usage detected',
        riskLevel: 'low',
        shouldBlock: false,
      };
    }

    return finalResult;
  }

  /**
   * Check fingerprint abuse (same device creating many inboxes)
   */
  private async checkFingerprintAbuse(fingerprint: string): Promise<BotDetectionResult> {
    try {
      const { supabase } = await import('./supabaseClient');
      
      const { data, error } = await supabase
        .from('inbox')
        .select('id')
        .eq('fingerprint', fingerprint)
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()); // Last 24 hours

      if (error) throw error;

      const count = data?.length || 0;

      if (count >= 50) {
        return {
          isBot: true,
          reason: `Fingerprint created ${count} inboxes in 24h`,
          riskLevel: 'critical',
          shouldBlock: true,
        };
      } else if (count >= this.limits.maxInboxesPerFingerprint) {
        return {
          isBot: true,
          reason: `Fingerprint created ${count} inboxes (limit: ${this.limits.maxInboxesPerFingerprint})`,
          riskLevel: 'high',
          shouldBlock: true,
        };
      } else if (count >= 5) {
        return {
          isBot: false,
          reason: `Fingerprint created ${count} inboxes (moderate usage)`,
          riskLevel: 'medium',
          shouldBlock: false,
        };
      }

      return {
        isBot: false,
        reason: `Fingerprint usage: ${count} inboxes`,
        riskLevel: 'low',
        shouldBlock: false,
      };
    } catch (error) {
      console.error('Fingerprint check failed:', error);
      return {
        isBot: false,
        reason: 'Fingerprint check failed',
        riskLevel: 'low',
        shouldBlock: false,
      };
    }
  }

  /**
   * Check IP address abuse
   */
  private async checkIPAbuse(ipAddress: string): Promise<BotDetectionResult> {
    try {
      const { supabase } = await import('./supabaseClient');
      
      const { data, error } = await supabase
        .from('inbox')
        .select('user_id')
        .eq('ip_address', ipAddress)
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      if (error) throw error;

      const totalInboxes = data?.length || 0;
      const uniqueUsers = new Set(data?.map(d => d.user_id)).size;

      if (totalInboxes >= 100) {
        return {
          isBot: true,
          reason: `IP created ${totalInboxes} inboxes with ${uniqueUsers} users`,
          riskLevel: 'critical',
          shouldBlock: true,
        };
      } else if (totalInboxes >= this.limits.maxInboxesPerIP) {
        return {
          isBot: true,
          reason: `IP created ${totalInboxes} inboxes (limit: ${this.limits.maxInboxesPerIP})`,
          riskLevel: 'high',
          shouldBlock: true,
        };
      } else if (totalInboxes >= 20) {
        return {
          isBot: false,
          reason: `IP moderate usage: ${totalInboxes} inboxes`,
          riskLevel: 'medium',
          shouldBlock: false,
        };
      }

      return {
        isBot: false,
        reason: `IP usage: ${totalInboxes} inboxes`,
        riskLevel: 'low',
        shouldBlock: false,
      };
    } catch (error) {
      console.error('IP check failed:', error);
      return {
        isBot: false,
        reason: 'IP check failed',
        riskLevel: 'low',
        shouldBlock: false,
      };
    }
  }

  /**
   * Check user rate limiting
   */
  private async checkUserRateLimit(userId: string): Promise<BotDetectionResult> {
    try {
      const { supabase } = await import('./supabaseClient');
      
      // Check hourly limit
      const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const { data: hourlyData } = await supabase
        .from('inbox')
        .select('id')
        .eq('user_id', userId)
        .gte('created_at', hourAgo.toISOString());

      const hourlyCount = hourlyData?.length || 0;

      if (hourlyCount >= this.limits.maxInboxesPerUserPerHour) {
        return {
          isBot: true,
          reason: `User exceeded hourly limit: ${hourlyCount}/${this.limits.maxInboxesPerUserPerHour}`,
          riskLevel: 'high',
          shouldBlock: true,
        };
      }

      // Check daily limit
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const { data: dailyData } = await supabase
        .from('inbox')
        .select('id')
        .eq('user_id', userId)
        .gte('created_at', dayAgo.toISOString());

      const dailyCount = dailyData?.length || 0;

      if (dailyCount >= this.limits.maxInboxesPerUserPerDay) {
        return {
          isBot: true,
          reason: `User exceeded daily limit: ${dailyCount}/${this.limits.maxInboxesPerUserPerDay}`,
          riskLevel: 'high',
          shouldBlock: true,
        };
      }

      return {
        isBot: false,
        reason: `User usage: ${hourlyCount}/h, ${dailyCount}/day`,
        riskLevel: 'low',
        shouldBlock: false,
      };
    } catch (error) {
      console.error('User rate limit check failed:', error);
      return {
        isBot: false,
        reason: 'Rate limit check failed',
        riskLevel: 'low',
        shouldBlock: false,
      };
    }
  }

  /**
   * Check creation speed (too fast = bot)
   */
  private checkCreationSpeed(creationInterval: number): BotDetectionResult {
    if (creationInterval > 0 && creationInterval < 5) {
      return {
        isBot: true,
        reason: `Too fast creation: ${creationInterval}s interval`,
        riskLevel: 'critical',
        shouldBlock: true,
      };
    } else if (creationInterval > 0 && creationInterval < this.limits.minIntervalSeconds) {
      return {
        isBot: true,
        reason: `Fast creation: ${creationInterval}s interval (min: ${this.limits.minIntervalSeconds}s)`,
        riskLevel: 'high',
        shouldBlock: true,
      };
    }

    return {
      isBot: false,
      reason: `Normal creation speed: ${creationInterval}s`,
      riskLevel: 'low',
      shouldBlock: false,
    };
  }

  /**
   * Check user agent for bot patterns
   */
  private checkUserAgent(userAgent: string): BotDetectionResult {
    const botPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /headless/i,
      /selenium/i,
      /phantomjs/i,
      /puppeteer/i,
    ];

    const isSuspiciousAgent = botPatterns.some(pattern => pattern.test(userAgent));

    if (isSuspiciousAgent) {
      return {
        isBot: true,
        reason: `Suspicious user agent: ${userAgent}`,
        riskLevel: 'high',
        shouldBlock: true,
      };
    }

    if (!userAgent || userAgent === 'unknown' || userAgent.length < 20) {
      return {
        isBot: false,
        reason: `Minimal user agent: ${userAgent}`,
        riskLevel: 'medium',
        shouldBlock: false,
      };
    }

    return {
      isBot: false,
      reason: 'Normal user agent',
      riskLevel: 'low',
      shouldBlock: false,
    };
  }


}

// Export default instance
export const botProtection = new BotProtection();

// Export types
export type { BotDetectionResult, RateLimitConfig }; 
