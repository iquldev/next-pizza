# Next Pizza 🍕

A modern, high-performance E-commerce platform for pizza delivery, built with the latest web technologies.

> **Project Inspiration:** This application was developed based on the comprehensive guide by [Archakov Blog](https://www.youtube.com/watch?v=GUwizGbY4cc&t=71114s). While the foundation follows the tutorial, I have implemented numerous architectural improvements and feature enhancements to elevate the project to a production-ready standard.

## 🚀 Enhancements & Custom Features

This version of **Next Pizza** includes several key improvements and features not found in the original guide:

- **⚡ Advanced Caching:** Implemented sophisticated caching strategies for product and ingredient lists to minimize database load and ensure instantaneous page loads.
- **📊 Dynamic Sorting:** Added the ability to sort products by price, providing a more standard e-commerce experience.
- **🔍 Improved Search:** A significantly more robust search implementation for finding products across the entire catalog.
- **✨ Framer Motion Animations:** Enhanced the user interface with fluid, professional-grade animations and transitions.
- **🌓 Dark Theme Support:** Fully integrated dark mode support with a seamless theme switcher.
- **🌐 Localization (i18n):** Complete multi-language support (English & Russian) using `next-intl`.
- **🛡️ BetterAuth Integration:** Replaced the default authentication with **BetterAuth**, featuring custom modal windows and email verification flows.
- **🛒 Optimized Cart Logic:** Refactored the cart management system for better performance and more reliable state synchronization.
- **📦 Orders Management:** Created a dedicated `/orders` page for users to view and manage their purchase history.
- **✅ Smart Filtering:** Improved UX where selected filter items automatically move to the top of the list for easier management.
- **📱 Enhanced Checkout:** Improved phone number filtering and validation during the checkout process to ensure data integrity.
- **🔔 Sonner Notifications:** Integrated modern, customizable toast notifications from the Shadcn UI ecosystem.

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [Better-Auth](https://better-auth.com/)
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/)
- **State Management:** [Zustand](https://docs.pmnd.rs/zustand/) & [SWR](https://swr.vercel.app/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Payments:** [Stripe](https://stripe.com/)
- **Emails:** [Resend](https://resend.com/)

## 🏁 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- A PostgreSQL database instance.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/next-pizza.git
   cd next-pizza
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your credentials (Database, Stripe, Resend, BetterAuth).

4. **Initialize the database:**

   ```bash
   bun db:push
   bun db:seed
   ```

5. **Run the development server:**
   ```bash
   bun dev
   ```

## 📜 Scripts

- `bun dev`: Starts the development server with Turbopack.
- `bun build`: Builds the application for production.
- `bun db:push`: Pushes the Prisma schema to the database.
- `bun db:seed`: Seeds the database with initial data.
- `bun lint`: Runs ESLint for code quality checks.
- `bun format`: Formats the codebase using Prettier.

---

_Made with ❤️ and a lot of caffeine._
