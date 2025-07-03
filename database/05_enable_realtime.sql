-- =================================================================
-- ENABLE REALTIME UPDATES FOR ONE-TIME EMAIL PROJECT
-- =================================================================
-- Run this script in Supabase SQL Editor to enable real-time subscriptions
-- This allows the frontend to receive live updates when emails are inserted
-- =================================================================

-- Enable realtime on the emails table
ALTER PUBLICATION supabase_realtime ADD TABLE emails;

-- Enable realtime on the inbox table (optional, for future features)
ALTER PUBLICATION supabase_realtime ADD TABLE inbox;

-- Enable realtime on the inbox_stats table (optional, for live stats)
ALTER PUBLICATION supabase_realtime ADD TABLE inbox_stats;

-- =================================================================
-- VERIFY REALTIME IS ENABLED
-- =================================================================
-- Run this query to check which tables have realtime enabled:
-- SELECT schemaname, tablename FROM pg_publication_tables WHERE pubname = 'supabase_realtime';

-- =================================================================
-- REALTIME SETUP COMPLETE
-- =================================================================
-- Your tables now support real-time subscriptions!
-- The frontend will automatically receive updates when:
-- 1. New emails are inserted into the emails table
-- 2. Inbox records are created or updated
-- 3. Stats are updated in real-time
-- 
-- Next steps:
-- 1. Test the real-time functionality with the "Send Test Email" button
-- 2. Watch emails appear instantly in the inbox
-- 3. Enjoy live email notifications!
-- ================================================================= 