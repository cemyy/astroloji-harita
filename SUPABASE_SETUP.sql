-- Supabase SQL Schema for Astrology Application
-- Run these queries in Supabase SQL Editor to set up the database

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Saved Charts table
CREATE TABLE IF NOT EXISTS public.saved_charts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  birth_data JSONB NOT NULL,
  natal_chart JSONB,
  notes TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  CONSTRAINT name_not_empty CHECK (CHAR_LENGTH(name) > 0)
);

-- Comparisons table
CREATE TABLE IF NOT EXISTS public.comparisons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  chart1_id UUID NOT NULL REFERENCES public.saved_charts(id) ON DELETE CASCADE,
  chart2_id UUID NOT NULL REFERENCES public.saved_charts(id) ON DELETE CASCADE,
  comparison_type TEXT CHECK (comparison_type IN ('synastry', 'composite', 'davison')),
  synastry_data JSONB,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Interpretations table
CREATE TABLE IF NOT EXISTS public.interpretations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  chart_id UUID NOT NULL REFERENCES public.saved_charts(id) ON DELETE CASCADE,
  interpretation_type TEXT CHECK (interpretation_type IN ('natal', 'synastry', 'forecast', 'mundane')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Astrocartography sessions table
CREATE TABLE IF NOT EXISTS public.astrocartography_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  chart_id UUID NOT NULL REFERENCES public.saved_charts(id) ON DELETE CASCADE,
  current_location JSONB,
  astrocartography_lines JSONB,
  recommendations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better query performance
CREATE INDEX idx_saved_charts_user_id ON public.saved_charts(user_id);
CREATE INDEX idx_saved_charts_created_at ON public.saved_charts(created_at DESC);
CREATE INDEX idx_comparisons_user_id ON public.comparisons(user_id);
CREATE INDEX idx_interpretations_user_id ON public.interpretations(user_id);
CREATE INDEX idx_interpretations_chart_id ON public.interpretations(chart_id);
CREATE INDEX idx_astrocartography_user_id ON public.astrocartography_sessions(user_id);

-- Create RLS (Row Level Security) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interpretations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.astrocartography_sessions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Saved Charts policies
CREATE POLICY "Users can view their own saved charts"
  ON public.saved_charts FOR SELECT
  USING (user_id = auth.uid() OR is_public = TRUE);

CREATE POLICY "Users can insert their own charts"
  ON public.saved_charts FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own charts"
  ON public.saved_charts FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own charts"
  ON public.saved_charts FOR DELETE
  USING (user_id = auth.uid());

-- Comparisons policies
CREATE POLICY "Users can view their own comparisons"
  ON public.comparisons FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own comparisons"
  ON public.comparisons FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own comparisons"
  ON public.comparisons FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own comparisons"
  ON public.comparisons FOR DELETE
  USING (user_id = auth.uid());

-- Interpretations policies
CREATE POLICY "Users can view their own interpretations"
  ON public.interpretations FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert interpretations"
  ON public.interpretations FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own interpretations"
  ON public.interpretations FOR DELETE
  USING (user_id = auth.uid());

-- Astrocartography sessions policies
CREATE POLICY "Users can view their own sessions"
  ON public.astrocartography_sessions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert astrocartography sessions"
  ON public.astrocartography_sessions FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own sessions"
  ON public.astrocartography_sessions FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own sessions"
  ON public.astrocartography_sessions FOR DELETE
  USING (user_id = auth.uid());
