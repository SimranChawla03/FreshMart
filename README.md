# FreshMart — Fresh Groceries, Happy Lives

**College E-Commerce & ERP TA-2 Theory Assessment Project**

---

## 1. Project Overview & Purpose

**FreshMart** is a complete, modern, responsive, and functional online grocery e-commerce web application. Developed as part of the **E-Commerce and Enterprise Resource Planning (ERP) TA-2 Theory Assessment**, FreshMart simulates the complete end-to-end consumer shopping experience of a modern digital supermarket.

The website reproduces the exact layout, color scheme, typography, product cards, category navigation, shopping cart, checkout, and order confirmation workflow illustrated in the design specifications.

- **Brand:** FreshMart
- **Tagline:** Fresh Groceries, Happy Lives
- **Primary Color:** `#168534` (Fresh Emerald Green)
- **Architecture:** Client-Side Single Page Application (Vanilla JavaScript, HTML5, CSS3)
- **Data Persistence:** Browser `localStorage` & `sessionStorage`

---

## 2. Assessment Objectives

1. **ERP & E-Commerce Integration Model:** Demonstrates key digital retail concepts including product catalogue management, inventory categorisation, dynamic pricing, cart states, delivery fee rules, customer order processing, and payment simulation.
2. **Standard-Compliant Tech Stack:** Built using pure **HTML5, CSS3, and Vanilla JavaScript** without any external front-end libraries (no React, Angular, Vue, or Next.js) or backend databases.
3. **High Reliability & Zero Dependencies:** Operates fully offline or online with standalone, vector-crafted local SVG assets for every single category and product.
4. **Responsive & Accessible Design:** Clean user experience across mobile phones, tablets, laptops, and desktop displays.

---

## 3. Technology Stack

