import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface LocationHistoryItem {
  id: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  event_type: 'sos' | 'manual' | 'auto';
  notes?: string;
  created_at: string;
}

export const useLocationHistory = () => {
  const [history, setHistory] = useState<LocationHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchHistory = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('location_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setHistory((data || []) as LocationHistoryItem[]);
    } catch (error: any) {
      console.error('Error fetching location history:', error);
      toast.error('Failed to load location history');
    } finally {
      setLoading(false);
    }
  };

  const saveLocation = async (
    latitude: number,
    longitude: number,
    accuracy?: number,
    eventType: 'sos' | 'manual' | 'auto' = 'manual',
    notes?: string
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('location_history')
        .insert({
          user_id: user.id,
          latitude,
          longitude,
          accuracy,
          event_type: eventType,
          notes,
        });

      if (error) throw error;
      await fetchHistory();
      toast.success('Location saved to history');
    } catch (error: any) {
      console.error('Error saving location:', error);
      toast.error('Failed to save location');
    }
  };

  const clearHistory = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('location_history')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      setHistory([]);
      toast.success('Location history cleared');
    } catch (error: any) {
      console.error('Error clearing history:', error);
      toast.error('Failed to clear history');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  return {
    history,
    loading,
    fetchHistory,
    saveLocation,
    clearHistory,
  };
};
