import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

const userIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapView({ height = 260, markers = [] as Array<{ position: [number, number]; label: string }> }) {
  const [pos, setPos] = useState<[number, number] | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (p) => setPos([p.coords.latitude, p.coords.longitude]),
        () => setPos([28.6139, 77.209]),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setPos([28.6139, 77.209]);
    }
  }, []);

  const center = pos ?? ([20.5937, 78.9629] as [number, number]);

  return (
    <div style={{ height }}>
      <MapContainer center={center} zoom={pos ? 13 : 5} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pos && (
          <>
            <Marker position={pos} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>
            <Circle center={pos} radius={500} pathOptions={{ color: '#1e88e5', fillOpacity: 0.1 }} />
          </>
        )}
        {markers.map((m, i) => (
          <Marker key={i} position={m.position}>
            <Popup>{m.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}