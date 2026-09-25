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
    api('/products?featured=true')
      .then((data) => setProducts(data?.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-green-300/30 blur-3xl animate-pulse-soft" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl animate-pulse-soft" />

        <div className="container-app relative grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
              <Sparkles size={16} /> Freshness delivered daily
            </div>

            <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[1.05] tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">
              Good food starts with <span className="text-green-600">fresh choices.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
              Shop farm-fresh fruits, vegetables and daily essentials with fast doorstep delivery.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary">
                Shop now <ArrowRight size={19} />
              </Link>
              <a href="#featured" className="btn-secondary">
                Explore offers
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="block text-2xl text-stone-900">30 min</strong>
                <span className="text-stone-500">Fast delivery</span>
              </div>
              <div>
                <strong className="block text-2xl text-stone-900">100+</strong>
                <span className="text-stone-500">Fresh items</span>
              </div>
              <div>
                <strong className="block text-2xl text-stone-900">4.9/5</strong>
                <span className="text-stone-500">Customer rating</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg animate-float">
            <div className="absolute inset-8 rounded-full bg-green-300/40 blur-3xl" />
            <div className="relative card overflow-hidden p-5">
              <img
                className="h-[430px] w-full rounded-[2rem] object-cover"
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85"
                alt="Fresh grocery market"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="featured" className="container-app py-16">
        <h2 className="text-3xl font-black">Fresh products for today</h2>

        {loading ? (
          <LoadingGrid />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(products || [])
              .slice(0, 8)
              .map((product, index) => (
                <ProductCard
                  key={product?.id || index}
                  product={product}
                  index={index}
                />
              ))}
          </div>
        )}
      </section>
    </>
  );
}
