import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface LocationMapProps {
  latitude: number;
  longitude: number;
}

export const LocationMap = ({ latitude, longitude }: LocationMapProps) => {
  const [mapUrl, setMapUrl] = useState('');

  useEffect(() => {
    // Using OpenStreetMap as a free alternative to Google Maps
    // This creates a static map preview with a marker
    const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;
    setMapUrl(osmUrl);
  }, [latitude, longitude]);

  const openInMaps = () => {
    // Opens location in the device's default maps app
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Current Location
          </h3>
          <button
            onClick={openInMaps}
            className="text-sm text-primary hover:underline"
          >
            Open in Maps
          </button>
        </div>
        
        <div className="relative w-full h-64 rounded-lg overflow-hidden border">
          {mapUrl ? (
            <iframe
              title="Location Map"
              src={mapUrl}
              className="w-full h-full"
              frameBorder="0"
              scrolling="no"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <p>Latitude: {latitude.toFixed(6)}</p>
          <p>Longitude: {longitude.toFixed(6)}</p>
        </div>
      </div>
    </Card>
  );
};
