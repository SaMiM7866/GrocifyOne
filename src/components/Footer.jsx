import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-stone-200 bg-white">
      <div className="container-app grid gap-8 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-xl font-black"><Leaf className="text-green-600" /> Grocify</div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-stone-500">Fresh groceries, honest prices and fast local delivery from a modern full-stack starter.</p>
        </div>
        <div><h3 className="font-bold">Quick links</h3><p className="mt-3 text-sm text-stone-500">Shop · Cart · Orders · Account</p></div>
        <div><h3 className="font-bold">Delivery</h3><p className="mt-3 text-sm text-stone-500">Every day, 7:00 AM–10:00 PM</p></div>
      </div>
    </footer>
  );
}
