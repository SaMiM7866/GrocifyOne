import { Leaf, LogOut, Menu, ShoppingBag, User, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Shop' },
  { to: '/orders', label: 'Orders' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-stone-50/85 backdrop-blur-xl">
      <div className="container-app flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-black tracking-tight text-stone-900">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-green-600 text-white shadow-lg shadow-green-600/25"><Leaf /></span>
          Groc<span className="text-green-600">ify</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `font-medium transition hover:text-green-600 ${isActive ? 'text-green-600' : 'text-stone-600'}`}>{link.label}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <button onClick={logout} title="Logout" className="hidden rounded-full p-3 text-stone-600 transition hover:bg-white hover:text-red-500 sm:block"><LogOut size={20} /></button>
          ) : (
            <Link to="/login" className="hidden rounded-full p-3 text-stone-600 transition hover:bg-white hover:text-green-600 sm:block"><User size={20} /></Link>
          )}
          <Link to="/cart" className="relative rounded-full bg-white p-3 text-stone-700 shadow-sm transition hover:-translate-y-0.5 hover:text-green-600">
            <ShoppingBag size={21} />
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-[11px] font-bold text-white">{count}</span>}
          </Link>
          <button onClick={() => setOpen(!open)} className="rounded-full p-3 md:hidden">{open ? <X /> : <Menu />}</button>
        </div>
      </div>

      {open && (
        <div className="container-app animate-fade-up pb-5 md:hidden">
          <div className="card flex flex-col gap-1 p-3">
            {links.map((link) => <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-medium text-stone-700 hover:bg-green-50 hover:text-green-700">{link.label}</NavLink>)}
            <NavLink to="/login" onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-medium text-stone-700 hover:bg-green-50 hover:text-green-700">{user ? user.name : 'Login'}</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
