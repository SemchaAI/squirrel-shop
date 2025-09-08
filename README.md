--Full Description will be soon--

# 🛒 eCommerce Web Application - Squirrel Shop

A modern, full-stack eCommerce platform built with **Next.js**, **Prisma**, **Tailwind CSS**, and **PostgreSQL**. Supports guest carts, product variants, filters, authentication, Stripe checkout, and more.

---

## 📦 Features

- ✅ Full-featured shopping cart (Guest & Authenticated)
- 🧾 Product variants (color, RAM, memory, etc.)
- 🔍 Product filters, sorting, and pagination
- 👤 Authentication with NextAuth
- 🎨 Fully responsive UI with Tailwind CSS(root)
- 💳 Stripe integration for secure payments
- ✉️ Email verification(notifications etc.) with Nodemailer
- 🌒 Light/Dark theme toggle with next-themes
- 🔐 Role-based route protection via middleware
- 🔁 Session monitoring with automatic expiry detection
- 📊 Analytics with Vercel Analytics and Speed Insights
- 🧹 Cron job for cleanup and user management on deploy

---

## ⚙️ Tech Stack

### 🧠 Core

- **Next.js 15** – App Router, Server Actions, Middleware
- **React 19** – Latest concurrent features
- **TypeScript** – Type-safe development
- **Zod** – Schema validation
- **Prisma ORM** – Type-safe DB access
- **PostgreSQL** – Relational database

### 🔐 Auth & Session

- **NextAuth v5** – Secure authentication
- **@auth/prisma-adapter** – Persist sessions in DB
- **bcryptjs** – Password hashing

### 🎨 Styling

- **Tailwind CSS v4** – Utility-first styling
- **Prettier + Tailwind Plugin** – Code formatting
- **Next-themes** - Light/Dark theme toggle

### 📦 State & API

- **Zustand** – Global state (cart, favorites, loadingOverlay)
- **@tanstack/react-query** – Data fetching and caching

### 💳 Payments

- **Stripe + stripe-js** – Checkout and webhooks

### 🛠 Dev Tools

- **ESLint + Prettier** – Code quality
- **Bundle Analyzer** – Analyze build size
- **Vercel Speed Insights/Analytics** – Vercel metrics

### 📧 Email

- **Nodemailer** – Email verification, reset flows

### 📁 Uploads

- **UploadThing** – File uploads with Dropzone/Button

### 📐 Forms & UI

- **React Hook Form + Zod** – Form management + validation
- **Lucide React** – Icons
- **Embla Carousel** – Image sliders with autoplay
- **react-hot-toast** – Notifications

---

## 🧰 Environment Variables

-full guide will be soon
-Check .env.example file in root directory

---

## 🧰 Test and Lint Workflow

I'm using **Jest** for testing. Note that it has some issues with **Bun** (it can be configured, but I found it inconvenient), so I use **npm** for testing. You can use other package managers if you prefer.

### 1. Global Lint

```bash
npm run lint
```

Uses Next.js lint to check all project files (configurable via Next.js).

### 2. Test Lint

```bash
   npm run lint:tests
```

Uses ESLint directly.

Analyzes only test files: inside the **tests** folder or any file with .test in its name.

Counts both errors and warnings.

### 3. File-Specific Test Lint

```bash
   npm run lint:file src/**/Select.test.tsx
```

Lints a specific test file (e.g., src/\*\*/Select.test.tsx).

Recommended when working on new features or logic.

Suggested Workflow

1. Lint a single file → npm run lint:file

2. Lint all tests → npm run lint:tests

3. Global lint → npm run lint

4. Build project → bun run build

5. Perform a visual check before pushing to Git

---

## 🧪 Setup Config

### Local Setup

### Deploy Setup

---

## 📈 Roadmap

- [🚧] Accessibility improvements (100% main page and some other improvements)
- [ ] Test and Add email sending with [React Email](https://react.email/)
- [🚧] Expand admin panel (added basic minimal content management for admins)
- [🚧] Comments/Rating system (base version is ready, can be changed after tests)
- [❌] Banners from db (changed banner for more actual, but think isn`t bad for optimization to be local FCP)
- [🚧] Jest for unit tests. (Better was to use from start, but added now for learning jest, verify own code, and make it more stable now and for future changes)
- [ ] Profile configuration page for registered Users
- [ ] 0Auth providers integration (Google as minimal)

---

## 🚀 Optimization ways

### NoBarrelFiles

The data are approximate, since the tests and measurements were carried out in several directions in parallel, and were not saved at that moment.

**Before Delete Barrel Files**
-Route (app) ƒ / -> Size 110 B -> First Load JS 332 kB
**After Delete Barrel Files(v.0.3.0)**
-Route (app) ƒ / -> Size 4.76 kB -> First Load JS 149 kB

### Middleware

-Next auth v5 recommend to use auth Wrapper(based on out auth config) around our middleware
-But since we use in config big dependencies (prisma for example), i just get token with getToken function
-Also very important to configure matcher correct for minimize triggers

1. Increased JavaScript execution time
   -Middleware adds processing to every matched route — if it runs for all requests (e.g., static files, images, APIs), it blocks rendering, increasing JS execution time.

2. More main-thread work
   -Middleware can serialize/deserialize tokens. If done unnecessarily on every route(e.g., static files, images, APIs), this adds computation to the main thread.

3. Slow initial server response time
   -Middleware runs before rendering your page, and if its doing heavy work its will slow response time

**Before Simplify middleware**
ƒ Middleware -> ~150kb
**After Simplify middleware**
ƒ Middleware -> 44.6 kB

### Dynamic imports

-Some components use dynamic import,for lazy load js bundle
-For example: Search input (very important since he is used in all root layout, and also import big package like motion)
-Form data inside modals(mostly in admin pages, but its really good option to save loading js)

---
