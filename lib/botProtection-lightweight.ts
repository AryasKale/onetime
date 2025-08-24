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
    
    // FAST CHECK 2: Suspiciously fast creation - RELAXED for mobile users (2 seconds instead of 5)
    if (trackingData.creation_interval !== undefined && trackingData.creation_interval < 2) {
      return {
        isBot: true,
        reason: 'Too fast inbox creation detected',
        riskLevel: 'medium',
        shouldBlock: true,
      };
    }
    
    // FAST CHECK 3: Invalid fingerprint patterns - IMPROVED for Samsung compatibility
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
   * IMPROVED: More specific to avoid false positives with Samsung
   */
  private isObviousBotUserAgent(userAgent: string): boolean {
    if (!userAgent || userAgent === 'unknown') return false;
    
    // Only check for very obvious bot indicators to avoid Samsung false positives
    const strictBotIndicators = [
      'crawler', 'spider', 'scraper', 'curl', 'wget', 'python-requests',
      'requests/', 'httpx/', 'postman', 'insomnia', 'playwright',
      'selenium', 'phantomjs', 'headlesschrome', 'automation'
    ];
    
    const lowerUA = userAgent.toLowerCase();
    
    // Extra check: Don't flag legitimate browsers
    const legitBrowsers = ['chrome', 'firefox', 'safari', 'edge', 'samsung'];
    const hasLegitBrowser = legitBrowsers.some(browser => lowerUA.includes(browser));
    
    // If it has a legit browser string, be more lenient
    if (hasLegitBrowser) {
      // Only flag if it has multiple bot indicators
      const botMatches = strictBotIndicators.filter(indicator => lowerUA.includes(indicator));
      return botMatches.length >= 2;
    }
    
    // If no legit browser detected, use stricter checking
    return strictBotIndicators.some(indicator => lowerUA.includes(indicator));
  }
  
  /**
   * Check for invalid fingerprint patterns (fast pattern matching)
   * IMPROVED: More lenient for Samsung device fingerprints
   */
  private isInvalidFingerprint(fingerprint: string): boolean {
    if (!fingerprint) return true;
    
    // Only flag obviously fake/test fingerprints, not device-specific ones
    const invalidPatterns = [
      'unknown_fingerprint',
      'default_fingerprint', 
      'test_fingerprint',
      'bot_fingerprint',
      'fake_fingerprint',
      'null',
      'undefined'
    ];
    
    // Check for exact matches or very short fingerprints (likely fake)
    if (fingerprint.length < 8) return true;
    
    return invalidPatterns.some(pattern => fingerprint.toLowerCase().includes(pattern.toLowerCase()));
  }
}

// Export default instance
export const botProtectionLightweight = new BotProtectionLightweight(); 
