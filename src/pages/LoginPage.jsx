import { Leaf } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [mode,setMode]=useState('login');
  const [form,setForm]=useState({name:'',email:'',password:''});
  const [error,setError]=useState('');
  const {login,register,loading}=useAuth();
  const navigate=useNavigate();
  const location=useLocation();
  const redirect=new URLSearchParams(location.search).get('redirect')||'/';

  async function submit(e){e.preventDefault();setError('');try{mode==='login'?await login({email:form.email,password:form.password}):await register(form);navigate(redirect);}catch(err){setError(err.message)}}

  return <section className="container-app grid min-h-[70vh] place-items-center py-16"><div className="card w-full max-w-md p-7 sm:p-9"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-green-600 text-white"><Leaf/></div><h1 className="mt-5 text-center text-3xl font-black">{mode==='login'?'Welcome back':'Create your account'}</h1><p className="mt-2 text-center text-sm text-stone-500">{mode==='login'?'Login to view orders and checkout.':'Register in seconds to start shopping.'}</p>
  <form onSubmit={submit} className="mt-7 space-y-4">{mode==='register'&&<input required className="input" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>}<input required type="email" className="input" placeholder="Email address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><input required minLength="6" type="password" className="input" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>{error&&<p className="rounded-2xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}<button disabled={loading} className="btn-primary w-full disabled:opacity-60">{loading?'Please wait...':mode==='login'?'Login':'Create account'}</button></form>
  <button onClick={()=>{setMode(mode==='login'?'register':'login');setError('')}} className="mt-5 w-full text-sm font-bold text-green-700">{mode==='login'?'New here? Create an account':'Already registered? Login'}</button><p className="mt-5 rounded-2xl bg-stone-50 p-3 text-center text-xs text-stone-500">Demo: <b>demo@grocify.com</b> / <b>demo123</b></p></div></section>;
}
