-- Bot Detection Queries for OneTimeEmail
-- These queries help identify suspicious behavior and potential bots

-- 1. Users creating many inboxes quickly (potential bots)
-- Find users who created more than 5 inboxes in the last hour
SELECT 
    user_id,
    COUNT(*) as inbox_count,
    MIN(created_at) as first_inbox,
    MAX(created_at) as last_inbox,
    EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at))) / 60 as time_span_minutes
FROM inbox 
WHERE created_at >= NOW() - INTERVAL '1 hour'
    AND user_id IS NOT NULL
GROUP BY user_id 
HAVING COUNT(*) > 5
ORDER BY inbox_count DESC;

-- 2. Same IP address creating multiple inboxes (potential bot farm)
SELECT 
    ip_address,
    COUNT(*) as inbox_count,
    COUNT(DISTINCT user_id) as unique_users,
    array_agg(DISTINCT user_id) as user_ids
FROM inbox 
WHERE created_at >= NOW() - INTERVAL '24 hours'
    AND ip_address IS NOT NULL
GROUP BY ip_address 
HAVING COUNT(*) > 10
ORDER BY inbox_count DESC;

-- 3. Same fingerprint with different user IDs (suspicious)
SELECT 
    fingerprint,
    COUNT(DISTINCT user_id) as different_users,
    COUNT(*) as total_inboxes,
    array_agg(DISTINCT user_id) as user_ids
FROM inbox 
WHERE fingerprint IS NOT NULL
    AND fingerprint != 'unknown_fingerprint'
GROUP BY fingerprint 
HAVING COUNT(DISTINCT user_id) > 1
ORDER BY different_users DESC, total_inboxes DESC;

-- 4. Very fast inbox creation (< 5 seconds between creations)
SELECT 
    user_id,
    COUNT(*) as fast_creations,
    AVG(creation_interval) as avg_interval_seconds
FROM inbox 
WHERE creation_interval > 0 
    AND creation_interval < 5
    AND created_at >= NOW() - INTERVAL '24 hours'
GROUP BY user_id
HAVING COUNT(*) > 3
ORDER BY fast_creations DESC;

-- 5. Suspicious user agents (common bot patterns)
SELECT 
    user_agent,
    COUNT(*) as inbox_count,
    COUNT(DISTINCT user_id) as unique_users
FROM inbox 
WHERE user_agent IS NOT NULL
    AND (
        user_agent ILIKE '%bot%' OR
        user_agent ILIKE '%crawler%' OR
        user_agent ILIKE '%spider%' OR
        user_agent ILIKE '%scraper%' OR
        user_agent = 'unknown' OR
        length(user_agent) < 20
    )
GROUP BY user_agent
ORDER BY inbox_count DESC;

-- 6. Sessions with unusually many inboxes
SELECT 
    session_id,
    COUNT(*) as inbox_count,
    COUNT(DISTINCT user_id) as unique_users,
    MIN(created_at) as session_start,
    MAX(created_at) as session_end
FROM inbox 
WHERE session_id IS NOT NULL
    AND session_id != 'unknown_session'
GROUP BY session_id
HAVING COUNT(*) > 10
ORDER BY inbox_count DESC;

-- 7. Users with identical browser info (potential bots)
SELECT 
    browser_info,
    COUNT(DISTINCT user_id) as different_users,
    COUNT(*) as total_inboxes,
    array_agg(DISTINCT user_id) as user_ids
FROM inbox 
WHERE browser_info IS NOT NULL
    AND browser_info != '{}'
GROUP BY browser_info
HAVING COUNT(DISTINCT user_id) > 5
ORDER BY different_users DESC;

-- 8. Overall bot detection summary for the last 24 hours
WITH suspicious_activity AS (
    -- Fast creators
    SELECT DISTINCT user_id, 'fast_creation' as flag
    FROM inbox 
    WHERE creation_interval > 0 AND creation_interval < 5
        AND created_at >= NOW() - INTERVAL '24 hours'
    
    UNION
    
    -- High volume creators
    SELECT user_id, 'high_volume' as flag
    FROM inbox 
    WHERE created_at >= NOW() - INTERVAL '24 hours'
        AND user_id IS NOT NULL
    GROUP BY user_id 
    HAVING COUNT(*) > 10
    
    UNION
    
    -- Bot user agents
    SELECT DISTINCT user_id, 'bot_user_agent' as flag
    FROM inbox 
    WHERE user_agent IS NOT NULL
        AND (
            user_agent ILIKE '%bot%' OR
            user_agent ILIKE '%crawler%' OR
            user_agent = 'unknown'
        )
        AND created_at >= NOW() - INTERVAL '24 hours'
)
SELECT 
    user_id,
    array_agg(flag) as suspicious_flags,
    COUNT(*) as flag_count
FROM suspicious_activity
GROUP BY user_id
ORDER BY flag_count DESC, user_id;

-- 9. Clean up function to block suspicious users (use carefully!)
-- This is just an example - implement your own blocking logic
/*
CREATE OR REPLACE FUNCTION block_suspicious_user(target_user_id VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN
    -- Add to a blocked_users table (you'd need to create this)
    INSERT INTO blocked_users (user_id, blocked_at, reason)
    VALUES (target_user_id, NOW(), 'Suspicious bot activity')
    ON CONFLICT (user_id) DO NOTHING;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
*/ 
