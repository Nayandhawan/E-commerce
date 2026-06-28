# ShopKart — Full Architecture & Improvement Roadmap

> Last updated: June 2026  
> Branch: `gap-fixes` (all gaps resolved)

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
| Email | Spring Mail (SMTP / Gmail) |
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
| img | LONGBLOB | Legacy — kept for backward compat; new uploads use `img_path` |
| img_path | VARCHAR | Filesystem path served via `/api/images/product/{filename}` |
| stock_quantity | INTEGER | 0 = Out of Stock (added Phase 2) |
| category_id | FK → category | Cascades on delete |

### `product_variants`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT PK | |
| size | VARCHAR | e.g. S, M, L, XL |
| colour | VARCHAR | e.g. Red, Blue |
| stock_quantity | INTEGER | Variant-level stock |
| product_id | FK → product | |

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
| address | VARCHAR | Legacy formatted string |
| delivery_street | VARCHAR | Structured snapshot at order time |
| delivery_city | VARCHAR | |
| delivery_state | VARCHAR | |
| delivery_zip_code | VARCHAR | |
| delivery_country | VARCHAR | |
| payment | VARCHAR | Payment reference |
| order_status | ENUM | `PENDING / PLACED / SHIPPED / DELIVERED / CANCELLED / RETURN_REQUESTED / RETURNED` |
| total_amount | BIGINT | Before discount |
| discount | BIGINT | |
| tracking_id | UUID | Public tracking key |
| return_reason | TEXT | Set when status = RETURN_REQUESTED |
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
| Column | Type | Notes |
|---|---|---|
| id | BIGINT PK | |
| rating | BIGINT | 1–5 |
| description | TEXT | |
| img | LONGBLOB | Legacy — kept for backward compat |
| img_path | VARCHAR | Filesystem path for new review images |
| user_id | FK → users | |
| product_id | FK → product | |

### `notifications`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT PK | |
| message | VARCHAR | Notification text |
| type | VARCHAR | e.g. ORDER_SHIPPED |
| is_read | BOOLEAN | |
| created_at | DATETIME | |
| user_id | FK → users | |

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
| POST | `/forgot-password?email=` | Send OTP to email (Phase 5) |
| POST | `/verify-otp?email=&otp=` | Verify OTP (Phase 5) |
| POST | `/reset-password?email=&otp=&newPassword=` | Reset password (Phase 5) |

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
| PATCH | `/cart/order/{orderId}/cancel?userId=` | Cancel order (Phase 4) |
| PATCH | `/cart/order/{orderId}/return?userId=&reason=` | Request return (Phase 4) |

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

### Customer — Coupons `/api/customer`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/coupons` | List non-expired coupons (for display in cart) |

### Customer — Notifications `/api/customer`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/notifications` | Last 20 notifications for current user |
| PATCH | `/notifications/{id}/read` | Mark notification as read |
| PATCH | `/notifications/read-all` | Mark all as read |

### Images (public)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/images/{type}/{filename}` | Serve uploaded image (long cache header) |

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
| PATCH | `/orders/{orderId}/return?action=approve\|reject` | Process return request |
| GET | `/orders/analytics` | Analytics summary |
| GET | `/sales-chart?fromYear&toYear` | Sales chart data |
| GET | `/sales-report?type&year` | Download Excel report |

### Admin — Image Migration `/api/admin`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/migrate-images` | One-time migration: move all product/review BLOBs to filesystem |

### Admin — Product Variants `/api/admin`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/products/{id}/variants` | Add variant to product |
| PUT | `/variants/{id}` | Update variant |
| DELETE | `/variants/{id}` | Delete variant |

---

## 6. Frontend Architecture

