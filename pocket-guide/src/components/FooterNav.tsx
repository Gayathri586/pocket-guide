import { NavLink } from 'react-router-dom';
import { FaHome, FaRoute, FaTrain, FaHotel, FaUtensils, FaLandmark, FaHandsHelping, FaPowerOff } from 'react-icons/fa';

const links = [
  { to: '/home', icon: <FaHome />, label: 'Home' },
  { to: '/tour', icon: <FaRoute />, label: 'Tour Guide' },
  { to: '/transport', icon: <FaTrain />, label: 'Transport' },
  { to: '/accommodation', icon: <FaHotel />, label: 'Stay' },
  { to: '/food', icon: <FaUtensils />, label: 'Food' },
  { to: '/places', icon: <FaLandmark />, label: 'Places' },
  { to: '/help', icon: <FaHandsHelping />, label: 'Help' },
  { to: '/exit', icon: <FaPowerOff />, label: 'Exit' },
];

export default function FooterNav() {
  return (
    <nav className="footer-nav">
      {links.map((l) => (
        <NavLink key={l.to} to={l.to} className={({ isActive }) => `footer-btn ${isActive ? 'active' : ''}`} title={l.label}>
          {l.icon}
        </NavLink>
      ))}
    </nav>
  );
}