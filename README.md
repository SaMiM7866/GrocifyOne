# Grocify Full-Stack

A stylish grocery e-commerce starter built with JavaScript, React, Tailwind CSS and Express.

## Included

- Responsive React + Vite interface
- Tailwind CSS design system and CSS animations
- Product search and category filters
- Persistent browser cart
- JWT authentication with password hashing
- Product and order REST APIs
- JSON file storage for local development
- Checkout and order history
- Demo account
- Basic rate limiting, CORS and error handling

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`.

Demo login:

```text
Email: demo@grocify.com
Password: demo123
```

## Production

1. Set a strong `JWT_SECRET` in `.env`.
2. Build the frontend:

```bash
npm run build
```

3. Start Express:

```bash
NODE_ENV=production npm start
```

## Main API routes

- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/orders` (Bearer token)
- `POST /api/orders` (Bearer token)

## Important

The included JSON database is suitable for demos and prototypes. For production, replace it with MongoDB, PostgreSQL or MySQL and add payment gateway, address management, admin inventory, transactional email, image storage and deployment secrets.