- **HTML5:** Semantic structural layout (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`, `<form>`).
- **CSS3:** Custom properties (CSS variables), Flexbox, CSS Grid, animations, print stylesheet for order receipts, media queries for responsive layouts.
- **Vanilla JavaScript (ES6+):** Pure DOM manipulation, event delegation, modular application state, client-side input validation, dynamic calculation engine, and `localStorage` synchronization.
- **Assets:** Scalable Vector Graphics (SVG) crafted for high-density displays and 100% offline self-containment.

---

## 4. Project File Structure

```
ecom/
├── index.html          # Core Single Page Application (all 6 views & modals)
├── style.css           # Comprehensive stylesheet with responsive styling & theme variables
├── script.js          # JavaScript architecture (products, cart, validation, routing)
├── assets/
│   └── images/
│       ├── logo.svg               # FreshMart Leaf-inspired brand logo
│       ├── hero-basket.svg        # Hero section produce basket graphic
│       ├── categories/            # Category vector artwork (6 categories)
│       │   ├── fruits-veg.svg
│       │   ├── dairy-eggs.svg
│       │   ├── snacks-foods.svg
│       │   ├── beverages.svg
│       │   ├── household.svg
│       │   └── personal-care.svg
│       └── products/              # 25 Dedicated grocery item vector illustrations
│           ├── apples.svg
│           ├── bananas.svg
│           ├── biscuits.svg
│           ├── bottled-water.svg
│           ├── bread.svg
│           ├── butter.svg
│           ├── carrots.svg
│           ├── cereal.svg
│           ├── cheese.svg
│           ├── chips.svg
│           ├── cooking-oil.svg
│           ├── detergent.svg
│           ├── dishwashing-liquid.svg
│           ├── eggs.svg
│           ├── handwash.svg
│           ├── milk.svg
│           ├── onions.svg
│           ├── orange-juice.svg
│           ├── potatoes.svg
│           ├── rice.svg
│           ├── shampoo.svg
│           ├── soap.svg
│           ├── tea.svg
│           ├── tomatoes.svg
│           └── toothpaste.svg
└── README.md           # Documentation for project setup & evaluation
```

---

## 5. Key Modules and Features

### 1. Header & Live Navigation
- Sticky header with FreshMart logo, brand tagline, and global product search.
- Live Cart Badge showing total item quantities updated synchronously in real time.
- **Customer Login & Authentication Gate:** Clearly labelled demo login modal validating 10-digit Indian mobile numbers. Enforces login before any grocery product can be added to the shopping cart.
- Dynamic Header Account indicator (`Hi, Rahul`) and a one-click **Logout** button.
- Dark green secondary navigation bar linking to all 6 grocery aisles: *Fruits & Vegetables*, *Dairy & Eggs*, *Snacks & Foods*, *Beverages*, *Household Essentials*, *Personal Care*, and *Offers*.

### 2. Home Page (Screen 1)
- Light mint-green hero banner with grocery imagery, **Estimated Delivery: 10–20 Minutes** badge, and **Shop Now** call to action.
- 4 Service Benefit pillars: **10–20 Min Delivery** (Free over ₹499), Fresh & Quality Guarantee, Weekly Best Offers, and 24/7 Support.
- Interactive **Shop by Category** cards navigating immediately to filtered catalog views.
- **Featured Products Grid** showcasing popular daily staples.
- Weekly promotional strip with one-click offer exploration for 10–20 minute grocery delivery.

### 3. Product Catalogue & Smart Filters (Screen 2)
- 25 sample products complete with units, Indian Rupee (`₹`) pricing, discounted prices, ratings, and tags.
- Category sidebar filtering with active highlights.
- Interactive Price Range slider (₹0 – ₹500) with dynamic numeric feedback.
- Multi-criteria filter checkboxes: *Organic*, *Fresh*, *On Sale*, and *Best Rated (4.7+)*.
- Sorting dropdown: *Popularity*, *Price: Low to High*, *Price: High to Low*, and *Name: A to Z*.
- Informative empty results state with single-click filter reset.

### 4. Product Detail View (Screen 3)
- Breadcrumb navigation (`Home > Category > Product`).
- Image gallery with interactive thumbnail switcher.
- Pricing, discount badges, and live *In Stock* status.
- Prominent **⚡ Estimated Delivery: 10–20 Minutes** pill badge.
- Rich product description and specifications.
- Quantity selector (`-` / `+`) and **Add to Cart** action (enforces login requirement).
- Dedicated "Why you'll love it" highlight cards (*10–20 Min Delivery*, *High in Nutrients*, *No Harmful Chemicals*, *Healthy Choice*).

### 5. Shopping Cart (Screen 4)
- Line-item breakdown displaying item thumbnail, name, unit price, quantity controls, line subtotal, and delete button.
- Real-time Order Summary recalculating instantly on every quantity change.
- **Estimated Delivery: 10–20 Minutes** displayed prominently in the order summary.
- **Free Delivery Calculation Rule:**
  - Subtotal $\ge$ ₹499 $\rightarrow$ **FREE Delivery** (₹0).
  - Subtotal $<$ ₹499 $\rightarrow$ **₹40 Standard Delivery Fee**.
  - Dynamic progress message: *"Add ₹X more to unlock FREE Delivery!"*
- Full cart state persistence across page reloads via `localStorage`.
- Empty cart state with quick "Start Shopping" button.

### 6. Checkout & Form Validation (Screen 5)
- Displays **⚡ Estimated Delivery: 10–20 Minutes** in the step header and order summary.
- Step 1: Customer Delivery Information:
  - Full Name validation (minimum 2 characters).
  - Indian Mobile Number validation (strictly 10 digits).
  - Email format validation (optional, checked if provided).
  - Street address, City, and PIN code validation (strictly 6 digits).
- Step 2: Payment Method Simulation:
  - Cash on Delivery (COD)
  - UPI Payment Simulation (GPay / PhonePe / Paytm)
  - Debit / Credit Card Simulation
- Empty-cart checkout prevention and non-destructive validation (retains entered data).

### 7. Order Confirmation & Receipt (Screen 6)
- Animated success checkmark badge.
- Automatically generated unique demonstration Order ID (e.g. `FM20261027-4821`).
- Complete order receipt detailing customer info, items, line totals, delivery charges, payment method, and **Estimated Delivery: 10–20 Minutes**.
- **Print Receipt** feature optimized with a dedicated `@media print` stylesheet.
- Automatic cart cleanup only after order placement succeeds.
- **Print Receipt** feature optimized with a dedicated `@media print` stylesheet.
- Automatic cart cleanup only after order placement succeeds.

---

## 6. How to Run and Test the Website

### Option 1: Direct File Launch (No server required)
Because FreshMart is built with pure client-side web technologies and local vector assets, you can simply open the file directly in any modern browser:
1. Navigate to the project folder: `c:\Users\VICTUS\Desktop\Ecom`.
2. Double click **`index.html`** or right-click $\rightarrow$ **Open with** $\rightarrow$ **Google Chrome / Microsoft Edge / Firefox**.

### Option 2: Using a Local Development Server (Recommended for college demonstration)
Using Python's built-in HTTP server:
1. Open PowerShell or Command Prompt in the `ecom` directory:
   ```powershell
   cd C:\Users\VICTUS\Desktop\Ecom
   python -m http.server 8000
   ```
2. Open your web browser and navigate to:
   ```
   http://localhost:8000
   ```

---

## 7. Step-by-Step Demonstration Workflow (For Assessment Evaluation)

Follow these steps during your live presentation or viva:

1. **Home Page Tour:**
   - Observe the header, logo, search bar, and dark green category navigation.
   - Point out the 4 service benefits and 6 category cards.
   - Click the **Shop Now** button on the hero banner.
2. **Product Catalogue & Filtering:**
   - Notice the catalog displays the grocery items with INR prices.
   - Click **Dairy & Eggs** in the sidebar: note how only dairy items appear and the item count updates.
   - Adjust the **Price Range** slider to ₹100 and click **Apply**: note how only items under ₹100 are displayed.
   - Use the **Sort by** dropdown $\rightarrow$ **Price: Low to High**.
   - Type `"apple"` in the search bar to test live search.
3. **Product Detail View & Login Gate:**
   - Click on **Fresh Apples**.
   - Notice the **⚡ Estimated Delivery: 10–20 Minutes** badge, inspect images and description.
   - Click **Add to Cart** while logged out:
     - Notice the product is **NOT** added to the cart and the cart badge remains `0`.
     - Observe the warning toast: *"Please log in to add products to your cart."* with a **Log In** button.
     - Observe the **Customer Login (Demo Mode)** modal opening automatically.
   - Enter a valid 10-digit Indian mobile number (e.g., `9876543210`) and click **Log In & Continue Shopping** (or use the 1-Click Demo Login button).
   - Notice that **logging in does NOT automatically add the product**. You are returned to the shopping page and the header now displays `Hi, Rahul` and a red **Logout** button.
   - Now click **Add to Cart** again: observe the success toast *"Product added to cart successfully!"* and the cart badge updates immediately to `Cart (1)`.
4. **Shopping Cart & Free Delivery Rule:**
   - Click the **Cart** button in the header.
   - Observe the line items, unit prices, quantity buttons, and subtotal.
   - Notice **Estimated Delivery: 10–20 Minutes** and the delivery charge calculation.
   - Increase the quantity until the subtotal reaches $\ge$ ₹499: notice the delivery fee switches to **FREE** immediately!
   - Refresh the browser (`F5`): notice the login session and cart contents remain intact via `localStorage`.
5. **Checkout & Form Validation:**
   - Click **Proceed to Checkout**.
   - Notice customer details are automatically pre-filled from the logged-in demo profile.
   - Observe **Estimated Delivery: 10–20 Minutes** in the delivery header and order summary.
   - Select **Cash on Delivery (COD)** or **UPI Payment**.
   - Click **Place Order**.
6. **Order Confirmation:**
   - View the generated Order ID, item breakdown, and **Estimated Delivery: 10–20 Minutes**.
   - Click **Print Receipt** to demonstrate the clean print layout.
   - Click **Continue Shopping**: notice the cart count has reset to `0`, ready for a new shopping session.
7. **Logout & Restriction Restoration:**
   - Click the **Logout** button in the header.
   - Confirm logout: observe header changes back to `Login`.
   - Attempt to click **Add to Cart** on any item: notice login is once again strictly required!

---

## 8. Academic Notes & Limitations

- **Simulated Payment Gateway:** For academic and security reasons, payment options are simulated. No financial credentials, CVVs, or OTPs are requested.
- **Local Client Storage:** Data is stored in the browser's `localStorage` for privacy and ease of testing without requiring external database setups.
- **Browser Compatibility:** Works across Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, and mobile web browsers.
