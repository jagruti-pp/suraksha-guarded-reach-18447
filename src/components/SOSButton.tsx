import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { playEmergencySiren, playVoiceAlert } from "@/utils/audioUtils";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useContacts } from "@/hooks/useContacts";

const SOSButton = () => {
  const [isActivating, setIsActivating] = useState(false);
  const { getCurrentLocation, location } = useGeolocation();
  const { notifyContacts, contacts } = useContacts();

  const handleSOS = () => {
    setIsActivating(true);
    
    // Play emergency siren
    playEmergencySiren();
    
    // Play voice alert
    setTimeout(() => {
      playVoiceAlert("Emergency! Help needed! Location being shared!");
    }, 500);
    
    toast.error("🚨 SOS ACTIVATED! Emergency alerts being sent...", {
      duration: 5000,
    });

    // Get current location
    getCurrentLocation();
  };

  // When location is obtained, notify contacts
  useEffect(() => {
    if (isActivating && location) {
      // Notify all emergency contacts
      notifyContacts(
        `🚨 EMERGENCY ALERT from Suraksha Kavach!\nI need immediate help!`,
        location
      );
      
      setIsActivating(false);
      
      const mapsUrl = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;
      toast.success(
        `${contacts.length} emergency contacts notified! Location shared.`,
        {
          duration: 6000,
          action: {
            label: 'View Map',
            onClick: () => window.open(mapsUrl, '_blank'),
          },
        }
      );
    }
  }, [location, isActivating]);

  return (
    <div className="flex flex-col items-center gap-6">
      <Button
        onClick={handleSOS}
        disabled={isActivating}
        className={cn(
          "w-48 h-48 rounded-full bg-gradient-to-br from-emergency to-red-600",
          "text-emergency-foreground shadow-2xl border-4 border-white/30",
          "hover:scale-105 active:scale-95 transition-all duration-300",
          "font-bold text-2xl tracking-wider",
          !isActivating && "sos-pulse glow-effect"
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="w-16 h-16" />
          <span>SOS</span>
        </div>
      </Button>
      
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground font-medium">
          Press and hold for 3 seconds
        </p>
        <p className="text-xs text-muted-foreground">
          Shake device or say "Help me" to activate
        </p>
      </div>
    </div>
  );
};

export default SOSButton;

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
