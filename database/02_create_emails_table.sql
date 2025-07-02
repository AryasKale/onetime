-- Create emails table for storing received messages
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

-- Add indexes for better performance
CREATE INDEX idx_emails_inbox ON emails(inbox_id);
CREATE INDEX idx_emails_received ON emails(received_at DESC);
CREATE INDEX idx_emails_sender ON emails(sender);
CREATE INDEX idx_emails_read ON emails(is_read);

-- Add comment for documentation
COMMENT ON TABLE emails IS 'Stores emails received for temporary inboxes';
COMMENT ON COLUMN emails.inbox_id IS 'References the temporary inbox that received this email';
COMMENT ON COLUMN emails.sender IS 'Email address of the sender';
COMMENT ON COLUMN emails.recipient IS 'The temporary email address that received this message';
COMMENT ON COLUMN emails.body IS 'Plain text content of the email';
COMMENT ON COLUMN emails.html_body IS 'HTML content of the email (if available)';
COMMENT ON COLUMN emails.attachments IS 'JSON array of attachment metadata';
COMMENT ON COLUMN emails.headers IS 'JSON object containing email headers';
COMMENT ON COLUMN emails.size_bytes IS 'Total size of the email in bytes'; 