### Module Structure
```
src/app/
├── app.module.ts              Root module
├── app-routing.module.ts      Top-level routes
├── app.component              Shell (nav, mobile drawer, footer)
│
├── login/                     Login page + 3-step forgot-password dialog
├── signup/                    Signup page
├── track-order/               Public order tracking
│
├── customer/                  Lazy-loaded customer module
│   ├── components/
│   │   ├── dashboard/         Product listing + search autocomplete + sort/filter + recently viewed + compare toggle + continue shopping dialog
│   │   ├── cart/              Cart view + coupon input + available coupon chips + place order
│   │   ├── place-order/       Order form (address pre-fill from profile)
│   │   ├── compare/           Side-by-side product comparison (up to 3 products)
│   │   ├── my-orders/         Order history + cancel + return + invoice download
│   │   ├── view-ordered-products/  Items in a specific order
│   │   ├── view-product-detail/    Product detail + zoom + share + variant selection + recently-viewed tracking
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
│   │   ├── orders/            Order management + status update + return approval
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
│   ├── cart/                  Full cart state (items, order/totals, loading)
│   └── wishlist/              Wishlisted product IDs + full item list
│
├── services/
│   ├── auth/auth.service.ts       Includes forgot-password OTP flow
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
| `/customer/compare` | CompareComponent | Auth |
| `/customer/product/:id` | ViewProductDetailComponent | Auth |
| `/admin/dashboard` | AdminDashboardComponent | Auth + Admin |
| `/admin/analytics` | AnalyticsComponent | Auth + Admin |
| `/admin/orders` | OrdersComponent | Auth + Admin |

### State Management (NgRx)
```
Auth Store:    { token, userId, userName, userRole }
Cart Store:    { items: CartItem[], order: OrderSummary, loading: boolean }
Wishlist Store:{ ids: number[], items: WishlistItem[] }
```

### Services (Angular)
```
CompareService    — in-memory BehaviorSubject<Product[]>, max 3 items, drives compare bar + /customer/compare
CustomerService   — all customer API calls (products, cart, orders, wishlist, profile, coupons, notifications)
```

### Client-Side Storage (localStorage)
| Key | Purpose |
|---|---|
| `ecom-token` | JWT token |
| `sk_recently_viewed` | Recently viewed products (max 10, trimmed on each view) |

---

## 7. Authentication Flow

```
1. POST /api/auth/login → { token, userId, userRole, userName }
2. Token stored in localStorage key: 'ecom-token'
3. AuthInterceptor attaches: Authorization: Bearer <token>
4. Spring JwtAuthFilter validates token on every protected request
5. Role-based access: CUSTOMER routes vs ADMIN routes
6. Token expiry: 24 hours (86400000 ms)

