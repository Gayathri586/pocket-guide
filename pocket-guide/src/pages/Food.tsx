import { useMemo, useState } from 'react';

const regionalFoods = [
  { region: 'Delhi', dish: 'Chole Bhature' },
  { region: 'Mumbai', dish: 'Vada Pav' },
  { region: 'Kolkata', dish: 'Kathi Roll' },
  { region: 'Hyderabad', dish: 'Biryani' },
  { region: 'Chennai', dish: 'Masala Dosa' },
  { region: 'Amritsar', dish: 'Amritsari Kulcha' },
];

const restaurants = [
  { name: 'Taste of India', menu: ['Thali', 'Paneer Tikka', 'Butter Naan'] },
  { name: 'Spice Route', menu: ['Biryani', 'Kebabs', 'Curd Rice'] },
  { name: 'Curry House', menu: ['Chaat', 'Chole', 'Gulab Jamun'] },
];

export default function Food() {
  const [region, setRegion] = useState('');
  const suggestion = useMemo(() => {
    const match = regionalFoods.find((f) => f.region.toLowerCase().includes(region.toLowerCase()));
    return match || regionalFoods[Math.floor(Math.random() * regionalFoods.length)];
  }, [region]);

  return (
    <div className="food">
      <h2>Food</h2>
      <input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Enter your region/city" />
      <div className="ai-suggestion">
        <h3>AI Suggests: {suggestion.dish} in {suggestion.region}</h3>
      </div>

      <h3>Restaurants</h3>
      <div className="cards">
        {restaurants.map((r) => (
          <div key={r.name} className="card">
            <h4>{r.name}</h4>
            <ul>
              {r.menu.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <div className="partners">SUGGESTED PARTNERS: Swiggy, Zomato</div>
          </div>
        ))}
      </div>
    </div>
  );
}