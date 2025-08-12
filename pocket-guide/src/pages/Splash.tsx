import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate('/intro'), 2500);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="splash">
      <div className="logo-anim">POCKET GUIDE</div>
      <div className="made-in-india">MADE IN INDIA</div>
    </div>
  );
}