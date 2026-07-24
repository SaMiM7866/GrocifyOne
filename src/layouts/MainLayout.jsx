import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout() {
  return <div className="min-h-screen overflow-x-hidden text-stone-800"><Navbar /><main><Outlet /></main><Footer /></div>;
}
