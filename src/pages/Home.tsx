import { MapPin, Phone, Video, Mic } from "lucide-react";
import SOSButton from "@/components/SOSButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="min-h-screen pb-24 pt-8 px-4">
      <div className="max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">Suraksha Kavach</h1>
          <p className="text-muted-foreground">You are safe with us</p>
        </div>

        {/* Status Card */}
        <Card className="glass p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-medium">All Systems Active</span>
            </div>
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            GPS tracking enabled • 5 emergency contacts ready
          </p>
        </Card>

        {/* SOS Button */}
        <div className="flex justify-center py-8">
          <SOSButton />
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="glass h-24 flex-col gap-2 hover:scale-105 transition-transform"
            >
              <Phone className="w-6 h-6 text-primary" />
              <span className="text-sm">Fake Call</span>
            </Button>
            
            <Button
              variant="outline"
              className="glass h-24 flex-col gap-2 hover:scale-105 transition-transform"
            >
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-sm">Share Location</span>
            </Button>
            
            <Button
              variant="outline"
              className="glass h-24 flex-col gap-2 hover:scale-105 transition-transform"
            >
              <Video className="w-6 h-6 text-primary" />
              <span className="text-sm">Record Video</span>
            </Button>
            
            <Button
              variant="outline"
              className="glass h-24 flex-col gap-2 hover:scale-105 transition-transform"
            >
              <Mic className="w-6 h-6 text-primary" />
              <span className="text-sm">Voice Alert</span>
            </Button>
          </div>
        </div>

        {/* Safety Tips */}
        <Card className="glass p-6 space-y-3">
          <h3 className="font-semibold text-primary">Safety Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Keep your emergency contacts updated</li>
            <li>• Enable location services for accurate tracking</li>
            <li>• Test fake call feature regularly</li>
            <li>• Stay aware of your surroundings</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Home;
