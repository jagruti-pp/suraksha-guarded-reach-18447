import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SOSButton = () => {
  const [isActivating, setIsActivating] = useState(false);

  const handleSOS = () => {
    setIsActivating(true);
    toast.error("🚨 SOS ACTIVATED! Emergency alerts being sent...", {
      duration: 5000,
    });

    // Simulate activation
    setTimeout(() => {
      setIsActivating(false);
      toast.success("Emergency contacts notified. Location sharing started.", {
        duration: 4000,
      });
    }, 2000);
  };

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
