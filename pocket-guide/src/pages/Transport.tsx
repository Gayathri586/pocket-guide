import { useMemo, useState } from 'react';

const transportModes = [
  { key: 'flight', label: 'Flights' },
  { key: 'train', label: 'Train' },
  { key: 'bus', label: 'Bus' },
  { key: 'car', label: 'Car' },
  { key: 'cab', label: 'Cabs' },
  { key: 'auto', label: 'Auto' },
  { key: 'bike', label: 'Bike' },
] as const;

type ModeKey = typeof transportModes[number]['key'];

type Suggestion = {
  mode: ModeKey;
  provider: string;
  price: number;
  etaHours: number;
};

function suggestTransport(origin: string, dest: string): Suggestion[] {
  const distanceFactor = Math.min(1, Math.max(0.2, (origin.length + dest.length) / 40));
  const basePrices: Record<ModeKey, number> = {
    flight: 5000,
    train: 800,
    bus: 600,
    car: 1200,
    cab: 900,
    auto: 300,
    bike: 150,
  };
  const providers: Record<ModeKey, string[]> = {
    flight: ['IndiGo', 'Air India', 'Vistara'],
    train: ['IRCTC - Shatabdi', 'IRCTC - Rajdhani', 'IRCTC'],
    bus: ['RedBus', 'State Transport'],
    car: ['Self-drive', 'Rental'],
    cab: ['Ola', 'Uber'],
    auto: ['Local Auto'],
    bike: ['Bike Rental'],
  };
  const modes: ModeKey[] = ['flight', 'train', 'bus', 'cab', 'car', 'auto', 'bike'];
  return modes.map((m) => ({
    mode: m,
    provider: providers[m][Math.floor(Math.random() * providers[m].length)],
    price: Math.round(basePrices[m] * (0.8 + Math.random() * 0.8) * distanceFactor),
    etaHours: Math.max(1, Math.round((8 * distanceFactor) / (m === 'flight' ? 2 : m === 'train' ? 1.2 : 0.8))),
  }));
}

export default function Transport() {
  const [origin, setOrigin] = useState('');
  const [dest, setDest] = useState('');

  const suggestions = useMemo(() => (origin && dest ? suggestTransport(origin, dest) : []), [origin, dest]);

  return (
    <div className="transport">
      <h2>Plan your trip</h2>
      <div className="loc-grid">
        <label>
          <span>Present Location</span>
          <input value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="e.g., Bengaluru" />
        </label>
        <label>
          <span>Destined Location</span>
          <input value={dest} onChange={(e) => setDest(e.target.value)} placeholder="e.g., Jaipur" />
        </label>
      </div>

      {suggestions.length > 0 && (
        <div className="cards">
          {suggestions.map((s) => (
            <div key={s.mode} className="card">
              <h4>{s.mode.toUpperCase()}</h4>
              <p>Provider: {s.provider}</p>
              <p>AI price: ₹{s.price}</p>
              <p>ETA: ~{s.etaHours}h</p>
              <button className="secondary">View Options</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}