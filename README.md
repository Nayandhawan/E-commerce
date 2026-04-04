# ShopKart — E-Commerce Platform

A full-stack e-commerce platform built with **Spring Boot microservices** and **Angular 18**, inspired by Flipkart's UI. Supports product browsing, cart, wishlist, orders, coupons, and an admin dashboard.

---

## Architecture

```
                        ┌─────────────┐
                        │  Angular 18 │  :4200
                        │  (Frontend) │
                        └──────┬──────┘
                               │
                        ┌──────▼──────┐
                        │ API Gateway │  :8080  (JWT validation)
                        └──────┬──────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
      ┌───────▼──────┐ ┌───────▼──────┐ ┌──────▼───────┐
      │ User Service │ │Product Service│ │Order Service │
      │    :8081     │ │    :8082      │ │    :8083     │
      └───────┬──────┘ └───────┬──────┘ └──────┬───────┘
              │                │               │
              └────────────────▼───────────────┘
                               │
                   ┌───────────┴───────────┐
                   │        MySQL          │
                   │  ecom_users           │
                   │  ecom_products        │
                   │  ecom_orders          │
                   └───────────────────────┘

       Service Registry: Eureka  :8761
       Cache:            Redis
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 18, Angular Material |
| Backend | Spring Boot 3.3, Spring Security |
| Auth | JWT (RS256 via API Gateway) |
| Databases | MySQL 8.0 |
| Cache | Redis 7 |
| Service Registry | Netflix Eureka |
| Containerization | Docker, Docker Compose |

---

## Services

| Service | Port | Responsibility |
|---|---|---|
| `api-gateway` | 8080 | Route requests, validate JWT |
| `user-service` | 8081 | Auth, signup, login, user management |
| `product-service` | 8082 | Products, categories, FAQs, reviews |
| `order-service` | 8083 | Cart, orders, coupons, wishlist |
| `eureka-server` | 8761 | Service discovery |
| `frontend` | 4200 / 80 | Angular SPA |

---

## Features

### Customer
- Browse products with (hover zoom + slide-up Add to Cart)
- Search products by name
- Filter by category with icon nav
- Wishlist with heart toggle (add/remove)
- Cart with quantity controls and coupon codes
- Place orders and track order history
- Product detail page with reviews

### Admin
- Add / update / delete products with image upload
- Manage categories
- Add product FAQs
- View and manage orders
- Create discount coupons

---

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local Angular dev only)
- Java 17+ (for local Spring Boot dev only)

### Run with Docker Compose

1. Clone the repository:
   ```bash
   git clone https://github.com/Nayandhawan/E-commerce.git
   cd E-commerce
   ```

2. Create your `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

3. Fill in the values in `.env`:
   ```env
   DB_USERNAME=root
   DB_PASSWORD=your_strong_password
   JWT_SECRET=your_64_char_hex_secret   # openssl rand -hex 64
   ```

4. Build and start all services:
   ```bash
   docker compose up --build
   ```

5. Open the app:
   - Frontend: http://localhost:4200
   - API Gateway: http://localhost:8080
   - Eureka Dashboard: http://localhost:8761

### Default Admin Account
```
Email:    admin@test.com
Password: admin
```

---

## Project Structure

```
E-commerce/
├── EcomUI/                  # Angular 18 frontend
│   └── src/app/
│       ├── admin/           # Admin module
│       ├── customer/        # Customer module
│       ├── login/
│       └── signup/
├── api-gateway/             # Spring Cloud Gateway + JWT filter
├── eureka-server/           # Netflix Eureka service registry
├── user-service/            # Auth & user management
├── product-service/         # Product catalog & reviews
├── order-service/           # Cart, orders, wishlist, coupons
├── src/                     # Legacy monolith (reference)
├── docker-compose.yml
├── init-db.sql              # Creates databases on first run
└── .env.example
```

---

## API Overview

All requests go through the API Gateway at `http://localhost:8080`.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/customer/products` | List all products |
| GET | `/api/customer/products/search?name=` | Search products |
| POST | `/api/customer/cart` | Add item to cart |
| GET | `/api/customer/cart/{userId}` | Get cart |
| POST | `/api/customer/cart/place-order` | Place order |
| POST | `/api/customer/wishlist/{userId}/{productId}` | Add to wishlist |
| DELETE | `/api/customer/wishlist/{userId}/{productId}` | Remove from wishlist |
| POST | `/api/admin/product` | Add product (admin) |
| GET | `/api/admin/orders` | List all orders (admin) |

---

## License

MIT
