# ShopKart — E-Commerce Platform

A full-stack e-commerce platform built with **Spring Boot 3.3** and **Angular 18 + PrimeNG**, inspired by Flipkart's UI. Supports product browsing, cart, wishlist, orders, targeted coupons, and an admin dashboard.

---

## Current Architecture

The app is a **monolith** serving the Angular SPA as static files. The target is microservices with Kafka/Redis/Eureka — that work is tracked under the `website-enhancement` branch.

```
  ┌──────────────────────────────────────┐
  │         Browser (Angular 18)         │
  │  NgRx Store │ PrimeNG │ Lucide Icons │
  └────────────────────┬─────────────────┘
                       │ HTTP/JWT
  ┌────────────────────▼─────────────────┐
  │       Spring Boot 3.3.2  :8080       │
  │  Spring Security (JWT)               │
  │  Spring Data JPA (Hibernate)         │
  │                                      │
  │  Controllers                         │
  │   ├── /api/auth          (public)    │
  │   ├── /api/customer/**   (CUSTOMER)  │
  │   └── /api/admin/**      (ADMIN)     │
  └────────────────────┬─────────────────┘
                       │
  ┌────────────────────▼─────────────────┐
  │            MySQL 8.0                 │
  │  users · products · orders           │
  │  cart_items · coupons · category     │
  │  coupon_categories · coupon_products │
  │  wishlist · reviews · notifications  │
  └──────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 18, PrimeNG 17, Lucide Icons, NgRx |
| Backend | Spring Boot 3.3.2, Spring Security, Spring Data JPA |
| Auth | JWT (HMAC-SHA256, extracted server-side from `SecurityContext`) |
| Database | MySQL 8.0 |
| ORM | Hibernate 6 (`ddl-auto=update`) |

---

## Database Schema (key tables)

| Table | Purpose |
|---|---|
| `users` | Customers and admins |
| `category` | Product categories |
| `product` | Product catalog with image paths |
| `orders` | Cart (PENDING) and placed orders |
| `cart_items` | Line items linked to an order |
| `coupons` | Discount coupons with type and targeting |
| `coupon_categories` | Join: which categories a coupon targets |
| `coupon_products` | Join: which specific products a coupon targets |
| `wishlist` | User wishlist items |
| `reviews` | Product reviews |
| `notifications` | Per-user notification feed |

---

## Features

### Customer
- Browse products — hover zoom, slide-up Add to Cart
- Search products by name; filter by category icon nav
- Product detail page with images, related products, reviews, Q&A
- Wishlist with heart toggle (add/remove)
- Cart with quantity controls (+ / −)
- **Targeted coupons** — coupon chips show **green** when at least one eligible product is in cart, **red** when none; applied discount highlights the eligible items
- Coupon types: **Flat %** and **Upto % (capped at a max amount)**
- Coupon discount calculated on eligible items' subtotal only, not the whole cart
- Place orders, address selection, order history, cancel and return requests
- Payment integration (Razorpay)
- Stock-back subscription notifications

### Admin
- Add / update / delete products with image upload
- Manage categories
- Add product FAQs
- View and manage all orders, change order status
- **Create targeted coupons** — choose coupon type (Flat % / Upto % capped), set max discount, min order amount, target specific categories and/or products via multi-select dropdowns
- View customers

---

## Coupon System

### Types

| Type | Behaviour |
|---|---|
| `PERCENTAGE` | Flat `X%` off the eligible items' subtotal |
| `CAPPED_PERCENTAGE` | Up to `X%` off, but capped at `maxDiscount` (₹) |

### Targeting

When creating a coupon the admin can optionally select:
- **Applicable Categories** — coupon applies to items in those categories
- **Applicable Products** — coupon applies to those specific products

If both lists are empty the coupon is universal (all items eligible).  
If both are set, OR logic applies: an item is eligible if it matches either list.

A `minOrderAmount` can also be set — the eligible subtotal must meet this threshold.

### Cart UI

Available coupon chips are coloured at render time:
- **Green border** — at least one cart item is eligible
- **Red border** — no eligible items; chip is non-clickable
- Each eligible item shows a small green "Coupon applied" badge

---

## Security

- `userId` is **never trusted from the request body** for cart operations — it is always read from the JWT via `SecurityUtils.getCurrentUserId()`
- Path-param `userId` endpoints (get cart, place order, cancel, etc.) verify `securityUtils.isCurrentUser(userId)` before serving data

---

## Getting Started (local dev)

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8.0

### Backend
```bash
# Set env vars or fill application.properties
./mvnw spring-boot:run
# Runs on :8080
```

### Frontend
```bash
cd EcomUI
npm install
ng serve
# Runs on :4200; proxies /api to :8080
```

### Database setup
```sql
CREATE DATABASE ecom;
-- Hibernate auto-creates tables on first boot (ddl-auto=update)

