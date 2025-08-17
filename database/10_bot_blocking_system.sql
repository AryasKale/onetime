-- Bot Blocking System
-- Creates tables and functions to permanently block abusive bots

-- Create blocked entities table
CREATE TABLE IF NOT EXISTS blocked_entities (
    id BIGSERIAL PRIMARY KEY,
    entity_type VARCHAR(20) NOT NULL, -- 'user_id', 'fingerprint', 'ip_address'
    entity_value VARCHAR(100) NOT NULL,
    blocked_at TIMESTAMPTZ DEFAULT NOW(),
    blocked_by VARCHAR(50) DEFAULT 'system', -- 'system', 'admin', 'manual'
    reason TEXT NOT NULL,
    risk_level VARCHAR(20) DEFAULT 'high', -- 'medium', 'high', 'critical'
    auto_expires_at TIMESTAMPTZ, -- NULL for permanent blocks
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for fast lookups
CREATE INDEX idx_blocked_entities_type_value ON blocked_entities(entity_type, entity_value) WHERE is_active = TRUE;
CREATE INDEX idx_blocked_entities_active ON blocked_entities(is_active);
CREATE INDEX idx_blocked_entities_expires ON blocked_entities(auto_expires_at) WHERE auto_expires_at IS NOT NULL;

-- Create bot detection logs table
CREATE TABLE IF NOT EXISTS bot_detection_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(100),
    fingerprint VARCHAR(100),
    ip_address VARCHAR(100),
    user_agent TEXT,
    detection_reason TEXT NOT NULL,
    risk_level VARCHAR(20) NOT NULL,
    was_blocked BOOLEAN NOT NULL,
    creation_interval INTEGER,
    total_user_inboxes INTEGER,
    total_fingerprint_inboxes INTEGER,
    total_ip_inboxes INTEGER,
    detected_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for bot detection logs
CREATE INDEX idx_bot_logs_detected_at ON bot_detection_logs(detected_at);
CREATE INDEX idx_bot_logs_risk_level ON bot_detection_logs(risk_level);
CREATE INDEX idx_bot_logs_blocked ON bot_detection_logs(was_blocked);

-- Function to check if entity is blocked
CREATE OR REPLACE FUNCTION is_entity_blocked(
    entity_type_param VARCHAR(20),
    entity_value_param VARCHAR(100)
) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM blocked_entities 
        WHERE entity_type = entity_type_param 
        AND entity_value = entity_value_param 
        AND is_active = TRUE
        AND (auto_expires_at IS NULL OR auto_expires_at > NOW())
    );
END;
$$ LANGUAGE plpgsql;

-- Function to block an entity
CREATE OR REPLACE FUNCTION block_entity(
    entity_type_param VARCHAR(20),
    entity_value_param VARCHAR(100),
    reason_param TEXT,
    risk_level_param VARCHAR(20) DEFAULT 'high',
    blocked_by_param VARCHAR(50) DEFAULT 'system',
    duration_hours INTEGER DEFAULT NULL -- NULL for permanent
) RETURNS BOOLEAN AS $$
DECLARE
    expires_at TIMESTAMPTZ;
BEGIN
    -- Calculate expiry time if duration is provided
    IF duration_hours IS NOT NULL THEN
        expires_at := NOW() + (duration_hours || ' hours')::INTERVAL;
    END IF;

    -- Insert block record
    INSERT INTO blocked_entities (
        entity_type, 
        entity_value, 
        reason, 
        risk_level, 
        blocked_by, 
        auto_expires_at
    ) VALUES (
        entity_type_param, 
        entity_value_param, 
        reason_param, 
        risk_level_param, 
        blocked_by_param, 
        expires_at
    )
    ON CONFLICT (entity_type, entity_value) 
    DO UPDATE SET 
        reason = reason_param,
        risk_level = risk_level_param,
        blocked_by = blocked_by_param,
        auto_expires_at = expires_at,
        is_active = TRUE,
        blocked_at = NOW();

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to unblock an entity
CREATE OR REPLACE FUNCTION unblock_entity(
    entity_type_param VARCHAR(20),
    entity_value_param VARCHAR(100)
) RETURNS BOOLEAN AS $$
BEGIN
    UPDATE blocked_entities 
    SET is_active = FALSE 
    WHERE entity_type = entity_type_param 
    AND entity_value = entity_value_param;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Function to auto-block high-risk entities (Updated for stricter policy)
CREATE OR REPLACE FUNCTION auto_block_high_risk_entities() RETURNS INTEGER AS $$
DECLARE
    blocked_count INTEGER := 0;
    entity_record RECORD;
