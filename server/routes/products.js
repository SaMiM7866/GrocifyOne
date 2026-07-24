import { Router } from 'express';
import { readCollection } from '../services/database.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await readCollection('products');
    const { search = '', category, featured, limit } = req.query;
    let result = products.filter((product) => product.name.toLowerCase().includes(String(search).toLowerCase()));
    if (category) result = result.filter((product) => product.category.toLowerCase() === String(category).toLowerCase());
    if (featured === 'true') result = result.filter((product) => product.featured);
    if (limit) result = result.slice(0, Math.max(0, Number(limit) || 0));
    res.json({ products: result, total: result.length });
  } catch (error) { next(error); }
});

router.get('/categories', async (req, res, next) => {
  try {
    const products = await readCollection('products');
    res.json({ categories: [...new Set(products.map((product) => product.category))] });
  } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const products = await readCollection('products');
    const product = products.find((item) => item.id === req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ product });
  } catch (error) { next(error); }
});

export default router;