-- One-time fix if upgrading from older schema:
CREATE INDEX idx_cart_order ON cart_items (order_id);
ALTER TABLE cart_items DROP INDEX UKshvxaq4vg05f3q75fnnel0klb;
```

### Default Admin Account
```
Email:    admin@test.com
Password: admin
```

---

## Project Structure

```
E-commerce/
├── EcomUI/                        # Angular 18 frontend
│   └── src/app/
│       ├── admin/                 # Admin module (products, orders, coupons, customers)
│       ├── customer/              # Customer module (dashboard, cart, orders, wishlist)
│       ├── store/                 # NgRx store (cart, wishlist, auth)
│       ├── login/ signup/
│       └── PrimeNGModule.ts       # Central PrimeNG + Lucide imports
└── src/main/java/com/stack/ecom/
    ├── controller/
    │   ├── admin/                 # Admin REST controllers
    │   └── customer/              # Customer REST controllers
    ├── services/
    │   ├── admin/                 # Coupon, product, order, analytics services
    │   └── customer/              # Cart, wishlist, review services
    ├── entity/                    # JPA entities
    ├── dto/                       # Request/response DTOs
    ├── repository/                # Spring Data JPA repos
    ├── enums/                     # OrderStatus, UserRole, CouponType
    ├── filters/                   # JwtRequestFilter
    ├── utils/                     # SecurityUtils (getCurrentUserId)
    └── config/                    # SecurityConfig, SpaFallbackController
```

---

## API Overview

All endpoints at `http://localhost:8080`.  
Protected endpoints require `Authorization: Bearer <token>`.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | Public | Register |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/customer/products` | CUSTOMER | List products |
| GET | `/api/customer/products/search?name=` | CUSTOMER | Search |
| GET | `/api/customer/coupons` | CUSTOMER | Available coupons with targeting info |
| POST | `/api/customer/cart` | CUSTOMER | Add to cart (userId from JWT) |
| GET | `/api/customer/cart/{userId}` | CUSTOMER | Get cart with discounted product IDs |
| PUT | `/api/customer/cart/increase` | CUSTOMER | Increase quantity |
| PUT | `/api/customer/cart/decrease` | CUSTOMER | Decrease quantity |
| POST | `/api/customer/cart/{userId}/coupon?code=` | CUSTOMER | Apply coupon |
| POST | `/api/customer/cart/place-order` | CUSTOMER | Place order |
| DELETE | `/api/customer/cart/{userId}/{productId}` | CUSTOMER | Remove item |
| GET | `/api/customer/cart/{userId}/orders` | CUSTOMER | Order history |
| POST | `/api/admin/coupons` | ADMIN | Create targeted coupon |
| PUT | `/api/admin/coupons/{id}` | ADMIN | Update coupon |
| GET | `/api/admin/coupons` | ADMIN | List coupons |
| DELETE | `/api/admin/coupons/{id}` | ADMIN | Delete coupon |
| GET | `/api/admin/orders` | ADMIN | All orders |
| GET | `/api/admin/orders/{id}/{status}` | ADMIN | Update order status |

---

## License

MIT
