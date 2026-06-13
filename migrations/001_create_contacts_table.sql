-- Migration to create the contacts table for campaign form submissions
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    interest TEXT NOT NULL,
    message TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow inserts for anyone (for the public contact form)
CREATE POLICY "Allow public inserts" ON public.contacts
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow admins to read (requires auth later)
CREATE POLICY "Allow admin read" ON public.contacts
    FOR SELECT
    TO authenticated
    USING (true);
