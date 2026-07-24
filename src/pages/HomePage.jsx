import { ArrowRight, Clock3, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import LoadingGrid from '../components/LoadingGrid';
import { api } from '../services/api';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/products?featured=true').then((data) => setProducts(data.products)).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-green-300/30 blur-3xl animate-pulse-soft" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl animate-pulse-soft" />
        <div className="container-app relative grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-700"><Sparkles size={16} /> Freshness delivered daily</div>
            <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[1.05] tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">Good food starts with <span className="text-green-600">fresh choices.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">Shop farm-fresh fruits, vegetables and daily essentials with fast doorstep delivery.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link to="/products" className="btn-primary">Shop now <ArrowRight size={19} /></Link><a href="#featured" className="btn-secondary">Explore offers</a></div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-sm"><div><strong className="block text-2xl text-stone-900">30 min</strong><span className="text-stone-500">Fast delivery</span></div><div><strong className="block text-2xl text-stone-900">100+</strong><span className="text-stone-500">Fresh items</span></div><div><strong className="block text-2xl text-stone-900">4.9/5</strong><span className="text-stone-500">Customer rating</span></div></div>
          </div>

          <div className="relative mx-auto w-full max-w-lg animate-float">
            <div className="absolute inset-8 rounded-full bg-green-300/40 blur-3xl" />
            <div className="relative card overflow-hidden p-5">
              <img className="h-[430px] w-full rounded-[2rem] object-cover" src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85" alt="Fresh grocery market" />
              <div className="absolute bottom-9 left-9 right-9 rounded-3xl bg-white/90 p-4 backdrop-blur-xl"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-green-600">Today’s basket</p><p className="mt-1 font-black">Fresh & healthy essentials</p></div><div className="grid h-12 w-12 place-items-center rounded-2xl bg-green-600 text-white"><Truck /></div></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-app py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {[ [Truck, 'Fast delivery', 'At your door in as little as 30 minutes.'], [ShieldCheck, 'Quality checked', 'Carefully selected and packed products.'], [Clock3, 'Open every day', 'Order groceries from morning to night.'] ].map(([Icon,title,text]) => <div key={title} className="card flex items-start gap-4 p-6 transition hover:-translate-y-1"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-green-100 text-green-700"><Icon /></span><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-stone-500">{text}</p></div></div>)}
        </div>
      </section>

      <section id="featured" className="container-app py-16">
        <div className="mb-8 flex items-end justify-between gap-4"><div><p className="font-bold uppercase tracking-[.2em] text-green-600">Popular picks</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Fresh products for today</h2></div><Link to="/products" className="hidden font-bold text-green-700 sm:block">View all →</Link></div>
        {loading ? <LoadingGrid /> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.slice(0,8).map((product,index) => <ProductCard key={product.id} product={product} index={index} />)}</div>}
      </section>
    </>
  );
}
