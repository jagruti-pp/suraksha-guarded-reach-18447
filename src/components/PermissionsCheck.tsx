import { useEffect, useState } from 'react';
import { Shield, MapPin, Video, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePermissions } from '@/hooks/usePermissions';

const PermissionsCheck = () => {
  const [showCard, setShowCard] = useState(false);
  const { permissions, loading, requestCameraPermission, requestLocationPermission } = usePermissions();

  useEffect(() => {
    // Show permissions card on first load if any permission is missing
    if (!loading && (!permissions.camera || !permissions.location)) {
      setShowCard(true);
    }
  }, [loading, permissions]);

  if (loading || !showCard) return null;

  const allGranted = permissions.camera && permissions.location;

  if (allGranted) {
    return (
      <Card className="glass p-4 mb-6 border-green-500/50">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-green-500" />
          <div className="flex-1">
            <h3 className="font-semibold text-green-500">All Permissions Granted</h3>
            <p className="text-sm text-muted-foreground">Your safety features are ready!</p>
          </div>
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass p-6 mb-6 space-y-4 border-orange-500/50">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-orange-500" />
        <div>
          <h3 className="font-semibold text-orange-500">Permissions Needed</h3>
          <p className="text-sm text-muted-foreground">Enable permissions for full safety features</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Location Permission */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-sm">Location Access</p>
              <p className="text-xs text-muted-foreground">Share location with contacts</p>
            </div>
          </div>
          {permissions.location ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Button size="sm" variant="outline" onClick={requestLocationPermission}>
              Enable
            </Button>
          )}
        </div>

        {/* Camera Permission */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
          <div className="flex items-center gap-3">
            <Video className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-sm">Camera Access</p>
              <p className="text-xs text-muted-foreground">Record emergency videos</p>
            </div>
          </div>
          {permissions.camera ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Button size="sm" variant="outline" onClick={requestCameraPermission}>
              Enable
            </Button>
          )}
        </div>
      </div>

      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setShowCard(false)}
        className="w-full"
      >
        I'll do this later
      </Button>
    </Card>
  );
};

export default PermissionsCheck;
