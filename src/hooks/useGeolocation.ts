import { useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { toast } from 'sonner';

interface GeolocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check permission first
      const permissionStatus = await Geolocation.checkPermissions();
      
      if (permissionStatus.location !== 'granted' && permissionStatus.coarseLocation !== 'granted') {
        // Request permission
        const requestResult = await Geolocation.requestPermissions({ permissions: ['location', 'coarseLocation'] });
        
        if (requestResult.location !== 'granted' && requestResult.coarseLocation !== 'granted') {
          toast.error('Location permission denied. Please enable location in your device settings.');
          setError('Location permission denied');
          setLoading(false);
          return;
        }
      }

      // Get current position
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });

      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      });
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to get location');
      toast.error('Failed to get location. Please check your device settings.');
      setLoading(false);
    }
  };

  const watchLocation = async (callback: (loc: GeolocationData) => void) => {
    try {
      // Check permission first
      const permissionStatus = await Geolocation.checkPermissions();
      
      if (permissionStatus.location !== 'granted' && permissionStatus.coarseLocation !== 'granted') {
        const requestResult = await Geolocation.requestPermissions({ permissions: ['location', 'coarseLocation'] });
        
        if (requestResult.location !== 'granted' && requestResult.coarseLocation !== 'granted') {
          setError('Location permission denied');
          return null;
        }
      }

      const watchId = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
        (position) => {
          if (position) {
            const loc = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              timestamp: position.timestamp,
            };
            setLocation(loc);
            callback(loc);
          }
        }
      );

      return watchId;
    } catch (err: any) {
      setError(err.message || 'Failed to watch location');
      return null;
    }
  };

  return { location, error, loading, getCurrentLocation, watchLocation };
};
