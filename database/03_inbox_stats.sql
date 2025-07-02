-- Create inbox_stats table for tracking usage analytics
CREATE TABLE inbox_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  inbox_id UUID REFERENCES inbox(id) ON DELETE CASCADE,
  total_emails_received INTEGER DEFAULT 0,
  last_email_received_at TIMESTAMP WITH TIME ZONE,
  total_bytes_received BIGINT DEFAULT 0,
  unique_senders INTEGER DEFAULT 0,
  spam_emails_blocked INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_inbox_stats_inbox ON inbox_stats(inbox_id);
CREATE INDEX idx_inbox_stats_updated ON inbox_stats(updated_at);

-- Add comment for documentation
COMMENT ON TABLE inbox_stats IS 'Tracks usage statistics for each temporary inbox'; 