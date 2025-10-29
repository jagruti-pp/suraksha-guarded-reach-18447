import { useState, useEffect } from 'react';
import { Camera } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { toast } from 'sonner';

interface PermissionStatus {
  camera: boolean;
  location: boolean;
}

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<PermissionStatus>({
    camera: false,
    location: false,
  });
  const [loading, setLoading] = useState(true);

  const checkPermissions = async () => {
    try {
      // Check camera permission
      const cameraStatus = await Camera.checkPermissions();
      const cameraGranted = cameraStatus.camera === 'granted' || cameraStatus.photos === 'granted';

      // Check location permission
      const locationStatus = await Geolocation.checkPermissions();
      const locationGranted = locationStatus.location === 'granted' || locationStatus.coarseLocation === 'granted';

      setPermissions({
        camera: cameraGranted,
        location: locationGranted,
      });
    } catch (error) {
      console.error('Error checking permissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      const status = await Camera.requestPermissions({ permissions: ['camera', 'photos'] });
      const granted = status.camera === 'granted' || status.photos === 'granted';
      
      setPermissions(prev => ({ ...prev, camera: granted }));
      
      if (!granted) {
        toast.error('Camera permission denied. Please enable it in your device settings to use video recording.');
      } else {
        toast.success('Camera permission granted!');
      }
      
      return granted;
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      toast.error('Failed to request camera permission');
      return false;
    }
  };

  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      const status = await Geolocation.requestPermissions({ permissions: ['location', 'coarseLocation'] });
      const granted = status.location === 'granted' || status.coarseLocation === 'granted';
      
      setPermissions(prev => ({ ...prev, location: granted }));
      
      if (!granted) {
        toast.error('Location permission denied. Please enable it in your device settings to share your location.');
      } else {
        toast.success('Location permission granted!');
      }
      
      return granted;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      toast.error('Failed to request location permission');
      return false;
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return {
    permissions,
    loading,
    checkPermissions,
    requestCameraPermission,
    requestLocationPermission,
  };
};
