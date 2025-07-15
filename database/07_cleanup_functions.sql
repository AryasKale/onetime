-- =================================================================
-- CLEANUP & METRICS DATABASE FUNCTIONS
-- =================================================================
-- These functions handle automatic cleanup and metrics tracking
-- Run this script in Supabase SQL Editor
-- =================================================================

-- Function to increment a metric value
CREATE OR REPLACE FUNCTION increment_metric(
  metric_name_param TEXT, 
  increment_by DOUBLE PRECISION DEFAULT 1
) RETURNS DOUBLE PRECISION
LANGUAGE plpgsql
AS $$
DECLARE
  new_value DOUBLE PRECISION;
BEGIN
  -- Insert or update the metric
  INSERT INTO metrics (metric_name, metric_value, updated_at)
  VALUES (metric_name_param, increment_by, NOW())
  ON CONFLICT (metric_name) 
  DO UPDATE SET 
    metric_value = metrics.metric_value + increment_by,
    updated_at = NOW()
  RETURNING metric_value INTO new_value;
  
  RETURN new_value;
END;
$$;

-- Function to set a metric to a specific value
CREATE OR REPLACE FUNCTION set_metric(
  metric_name_param TEXT, 
  new_value DOUBLE PRECISION
) RETURNS DOUBLE PRECISION
LANGUAGE plpgsql
AS $$
BEGIN
  -- Insert or update the metric
  INSERT INTO metrics (metric_name, metric_value, updated_at)
  VALUES (metric_name_param, new_value, NOW())
  ON CONFLICT (metric_name) 
  DO UPDATE SET 
    metric_value = new_value,
    updated_at = NOW();
  
  RETURN new_value;
END;
$$;

-- Function to get a metric value
CREATE OR REPLACE FUNCTION get_metric(metric_name_param TEXT) 
RETURNS DOUBLE PRECISION
LANGUAGE plpgsql
AS $$
DECLARE
  metric_val DOUBLE PRECISION;
BEGIN
  SELECT metric_value INTO metric_val 
  FROM metrics 
  WHERE metric_name = metric_name_param;
  
  RETURN COALESCE(metric_val, 0);
END;
$$;

-- Comprehensive cleanup function with metrics tracking
CREATE OR REPLACE FUNCTION cleanup_expired_data()
RETURNS TABLE(
  expired_inboxes_cleaned INTEGER,
  expired_emails_deleted INTEGER,
  total_emails_before INTEGER,
  total_emails_after INTEGER,
  cleanup_timestamp TIMESTAMPTZ
) 
LANGUAGE plpgsql
AS $$
DECLARE
  emails_before INT;
  emails_after INT;
  inboxes_cleaned INT;
  emails_deleted INT;
  expired_inbox_ids UUID[];
BEGIN
  -- Get current email count
  SELECT COUNT(*) INTO emails_before FROM emails;
  
  -- Find expired inbox IDs
  SELECT ARRAY_AGG(id) INTO expired_inbox_ids
  FROM inbox 
  WHERE expires_at < NOW() AND is_active = true;
  
  -- Count emails to be deleted
  IF expired_inbox_ids IS NOT NULL THEN
    SELECT COUNT(*) INTO emails_deleted 
    FROM emails 
    WHERE inbox_id = ANY(expired_inbox_ids);
    
    -- Delete emails from expired inboxes
    DELETE FROM emails WHERE inbox_id = ANY(expired_inbox_ids);
    
    -- Mark inboxes as inactive
    UPDATE inbox 
    SET is_active = false 
    WHERE id = ANY(expired_inbox_ids);
    
    GET DIAGNOSTICS inboxes_cleaned = ROW_COUNT;
  ELSE
    emails_deleted := 0;
    inboxes_cleaned := 0;
  END IF;
  
  -- Get email count after cleanup
  SELECT COUNT(*) INTO emails_after FROM emails;
  
  -- Update metrics
  PERFORM increment_metric('total_expired_inboxes_cleaned', inboxes_cleaned);
  PERFORM increment_metric('total_expired_emails_deleted', emails_deleted);
  PERFORM increment_metric('total_inboxes_expired', inboxes_cleaned);
  PERFORM increment_metric('total_emails_expired', emails_deleted);
  PERFORM set_metric('current_active_emails', emails_after);
  
  -- Return results
  RETURN QUERY SELECT 
    inboxes_cleaned::INTEGER,
    emails_deleted::INTEGER, 
    emails_before::INTEGER,
    emails_after::INTEGER,
    NOW()::TIMESTAMPTZ;
