import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6ca40678a9904e219a39170342330225',
  appName: 'suraksha-guarded-reach-18447',
  webDir: 'dist',
  server: {
    url: 'https://6ca40678-a990-4e21-9a39-170342330225.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ["camera"]
    },
    Geolocation: {
      permissions: ["location"]
    }
  }
};

export default config;
