import { Shield, MapPin, Video, Volume2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { LocationMap } from "@/components/LocationMap";
import { LocationHistoryDialog } from "@/components/LocationHistoryDialog";

const Safety = () => {
  const [historyOpen, setHistoryOpen] = useState(false);
  const { location, getCurrentLocation } = useGeolocation();

  const handleToggle = (feature: string, enabled: boolean) => {
    toast.success(`${feature} ${enabled ? "enabled" : "disabled"}`);
  };

  return (
    <div className="min-h-screen pb-24 pt-8 px-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10">
              <Shield className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary">Safety Mode</h1>
          <p className="text-muted-foreground">Configure your safety settings</p>
        </div>

        {/* Active Safety Features */}
        <Card className="glass p-6 space-y-6">
          <h3 className="font-semibold text-lg">Active Features</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Live Location</p>
                  <p className="text-xs text-muted-foreground">Share for 30 min after SOS</p>
                </div>
              </div>
              <Switch
                defaultChecked
                onCheckedChange={(checked) => handleToggle("Live Location", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Auto Record</p>
                  <p className="text-xs text-muted-foreground">10s video on SOS trigger</p>
                </div>
              </div>
              <Switch
                defaultChecked
                onCheckedChange={(checked) => handleToggle("Auto Record", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Voice Command</p>
                  <p className="text-xs text-muted-foreground">"Help me" triggers SOS</p>
                </div>
              </div>
              <Switch
                defaultChecked
                onCheckedChange={(checked) => handleToggle("Voice Command", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Shake Detection</p>
                  <p className="text-xs text-muted-foreground">Shake to activate SOS</p>
                </div>
              </div>
              <Switch
                defaultChecked
                onCheckedChange={(checked) => handleToggle("Shake Detection", checked)}
              />
            </div>
          </div>
        </Card>

        {/* Location Tracking */}
        <Card className="glass p-6 space-y-4">
          <h3 className="font-semibold">Current Location</h3>
          {location ? (
            <LocationMap latitude={location.latitude} longitude={location.longitude} />
          ) : (
            <div className="aspect-video bg-muted/30 rounded-lg flex flex-col items-center justify-center gap-3">
              <MapPin className="w-12 h-12 text-muted-foreground" />
              <Button onClick={getCurrentLocation} variant="outline">
                Get Current Location
              </Button>
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            Your location will be shared with emergency contacts when SOS is activated
          </p>
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => setHistoryOpen(true)}
          >
            View Tracking History
          </Button>
        </Card>

        <LocationHistoryDialog open={historyOpen} onOpenChange={setHistoryOpen} />

        {/* Emergency Protocol */}
        <Card className="glass p-6 space-y-3">
          <h3 className="font-semibold text-primary">Emergency Protocol</h3>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>SOS button pressed or trigger activated</li>
            <li>10-second video/audio recording starts</li>
            <li>SMS sent to all emergency contacts</li>
            <li>Real-time location sharing begins (30 min)</li>
            <li>In-app notifications sent</li>
            <li>Evidence uploaded to secure cloud storage</li>
          </ol>
        </Card>

        {/* Test Safety Features */}
        <Button
          className="w-full h-14 text-lg font-semibold"
          onClick={() => toast.info("Safety features test initiated")}
        >
          Test All Safety Features
        </Button>
      </div>
    </div>
  );
};

export default Safety;
