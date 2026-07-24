import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import LoadingGrid from '../components/LoadingGrid';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => { api('/products').then((data) => setProducts(data.products)).finally(() => setLoading(false)); }, []);
  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const filtered = useMemo(() => products.filter((p) => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase())), [products, category, query]);

  return <section className="container-app py-14">
    <div className="max-w-2xl"><p className="font-bold uppercase tracking-[.2em] text-green-600">Grocery store</p><h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Shop fresh, shop smart.</h1><p className="mt-4 text-stone-500">Search daily essentials and add them to your cart instantly.</p></div>
    <div className="mt-10 flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <label className="relative block w-full max-w-xl"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20}/><input value={query} onChange={(e)=>setQuery(e.target.value)} className="input pl-12" placeholder="Search products..." /></label>
      <div className="flex gap-2 overflow-x-auto pb-1">{categories.map((item)=><button key={item} onClick={()=>setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${category===item?'bg-green-600 text-white':'bg-stone-100 text-stone-600 hover:bg-green-50 hover:text-green-700'}`}>{item}</button>)}</div>
    </div>
    <div className="mt-8">{loading ? <LoadingGrid/> : filtered.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{filtered.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div> : <div className="card py-20 text-center"><p className="text-xl font-bold">No products found</p><p className="mt-2 text-stone-500">Try a different search or category.</p></div>}</div>
  </section>;
}
