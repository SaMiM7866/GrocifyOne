import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const delivery = subtotal >= 499 || subtotal === 0 ? 0 : 40;

  async function checkout() {
    if (!user) return navigate('/login?redirect=/cart');
    setLoading(true);
    try {
      await api('/orders', { method: 'POST', body: JSON.stringify({ items: items.map(({ id, quantity }) => ({ productId: id, quantity })) }) });
      clearCart();
      navigate('/orders');
    } catch (error) { alert(error.message); }
    finally { setLoading(false); }
  }

  if (!items.length) return <section className="container-app py-24"><div className="card mx-auto max-w-xl p-12 text-center"><ShoppingBag className="mx-auto text-green-600" size={56}/><h1 className="mt-5 text-3xl font-black">Your cart is empty</h1><p className="mt-3 text-stone-500">Add a few fresh products and come back.</p><Link to="/products" className="btn-primary mt-7">Start shopping</Link></div></section>;

  return <section className="container-app py-14"><h1 className="text-4xl font-black">Your cart</h1><div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
    <div className="space-y-4">{items.map((item)=><div key={item.id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center"><img src={item.image} alt={item.name} className="h-28 w-full rounded-2xl object-cover sm:w-28"/><div className="flex-1"><h2 className="font-bold">{item.name}</h2><p className="mt-1 text-sm text-stone-500">{item.unit}</p><p className="mt-2 font-black">₹{item.price}</p></div><div className="flex items-center justify-between gap-3 sm:justify-end"><div className="flex items-center rounded-full bg-stone-100 p-1"><button onClick={()=>updateQuantity(item.id,item.quantity-1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white"><Minus size={16}/></button><span className="w-9 text-center font-bold">{item.quantity}</span><button onClick={()=>updateQuantity(item.id,item.quantity+1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white"><Plus size={16}/></button></div><button onClick={()=>removeItem(item.id)} className="grid h-10 w-10 place-items-center rounded-full text-red-500 hover:bg-red-50"><Trash2 size={18}/></button></div></div>)}</div>
    <aside className="card h-fit p-6 lg:sticky lg:top-28"><h2 className="text-xl font-black">Order summary</h2><div className="mt-6 space-y-3 text-sm"><div className="flex justify-between"><span className="text-stone-500">Subtotal</span><strong>₹{subtotal}</strong></div><div className="flex justify-between"><span className="text-stone-500">Delivery</span><strong>{delivery ? `₹${delivery}` : 'Free'}</strong></div><div className="border-t border-dashed pt-4"><div className="flex justify-between text-lg"><span className="font-bold">Total</span><strong>₹{subtotal+delivery}</strong></div></div></div><button disabled={loading} onClick={checkout} className="btn-primary mt-6 w-full disabled:opacity-60">{loading?'Placing order...':'Checkout securely'}</button><p className="mt-3 text-center text-xs text-stone-400">Free delivery above ₹499</p></aside>
  </div></section>;
}
