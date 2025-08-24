// Lightweight Bot Protection System for OneTimeEmail
// Minimal application-level checks, relies on database constraints for race conditions

interface BotDetectionResult {
  isBot: boolean;
  reason: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  shouldBlock: boolean;
}

export class BotProtectionLightweight {
  
  /**
   * Fast, lightweight bot detection - no database queries
   * Database triggers handle race conditions and burst attacks
   */
  async checkUserSafety(trackingData: {
    user_id: string;
    fingerprint: string;
    ip_address: string;
    creation_interval: number;
    user_agent: string;
  }): Promise<BotDetectionResult> {
    
    // FAST CHECK 1: Obvious bot user agents (no database needed)
    if (this.isObviousBotUserAgent(trackingData.user_agent)) {
      return {
        isBot: true,
        reason: 'Bot user agent detected',
        riskLevel: 'high',
        shouldBlock: true,
      };
    }
    
    // FAST CHECK 2: Suspiciously fast creation (no database needed)
    if (trackingData.creation_interval !== undefined && trackingData.creation_interval < 5) {
      return {
        isBot: true,
        reason: 'Too fast inbox creation detected',
        riskLevel: 'medium',
        shouldBlock: true,
      };
    }
    
    // FAST CHECK 3: Invalid fingerprint patterns (no database needed)
    if (this.isInvalidFingerprint(trackingData.fingerprint)) {
      return {
        isBot: true,
        reason: 'Invalid fingerprint pattern',
        riskLevel: 'medium', 
        shouldBlock: true,
      };
    }
    
    // All fast checks passed - let database constraints handle the rest
    return {
      isBot: false,
      reason: 'Fast checks passed, database will enforce limits',
      riskLevel: 'low',
      shouldBlock: false,
    };
  }
  
  /**
   * Check for obvious bot user agents (fast string matching)
   */
  private isObviousBotUserAgent(userAgent: string): boolean {
    if (!userAgent || userAgent === 'unknown') return false;
    
    const botIndicators = [
      'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget', 'python', 
      'requests/', 'httpx/', 'axios/', 'postman', 'insomnia', 'playwright',
      'selenium', 'phantomjs', 'headlesschrome', 'automation'
    ];
    
    const lowerUA = userAgent.toLowerCase();
    return botIndicators.some(indicator => lowerUA.includes(indicator));
  }
  
  /**
   * Check for invalid fingerprint patterns (fast pattern matching)
   */
  private isInvalidFingerprint(fingerprint: string): boolean {
    if (!fingerprint) return true;
    
    // Obviously fake/default fingerprints
    const invalidPatterns = [
      'unknown_fingerprint',
      'default_fingerprint', 
      'test_fingerprint',
      'bot_fingerprint',
      'fake_fingerprint'
    ];
    
    return invalidPatterns.some(pattern => fingerprint.includes(pattern));
  }
}

// Export singleton instance
export const botProtectionLightweight = new BotProtectionLightweight(); 
