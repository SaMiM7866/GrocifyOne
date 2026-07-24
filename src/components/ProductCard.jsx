import { Plus, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  return (
    <article className="group card animate-fade-up overflow-hidden p-3 transition duration-300 hover:-translate-y-2" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="relative h-52 overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-green-50 to-amber-50">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-green-700 backdrop-blur">{product.category}</span>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div><h3 className="font-bold text-stone-900">{product.name}</h3><p className="mt-1 text-sm text-stone-500">{product.unit}</p></div>
          <span className="flex items-center gap-1 text-xs font-bold text-amber-500"><Star size={14} fill="currentColor" /> {product.rating}</span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div><span className="text-xl font-black text-stone-900">₹{product.price}</span>{product.originalPrice && <span className="ml-2 text-sm text-stone-400 line-through">₹{product.originalPrice}</span>}</div>
          <button onClick={() => addItem(product)} className="grid h-11 w-11 place-items-center rounded-full bg-green-600 text-white shadow-lg shadow-green-600/20 transition hover:rotate-90 hover:bg-green-700" aria-label={`Add ${product.name} to cart`}><Plus /></button>
        </div>
      </div>
    </article>
  );
}
