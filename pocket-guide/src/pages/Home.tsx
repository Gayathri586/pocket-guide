import { useNavigate } from 'react-router-dom';
import Carousel, { Slide } from '../components/Carousel';
import MapView from '../components/MapView';

export default function Home() {
  const navigate = useNavigate();

  const slides: Slide[] = [
    {
      id: 'hist',
      title: 'Historical India',
      description: 'Explore iconic temples and monuments',
      imageUrl: 'https://images.unsplash.com/photo-1534260168198-d5f0bbebf075?q=80&w=1200&auto=format&fit=crop',
      onClick: () => navigate('/places'),
    },
    {
      id: 'transport',
      title: 'Transport',
      description: 'Find the best way to travel with costs',
      imageUrl: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?q=80&w=1200&auto=format&fit=crop',
      onClick: () => navigate('/transport'),
    },
    {
      id: 'stay',
      title: 'Accommodation',
      description: 'Hotels and stays, luxury to budget',
      imageUrl: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1200&auto=format&fit=crop',
      onClick: () => navigate('/accommodation'),
    },
    {
      id: 'food',
      title: 'Food',
      description: 'Taste the best local dishes',
      imageUrl: 'https://images.unsplash.com/photo-1533777324565-a040eb52fac1?q=80&w=1200&auto=format&fit=crop',
      onClick: () => navigate('/food'),
    },
    {
      id: 'services',
      title: 'Essential Services',
      description: 'Hospitals, police, ATMs, help centres',
      imageUrl: 'https://images.unsplash.com/photo-1576765974102-b7560261bb59?q=80&w=1200&auto=format&fit=crop',
      onClick: () => navigate('/help'),
    },
  ];

  return (
    <div className="home">
      <section className="hero">
        <h1>POCKET GUIDE</h1>
        <p>Your Indian tour companion</p>
      </section>

      <Carousel slides={slides} />

      <section className="map-section">
        <h3>Live Location</h3>
        <MapView height={280} />
      </section>
    </div>
  );
}