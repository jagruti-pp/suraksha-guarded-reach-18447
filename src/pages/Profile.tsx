import { User, Bell, Shield, HelpCircle, LogOut, Phone, Moon, Sun } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { signOut, user } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    toast.success(`${newTheme === "dark" ? "Dark" : "Light"} mode enabled`);
  };

  return (
    <div className="min-h-screen pb-24 pt-8 px-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="glass p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-4 border-primary/20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                SK
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {user?.user_metadata?.name || "User Name"}
              </h2>
              <p className="text-muted-foreground">{user?.email || "user@example.com"}</p>
              <Button variant="link" className="px-0 h-auto mt-1 text-primary">
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>

        {/* Settings */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold px-2">Settings</h3>
          
          <Card className="glass p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === "dark" ? (
                  <Moon className="w-5 h-5 text-primary" />
                ) : (
                  <Sun className="w-5 h-5 text-primary" />
                )}
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">
                    Toggle dark theme
                  </p>
                </div>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Get emergency alerts
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Background Protection</p>
                  <p className="text-xs text-muted-foreground">
                    Keep app running in background
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
        </div>

        {/* Quick Access */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold px-2">Quick Access</h3>
          
          <Card className="glass divide-y divide-border/50">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-auto py-4 px-4 rounded-none"
              onClick={() => toast.info("Fake Call settings opened")}
            >
              <Phone className="w-5 h-5 text-primary" />
              <div className="text-left flex-1">
                <p className="font-medium">Fake Call Settings</p>
                <p className="text-xs text-muted-foreground">
                  Customize caller name & ringtone
                </p>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-auto py-4 px-4 rounded-none"
              onClick={() => toast.info("Help center opened")}
            >
              <HelpCircle className="w-5 h-5 text-primary" />
              <div className="text-left flex-1">
                <p className="font-medium">Help & Support</p>
                <p className="text-xs text-muted-foreground">
                  FAQs and contact support
                </p>
              </div>
            </Button>
          </Card>
        </div>

        {/* Account Actions */}
        <Card className="glass p-6 space-y-4">
          <h3 className="font-semibold">Account</h3>
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={signOut}
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </Button>
        </Card>

        {/* App Info */}
        <div className="text-center space-y-2 pt-4">
          <p className="text-sm text-muted-foreground">
            Suraksha Kavach v1.0.0
          </p>
          <p className="text-xs text-muted-foreground">
            Your trusted safety companion
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
