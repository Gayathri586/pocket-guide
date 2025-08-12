import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Splash from './pages/Splash';
import Intro from './pages/Intro';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Transport from './pages/Transport';
import Accommodation from './pages/Accommodation';
import Food from './pages/Food';
import Places from './pages/Places';
import HelpCentre from './pages/HelpCentre';
import Exit from './pages/Exit';
import Account from './pages/Account';
import TourGuide from './pages/TourGuide';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Splash /> },
      { path: 'intro', element: <Intro /> },
      { path: 'auth', element: <Auth /> },
      { path: 'home', element: <Home /> },
      { path: 'tour', element: <TourGuide /> },
      { path: 'transport', element: <Transport /> },
      { path: 'accommodation', element: <Accommodation /> },
      { path: 'food', element: <Food /> },
      { path: 'places', element: <Places /> },
      { path: 'help', element: <HelpCentre /> },
      { path: 'exit', element: <Exit /> },
      { path: 'account', element: <Account /> },
      { path: 'terms', element: <Terms /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);