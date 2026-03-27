import { createClient } from '@supabase/supabase-js';

// Server-side client with service role key (for admin operations)
export const supabaseServerClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error('Supabase environment variables not configured');
  }

  return createClient(url, serviceKey);
};

// Client-side client with anon key (for public operations)
export const supabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.warn('Supabase not configured. Database features disabled.');
    return null;
  }

  return createClient(url, anonKey);
};
