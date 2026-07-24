import { Link } from 'react-router-dom';
export default function NotFoundPage(){return <section className="container-app py-28 text-center"><p className="text-8xl font-black text-green-600">404</p><h1 className="mt-4 text-3xl font-black">Page not found</h1><Link to="/" className="btn-primary mt-7">Back home</Link></section>}
