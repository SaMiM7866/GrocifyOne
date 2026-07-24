import bcrypt from 'bcryptjs';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/orders.js';
import productRoutes from './routes/products.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { readCollection, writeCollection } from './services/database.js';

const app = express();
const port = Number(process.env.PORT) || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.disable('x-powered-by');
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || ['http://localhost:5173'], credentials: true }));
app.use(express.json({ limit: '100kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: true, legacyHeaders: false }));

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'grocify-api', timestamp: new Date().toISOString() }));
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

if (process.env.NODE_ENV === 'production') {
  const dist = path.join(__dirname, '..', 'dist');
  app.use(express.static(dist));
  app.get('*', (req, res, next) => req.path.startsWith('/api/') ? next() : res.sendFile(path.join(dist, 'index.html')));
}

app.use(notFound);
app.use(errorHandler);

async function ensureDemoUser() {
  const users = await readCollection('users');
  if (!users.some((user) => user.email === 'demo@grocify.com')) {
    users.push({
      id: 'usr_demo',
      name: 'Demo Customer',
      email: 'demo@grocify.com',
      passwordHash: await bcrypt.hash('demo123', 10),
      createdAt: new Date().toISOString()
    });
    await writeCollection('users', users);
  }
}

ensureDemoUser()
  .then(() => app.listen(port, () => console.log(`Grocify API running at http://localhost:${port}`)))
  .catch((error) => { console.error('Failed to start server:', error); process.exit(1); });
