-- Create blocked_senders table for spam protection
CREATE TABLE blocked_senders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email_address TEXT NOT NULL,
  domain TEXT NOT NULL,
  reason TEXT DEFAULT 'spam',
  blocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  blocked_by TEXT DEFAULT 'system',
  is_active BOOLEAN DEFAULT TRUE
);

-- Add indexes for better performance
CREATE INDEX idx_blocked_senders_email ON blocked_senders(email_address);
CREATE INDEX idx_blocked_senders_domain ON blocked_senders(domain);
CREATE INDEX idx_blocked_senders_active ON blocked_senders(is_active);

-- Add unique constraint to prevent duplicate blocks
ALTER TABLE blocked_senders ADD CONSTRAINT unique_blocked_email UNIQUE (email_address);

-- Add comment for documentation
COMMENT ON TABLE blocked_senders IS 'Stores email addresses and domains blocked for spam protection';
COMMENT ON COLUMN blocked_senders.email_address IS 'The blocked email address';
COMMENT ON COLUMN blocked_senders.domain IS 'The domain part of the blocked email';
COMMENT ON COLUMN blocked_senders.reason IS 'Reason for blocking (spam, abuse, etc.)';
COMMENT ON COLUMN blocked_senders.blocked_by IS 'Who/what blocked this sender (system, admin, etc.)'; 