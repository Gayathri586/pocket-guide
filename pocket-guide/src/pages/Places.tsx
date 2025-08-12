import MapView from '../components/MapView';

const categories = [
  { key: 'temple', label: 'Temples', emoji: '🛕' },
  { key: 'monument', label: 'Monuments', emoji: '🏛️' },
  { key: 'museum', label: 'Museums', emoji: '🏺' },
  { key: 'beach', label: 'Beaches', emoji: '🏖️' },
  { key: 'mall', label: 'Malls', emoji: '🛍️' },
  { key: 'park', label: 'Parks', emoji: '🌳' },
];

function randomNearby(): Array<{ position: [number, number]; label: string }> {
  const baseLat = 28.6139;
  const baseLng = 77.209;
  return Array.from({ length: 6 }).map((_, i) => ({
    position: [baseLat + (Math.random() - 0.5) * 0.2, baseLng + (Math.random() - 0.5) * 0.2] as [number, number],
    label: `${categories[i].label} Spot`,
  }));
}

export default function Places() {
  return (
    <div className="places">
      <h2>Best Places to Visit</h2>
      <div className="cat-grid">
        {categories.map((c) => (
          <div key={c.key} className="cat-card" title={c.label}>
            <div className="cat-logo">{c.emoji}</div>
            <div className="cat-text">{c.label}</div>
          </div>
        ))}
      </div>
      <div className="map-section">
        <h3>Nearby AI Suggested Best Places</h3>
        <MapView height={300} markers={randomNearby()} />
      </div>
    </div>
  );
}