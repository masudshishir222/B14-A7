# 🛒 বাজার দর (Bazar Dor)

Bazar Dor is a modern, responsive web application designed to help users track the daily market prices of essential commodities. From daily price fluctuations to market-specific rates for groceries, vegetables, and meat, Bazar Dor provides a comprehensive overview of the current market trends, complete with user authentication and personalized profiles.

### 🔗 Live Demo
> **[Insert Live Website Link Here]**

---

## ✨ Key Features

1. **Live Price Ticker (Marquee):** An infinitely scrolling banner in the navigation bar displaying real-time prices and percentage changes (▲/▼) of essential products.
2. **Daily Market Trends:** Dedicated homepage sections instantly highlight the top 6 price risers ("আজ দাম বেড়েছে ▲") and top 6 price fallers ("আজ দাম কমেছে ▼") of the day.
3. **Comprehensive Product Filtering & Sorting:** Users can browse items by specific categories and sort them by price (Low to High / High to Low) using Bengali numeral sorting logic.
4. **Detailed Market-Specific Pricing:** Protected detail pages display the minimum, maximum, and average prices of a product across various local markets.
5. **Secure Authentication System:** Integrated BetterAuth supporting Email/Password and Social Logins (Google/GitHub), safeguarding product details and profile routes.
6. **User Profile Management:** Authenticated users can access a personalized dashboard to update their profile information.
7. **Responsive & Accessible UI:** Fully optimized for mobile, tablet, and desktop screens with seamless loading states (skeletons), informative toast notifications, and custom 404 error pages.

---

## 🛠️ Technologies Used

* **Framework:** Next.js (App Router)
* **Language:** TypeScript / JavaScript
* **Styling:** Tailwind CSS
* **Component Library:** DaisyUI / Hero UI
* **Authentication:** BetterAuth
* **Notifications:** React Hot Toast (`react-hot-toast`)
* **Deployment:** Vercel / Netlify / Cloudflare Pages

---

## 📡 API Reference

The application consumes data from the following endpoints:

* **Base URL:** `https://openapi.programming-hero.com/api/bazardor` (Fallback: `https://api.api-store.workers.dev/api/bazardor`)
* **All Products:** `/products`
* **Filter by Category:** `/products?category={category_name}`
* **Single Product Details:** `/products/{id}`
* **All Categories:** `/categories`
* **Single Category:** `/categories/{category_name}`

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone [Insert GitHub Repository Link Here]
   ```
2. Navigate into the project directory:
   ```bash
   cd bazardor
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables. Create a `.env.local` file in the root directory and add your BetterAuth secrets and API base URLs.
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:3000` in your browser to see the application.