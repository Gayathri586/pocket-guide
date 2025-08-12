import { useMemo, useState } from 'react';

const sampleHotels = [
  { name: 'The Royal Palace', city: 'Jaipur', luxury: true },
  { name: 'Sea Breeze Resort', city: 'Goa', luxury: true },
  { name: 'Hill View Inn', city: 'Manali', luxury: false },
  { name: 'City Comfort Stay', city: 'Pune', luxury: false },
  { name: 'Lakeside Retreat', city: 'Udaipur', luxury: true },
];

export default function Accommodation() {
  const [city, setCity] = useState('');
  const [luxury, setLuxury] = useState<'all' | 'lux' | 'budget'>('all');

  const hotels = useMemo(() => {
    const filtered = sampleHotels.filter((h) => (!city || h.city.toLowerCase().includes(city.toLowerCase())));
    return filtered.filter((h) => (luxury === 'all' ? true : luxury === 'lux' ? h.luxury : !h.luxury));
  }, [city, luxury]);

  return (
    <div className="accommodation">
      <h2>Accommodation</h2>
      <div className="filter-row">
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your location" />
        <div className="seg">
          <button className={luxury === 'all' ? 'active' : ''} onClick={() => setLuxury('all')}>All</button>
          <button className={luxury === 'lux' ? 'active' : ''} onClick={() => setLuxury('lux')}>Luxurious</button>
          <button className={luxury === 'budget' ? 'active' : ''} onClick={() => setLuxury('budget')}>Non-Luxury</button>
        </div>
      </div>

      <div className="cards">
        {hotels.map((h) => (
          <div key={h.name} className="card">
            <h4>{h.name}</h4>
            <p>{h.city}</p>
            <p>{h.luxury ? 'Luxury' : 'Budget'}</p>
            <button className="secondary">AI Suggested</button>
          </div>
        ))}
      </div>
    </div>
  );
}