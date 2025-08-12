import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import FooterNav from './components/FooterNav';

export default function App() {
  const location = useLocation();
  const hideChrome = location.pathname === '/' || location.pathname === '/intro' || location.pathname === '/auth';

  return (
    <div className="app-root">
      {!hideChrome && <Header />}
      <main className="app-main india-watermark">
        <Outlet />
      </main>
      {!hideChrome && <FooterNav />}
    </div>
  );
}