BEGIN
    -- Block fingerprints with >10 inboxes in 24h (stricter: normal limit is 3)
    FOR entity_record IN 
        SELECT fingerprint, COUNT(*) as inbox_count
        FROM inbox 
        WHERE fingerprint IS NOT NULL 
        AND created_at >= NOW() - INTERVAL '24 hours'
        GROUP BY fingerprint 
        HAVING COUNT(*) >= 10
    LOOP
        PERFORM block_entity(
            'fingerprint',
            entity_record.fingerprint,
            'Auto-blocked: ' || entity_record.inbox_count || ' inboxes in 24h (limit: 3)',
            'critical',
            'system',
            NULL -- Permanent block
        );
        blocked_count := blocked_count + 1;
    END LOOP;

    -- Block IPs with >15 inboxes in 24h (stricter: normal limit is 3)
    FOR entity_record IN 
        SELECT ip_address, COUNT(*) as inbox_count
        FROM inbox 
        WHERE ip_address IS NOT NULL 
        AND created_at >= NOW() - INTERVAL '24 hours'
        GROUP BY ip_address 
        HAVING COUNT(*) >= 15
    LOOP
        PERFORM block_entity(
            'ip_address',
            entity_record.ip_address,
            'Auto-blocked: ' || entity_record.inbox_count || ' inboxes in 24h (limit: 3)',
            'critical',
            'system',
            24 -- 24 hour block for IPs (might be shared)
        );
        blocked_count := blocked_count + 1;
    END LOOP;

    -- Block users with >20 inboxes in 1 hour (stricter: normal limit is 7/hour)
    FOR entity_record IN 
        SELECT user_id, COUNT(*) as inbox_count
        FROM inbox 
        WHERE user_id IS NOT NULL 
        AND created_at >= NOW() - INTERVAL '1 hour'
        GROUP BY user_id 
        HAVING COUNT(*) >= 20
    LOOP
        PERFORM block_entity(
            'user_id',
            entity_record.user_id,
            'Auto-blocked: ' || entity_record.inbox_count || ' inboxes in 1h (limit: 7)',
            'critical',
            'system',
            6 -- 6 hour block for users
        );
        blocked_count := blocked_count + 1;
    END LOOP;

    -- Block users with >100 inboxes in 24 hours (stricter: normal limit is 50/day)
    FOR entity_record IN 
        SELECT user_id, COUNT(*) as inbox_count
        FROM inbox 
        WHERE user_id IS NOT NULL 
        AND created_at >= NOW() - INTERVAL '24 hours'
        GROUP BY user_id 
        HAVING COUNT(*) >= 100
    LOOP
        PERFORM block_entity(
            'user_id',
            entity_record.user_id,
            'Auto-blocked: ' || entity_record.inbox_count || ' inboxes in 24h (limit: 50)',
            'critical',
            'system',
            12 -- 12 hour block for daily abuse
        );
        blocked_count := blocked_count + 1;
    END LOOP;

    RETURN blocked_count;
END;
$$ LANGUAGE plpgsql;

-- Function to clean up expired blocks
CREATE OR REPLACE FUNCTION cleanup_expired_blocks() RETURNS INTEGER AS $$
DECLARE
    cleaned_count INTEGER;
BEGIN
    UPDATE blocked_entities 
    SET is_active = FALSE 
    WHERE is_active = TRUE 
    AND auto_expires_at IS NOT NULL 
    AND auto_expires_at <= NOW();
    
    GET DIAGNOSTICS cleaned_count = ROW_COUNT;
    RETURN cleaned_count;
END;
$$ LANGUAGE plpgsql;



-- Add comments
COMMENT ON TABLE blocked_entities IS 'Stores permanently or temporarily blocked users, IPs, and fingerprints';
COMMENT ON TABLE bot_detection_logs IS 'Logs all bot detection attempts for analysis';
COMMENT ON FUNCTION is_entity_blocked IS 'Quickly check if a user/IP/fingerprint is currently blocked';
COMMENT ON FUNCTION block_entity IS 'Block a user/IP/fingerprint with optional auto-expiry';
COMMENT ON FUNCTION auto_block_high_risk_entities IS 'Automatically block entities showing clear bot behavior';

-- Create unique constraint to prevent duplicate blocks
CREATE UNIQUE INDEX idx_blocked_entities_unique 
ON blocked_entities(entity_type, entity_value) 
WHERE is_active = TRUE; 



-- Step 1: Add tracking columns to inbox table
ALTER TABLE inbox ADD COLUMN user_id VARCHAR(100);
ALTER TABLE inbox ADD COLUMN ip_address VARCHAR(100);
ALTER TABLE inbox ADD COLUMN user_agent TEXT;
ALTER TABLE inbox ADD COLUMN fingerprint VARCHAR(100);
ALTER TABLE inbox ADD COLUMN referer TEXT;
ALTER TABLE inbox ADD COLUMN session_id VARCHAR(100);
ALTER TABLE inbox ADD COLUMN creation_interval INTEGER;
ALTER TABLE inbox ADD COLUMN browser_info JSONB DEFAULT '{}';

-- Step 2: Run database/10_bot_blocking_system.sql
-- (Creates blocked_entities and bot_detection_logs tables)