Forgot Password (Phase 5):
1. POST /api/auth/forgot-password?email=  → generates 6-digit OTP, emails it (10 min TTL)
2. POST /api/auth/verify-otp?email=&otp=  → validates OTP + TTL
3. POST /api/auth/reset-password?email=&otp=&newPassword=  → BCrypt encodes + saves
```

---

## 8. Current Features

### ✅ Working Today

#### Customer
- [x] Register / Login with JWT
- [x] **Forgot password — 3-step email OTP flow** (Phase 5)
- [x] Browse all products
- [x] Search products by name
- [x] **Search autocomplete / live suggestions** (Phase 6)
- [x] Filter products by category
- [x] **Sort products** by price (asc/desc), top rated (Phase 2)
- [x] **Price range slider filter** (Phase 2)
- [x] **Out of Stock badge** — stock field on product (Phase 2)
- [x] **Average star rating** on product cards (Phase 2)
- [x] View product detail (description, FAQs, reviews)
- [x] **Image zoom on product detail** (Phase 6)
- [x] **Share product link** (copy to clipboard) (Phase 6)
- [x] Add to cart / remove from cart
- [x] **Quantity selector** on product detail and cart (Phase 3)
- [x] Increase / decrease item quantity in cart
- [x] Apply discount coupon to cart
- [x] **Empty state** for cart, wishlist, orders, search (Phase 3)
- [x] **Skeleton loaders** while data loads (Phase 3)
- [x] Wishlist (add, remove, view)
- [x] Place order (structured address form with pre-fill from profile) (Phase 3 + 5)
- [x] **Delivery date estimate** on order confirmation (Phase 3)
- [x] Razorpay payment integration
- [x] View order history (all statuses including cancelled/return)
- [x] **Cancel order** (PENDING/PLACED status) (Phase 4)
- [x] **Return/refund request** with reason (DELIVERED status) (Phase 4)
- [x] **Order invoice** — print-friendly HTML in new tab (Phase 4)
- [x] Track order by tracking ID (public)
- [x] Write product review (with image + rating)
- [x] Edit profile (name, phone, address, profile photo)
- [x] **Recently viewed products** — localStorage, shown on dashboard (Phase 6)
- [x] Scroll-reveal animations on product listing
- [x] **404 / error page** (Phase 1)
- [x] **Pagination** on product listing (Phase 7)
- [x] **Product variants** (size/colour selection on product detail) (Phase 7)
- [x] **In-app notifications** — bell icon in nav, unread count badge, mark read (Phase 7)
- [x] **Product comparison** — compare up to 3 products, floating bar, side-by-side table (gap-fixes)
- [x] **Available coupons** shown as clickable chips in cart (gap-fixes)
- [x] **Continue shopping dialog** after add-to-cart (gap-fixes)
- [x] **Structured delivery address** stored per-order (street, city, state, zip, country) (gap-fixes)

#### Admin
- [x] Dashboard with stats (total orders, revenue, products, categories)
- [x] Analytics with charts (revenue by month, orders by status)
- [x] Export sales report as Excel
- [x] Add / update / delete products (with image upload + stock quantity)
- [x] Add categories
- [x] Add product FAQs
- [x] Create / list coupons
- [x] View all orders + change status (Pending → Placed → Shipped → Delivered → Cancelled)
- [x] **Approve / reject customer return requests** (Phase 4)
- [x] **Image file storage** — product/review images served from filesystem via `/api/images/**`, migration endpoint available (image-migration)
- [x] **Stock management** — stock badge per product, inline editor, Mark OOS / Restore buttons (Phase 9)

#### Payments
- [x] **Razorpay end-to-end payment flow** — create order → modal → verify HMAC signature → place order (Phase 9)
- [x] Stock decremented on order placement (Phase 9)

#### UI / Shell
- [x] **Mobile hamburger nav** + slide-in drawer (Phase 6)
- [x] **Site footer** with brand and navigation links (Phase 6)

---

## 9. Identified Gaps

### ✅ All Resolved

| # | Gap | Fixed in |
|---|---|---|
| G1 | No product sorting | Phase 2 |
| G2 | No price range filter | Phase 2 |
| G3 | No stock field on Product | Phase 2 |
| G4 | No pagination on product listing | Phase 7 |
| G5 | No order cancellation for customer | Phase 4 |
| G6 | No forgot password / reset flow | Phase 5 |
| G7 | No 404 / error pages | Phase 1 |
| G8 | Card details stored in plain text | Phase 1 |
| G9 | Rating not shown on product cards | Phase 2 |
| G10 | No quantity selector before Add to Cart | Phase 3 |
| G11 | Address stored as free-text string | gap-fixes |
| G12 | No skeleton loaders | Phase 3 |
| G13 | No empty states | Phase 3 |
| G14 | No delivery date estimate | Phase 3 |
| G15 | Single image per product (zoom added) | Phase 6 |
| G16 | No CANCELLED order status | Phase 1 |
| G17 | No return / refund request | Phase 4 |
| G18 | No search autocomplete | Phase 6 |
| G19 | No recently viewed products | Phase 6 |
| G20 | No product variants | Phase 7 |
| G21 | No in-app notifications | Phase 7 |
| G22 | No footer | Phase 6 |
| G23 | Mobile nav not verified | Phase 6 |
| G24 | Images stored as LONGBLOB in DB | image-migration |
| G25 | Product comparison | gap-fixes |
| G26 | Share product link | Phase 6 |
| G27 | Address pre-fill at checkout | Phase 5 |
| G28 | Coupon visibility in cart before checkout | gap-fixes |
| G29 | "Continue shopping" flow after add-to-cart | gap-fixes |
| G30 | Order invoice / PDF download | Phase 4 |

---

## 10. Improvement Roadmap

### ✅ Phase 1 — Security & Stability
> Completed

| Task | Status |
|---|---|
| Remove card fields from User entity | ✅ Done |
| Add 404 page + global error boundary | ✅ Done |
| Add `CANCELLED` to `OrderStatus` enum | ✅ Done |

### ✅ Phase 2 — Product Discovery
> Completed

| Task | Status |
|---|---|
| Add `stockQuantity` field to Product entity | ✅ Done |
| Show "Out of Stock" badge + disable Add to Cart | ✅ Done |
| Sort (price asc/desc, rating) + price range filter | ✅ Done |
| Display average star rating on product cards | ✅ Done |

### ✅ Phase 3 — Cart & Checkout UX
> Completed

| Task | Status |
|---|---|
| Quantity selector on product detail page | ✅ Done |
| Structured address form at checkout | ✅ Done |
| Delivery date estimate on order confirmation | ✅ Done |
| Skeleton loaders for product grid, cart, orders | ✅ Done |
| Empty states for cart, wishlist, orders, search | ✅ Done |

### ✅ Phase 4 — Order Management
> Completed

| Task | Status |
|---|---|
| Customer: cancel order (PENDING/PLACED) | ✅ Done |
| Customer: return/refund request with reason | ✅ Done |
| Admin: approve / reject return requests | ✅ Done |
| Order invoice — print-friendly HTML in new tab | ✅ Done |

### ✅ Phase 5 — Auth & Account
> Completed

| Task | Status |
|---|---|
| Forgot password — email OTP via Spring Mail / SMTP | ✅ Done |
| Address pre-fill at checkout from saved profile | ✅ Done |

### ✅ Phase 6 — UI Polish & Responsiveness
> Completed

| Task | Status |
|---|---|
| Mobile hamburger nav with slide-in drawer | ✅ Done |
| Search autocomplete / live suggestions | ✅ Done |
| Recently viewed products (localStorage + dashboard row) | ✅ Done |
| Site footer with brand + navigation links | ✅ Done |
| Product image zoom dialog (click to enlarge) | ✅ Done |
| Share product link (copy to clipboard + toast) | ✅ Done |

### ✅ Phase 7 — Advanced Features
> Completed

| Task | Gaps | Status |
|---|---|---|
| Product variants (size, colour) | G20 | ✅ Done |
| In-app notifications for order status change | G21 | ✅ Done |
| Migrate images from LONGBLOB to file storage | G24 | ✅ Done |
| Pagination on product listing | G4 | ✅ Done |
| Remove card detail fields from User | G8 | ✅ Done |

### ✅ Phase 8 — Gap Fixes
> Completed

| Task | Gaps | Status |
|---|---|---|
| Structured delivery address snapshot on Order | G11 | ✅ Done |
| Product comparison (CompareService + /customer/compare) | G25 | ✅ Done |
| Available coupons as clickable chips in cart | G28 | ✅ Done |
| Continue shopping dialog after add-to-cart | G29 | ✅ Done |

### 🚧 Phase 9 — Payments, Stock & Cart Fixes
> In progress on branch `phase-9-stock-payment`

| Task | Status | Notes |
|---|---|---|
| Razorpay payment flow end-to-end | ✅ Done | `PaymentController` creates order + verifies HMAC signature; frontend opens Razorpay modal before placing order |
| Admin stock management | ✅ Done | Stock badge on product cards; inline editor; Mark OOS / Restore buttons; `PATCH /api/admin/products/{id}/stock` |
| Stock decrement on order placement | ✅ Done | `placeOrder()` reduces `product.stockQuantity` by quantity ordered |
| Cart amount bug fix | ✅ Done | `@Transactional` on `addProductToCart`; removed inverse-side `.add()` call |
| Email order confirmation | ✅ Done | `EmailService` with Gmail SMTP; error logging added |
| Products loading state | ✅ Done | Spinner + error/retry on dashboard |
| Cart loading state | ✅ Done | Spinner while cart fetches; empty state no longer flashes on load |

### 🗺 Phase 10 — Microservices (Parked)
> Start only after Phase 9 is stable in production

| Task | Status |
|---|---|
| Split into User, Product, Order, Payment services | ⏳ Planned |
| API Gateway (Spring Cloud Gateway) + JWT filter | ⏳ Planned |
| Eureka service registry | ⏳ Planned |
| Kafka for async events (order placed → notification, email) | ⏳ Planned |
| Redis caching for product listing | ⏳ Planned |
| Per-service MySQL databases | ⏳ Planned |
| Docker Compose for full microservices stack | ⏳ Planned |

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
# Fill in: DB_PASSWORD, JWT_SECRET, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, MAIL_USERNAME, MAIL_PASSWORD

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
| `MAIL_HOST` | — | `smtp.gmail.com` | SMTP host for OTP emails |
| `MAIL_PORT` | — | `587` | SMTP port |
| `MAIL_USERNAME` | ✅ | — | SMTP username / Gmail address |
| `MAIL_PASSWORD` | ✅ | — | SMTP password / Gmail App Password |

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
