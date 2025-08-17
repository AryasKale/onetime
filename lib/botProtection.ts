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

// Default rate limits for bot protection
const DEFAULT_LIMITS: RateLimitConfig = {
  maxInboxesPerFingerprint: 50,    // Same device/browser  
  maxInboxesPerIP: 50,             // Same IP address
  maxInboxesPerUserPerHour: 7,     // Per user per hour
  maxInboxesPerUserPerDay: 50,     // Per user per day (higher than hourly)
  minIntervalSeconds: 30,          // 30 seconds minimum between creations
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
    
    // STEP 1: Check if permanently blocked first
    const permanentBlock = await this.checkPermanentBlocks(trackingData);
    if (permanentBlock.shouldBlock) {
      await this.logDetectionEvent(trackingData, permanentBlock);
      return permanentBlock;
    }

    // STEP 2: Run real-time detection checks
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

    // Log all detection events for analytics
    this.logDetectionEvent(trackingData, finalResult).catch(console.error);
    
    // Auto-block repeat critical offenders
    if (finalResult.shouldBlock && finalResult.riskLevel === 'critical') {
      this.autoBlockOffender(trackingData, finalResult).catch(console.error);
    }
    
    return finalResult;
  }

  /**
   * Log detection event to database for analytics
   */
  private async logDetectionEvent(trackingData: {
    user_id: string;
    fingerprint: string;
    ip_address: string;
    creation_interval: number;
    user_agent: string;
  }, result: BotDetectionResult): Promise<void> {
    try {
      const { supabase } = await import('./supabaseClient');
      
      // Get current counts for analytics
      const [userCount, fpCount, ipCount] = await Promise.all([
        this.getEntityCount(supabase, 'user_id', trackingData.user_id),
        this.getEntityCount(supabase, 'fingerprint', trackingData.fingerprint),
        this.getEntityCount(supabase, 'ip_address', trackingData.ip_address)
      ]);

      // Insert detection log
      await supabase
        .from('bot_detection_logs')
        .insert({
          user_id: trackingData.user_id,
          fingerprint: trackingData.fingerprint,
          ip_address: trackingData.ip_address,
          user_agent: trackingData.user_agent,
          detection_reason: result.reason,
          risk_level: result.riskLevel,
          was_blocked: result.shouldBlock,
          creation_interval: trackingData.creation_interval,
          total_user_inboxes: userCount,
          total_fingerprint_inboxes: fpCount,
          total_ip_inboxes: ipCount
        });
        
      console.log(`📊 Detection logged: ${result.riskLevel} risk, blocked: ${result.shouldBlock}`);
      console.log(`   📈 Stats - User: ${userCount}, Fingerprint: ${fpCount}, IP: ${ipCount}`);
    } catch (error) {
      console.error('Error logging detection:', error);
    }
  }

  /**
   * Check if entities are permanently blocked
   */
  private async checkPermanentBlocks(trackingData: {
    user_id: string;
    fingerprint: string;
    ip_address: string;
  }): Promise<BotDetectionResult> {
    try {
      const { supabase } = await import('./supabaseClient');
      
      // Check user, fingerprint, and IP in parallel
      const [userBlocked, fpBlocked, ipBlocked] = await Promise.all([
        supabase.rpc('is_entity_blocked', { entity_type_param: 'user_id', entity_value_param: trackingData.user_id }),
        supabase.rpc('is_entity_blocked', { entity_type_param: 'fingerprint', entity_value_param: trackingData.fingerprint }),
        supabase.rpc('is_entity_blocked', { entity_type_param: 'ip_address', entity_value_param: trackingData.ip_address })
      ]);

      if (userBlocked.data) {
        return {
          isBot: true,
          reason: `Permanently blocked user: ${trackingData.user_id}`,
          riskLevel: 'critical',
          shouldBlock: true,
        };
      }

      if (fpBlocked.data) {
        return {
          isBot: true,
          reason: `Permanently blocked device: ${trackingData.fingerprint}`,
          riskLevel: 'critical',
          shouldBlock: true,
        };
      }

      if (ipBlocked.data) {
        return {
          isBot: true,
          reason: `Permanently blocked IP: ${trackingData.ip_address}`,
          riskLevel: 'critical',
          shouldBlock: true,
        };
      }
    } catch (error) {
      console.error('Error checking permanent blocks:', error);
    }
    
    return {
      isBot: false,
      reason: 'Not permanently blocked',
      riskLevel: 'low',
      shouldBlock: false,
    };
  }

  /**
   * Auto-block repeat offenders
   */
  private async autoBlockOffender(trackingData: {
    user_id: string;
    fingerprint: string;
    ip_address: string;
  }, result: BotDetectionResult): Promise<void> {
    try {
      const { supabase } = await import('./supabaseClient');
      
      // Count recent critical violations for this fingerprint
      const { data: recentViolations } = await supabase
        .from('bot_detection_logs')
        .select('*')
        .eq('fingerprint', trackingData.fingerprint)
        .eq('was_blocked', true)
        .eq('risk_level', 'critical')
        .gte('detected_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours
        .order('detected_at', { ascending: false });

      if (recentViolations && recentViolations.length >= 3) {
        // Auto-block fingerprint after 3 critical violations in 24 hours
        await supabase.rpc('block_entity', {
          entity_type_param: 'fingerprint',
          entity_value_param: trackingData.fingerprint,
          reason_param: `Auto-blocked: ${recentViolations.length} critical violations in 24h`,
          risk_level_param: 'critical',
          blocked_by_param: 'auto-system'
        });
        
        console.log(`🚫 AUTO-BLOCKED fingerprint ${trackingData.fingerprint} after ${recentViolations.length} violations`);
      }
    } catch (error) {
      console.error('Error auto-blocking offender:', error);
    }
  }

  /**
   * Get count of inboxes for a specific entity
   */
  private async getEntityCount(supabase: any, column: string, value: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('inbox')
        .select('id', { count: 'exact' })
        .eq(column, value);
        
      if (error) throw error;
      return data?.length || 0;
    } catch (error) {
      console.error(`Error getting ${column} count:`, error);
      return 0;
    }
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
      const { data: hourlyData, error: hourlyError } = await supabase
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
      const { data: dailyData, error: dailyError } = await supabase
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
        reason: `Too fast: ${creationInterval}s interval`,
        riskLevel: 'critical',
        shouldBlock: true,
      };
    } else if (creationInterval > 0 && creationInterval < this.limits.minIntervalSeconds) {
      return {
        isBot: true,
        reason: `Too fast: ${creationInterval}s interval (min: ${this.limits.minIntervalSeconds}s)`,
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
