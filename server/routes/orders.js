import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { readCollection, writeCollection } from '../services/database.js';

const router = Router();
router.use(requireAuth);

router.get('/', async (req, res, next) => {
  try {
    const orders = await readCollection('orders');
    const mine = orders.filter((order) => order.userId === req.user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ orders: mine });
  } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try {
    const requestedItems = Array.isArray(req.body.items) ? req.body.items : [];
    if (!requestedItems.length) return res.status(400).json({ message: 'Your cart is empty' });

    const products = await readCollection('products');
    const items = [];
    for (const requested of requestedItems) {
      const product = products.find((item) => item.id === requested.productId);
      const quantity = Number(requested.quantity);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) return res.status(400).json({ message: 'One or more cart items are invalid' });
      if (quantity > product.stock) return res.status(409).json({ message: `${product.name} does not have enough stock` });
      items.push({ productId: product.id, name: product.name, price: product.price, quantity, image: product.image });
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const delivery = subtotal >= 499 ? 0 : 40;
    const order = {
      id: `ord_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
      userId: req.user.id,
      items,
      subtotal,
      delivery,
      total: subtotal + delivery,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    const orders = await readCollection('orders');
    orders.push(order);
    await writeCollection('orders', orders);
    res.status(201).json({ order });
  } catch (error) { next(error); }
});

export default router;
