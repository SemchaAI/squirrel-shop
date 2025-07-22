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

-Check .env.example file in root directory

---

## 🧪 Setup Config

### Local Setup

### Deploy Setup

---

## 📈 Roadmap

- [ ] Accessibility improvements
- [ ] Test and Add email sending with [React Email](https://react.email/)
- [ ] Expand admin panel
- [ ] Comments/Rating system
- [ ] Banners from db
- [ ] Jest for unit tests(initially, better was to use from start)
- [ ] Profile configuration page for registered Users
- [ ] 0Auth providers integration (Google as minimal)

---

## Optimization ways

### NoBarrelFiles

The data are approximate, since the tests and measurements were carried out in several directions in parallel, and were not saved at that moment.

**Before Delete Barrel Files**
-Route (app) ƒ / -> Size 110 B -> First Load JS 332 kB
**After Delete Barrel Files**
-Route (app) ƒ / -> Size 3.14 kB -> First Load JS 187 kB

### Middleware

-Next auth v5 recommend to use auth Wrapper(based on out auth config) around our middleware
-But since we use in config big dependencies (prisma for example), i just get token with getToken function

**Before Simplify middleware**
ƒ Middleware -> ~150kb
**After Simplify middleware**
ƒ Middleware -> 44.6 kB

### Dynamic imports

-Some components use dynamic import,for lazy load js bundle
-For example: Search input (very important since he is used in all root layout, and also import big package like motion)
-Form data inside modals(mostly in admin pages, but its really good option to save loading js)

---
