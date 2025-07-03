-- Create inbox table for temporary email addresses
CREATE TABLE inbox (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email_address TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- Add indexes for better performance
CREATE INDEX idx_inbox_email ON inbox(email_address);
CREATE INDEX idx_inbox_expires ON inbox(expires_at);
CREATE INDEX idx_inbox_active ON inbox(is_active);

-- Add comment for documentation
COMMENT ON TABLE inbox IS 'Stores temporary email addresses that expire after a set time';
COMMENT ON COLUMN inbox.email_address IS 'The temporary email address (e.g., abc123@onetimeemail.net)';
COMMENT ON COLUMN inbox.expires_at IS 'When this email address expires (default: 10 minutes from creation)';
COMMENT ON COLUMN inbox.is_active IS 'Whether this inbox is still accepting emails'; 