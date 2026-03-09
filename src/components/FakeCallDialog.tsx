import { useState, useEffect, useRef } from "react";
import { Phone, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FakeCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const callerResponses = [
  "Hey! Where are you right now? I've been trying to reach you.",
  "I'm almost there, just stay on the line with me okay?",
  "Don't worry, I'm coming to pick you up. Stay where you are.",
  "I can see your location, I'll be there in 5 minutes.",
  "Are you okay? Just keep talking to me, I'm on my way.",
  "I just left the house, stay calm and don't hang up.",
  "I told everyone you're with me tonight, just act natural.",
  "The car is parked nearby, start walking towards the main road.",
];

const FakeCallDialog = ({ open, onOpenChange }: FakeCallDialogProps) => {
  const [isRinging, setIsRinging] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [currentResponse, setCurrentResponse] = useState(0);
  const audioRef = useRef<any>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const speechRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (open) {
      setIsRinging(true);
      setCallDuration(0);
      setCurrentResponse(0);

      // Create ringtone
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = 440;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.3;

      // Create ring pattern
      const ringPattern = () => {
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.4);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + 0.6);
        gainNode.gain.setValueAtTime(0, audioContext.currentTime + 1.0);
      };

      oscillator.start();
      ringPattern();
      const ringInterval = setInterval(ringPattern, 2000);

      audioRef.current = { oscillator, audioContext, ringInterval };
    } else {
      cleanupAudio();
      cleanupTimers();
    }

    return () => {
      cleanupAudio();
      cleanupTimers();
    };
  }, [open]);

  const cleanupAudio = () => {
    if (audioRef.current) {
      const { oscillator, audioContext, ringInterval } = audioRef.current;
      if (ringInterval) clearInterval(ringInterval);
      try { oscillator?.stop(); } catch {}
      try { audioContext?.close(); } catch {}
      audioRef.current = null;
    }
  };

  const cleanupTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (speechRef.current) clearInterval(speechRef.current);
    timerRef.current = null;
    speechRef.current = null;
    window.speechSynthesis?.cancel();
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.2;
      utterance.volume = 0.8;
      // Try to pick a female voice
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v =>
        v.name.toLowerCase().includes('female') ||
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('victoria') ||
        v.name.toLowerCase().includes('zira') ||
        v.name.toLowerCase().includes('google') && v.lang.startsWith('en')
      );
      if (femaleVoice) utterance.voice = femaleVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAnswer = () => {
    setIsRinging(false);
    cleanupAudio();

    // Start call timer
    timerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // First response immediately
    setTimeout(() => {
      speakResponse(callerResponses[0]);
    }, 1000);

    // Subsequent responses every 8 seconds
    let responseIndex = 1;
    speechRef.current = setInterval(() => {
      if (responseIndex < callerResponses.length) {
        speakResponse(callerResponses[responseIndex]);
        setCurrentResponse(responseIndex);
        responseIndex++;
      } else {
        responseIndex = 0; // Loop
      }
    }, 8000);
  };

  const handleDecline = () => {
    cleanupTimers();
    onOpenChange(false);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) handleDecline(); else onOpenChange(val); }}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-primary/10 to-background border-2 border-primary/20">
        <div className="flex flex-col items-center gap-6 py-8">
          <div className={`w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center ${isRinging ? 'animate-pulse' : ''}`}>
            <Phone className="w-12 h-12 text-primary" />
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Mom</h2>
            <p className="text-muted-foreground">
              {isRinging ? "Incoming call..." : formatDuration(callDuration)}
            </p>
          </div>

          {!isRinging && (
            <div className="bg-muted/50 rounded-lg p-3 w-full text-center">
              <p className="text-sm text-muted-foreground italic">
                "{callerResponses[currentResponse]}"
              </p>
            </div>
          )}

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
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-sm text-muted-foreground">Call in progress... Stay safe!</p>
              </div>
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
