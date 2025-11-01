-- Create location_history table for tracking
CREATE TABLE public.location_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  accuracy DOUBLE PRECISION,
  event_type TEXT NOT NULL DEFAULT 'manual', -- 'sos', 'manual', 'auto'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.location_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own location history" 
ON public.location_history 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own location history" 
ON public.location_history 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own location history" 
ON public.location_history 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_location_history_user_created ON public.location_history(user_id, created_at DESC);