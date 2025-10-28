import { useEffect, useRef } from 'react';

interface ShakeDetectionOptions {
  threshold?: number;
  timeout?: number;
}

export const useShakeDetection = (
  onShake: () => void,
  options: ShakeDetectionOptions = {}
) => {
  const { threshold = 15, timeout = 500 } = options;
  const lastShakeTime = useRef<number>(0);
  const lastX = useRef<number>(0);
  const lastY = useRef<number>(0);
  const lastZ = useRef<number>(0);

  useEffect(() => {
    const handleMotion = (event: DeviceMotionEvent) => {
      const { x, y, z } = event.accelerationIncludingGravity || {};
      
      if (x === null || y === null || z === null) return;

      const currentTime = Date.now();
      
      // Calculate the change in acceleration
      const deltaX = Math.abs(x - lastX.current);
      const deltaY = Math.abs(y - lastY.current);
      const deltaZ = Math.abs(z - lastZ.current);
      
      // Check if the shake threshold is exceeded
      if (deltaX + deltaY + deltaZ > threshold) {
        // Prevent multiple triggers within the timeout period
        if (currentTime - lastShakeTime.current > timeout) {
          lastShakeTime.current = currentTime;
          onShake();
        }
      }
      
      // Update last values
      lastX.current = x;
      lastY.current = y;
      lastZ.current = z;
    };

    // Request permission for iOS 13+ devices
    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      (DeviceMotionEvent as any).requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', handleMotion);
          }
        })
        .catch(console.error);
    } else {
      // For non-iOS devices
      window.addEventListener('devicemotion', handleMotion);
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [onShake, threshold, timeout]);
};
