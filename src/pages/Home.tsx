import { MapPin, Phone, Video, Mic } from "lucide-react";
import { useState } from "react";
import SOSButton from "@/components/SOSButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FakeCallDialog from "@/components/FakeCallDialog";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { useContacts } from "@/hooks/useContacts";
import { playVoiceAlert, playAlarmSound } from "@/utils/audioUtils";
import { toast } from "sonner";

const Home = () => {
  const [fakeCallOpen, setFakeCallOpen] = useState(false);
  const { getCurrentLocation, location, loading } = useGeolocation();
  const { isRecording, startRecording, stopRecording, downloadRecording, recordedBlob } = useMediaRecorder();
  const { contacts, notifyContacts } = useContacts();

  const handleFakeCall = () => {
    setFakeCallOpen(true);
    toast.info("Incoming fake call...");
  };

  const handleShareLocation = () => {
    toast.loading("Getting your location...");
    getCurrentLocation();
    
    setTimeout(() => {
      if (location) {
        const mapsUrl = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;
        
        if (contacts.length > 0) {
          // Send to emergency contacts
          notifyContacts(
            `📍 Location Share from Suraksha Kavach\nI'm sharing my current location with you.`,
            location
          );
          toast.success(`Location shared with ${contacts.length} contacts!`);
        } else {
          // Fallback to general sharing
          const shareText = `📍 Location Share\nLat: ${location.latitude.toFixed(6)}\nLon: ${location.longitude.toFixed(6)}\nMap: ${mapsUrl}`;
          
          if (navigator.share) {
            navigator.share({
              title: 'My Location',
              text: shareText,
              url: mapsUrl,
            }).then(() => {
              toast.success("Location shared successfully!");
            }).catch(() => {
              navigator.clipboard.writeText(shareText);
              toast.success("Location copied to clipboard!");
            });
          } else {
            navigator.clipboard.writeText(shareText);
            toast.success("Location copied to clipboard!");
          }
        }
      } else {
        toast.error("Unable to get location. Please enable location services.");
      }
    }, 1000);
  };

  const handleRecordVideo = () => {
    if (isRecording) {
      stopRecording();
      setTimeout(() => {
        if (recordedBlob) {
          downloadRecording();
        }
      }, 500);
    } else {
      startRecording();
    }
  };

  const handleVoiceAlert = () => {
    playAlarmSound();
    playVoiceAlert("Alert! Emergency situation! Help required immediately!");
    toast.warning("Voice alert activated! Loud alarm playing...");
  };

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
            GPS tracking enabled • {contacts.length} emergency contacts ready
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
              onClick={handleFakeCall}
            >
              <Phone className="w-6 h-6 text-primary" />
              <span className="text-sm">Fake Call</span>
            </Button>
            
            <Button
              variant="outline"
              className="glass h-24 flex-col gap-2 hover:scale-105 transition-transform"
              onClick={handleShareLocation}
              disabled={loading}
            >
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-sm">{loading ? 'Getting...' : 'Share Location'}</span>
            </Button>
            
            <Button
              variant="outline"
              className="glass h-24 flex-col gap-2 hover:scale-105 transition-transform"
              onClick={handleRecordVideo}
            >
              <Video className={`w-6 h-6 ${isRecording ? 'text-red-500 animate-pulse' : 'text-primary'}`} />
              <span className="text-sm">{isRecording ? 'Stop Recording' : 'Record Video'}</span>
            </Button>
            
            <Button
              variant="outline"
              className="glass h-24 flex-col gap-2 hover:scale-105 transition-transform"
              onClick={handleVoiceAlert}
            >
              <Mic className="w-6 h-6 text-primary" />
              <span className="text-sm">Voice Alert</span>
            </Button>
          </div>
        </div>

        <FakeCallDialog open={fakeCallOpen} onOpenChange={setFakeCallOpen} />

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
