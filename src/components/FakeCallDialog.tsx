import { useState, useEffect, useRef } from "react";
import { Phone, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FakeCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FakeCallDialog = ({ open, onOpenChange }: FakeCallDialogProps) => {
  const [isRinging, setIsRinging] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (open) {
      setIsRinging(true);
      // Create ringtone using Web Audio API
      if (!audioRef.current) {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 440;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.3;
        
        oscillator.start();
        
        // Store for cleanup
        (audioRef.current as any) = { oscillator, audioContext };
      }
    } else {
      // Cleanup audio
      if (audioRef.current) {
        const { oscillator, audioContext } = audioRef.current as any;
        if (oscillator) oscillator.stop();
        if (audioContext) audioContext.close();
        audioRef.current = null;
      }
    }

    return () => {
      if (audioRef.current) {
        const { oscillator, audioContext } = audioRef.current as any;
        if (oscillator) oscillator.stop();
        if (audioContext) audioContext.close();
      }
    };
  }, [open]);

  const handleAnswer = () => {
    setIsRinging(false);
    if (audioRef.current) {
      const { oscillator, audioContext } = audioRef.current as any;
      if (oscillator) oscillator.stop();
      if (audioContext) audioContext.close();
      audioRef.current = null;
    }
  };

  const handleDecline = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-primary/10 to-background border-2 border-primary/20">
        <div className="flex flex-col items-center gap-6 py-8">
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
            <Phone className="w-12 h-12 text-primary" />
          </div>
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Emergency Contact</h2>
            <p className="text-muted-foreground">
              {isRinging ? "Incoming call..." : "Connected"}
            </p>
          </div>

          {isRinging ? (
            <div className="flex gap-4 mt-4">
              <Button
                onClick={handleDecline}
                size="lg"
                variant="destructive"
                className="rounded-full w-16 h-16 p-0"
              >
                <X className="w-8 h-8" />
              </Button>
              <Button
                onClick={handleAnswer}
                size="lg"
                className="rounded-full w-16 h-16 p-0 bg-green-500 hover:bg-green-600"
              >
                <Phone className="w-8 h-8" />
              </Button>
            </div>
          ) : (
            <div className="space-y-4 w-full">
              <p className="text-center text-sm text-muted-foreground">
                Call in progress... Stay safe!
              </p>
              <Button
                onClick={handleDecline}
                variant="destructive"
                className="w-full"
              >
                End Call
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FakeCallDialog;
