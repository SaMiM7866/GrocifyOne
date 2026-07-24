import bcrypt from 'bcryptjs';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { readCollection, writeCollection } from '../services/database.js';

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function publicUser(user) {
  const { passwordHash, ...safe } = user;
  return safe;
}

function sign(user) {
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET || 'development-secret-change-me', { expiresIn: '7d' });
}

router.post('/register', async (req, res, next) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    if (name.length < 2) return res.status(400).json({ message: 'Name must contain at least 2 characters' });
    if (!emailPattern.test(email)) return res.status(400).json({ message: 'Enter a valid email address' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must contain at least 6 characters' });

    const users = await readCollection('users');
    if (users.some((user) => user.email === email)) return res.status(409).json({ message: 'An account already exists with this email' });

    const user = {
      id: `usr_${Date.now().toString(36)}`,
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10),
      createdAt: new Date().toISOString()
    };
    users.push(user);
    await writeCollection('users', users);
    res.status(201).json({ user: publicUser(user), token: sign(user) });
  } catch (error) { next(error); }
});

router.post('/login', async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const users = await readCollection('users');
    const user = users.find((item) => item.email === email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ message: 'Incorrect email or password' });
    res.json({ user: publicUser(user), token: sign(user) });
  } catch (error) { next(error); }
});

export default router;
