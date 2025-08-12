import { useNavigate } from 'react-router-dom';

export default function Intro() {
  const navigate = useNavigate();
  return (
    <div className="intro">
      <h1>Welcome to POCKET GUIDE</h1>
      <p>
        Your AI-powered companion for exploring India: discover historical places, transport options, accommodations, food,
        and essential services nearby with live maps and smart suggestions. Plan, navigate, and enjoy your journey — all in
        one app.
      </p>
      <button className="primary" onClick={() => navigate('/auth')}>
        NEXT
      </button>
    </div>
  );
}