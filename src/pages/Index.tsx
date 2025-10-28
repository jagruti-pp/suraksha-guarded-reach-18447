import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "@/components/SplashScreen";
import BottomNav from "@/components/BottomNav";
import Home from "./Home";
import Safety from "./Safety";
import Contacts from "./Contacts";
import Profile from "./Profile";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
    </div>
  );
};

export default Index;
