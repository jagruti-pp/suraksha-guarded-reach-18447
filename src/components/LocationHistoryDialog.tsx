import { MapPin, Clock, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useLocationHistory } from '@/hooks/useLocationHistory';
import { format } from 'date-fns';

interface LocationHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LocationHistoryDialog = ({ open, onOpenChange }: LocationHistoryDialogProps) => {
  const { history, loading, clearHistory } = useLocationHistory();

  const getEventBadgeColor = (eventType: string) => {
    switch (eventType) {
      case 'sos':
        return 'destructive';
      case 'auto':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const openInMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Location History
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {history.length > 0 && (
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {history.length} location{history.length !== 1 ? 's' : ''} tracked
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={clearHistory}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          )}

          <ScrollArea className="h-[400px] pr-4">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            ) : history.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 gap-2">
                <MapPin className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No location history yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={getEventBadgeColor(item.event_type)}>
                            {item.event_type.toUpperCase()}
                          </Badge>
                          {item.notes && (
                            <span className="text-xs text-muted-foreground">
                              {item.notes}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(item.created_at), 'PPpp')}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openInMaps(item.latitude, item.longitude)}
                      >
                        <MapPin className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>

                    <div className="text-xs space-y-1 text-muted-foreground">
                      <p>Lat: {item.latitude.toFixed(6)}</p>
                      <p>Lng: {item.longitude.toFixed(6)}</p>
                      {item.accuracy && (
                        <p>Accuracy: {item.accuracy.toFixed(0)}m</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
