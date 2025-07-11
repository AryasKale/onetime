-- Create metrics table for tracking email statistics
CREATE TABLE metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value DOUBLE PRECISION NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add unique constraint to prevent duplicate metric names
ALTER TABLE metrics ADD CONSTRAINT unique_metric_name UNIQUE (metric_name);

-- Add indexes for better performance
CREATE INDEX idx_metrics_name ON metrics(metric_name);
CREATE INDEX idx_metrics_updated ON metrics(updated_at);

-- Insert initial metrics with zero values
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
('total_rate_limited_emails', 0)
ON CONFLICT (metric_name) DO NOTHING;

-- Add comment for documentation
COMMENT ON TABLE metrics IS 'Stores application metrics and statistics';
COMMENT ON COLUMN metrics.metric_name IS 'Name of the metric (e.g., total_emails_received)';
COMMENT ON COLUMN metrics.metric_value IS 'Current value of the metric';

-- Function to increment a metric
CREATE OR REPLACE FUNCTION increment_metric(metric_name_param TEXT, increment_by DOUBLE PRECISION DEFAULT 1)
RETURNS DOUBLE PRECISION
LANGUAGE plpgsql
AS $$
DECLARE
    new_value DOUBLE PRECISION;
BEGIN
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

-- Function to set a metric value
CREATE OR REPLACE FUNCTION set_metric(metric_name_param TEXT, new_value DOUBLE PRECISION)
RETURNS DOUBLE PRECISION
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO metrics (metric_name, metric_value, updated_at)
    VALUES (metric_name_param, new_value, NOW())
    ON CONFLICT (metric_name) 
    DO UPDATE SET 
        metric_value = new_value,
        updated_at = NOW();
    
    RETURN new_value;
END;
$$; 