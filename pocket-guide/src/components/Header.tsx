import { Link } from 'react-router-dom';
import { useAppStore } from '../store/userStore';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
  const user = useAppStore((s) => s.user);
  return (
    <header className="app-header">
      <Link to="/home" className="brand">POCKET GUIDE</Link>
      <div className="spacer" />
      <Link to="/account" className="user-pill" title={user?.username || 'Guest'}>
        <FaUserCircle size={22} />
        <span className="username-text">{user?.username ?? 'Guest'}</span>
      </Link>
    </header>
  );
}