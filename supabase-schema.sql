-- Run this in your Supabase SQL Editor to create the waitlist table

CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the waitlist form)
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Only allow authenticated users to read (for admin purposes)
CREATE POLICY "Allow authenticated reads" ON waitlist
  FOR SELECT
  USING (auth.role() = 'authenticated');
