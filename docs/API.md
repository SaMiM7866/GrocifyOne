# API Examples

## Register

```http
POST /api/auth/register
Content-Type: application/json

{"name":"Abhishek Kar","email":"abhishek@example.com","password":"secret123"}
```

## Login

```http
POST /api/auth/login
Content-Type: application/json

{"email":"demo@grocify.com","password":"demo123"}
```

## Create order

```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{"items":[{"productId":"prd_apple","quantity":2}]}
```
