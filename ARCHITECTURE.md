# ShopKart — Full Architecture & Improvement Roadmap

> Last updated: June 2026  
> Branch: `website-enhancement`

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [System Architecture](#3-system-architecture)
4. [Database Schema](#4-database-schema)
5. [Backend API Reference](#5-backend-api-reference)
6. [Frontend Architecture](#6-frontend-architecture)
7. [Authentication Flow](#7-authentication-flow)
8. [Current Features](#8-current-features)
9. [Identified Gaps](#9-identified-gaps)
10. [Improvement Roadmap](#10-improvement-roadmap)
11. [Dev Tooling](#11-dev-tooling)

---

## 1. Project Overview

ShopKart is a full-stack e-commerce platform with two user roles:

- **Customer** — browse products, manage cart/wishlist, place orders, track deliveries, write reviews
- **Admin** — manage products/categories/coupons, process orders, view sales analytics

The project is actively transitioning from a **Spring Boot monolith** to a **microservices architecture** using Eureka, API Gateway, and Docker Compose. Both modes are supported and documented below.

---

## 2. Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Language | Java 17 |
| Framework | Spring Boot 3.3.2 |
| Security | Spring Security + JWT (HS256) |
| ORM | Spring Data JPA + Hibernate |
| Database | MySQL 8.0 |
| Build | Maven 3.9 |
| API Docs | SpringDoc OpenAPI (Swagger UI at `/swagger-ui.html`) |
| Monitoring | Spring Actuator (`/actuator/health`, `/actuator/metrics`) |
| Payment | Razorpay |

### Frontend
| Layer | Technology |
|---|---|
| Framework | Angular 18 |
| UI Library | Angular Material + PrimeNG |
| CSS Utility | Tailwind CSS |
| State Management | NgRx (auth, cart, wishlist) |
| HTTP | Angular HttpClient + Auth Interceptor |
| Icons | Lucide Icons |
| Fonts | Outfit, Plus Jakarta Sans, JetBrains Mono |

### Microservices (in progress)
| Service | Port | Responsibility |
|---|---|---|
| `api-gateway` | 8080 | JWT validation, routing |
| `eureka-server` | 8761 | Service discovery |
| `user-service` | 8081 | Auth, user profiles |
| `product-service` | 8082 | Products, categories, reviews |
| `order-service` | 8083 | Cart, orders, wishlist |
| `payment-service` | 8084 | Razorpay integration |

### Infrastructure
| Tool | Purpose |
|---|---|
| Docker + Docker Compose | Full stack containerisation |
| Redis | Planned caching layer (product-service) |
| Prometheus + Grafana | Monitoring dashboards |
| GitHub Actions | CI/CD pipelines |

---

## 3. System Architecture

### Current: Monolith Mode
```
Browser (Angular 18)
        │
        │ HTTP / REST
        ▼
Spring Boot Monolith (:8080)
  ├── AuthController
  ├── Customer Controllers (products, cart, wishlist, profile, reviews)
  ├── Admin Controllers (products, categories, coupons, orders, analytics)
  ├── Spring Security (JWT filter)
  ├── Spring Data JPA
  └── MySQL (:3306/ecom)

Static files (Angular build) served from:
  src/main/resources/static/browser/
```

### Target: Microservices Mode
```
Browser (Angular 18 on nginx :4200)
        │
        ▼
API Gateway (:8080)  ←── Eureka Server (:8761)
  ├── /api/auth/**      → user-service (:8081)
  ├── /api/customer/**  → product-service (:8082) + order-service (:8083)
  ├── /api/admin/**     → product-service + order-service
  └── /api/payment/**   → payment-service (:8084)
        │
        ▼
    MySQL (per-service DBs) + Redis (cache)
```

### Request Flow (Monolith)
```
Request → JWT Filter → SecurityConfig → Controller → Service → Repository → MySQL
                ↓
          401 if token
          invalid/missing
```

---

## 4. Database Schema

### `users`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT PK | Auto increment |
| email | VARCHAR | Unique login identifier |
| password | VARCHAR | BCrypt hashed |
| name | VARCHAR | Display name |
| role | ENUM | `CUSTOMER` / `ADMIN` |
| img | LONGBLOB | Profile picture |
| phone | VARCHAR | |
| street | VARCHAR | |
| city | VARCHAR | |
| state | VARCHAR | |
| zip_code | VARCHAR | |
| country | VARCHAR | |
| card_holder_name | VARCHAR | ⚠️ See security gap |
| card_number | VARCHAR | ⚠️ Plain text — must encrypt |
| card_expiry | VARCHAR | ⚠️ Plain text — must encrypt |
| card_type | VARCHAR | |
| card_cvv | VARCHAR | ⚠️ Plain text — must remove |

### `product`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT PK | |
| name | VARCHAR | |
| price | BIGINT | In rupees |
| description | TEXT | |
| img | LONGBLOB | Single image, base64 ⚠️ |
| category_id | FK → category | Cascades on delete |

### `category`
| Column | Type |
|---|---|
| id | BIGINT PK |
| name | VARCHAR |
| description | TEXT |
| img | LONGBLOB |

### `orders`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT PK | |
| order_description | TEXT | Customer note |
| date | DATETIME | |
| amount | BIGINT | After discount |
| address | VARCHAR | Free-text ⚠️ See gap |
| payment | VARCHAR | Payment reference |
| order_status | ENUM | `PENDING / PLACED / SHIPPED / DELIVERED` |
| total_amount | BIGINT | Before discount |
| discount | BIGINT | |
| tracking_id | UUID | Public tracking key |
| user_id | FK → users | |
| coupon_id | FK → coupons | Nullable |

### `cart_items`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT PK | |
| price | BIGINT | Snapshot price at add time |
| quantity | BIGINT | |
| product_id | FK → product | |
| user_id | FK → users | |
| order_id | FK → orders | NULL = still in cart |

### `coupons`
| Column | Type |
|---|---|
| id | BIGINT PK |
| name | VARCHAR |
| code | VARCHAR |
| discount | BIGINT |
| expiration_date | DATETIME |

### `review`
| Column | Type |
|---|---|
| id | BIGINT PK |
| rating | BIGINT | 1–5 |
| description | TEXT |
| img | LONGBLOB |
| user_id | FK → users |
| product_id | FK → product |

### `wishlist`
| Column | Type |
|---|---|
| id | BIGINT PK |
| product_id | FK → product |
| user_id | FK → users |

### `faq`
| Column | Type |
|---|---|
| id | BIGINT PK |
| question | TEXT |
| answer | TEXT |
| product_id | FK → product |

---

## 5. Backend API Reference

### Auth — `/api/auth`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Register new user |
| POST | `/login` | Login, returns JWT |
| GET | `/order/{trackingId}` | Public order tracking |

### Customer — Products `/api/customer`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | All products |
| GET | `/products/search?name=` | Search by name |
| GET | `/products/{id}` | Product detail + FAQs + reviews |

### Customer — Cart `/api/customer`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/cart` | Add product to cart |
| GET | `/cart/{userId}` | Get active cart |
| POST | `/cart/{userId}/coupon?code=` | Apply coupon |
| PUT | `/cart/increase` | Increase item quantity |
| PUT | `/cart/decrease` | Decrease item quantity |
| DELETE | `/cart/{userId}/{productId}` | Remove item |
| POST | `/cart/place-order` | Place order |
| GET | `/cart/{userId}/orders` | My order history |

### Customer — Wishlist `/api/customer`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/wishlist/{userId}/{productId}` | Add to wishlist |
| DELETE | `/wishlist/{userId}/{productId}` | Remove from wishlist |
| GET | `/wishlist/{userId}` | Get wishlist |

### Customer — Profile `/api/customer`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/profile/{userId}` | Get profile |
| PUT | `/profile/{userId}` | Update profile |

### Customer — Reviews `/api/customer`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/reviews` | Submit review |

### Payment `/api/payment`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/create-order` | Create Razorpay order |
| POST | `/verify` | Verify payment signature |

### Admin — Products `/api/admin`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/products` | Create product |
| PUT | `/products/{id}` | Update product |
| DELETE | `/products/{id}` | Delete product |
| GET | `/products` | All products |
| POST | `/faqs/{productId}` | Add FAQ |

### Admin — Categories `/api/admin`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/category` | Create category |
| GET | `/categories` | All categories |

### Admin — Coupons `/api/admin`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/coupons` | Create coupon |
| GET | `/coupons` | All coupons |

### Admin — Orders `/api/admin`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/orders` | All placed orders |
| GET | `/orders/{orderId}/{status}` | Update order status |
| GET | `/orders/analytics` | Analytics summary |
| GET | `/sales-chart?fromYear&toYear` | Sales chart data |
| GET | `/sales-report?type&year` | Download Excel report |

---

## 6. Frontend Architecture

### Module Structure
```
src/app/
├── app.module.ts              Root module
├── app-routing.module.ts      Top-level routes
├── app.component              Shell (nav, toast)
│
├── login/                     Login page
├── signup/                    Signup page
├── track-order/               Public order tracking
│
├── customer/                  Lazy-loaded customer module
│   ├── components/
│   │   ├── dashboard/         Product listing + search + category filter
│   │   ├── cart/              Cart view + coupon + place order
│   │   ├── place-order/       Order form (address, description)
│   │   ├── my-orders/         Order history list
│   │   ├── view-ordered-products/  Items in a specific order
│   │   ├── view-product-detail/    Product detail + reviews + FAQs
│   │   ├── review-ordered-product/ Write a review
│   │   ├── view-wishlist/     Wishlist page
│   │   └── profile/           User profile edit
│   └── services/
│       └── customer.service.ts  All customer API calls
│
├── admin/                     Lazy-loaded admin module
│   ├── components/
│   │   ├── dashboard/         Stats overview
│   │   ├── analytics/         Charts + sales report download
│   │   ├── orders/            Order management + status update
│   │   ├── post-product/      Add product
│   │   ├── update-product/    Edit product
│   │   ├── post-category/     Add category
│   │   ├── post-coupon/       Add coupon
│   │   ├── coupons/           Coupon list
│   │   └── post-product-faq/  Add FAQ to product
│   └── service/
│       └── admin.service.ts
│
├── store/                     NgRx state
│   ├── auth/                  Login state (token, user info)
│   ├── cart/                  Cart item count
│   └── wishlist/              Wishlisted product IDs
│
├── services/
│   ├── auth/auth.service.ts
│   ├── storage/user-storage.service.ts
│   └── interceptors/
│       ├── auth.interceptor.ts     Attaches JWT to every request
│       └── csrf.service.ts
│
└── directives/
    └── scroll-reveal.directive.ts  Fade-in animation on scroll
```

### Routing
| Path | Component | Guard |
|---|---|---|
| `/login` | LoginComponent | — |
| `/signup` | SignupComponent | — |
| `/track-order` | TrackOrderComponent | — |
| `/customer/dashboard` | DashboardComponent | Auth |
| `/customer/cart` | CartComponent | Auth |
| `/customer/my_orders` | MyOrdersComponent | Auth |
| `/customer/wishlist` | WishlistComponent | Auth |
| `/customer/profile` | ProfileComponent | Auth |
| `/admin/dashboard` | AdminDashboardComponent | Auth + Admin |
| `/admin/analytics` | AnalyticsComponent | Auth + Admin |
| `/admin/orders` | OrdersComponent | Auth + Admin |

### State Management (NgRx)
```
Auth Store:   { token, userId, userName, userRole }
Cart Store:   { itemCount }
Wishlist:     { ids: number[] }
```

---

## 7. Authentication Flow

```
1. POST /api/auth/login → { token, userId, userRole, userName }
2. Token stored in localStorage key: 'ecom-token'
3. AuthInterceptor attaches: Authorization: Bearer <token>
4. Spring JwtAuthFilter validates token on every protected request
5. Role-based access: CUSTOMER routes vs ADMIN routes
6. Token expiry: 24 hours (86400000 ms)
```

---

## 8. Current Features

### ✅ Working Today

#### Customer
- [x] Register / Login with JWT
- [x] Browse all products
- [x] Search products by name
- [x] Filter products by category
- [x] View product detail (description, FAQs, reviews)
- [x] Add to cart / remove from cart
- [x] Increase / decrease item quantity in cart
- [x] Apply discount coupon to cart
- [x] Wishlist (add, remove, view)
- [x] Place order (address + note)
- [x] Razorpay payment integration
- [x] View order history
- [x] Track order by tracking ID (public)
- [x] Write product review (with image + rating)
- [x] Edit profile (name, phone, address, profile photo)
- [x] Scroll-reveal animations on product listing

#### Admin
- [x] Dashboard with stats (total orders, revenue, products, categories)
- [x] Analytics with charts (revenue by month, orders by status)
- [x] Export sales report as Excel
- [x] Add / update / delete products (with image upload)
- [x] Add categories
- [x] Add product FAQs
- [x] Create / list coupons
- [x] View all orders + change status (Pending → Placed → Shipped → Delivered)

---

## 9. Identified Gaps

### 🔴 Critical

| # | Gap | Impact |
|---|---|---|
| G1 | **No product sorting** | User cannot sort by price, rating, or newest — bad discovery |
| G2 | **No price range filter** | No way to shop within a budget |
| G3 | **No stock field on Product** | No "Out of Stock" state — users add unavailable items |
| G4 | **No pagination / infinite scroll** | All products load at once — will break at scale |
| G5 | **No order cancellation for customer** | Once placed, cannot cancel |
| G6 | **No forgot password / reset flow** | Locked out forever if password forgotten |
| G7 | **No 404 / error pages** | Bad routes fail silently |
| G8 | **Card details stored in plain text** | `cardNumber`, `cardCvv` in User entity — critical security violation |

### 🟠 High Priority

| # | Gap | Impact |
|---|---|---|
| G9 | **Rating not shown on product cards** | Review data exists but no star display on listing |
| G10 | **No quantity selector before Add to Cart** | Must enter cart to change qty — extra friction |
| G11 | **Address is a free-text string** | Should be structured (street, city, state, pin, country) |
| G12 | **No skeleton loaders** | Blank screen while data loads — feels broken |
| G13 | **No empty states** | Empty cart/wishlist/orders shows nothing |
| G14 | **No delivery date estimate** | User has no idea when order arrives |
| G15 | **Single image per product** | No gallery, no zoom, no multiple angles |

### 🟡 Medium Priority

| # | Gap | Impact |
|---|---|---|
| G16 | **No order cancellation status** | No `CANCELLED` status in `OrderStatus` enum |
| G17 | **No return / refund request** | No post-delivery customer action |
| G18 | **No search autocomplete** | Submit-only search, no live suggestions |
| G19 | **No recently viewed products** | No browsing history |
| G20 | **No product variants** | No size/colour selection (critical for fashion) |
| G21 | **No email/in-app notifications** | No alert when order ships |
| G22 | **No footer** | No About, Contact, Privacy Policy, Terms pages |
| G23 | **Mobile nav not verified** | Top nav may overflow on small screens |
| G24 | **Images stored as LONGBLOB in DB** | Performance issue — should use file storage / CDN |

### 🟢 Nice to Have

| # | Gap |
|---|---|
| G25 | Product comparison |
| G26 | Share product link |
| G27 | Address book (multiple saved addresses) |
| G28 | Coupon visibility in cart before checkout step |
| G29 | "Continue shopping" flow after add-to-cart |
| G30 | Order invoice / PDF download |

---

## 10. Improvement Roadmap

Ordered by value/effort ratio — each item references the gap(s) it closes.

### Phase 1 — Security & Stability
> Must ship before any public access

| Task | Gaps | Effort |
|---|---|---|
| Remove `cardNumber`, `cardCvv`, `cardExpiry` from User entity | G8 | 0.5 day |
| Add 404 page + global error boundary | G7 | 0.5 day |
| Add `CANCELLED` to `OrderStatus` enum | G16 | 0.5 day |

### Phase 2 — Product Discovery
> Biggest daily-use pain points

| Task | Gaps | Effort |
|---|---|---|
| Add `stockQuantity` field to Product entity | G3 | 0.5 day |
| Show "Out of Stock" badge + disable Add to Cart | G3 | 0.5 day |
| Backend: sort params (`sortBy`, `sortOrder`) on `/products` | G1 | 0.5 day |
| Frontend: sort dropdown (Price ↑↓, Newest, Rating) | G1 | 0.5 day |
| Backend: price range filter params on `/products` | G2 | 0.5 day |
| Frontend: price range slider | G2 | 0.5 day |
| Backend: paginated product endpoint | G4 | 1 day |
| Frontend: infinite scroll or page controls | G4 | 1 day |
| Display average star rating on product cards | G9 | 0.5 day |

### Phase 3 — Cart & Checkout UX
> Friction points in the buy flow

| Task | Gaps | Effort |
|---|---|---|
| Quantity selector on product detail page | G10 | 0.5 day |
| Replace free-text address with structured form | G11 | 1 day |
| Delivery date estimate display on order confirmation | G14 | 0.5 day |
| Skeleton loaders for product grid, cart, orders | G12 | 1 day |
| Empty states for cart, wishlist, orders, search | G13 | 0.5 day |

### Phase 4 — Order Management
> Post-purchase user control

| Task | Gaps | Effort |
|---|---|---|
| Customer: cancel order button (for PENDING/PLACED status) | G5 | 1 day |
| Customer: return/refund request form | G17 | 1.5 days |
| Admin: handle return requests | G17 | 1 day |
| Order invoice PDF download | G30 | 1 day |

### Phase 5 — Auth & Account
> Account self-service

| Task | Gaps | Effort |
|---|---|---|
| Forgot password flow (email OTP) | G6 | 2 days |
| Address book (save multiple addresses) | G27 | 1 day |

### Phase 6 — UI Polish & Responsiveness

| Task | Gaps | Effort |
|---|---|---|
| Verified mobile-responsive nav (hamburger menu) | G23 | 1 day |
| Product image gallery with zoom | G15 | 1 day |
| Search autocomplete / live suggestions | G18 | 1 day |
| Recently viewed products (localStorage) | G19 | 0.5 day |
| Footer (About, Contact, Privacy Policy, Terms) | G22 | 0.5 day |
| Share product link | G26 | 0.25 day |

### Phase 7 — Advanced Features

| Task | Gaps | Effort |
|---|---|---|
| Product variants (size, colour) | G20 | 2 days |
| In-app notifications for order status change | G21 | 2 days |
| Migrate images from LONGBLOB to file storage | G24 | 2 days |

---

## 11. Dev Tooling

### Running Locally

```bash
# Start everything (builds Angular + starts Spring Boot)
./start.sh

# App available at: http://localhost:8080

# For Angular live-reload dev server (in a second terminal):
cd EcomUI && npm start
# Available at: http://localhost:4200
```

### Running with Docker (full microservices stack)

```bash
# Create .env from example
cp .env.example .env
# Fill in: DB_PASSWORD, JWT_SECRET, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET

docker compose up --build
# Frontend:       http://localhost:4200
# API Gateway:    http://localhost:8080
# Eureka:         http://localhost:8761
```

### Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `DB_PASSWORD` | ✅ | — | MySQL root password |
| `DB_USERNAME` | — | `root` | MySQL username |
| `DB_URL` | — | `jdbc:mysql://localhost:3306/ecom` | JDBC URL |
| `JWT_SECRET` | ✅ | — | Min 32-char secret |
| `CLIENT_URL` | — | `http://localhost:4200` | Angular origin for CORS |
| `RAZORPAY_KEY_ID` | — | — | Razorpay API key |
| `RAZORPAY_KEY_SECRET` | — | — | Razorpay secret |

### AI Dev Pipeline

```bash
# Multi-agent developer → tester → reviewer pipeline
cd agents
export ANTHROPIC_API_KEY=your_key
python3 dev_pipeline.py "Add GET /api/customer/wishlist endpoint" --write-files
```

### Useful URLs (when running)

| URL | Description |
|---|---|
| `http://localhost:8080` | Main app |
| `http://localhost:8080/swagger-ui.html` | API docs |
| `http://localhost:8080/actuator/health` | Health check |
| `http://localhost:8761` | Eureka dashboard (microservices mode) |

---

*This document is the single source of truth for ShopKart architecture and planned work. Update it as features are completed or new gaps are discovered.*
