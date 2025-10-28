import { useEffect } from "react";
import logo from "@/assets/logo_suraksha.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-primary via-accent to-secondary z-50">
      <div className="text-center space-y-6">
        <div className="logo-pulse">
          <img
            src={logo}
            alt="Suraksha Kavach"
            className="w-40 h-40 mx-auto drop-shadow-2xl"
          />
        </div>
        <div className="space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold text-white tracking-wide">
            SURAKSHA KAVACH
          </h1>
          <p className="text-white/80 text-lg">Your Safety Shield</p>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-75" />
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-150" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
