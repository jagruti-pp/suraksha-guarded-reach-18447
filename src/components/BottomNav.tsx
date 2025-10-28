import { Home, Shield, Users, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Shield, label: "Safety", path: "/safety" },
    { icon: Users, label: "Contacts", path: "/contacts" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/20 px-4 py-3 z-40">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300",
                isActive
                  ? "text-primary scale-110"
                  : "text-muted-foreground hover:text-primary hover:scale-105"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "glow-effect")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