END;
$$;

-- Function to get cleanup statistics
CREATE OR REPLACE FUNCTION get_cleanup_stats()
RETURNS TABLE(
  expired_inboxes_pending INTEGER,
  total_emails INTEGER,
  total_inboxes INTEGER,
  active_inboxes INTEGER,
  cleanup_needed BOOLEAN
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    (SELECT COUNT(*)::INTEGER FROM inbox WHERE expires_at < NOW() AND is_active = true) as expired_inboxes_pending,
    (SELECT COUNT(*)::INTEGER FROM emails) as total_emails,
    (SELECT COUNT(*)::INTEGER FROM inbox) as total_inboxes,
    (SELECT COUNT(*)::INTEGER FROM inbox WHERE is_active = true) as active_inboxes,
    (SELECT COUNT(*) > 0 FROM inbox WHERE expires_at < NOW() AND is_active = true) as cleanup_needed;
END;
$$;

-- Create a view for easy metrics access
CREATE OR REPLACE VIEW metrics_summary AS
SELECT 
  metric_name,
  metric_value,
  updated_at,
  CASE 
    WHEN metric_name LIKE '%rate%' THEN ROUND(metric_value * 100, 2) || '%'
    ELSE metric_value::TEXT
  END as display_value
FROM metrics 
ORDER BY 
  CASE 
    WHEN metric_name LIKE 'total_emails_%' THEN 1
    WHEN metric_name LIKE 'total_inboxes_%' THEN 2
    WHEN metric_name LIKE 'current_%' THEN 3
    WHEN metric_name LIKE 'total_expired_%' THEN 4
    ELSE 5
  END,
  metric_name;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION increment_metric(TEXT, DOUBLE PRECISION) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION set_metric(TEXT, DOUBLE PRECISION) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_metric(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION cleanup_expired_data() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_cleanup_stats() TO anon, authenticated;

-- Grant view access
GRANT SELECT ON metrics_summary TO anon, authenticated;

-- =================================================================
-- INITIAL METRICS SETUP
-- =================================================================

-- Ensure all required metrics exist
INSERT INTO metrics (metric_name, metric_value) VALUES
('total_emails_received', 0),
('total_emails_sent', 0),
('total_bounce_notifications', 0),
('total_inboxes_created', 0),
('total_emails_generated', 0),
('total_inboxes_expired', 0),
('total_emails_expired', 0),
('total_expired_inboxes_cleaned', 0),
('total_expired_emails_deleted', 0),
('total_suspicious_emails_blocked', 0),
('total_rate_limited_emails', 0),
('current_active_emails', 0),
('current_active_inboxes', 0)
ON CONFLICT (metric_name) DO NOTHING;

-- Set current active counts
SELECT set_metric('current_active_emails', (SELECT COUNT(*) FROM emails));
SELECT set_metric('current_active_inboxes', (SELECT COUNT(*) FROM inbox WHERE is_active = true));

-- =================================================================
-- VERIFICATION
-- =================================================================

-- Test the functions
DO $$
BEGIN
  RAISE NOTICE 'Testing cleanup functions...';
  RAISE NOTICE 'Current active emails: %', get_metric('current_active_emails');
  RAISE NOTICE 'Current active inboxes: %', get_metric('current_active_inboxes');
  RAISE NOTICE 'Cleanup functions installed successfully!';
END $$; 