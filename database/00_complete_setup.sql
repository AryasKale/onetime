-- =================================================================
-- ONE-TIME EMAIL PROJECT - COMPLETE DATABASE SETUP
-- =================================================================
-- Run this script in Supabase SQL Editor to create all tables
-- 
-- Tables created:
-- 1. inbox - Temporary email addresses
-- 2. emails - Received email messages  
-- 3. inbox_stats - Usage statistics
-- 4. blocked_senders - Spam protection
-- =================================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =================================================================
-- TABLE 1: INBOX - Temporary Email Addresses
-- =================================================================
CREATE TABLE inbox (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email_address TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- Indexes for inbox table
CREATE INDEX idx_inbox_email ON inbox(email_address);
CREATE INDEX idx_inbox_expires ON inbox(expires_at);
CREATE INDEX idx_inbox_active ON inbox(is_active);

-- =================================================================
-- TABLE 2: EMAILS - Received Email Messages
-- =================================================================
CREATE TABLE emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  inbox_id UUID REFERENCES inbox(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  recipient TEXT NOT NULL,
  subject TEXT DEFAULT '',
  body TEXT DEFAULT '',
  html_body TEXT DEFAULT '',
  received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE,
  attachments JSONB DEFAULT '[]'::jsonb,
  headers JSONB DEFAULT '{}'::jsonb,
  size_bytes INTEGER DEFAULT 0
);

-- Indexes for emails table
CREATE INDEX idx_emails_inbox ON emails(inbox_id);
CREATE INDEX idx_emails_received ON emails(received_at DESC);
CREATE INDEX idx_emails_sender ON emails(sender);
CREATE INDEX idx_emails_read ON emails(is_read);

-- =================================================================
-- TABLE 3: INBOX_STATS - Usage Statistics
-- =================================================================
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

-- Indexes for inbox_stats table
CREATE INDEX idx_inbox_stats_inbox ON inbox_stats(inbox_id);
CREATE INDEX idx_inbox_stats_updated ON inbox_stats(updated_at);

-- =================================================================
-- TABLE 4: BLOCKED_SENDERS - Spam Protection
-- =================================================================
CREATE TABLE blocked_senders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email_address TEXT NOT NULL,
  domain TEXT NOT NULL,
  reason TEXT DEFAULT 'spam',
  blocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  blocked_by TEXT DEFAULT 'system',
  is_active BOOLEAN DEFAULT TRUE,
  CONSTRAINT unique_blocked_email UNIQUE (email_address)
);

-- Indexes for blocked_senders table
CREATE INDEX idx_blocked_senders_email ON blocked_senders(email_address);
CREATE INDEX idx_blocked_senders_domain ON blocked_senders(domain);
CREATE INDEX idx_blocked_senders_active ON blocked_senders(is_active);

-- =================================================================
-- USEFUL FUNCTIONS
-- =================================================================

-- Function to clean up expired inboxes
CREATE OR REPLACE FUNCTION cleanup_expired_inboxes()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM inbox 
    WHERE expires_at < NOW() 
    AND is_active = true;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get inbox with email count
CREATE OR REPLACE FUNCTION get_inbox_with_stats(inbox_email TEXT)
RETURNS TABLE(
    id UUID,
    email_address TEXT,
    created_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN,
    email_count BIGINT,
    unread_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        i.id,
        i.email_address,
        i.created_at,
        i.expires_at,
        i.is_active,
        COUNT(e.id) as email_count,
        COUNT(e.id) FILTER (WHERE e.is_read = false) as unread_count
    FROM inbox i
    LEFT JOIN emails e ON i.id = e.inbox_id
    WHERE i.email_address = inbox_email
    AND i.is_active = true
    AND i.expires_at > NOW()
    GROUP BY i.id, i.email_address, i.created_at, i.expires_at, i.is_active;
END;
$$ LANGUAGE plpgsql;

-- =================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =================================================================

-- Enable RLS on all tables
ALTER TABLE inbox ENABLE ROW LEVEL SECURITY;
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE inbox_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_senders ENABLE ROW LEVEL SECURITY;

-- Allow public access to inbox table (for creating temporary emails)
CREATE POLICY "Allow public access to inbox" ON inbox
    FOR ALL USING (true);

-- Allow public access to emails table (for viewing emails)
CREATE POLICY "Allow public access to emails" ON emails
    FOR ALL USING (true);

-- Allow public read access to stats
CREATE POLICY "Allow public read access to inbox_stats" ON inbox_stats
    FOR SELECT USING (true);

-- Allow public read access to blocked_senders (for spam checking)
CREATE POLICY "Allow public read access to blocked_senders" ON blocked_senders
    FOR SELECT USING (true);

-- =================================================================
-- SAMPLE DATA (Optional - for testing)
-- =================================================================

-- Insert some sample blocked domains
INSERT INTO blocked_senders (email_address, domain, reason) VALUES
('spam@spam.com', 'spam.com', 'Known spam domain'),
('test@malicious.net', 'malicious.net', 'Malicious domain');

-- =================================================================
-- SETUP COMPLETE
-- =================================================================
-- Tables created successfully!
-- You can now use the API endpoints to create inboxes and receive emails.
-- 
-- Next steps:
-- 1. Update your .env.local with Supabase credentials
-- 2. Test the /api/create-inbox endpoint
-- 3. Build the frontend to display inboxes and emails
-- ================================================================= 