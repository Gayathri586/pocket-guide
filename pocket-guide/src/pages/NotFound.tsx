import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h2>Page not found</h2>
      <Link to="/home">Go Home</Link>
    </div>
  );
}