# Vannie Waitlist

A simple waitlist landing page built with Next.js and Supabase.

## Setup

### 1. Supabase Setup

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated reads" ON waitlist
  FOR SELECT USING (auth.role() = 'authenticated');
```

### 2. Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Development

```bash
npm install
npm run dev
```
