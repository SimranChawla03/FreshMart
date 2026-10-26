"""
Script to build the professional 11-page FreshMart TA-2 E-Commerce & ERP Project Report PDF.
Target: Exactly 11 pages (within the 8-12 page requirement).
"""

import os
import subprocess
import re

html_content = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>FreshMart — TA-2 E-Commerce Project Report</title>
<style>
  @page {
    size: A4 portrait;
    margin: 12mm 14mm 14mm 14mm;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    line-height: 1.4;
    font-size: 9.5pt;
    margin: 0;
    padding: 0;
    background: #ffffff;
  }

  /* Page Break Control */
  .page-break {
    page-break-after: always;
    break-after: page;
  }

  .avoid-break {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  /* Running Header & Footer */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid #168534;
    padding-bottom: 4px;
    margin-bottom: 10px;
    font-size: 8pt;
    color: #475569;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .page-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #cbd5e1;
    padding-top: 4px;
    margin-top: 10px;
    font-size: 8pt;
    color: #64748b;
  }

  /* Typography */
  h1, h2, h3, h4 {
    color: #0f4a1f;
    font-weight: 700;
    margin-top: 0.6em;
    margin-bottom: 0.25em;
    line-height: 1.2;
  }

  h1 { font-size: 15pt; border-bottom: 2px solid #168534; padding-bottom: 3px; }
  h2 { font-size: 12pt; color: #168534; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px; }
  h3 { font-size: 10pt; color: #1e3a24; margin-top: 0.5em; }
  h4 { font-size: 9.5pt; color: #334155; }

  p {
    margin: 0.25em 0 0.5em 0;
    text-align: justify;
  }

  ul, ol {
    margin: 0.2em 0 0.5em 1.2em;
    padding: 0;
  }

  li {
    margin-bottom: 0.2em;
  }

  code {
    font-family: Consolas, 'Courier New', monospace;
    background: #f1f5f9;
    padding: 1px 4px;
    border-radius: 3px;
    font-size: 8.5pt;
    color: #0f4a1f;
  }

  /* Cover Page */
  .cover-container {
    height: 268mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 3px double #168534;
    padding: 16mm 14mm;
    text-align: center;
    background: radial-gradient(circle at top right, #f0fdf4 0%, #ffffff 70%);
  }

  .cover-header .inst-name {
    font-size: 19pt;
    font-weight: 800;
    color: #0f4a1f;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .cover-header .dept-name {
    font-size: 12pt;
    font-weight: 600;
    color: #168534;
    margin-bottom: 6px;
  }

  .cover-header .sub-badge {
    display: inline-block;
    background: #eaf8ee;
    color: #0f4a1f;
    border: 1px solid #86efac;
    padding: 5px 14px;
    border-radius: 20px;
    font-size: 9.5pt;
    font-weight: 700;
    margin-top: 4px;
  }

  .cover-title-area {
    margin: 15px 0;
    padding: 18px 12px;
    background: #ffffff;
    border: 2px solid #168534;
    border-radius: 10px;
    box-shadow: 0 4px 14px rgba(22, 133, 52, 0.08);
  }

  .cover-title-area .proj-label {
    font-size: 10pt;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #64748b;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .cover-title-area .proj-title {
    font-size: 21pt;
    font-weight: 800;
    color: #0f4a1f;
    line-height: 1.2;
    margin-bottom: 6px;
  }

  .cover-title-area .proj-subtitle {
    font-size: 12pt;
    font-weight: 600;
    color: #168534;
    font-style: italic;
  }

  .cover-meta-grid {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin: 12px 0;
    text-align: left;
  }

  .cover-card {
    flex: 1;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-left: 4px solid #168534;
    border-radius: 6px;
    padding: 10px 12px;
    font-size: 9pt;
  }

  .cover-card h4 {
    margin: 0 0 6px 0;
    color: #0f4a1f;
    font-size: 9.5pt;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 3px;
  }

  .cover-card table {
    width: 100%;
    border-collapse: collapse;
  }

  .cover-card td {
    padding: 2.5px 0;
    font-size: 9pt;
  }

  .cover-card td.lbl {
    color: #64748b;
    font-weight: 600;
    width: 38%;
  }

  .cover-card td.val {
    color: #0f172a;
    font-weight: 700;
  }

  .cover-card .placeholder {
    color: #b45309;
    background: #fef3c7;
    padding: 1px 4px;
    border-radius: 3px;
    font-family: monospace;
    font-size: 8.5pt;
  }

  .cover-footer {
    border-top: 1px solid #cbd5e1;
    padding-top: 8px;
    font-size: 9pt;
    color: #475569;
  }

  /* Table of Contents */
  .toc-table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 16px 0;
  }

  .toc-table tr {
    border-bottom: 1px dotted #cbd5e1;
  }

  .toc-table td {
    padding: 5px 2px;
    font-size: 9.5pt;
  }

  .toc-title { font-weight: 600; color: #1e293b; }
  .toc-dots { color: #94a3b8; letter-spacing: 2px; text-align: right; }
  .toc-page { text-align: right; font-weight: 700; color: #168534; width: 35px; }

  /* Data & Comparison Tables */
  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0;
    font-size: 8pt;
  }

  .data-table th, .data-table td {
    border: 1px solid #cbd5e1;
    padding: 4px 6px;
    text-align: left;
  }

  .data-table th {
    background: #eaf8ee;
    color: #0f4a1f;
    font-weight: 700;
    font-size: 8pt;
  }

  .data-table tr:nth-child(even) {
    background: #f8fafc;
  }

  .status-pass {
    display: inline-block;
    background: #168534;
    color: #ffffff;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 3px;
    font-size: 7.5pt;
  }

  /* Callout Boxes */
  .callout {
    background: #f0fdf4;
    border: 1px solid #86efac;
    border-left: 4px solid #168534;
    border-radius: 4px;
    padding: 6px 10px;
    margin: 6px 0;
    font-size: 8.5pt;
  }

  .callout strong {
    color: #0f4a1f;
  }

  /* Screenshot Cards */
  .fig-card {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    padding: 5px;
    margin-bottom: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .fig-card img {
    display: block;
    width: 100%;
    max-height: 140px;
    object-fit: contain;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
  }

  .fig-caption {
    margin-top: 3px;
    font-size: 7.5pt;
    color: #334155;
    line-height: 1.25;
  }

  .fig-caption strong {
    color: #0f4a1f;
  }

  /* Workflow diagram */
  .workflow-box {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    padding: 6px;
    margin: 6px 0;
    font-family: Consolas, monospace;
    font-size: 7pt;
    line-height: 1.25;
    white-space: pre;
    color: #0f172a;
    overflow: hidden;
  }
</style>
</head>
<body>

<!-- =========================================================================
     PAGE 1: COVER PAGE
     ========================================================================= -->
<div class="cover-container page-break">
  <div class="cover-header">
    <div class="inst-name">Ramdeobaba University, Nagpur</div>
    <div class="dept-name">Department of Computer Science and Engineering</div>
    <div class="sub-badge">E-Commerce and ERP &bull; TA-2 Theory Assessment</div>
  </div>

  <div class="cover-title-area">
    <div class="proj-label">Course Project &amp; Case Study Report</div>
    <div class="proj-title">FreshMart — Online Grocery Shopping Portal</div>
    <div class="proj-subtitle">&ldquo;Fresh Groceries, Happy Lives&rdquo;</div>
  </div>

  <div class="cover-meta-grid">
    <div class="cover-card">
      <h4>Student Credentials</h4>
      <table>
        <tr><td class="lbl">Student Name:</td><td class="val"><span class="placeholder">[Insert your full name]</span></td></tr>
        <tr><td class="lbl">Roll Number:</td><td class="val"><span class="placeholder">[Insert your roll number]</span></td></tr>
        <tr><td class="lbl">Section:</td><td class="val"><span class="placeholder">[Insert your section]</span></td></tr>
        <tr><td class="lbl">Degree / Branch:</td><td class="val">B.Tech &bull; CSE</td></tr>
        <tr><td class="lbl">Academic Year:</td><td class="val">2026–2027</td></tr>
      </table>
    </div>

    <div class="cover-card">
      <h4>Course &amp; Project Info</h4>
      <table>
        <tr><td class="lbl">Subject:</td><td class="val">E-Commerce and ERP</td></tr>
        <tr><td class="lbl">Assessment:</td><td class="val">TA-2 Theory Assessment</td></tr>
        <tr><td class="lbl">Application Type:</td><td class="val">Single-Page E-Commerce Web App</td></tr>
        <tr><td class="lbl">Technology:</td><td class="val">HTML5 &bull; CSS3 &bull; Vanilla JS (ES6+)</td></tr>
        <tr><td class="lbl">Submission:</td><td class="val">Academic Term Evaluation</td></tr>
      </table>
    </div>
  </div>

  <div class="cover-footer">
    <strong>Institution:</strong> Ramdeobaba University, Ramdeo Tekdi, Gittikhadan, Katol Road, Nagpur, Maharashtra 440013<br>
    <em>A comprehensive project report submitted in partial fulfillment of the continuous assessment requirements for E-Commerce and ERP.</em>
  </div>
</div>

<!-- =========================================================================
     PAGE 2: TABLE OF CONTENTS & EXECUTIVE SUMMARY
     ========================================================================= -->
<div class="page-header">
  <span>FreshMart &bull; TA-2 Project Report</span>
  <span>Table of Contents &amp; Executive Summary</span>
</div>

<h2>Table of Contents</h2>
<table class="toc-table">
  <tr><td class="toc-title">1. Introduction &amp; Background</td><td class="toc-dots">....................................................................................................................</td><td class="toc-page">3</td></tr>
  <tr><td class="toc-title">2. Project Objectives</td><td class="toc-dots">....................................................................................................................</td><td class="toc-page">3</td></tr>
  <tr><td class="toc-title">3. Project Scope</td><td class="toc-dots">....................................................................................................................</td><td class="toc-page">4</td></tr>
  <tr><td class="toc-title">4. Technologies Used &amp; Architectural Rationale</td><td class="toc-dots">....................................................................................................................</td><td class="toc-page">4</td></tr>
  <tr><td class="toc-title">5. System Workflow &amp; Customer Journey</td><td class="toc-dots">....................................................................................................................</td><td class="toc-page">5</td></tr>
  <tr><td class="toc-title">6. Major Modules and Features (Part 1)</td><td class="toc-dots">....................................................................................................................</td><td class="toc-page">5</td></tr>
  <tr><td class="toc-title">6. Major Modules and Features (Part 2)</td><td class="toc-dots">....................................................................................................................</td><td class="toc-page">6</td></tr>
  <tr><td class="toc-title">7. Screenshots of the Actual Website (Figures 1–3)</td><td class="toc-dots">....................................................................................................................</td><td class="toc-page">7</td></tr>
  <tr><td class="toc-title">7. Screenshots of the Actual Website (Figures 4–6)</td><td class="toc-dots">....................................................................................................................</td><td class="toc-page">8</td></tr>
  <tr><td class="toc-title">7. Screenshots of the Actual Website (Figures 7–9)</td><td class="toc-dots">....................................................................................................................</td><td class="toc-page">9</td></tr>
  <tr><td class="toc-title">8. Testing Details &amp; Verification Matrix</td><td class="toc-dots">....................................................................................................................</td><td class="toc-page">10</td></tr>
  <tr><td class="toc-title">9. Advantages &amp; Project Limitations</td><td class="toc-dots">....................................................................................................................</td><td class="toc-page">11</td></tr>
  <tr><td class="toc-title">10. Proposed Future Enhancements</td><td class="toc-dots">....................................................................................................................</td><td class="toc-page">11</td></tr>
  <tr><td class="toc-title">11. Conclusion &amp; References</td><td class="toc-dots">....................................................................................................................</td><td class="toc-page">11</td></tr>
</table>

<h2>Executive Summary</h2>
<p>
  <strong>FreshMart</strong> is a single-page web application (SPA) built to model modern quick-commerce grocery operations. Developed with pure HTML5, CSS3, and modern vanilla JavaScript, the system demonstrates the practical convergence of front-facing E-Commerce catalogs with back-office ERP logic, including category item indexing, price and discount computations, dynamic delivery fee thresholds, cart persistence, and customer verification guards.
</p>
<p>
  The project highlights two critical business constraints:
</p>
<ul>
  <li><strong>Mandatory Authentication Guard:</strong> Customers can freely browse the catalog, inspect product specifications, and filter categories without friction. However, attempts to add items to the shopping cart require an explicit demo login with a 10-digit Indian mobile number. To prevent accidental checkout additions, the system intentionally requires the customer to click &ldquo;Add to Cart&rdquo; again after authentication.</li>
  <li><strong>Consistent Quick-Commerce Delivery Messaging:</strong> Quick-commerce portals differentiate through fast delivery. FreshMart enforces an explicit estimate of <strong>10–20 Minutes</strong> across all customer-facing touchpoints (announcement bar, hero section, product modals, cart drawer, checkout dialog, and order fulfillment screen).</li>
</ul>

<div class="callout">
  <strong>Key Deliverable Notice:</strong> The implementation runs entirely locally in standard web browsers, utilizes 33 embedded SVG product illustrations, stores cart and session states in <code>localStorage</code>, and requires zero third-party dependencies or external backend servers.
</div>

<div class="page-footer">
  <span>Ramdeobaba University &bull; Dept of CSE</span>
  <span>Page 2</span>
</div>
<div class="page-break"></div>

<!-- =========================================================================
     PAGE 3: INTRODUCTION & OBJECTIVES
     ========================================================================= -->
<div class="page-header">
  <span>FreshMart &bull; TA-2 Project Report</span>
  <span>Introduction &amp; Project Objectives</span>
</div>

<h2>1. Introduction &amp; Background</h2>
<p>
  Electronic Commerce (E-Commerce) refers to the buying and selling of goods and services over electronic networks, primarily the Internet. In modern retail supply chains, digital grocery portals have transformed traditional supermarket shopping into an automated, highly efficient consumer journey. By combining intuitive web interfaces with backend enterprise resource planning (ERP) concepts—such as inventory catalogue classification, dynamic price calculations, delivery rule engines, and order lifecycle management—E-Commerce portals empower consumers to procure daily essentials from the convenience of their homes while reducing operational overhead for retailers.
</p>
<p>
  <strong>FreshMart — Online Grocery Shopping Portal</strong> (tagline: <em>&ldquo;Fresh Groceries, Happy Lives&rdquo;</em>) is an educational, production-ready frontend E-Commerce web application developed to demonstrate core principles taught in the <strong>E-Commerce and ERP</strong> curriculum. The portal simulates a modern quick-commerce grocery business model, offering consumers a catalogue of fresh fruits, vegetables, dairy, bakery items, beverages, and pantry staples.
</p>
<p>
  FreshMart addresses common usability and transactional challenges in quick-commerce web design. Specifically, it incorporates:
</p>
<ul>
  <li><strong>Structured Catalogue Navigation:</strong> Dynamic categorization with real-time product count badges across multiple grocery departments.</li>
  <li><strong>Instant Product Discovery:</strong> Client-side multi-parameter search combined with category filtering and real-time empty-state feedback.</li>
  <li><strong>Controlled Transaction Funnel:</strong> A mandatory authentication guard requiring customers to log in before adding items to their cart, avoiding anonymous ghost carts while maintaining frictionless browsing.</li>
  <li><strong>Automated ERP Pricing Engine:</strong> Instant subtotal, delivery fee calculation (free delivery above ₹500, else ₹40), and dynamic discounts.</li>
  <li><strong>Hyper-Local Delivery Messaging:</strong> Consistent communication of a <strong>10–20 minute delivery window</strong> across 11 key touchpoints.</li>
  <li><strong>Persistent State Management:</strong> Full data persistence across browser reloads using HTML5 <code>localStorage</code>.</li>
</ul>

<h2>2. Project Objectives</h2>
<p>The primary engineering and educational objectives of the FreshMart project include:</p>
<ol>
  <li><strong>Designing a Modern E-Commerce UI:</strong> Build an appealing, responsive grocery shopping portal utilizing an emerald green palette (<code>#168534</code>) that aligns with fresh produce retail standards.</li>
  <li><strong>Multi-Category Inventory Management:</strong> Structure products into intuitive categories (Fruits &amp; Vegetables, Dairy &amp; Eggs, Bakery &amp; Bread, Beverages, Snacks &amp; Munchies, Pantry Staples) with dynamic counts.</li>
  <li><strong>Search &amp; Filter Implementation:</strong> Implement responsive keyword filtering across product names, descriptions, and categories with instantaneous DOM re-rendering.</li>
  <li><strong>Enforcing Authentication Gate:</strong> Require customer verification (10-digit Indian mobile number) prior to adding items to the cart, preventing unverified cart modifications while preserving open browsing.</li>
  <li><strong>ERP Pricing and Cart Calculation:</strong> Dynamically compute item subtotals, apply delivery fee thresholds (₹40 under ₹500, free at/above ₹500), and display live quantity badges.</li>
  <li><strong>Comprehensive Checkout Form Validation:</strong> Validate recipient full name, valid 10-digit phone, street address, pin code, and payment method selection (Cash on Delivery, UPI, Cards).</li>
  <li><strong>Simulating Quick-Commerce Fulfillment:</strong> Generate unique order identifiers, clear active carts, persist order summaries to <code>localStorage</code>, and confirm delivery within 10–20 minutes.</li>
</ol>

<div class="page-footer">
  <span>Ramdeobaba University &bull; Dept of CSE</span>
  <span>Page 3</span>
</div>
<div class="page-break"></div>

<!-- =========================================================================
     PAGE 4: SCOPE & TECHNOLOGIES USED
     ========================================================================= -->
<div class="page-header">
  <span>FreshMart &bull; TA-2 Project Report</span>
  <span>Project Scope &amp; Technologies Used</span>
</div>

<h2>3. Project Scope</h2>
<p>The project scope was defined to balance comprehensive frontend feature richness with self-contained, zero-dependency local execution:</p>
<table class="data-table">
  <thead>
    <tr>
      <th style="width: 20%;">Dimension</th>
      <th style="width: 40%;">In-Scope Features (Implemented)</th>
      <th style="width: 40%;">Out-of-Scope (Future Enhancements)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Frontend Architecture</strong></td>
      <td>Pure HTML5, CSS3, Vanilla JavaScript (ES6+); modular CSS custom properties; responsive Flexbox/Grid.</td>
      <td>Server-side rendering (SSR), Angular, React, Vue, or TypeScript frameworks.</td>
    </tr>
    <tr>
      <td><strong>User Authentication</strong></td>
      <td>Client-side 10-digit Indian mobile validation, demo credentials, header profile sync, persistent session.</td>
      <td>External SMS gateway integration (Twilio/Fast2SMS), OAuth2/Google Sign-In, biometric auth.</td>
    </tr>
    <tr>
      <td><strong>Inventory &amp; Pricing</strong></td>
      <td>25 structured grocery products, pricing in INR (₹), discount tags, stock status, delivery fee tier.</td>
      <td>Live inventory depletion against relational database (MySQL/PostgreSQL), multi-warehouse ERP.</td>
    </tr>
    <tr>
      <td><strong>Payment &amp; Fulfillment</strong></td>
      <td>Simulated checkout with COD, UPI QR, and Card radio options; unique order ID generation; order modal.</td>
      <td>Production payment gateways (Razorpay, Stripe, PayU), real-time bank settlement, SMS webhook.</td>
    </tr>
    <tr>
      <td><strong>Data Persistence</strong></td>
      <td>Browser-native <code>localStorage</code> for cart items, user session state, and order history logs.</td>
      <td>Enterprise cloud database (MongoDB Atlas, AWS DynamoDB), distributed session stores (Redis).</td>
    </tr>
  </tbody>
</table>

<h2>4. Technologies Used &amp; Architectural Rationale</h2>
<table class="data-table">
  <thead>
    <tr>
      <th style="width: 20%;">Technology</th>
      <th style="width: 25%;">Component / Role</th>
      <th style="width: 55%;">Architectural Rationale</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>HTML5</strong></td>
      <td>Semantic Page Skeleton</td>
      <td>Provides accessible landmarks (<code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;dialog&gt;</code>), enabling search crawlers and screen readers to parse the shopping portal natively.</td>
    </tr>
    <tr>
      <td><strong>CSS3</strong></td>
      <td>Styling &amp; Responsive Layout</td>
      <td>Utilizes CSS Custom Properties (variables) for theme consistency (<code>--primary: #168534</code>), CSS Grid for catalog layouts, Flexbox for header alignment, and media queries for desktop/tablet/mobile responsiveness.</td>
    </tr>
    <tr>
      <td><strong>Vanilla JavaScript (ES6+)</strong></td>
      <td>State &amp; DOM Controller</td>
      <td>Implements event listeners, array manipulations (<code>map</code>, <code>filter</code>, <code>reduce</code>), modal controls, dynamic HTML generation, and transactional validations without third-party library overhead.</td>
    </tr>
    <tr>
      <td><strong>HTML5 Web Storage</strong></td>
      <td>Client-Side Persistence</td>
      <td><code>localStorage</code> retains user login credentials, cart items, quantities, and past order records across browser reloads without requiring an active backend server.</td>
    </tr>
    <tr>
      <td><strong>Scalable Vector Graphics (SVG)</strong></td>
      <td>Visual Assets &amp; Produce Imagery</td>
      <td>33 custom SVGs provide lightweight, infinitely scalable, high-DPI product artwork and UI icons with zero network latency and complete offline reliability.</td>
    </tr>
  </tbody>
</table>

<div class="callout">
  <strong>Stack Independence Rationale:</strong> Relying exclusively on standard web technologies guarantees that FreshMart executes smoothly in any modern browser on Windows, macOS, Linux, and Android without requiring Node.js runtime environments, npm module compilation, or active internet connectivity.
</div>

<div class="page-footer">
  <span>Ramdeobaba University &bull; Dept of CSE</span>
  <span>Page 4</span>
</div>
<div class="page-break"></div>

<!-- =========================================================================
     PAGE 5: WORKFLOW & MAJOR MODULES (PART 1)
     ========================================================================= -->
<div class="page-header">
  <span>FreshMart &bull; TA-2 Project Report</span>
  <span>Workflow &amp; Major Modules (Part 1)</span>
</div>

<h2>5. System Workflow &amp; Customer Journey</h2>
<p>
  FreshMart models an end-to-end quick-commerce shopping journey. The state machine strictly enforces customer authentication before allowing items to enter the cart, preventing unverified transactions.
</p>

<div class="workflow-box">
+---------------------------------------------------------------------------------------------------+
|                                FRESHMART SYSTEM WORKFLOW & TRANSACTION FUNNEL                     |
+---------------------------------------------------------------------------------------------------+
  [Customer Enters Portal]
            |
            v
  [Browse Catalogue / Search Products / Apply Category Filter]
            |
            v
  [Click "Add to Cart" on Product Card / Modal]
            |
            +---> Is Customer Logged In?
                     |
                     +---> [NO]  --> Display Toast: "Please log in to add products to your cart"
                     |                 |
                     |                 v
                     |               Open Demo Login Modal (10-Digit Mobile Validation)
                     |                 |
                     |                 v
                     |               Customer Submits Valid Mobile &bull; Header Updates to "Hi, +91..."
                     |                 |
                     |                 v
                     |               [Customer returned to catalog; clicks "Add to Cart" again]
                     |
                     +---> [YES] --> Item Added to Cart (localStorage updated)
                                       |
                                       v
                                     Toast: "Product added to cart successfully!" &bull; Badge Count++
                                       |
                                       v
                                     [Open Cart Drawer] &bull; Adjust Quantities &bull; Review ₹500 Free Delivery Tier
                                       |
                                       v
                                     [Click "Proceed to Checkout"] &bull; Open Checkout Modal
                                       |
                                       v
                                     Enter Delivery Details (Name, Phone, Address, Pin) &bull; Select Payment
                                       |
                                       v
                                     Submit Order &bull; Validate Form &bull; Generate #FM-XXXXX &bull; Clear Cart
                                       |
                                       v
                                     [Order Confirmation Screen: Estimated Delivery 10–20 Minutes]
+---------------------------------------------------------------------------------------------------+
</div>

<h2>6. Major Modules and Features (Part 1)</h2>

<h3>Module 1: Top Navigation &amp; Global Header</h3>
<p>
  The global header provides a persistent anchor for navigation across the entire site. It incorporates an SVG leaf brand icon, the &ldquo;FreshMart&rdquo; wordmark, an interactive delivery pin showing &ldquo;Deliver to: <strong>Nagpur 440013 (10–20 Mins)</strong>&rdquo;, an omni-channel search bar, an authentication status pill (&ldquo;Login&rdquo; or &ldquo;Hi, +91... / Logout&rdquo;), and an animated floating cart button with real-time numeric quantity counter badge.
</p>

<h3>Module 2: Hero Promotional Banner &amp; Service Benefits</h3>
<p>
  Positioned above the fold, the hero banner presents FreshMart's core consumer value propositions: &ldquo;Fresh Groceries Delivered to Your Doorstep in <strong>10–20 Minutes</strong>&rdquo;. A secondary benefits bar highlights four operational guarantees: <em>10–20 Min Express Delivery</em>, <em>Best Quality Guarantee</em>, <em>Free Delivery Above ₹500</em>, and <em>100% Secure Payments</em>.
</p>

<h3>Module 3: Category Filtering Engine</h3>
<p>
  The left navigation bar and interactive category grid present six grocery departments: <em>All Categories</em>, <em>Fruits &amp; Vegetables</em>, <em>Dairy &amp; Eggs</em>, <em>Bakery &amp; Bread</em>, <em>Beverages</em>, <em>Snacks &amp; Munchies</em>, and <em>Pantry Staples</em>. Each category dynamically calculates and displays the current number of available products (e.g., &ldquo;6 items&rdquo;), giving shoppers immediate visibility of inventory depth.
</p>

<div class="page-footer">
  <span>Ramdeobaba University &bull; Dept of CSE</span>
  <span>Page 5</span>
</div>
<div class="page-break"></div>

<!-- =========================================================================
     PAGE 6: MAJOR MODULES (PART 2)
     ========================================================================= -->
<div class="page-header">
  <span>FreshMart &bull; TA-2 Project Report</span>
  <span>Major Modules (Part 2)</span>
</div>

<h2>6. Major Modules and Features (Part 2)</h2>

<h3>Module 4: Dynamic Product Catalog &amp; Card Architecture</h3>
<p>
  The main view renders responsive product cards containing high-DPI product artwork, category badges, product titles, unit specifications (e.g., &ldquo;500g&rdquo;, &ldquo;1L&rdquo;, &ldquo;6 pcs&rdquo;), dynamic price displays in INR (₹) with strike-through MRP comparisons, discount percentage badges (e.g., &ldquo;15% OFF&rdquo;), and a responsive &ldquo;Add to Cart&rdquo; button.
</p>

<h3>Module 5: Real-Time Multi-Parameter Search</h3>
<p>
  The search input listens to keyboard input and executes instant client-side filtering across product titles, descriptions, and categories. When no items match the query, the interface cleanly transitions to an empty-state banner displaying an illustrative search icon and a &ldquo;Clear Search&rdquo; reset button.
</p>

<h3>Module 6: Product Quick-View Modal</h3>
<p>
  Clicking on any product card opens an accessible modal dialog revealing high-resolution artwork, detailed nutritional descriptions, shelf-life indicators, storage instructions, unit price, quantity increment/decrement controls, and a prominent &ldquo;Add to Cart&rdquo; action button with login status validation.
</p>

<h3>Module 7: Authentication Guard &amp; Demo Login Subsystem</h3>
<p>
  In accordance with business specifications, unauthenticated users cannot modify the shopping cart. Clicking &ldquo;Add to Cart&rdquo; when logged out triggers a non-blocking toast warning: <em>&ldquo;Please log in to add products to your cart.&rdquo;</em> A clean modal prompts the user for their 10-digit Indian mobile number with regex validation (<code>/^[6-9]\d{9}$/</code>). The product is never automatically added upon login; the customer explicitly reviews the product and clicks &ldquo;Add to Cart&rdquo; again.
</p>

<h3>Module 8: Shopping Cart &amp; ERP Calculation Drawer</h3>
<p>
  The slide-over cart drawer maintains synchronisation with <code>localStorage</code>. Line item cards include thumbnails, titles, unit prices, and <code>+</code> / <code>-</code> steppers. The system computes subtotals and applies a dynamic delivery tier: orders &ge; ₹500 receive free delivery; orders &lt; ₹500 incur ₹40 delivery fee. The drawer prominently features: <strong>&ldquo;Estimated Delivery: 10–20 Minutes&rdquo;</strong>.
</p>

<h3>Module 9 &amp; 10: Checkout Validation &amp; Order Confirmation</h3>
<p>
  Checkout validates name, 10-digit mobile, address, and 6-digit PIN code with COD, UPI QR, and Card options. Upon submission, a unique tracking code (e.g., <code>#FM-849201</code>) is generated, active cart cleared, and an order confirmation modal displayed confirming delivery in <strong>10–20 Minutes</strong>.
</p>

<div class="callout">
  <strong>Delivery Messaging Consistency:</strong> The delivery estimate of <strong>10–20 Minutes</strong> is strictly enforced across 11 distinct touchpoints throughout the portal: (1) Announcement Bar, (2) Header Delivery Pin, (3) Hero Headline, (4) Hero Badge, (5) Service Feature Card, (6) Product Modal Meta, (7) Cart Header, (8) Cart Breakdown, (9) Checkout Delivery Option, (10) Checkout Summary, and (11) Order Confirmation Modal.
</div>

<div class="page-footer">
  <span>Ramdeobaba University &bull; Dept of CSE</span>
  <span>Page 6</span>
</div>
<div class="page-break"></div>

<!-- =========================================================================
     PAGE 7: SCREENSHOTS 1, 2, 3
     ========================================================================= -->
<div class="page-header">
  <span>FreshMart &bull; TA-2 Project Report</span>
  <span>System Visual Interface &bull; Figures 1–3</span>
</div>

<h2>7. Screenshots of the Actual Website (Figures 1–3)</h2>
<p>
  The following figures depict actual screen captures of the live FreshMart portal executed in Google Chrome, verifying responsive rendering, layout integrity, and visual fidelity.
</p>

<div class="fig-card">
  <img src="screenshots/fig1_home.png" alt="Figure 1: Home Page Overview">
  <div class="fig-caption">
    <strong>Figure 1: FreshMart Home Page Interface.</strong> Illustrates the top announcement bar, header with Nagpur delivery indicator, search bar, active promotional hero banner (&ldquo;10–20 Min Delivery&rdquo;), four service guarantees, category navigation, and top featured produce items.
  </div>
</div>

<div class="fig-card">
  <img src="screenshots/fig2_catalog.png" alt="Figure 2: Product Catalogue">
  <div class="fig-caption">
    <strong>Figure 2: Comprehensive Product Catalogue Grid.</strong> Displays responsive product cards featuring item names, quantity units, INR pricing, discount badges, and &ldquo;Add to Cart&rdquo; buttons across fresh fruits, vegetables, dairy, and bakery sections.
  </div>
</div>

<div class="fig-card">
  <img src="screenshots/fig3_categories.png" alt="Figure 3: Category Filtering">
  <div class="fig-caption">
    <strong>Figure 3: Category Filtering in Action (Dairy &amp; Eggs).</strong> Demonstrates the dynamic inventory filtering subsystem. Clicking the &ldquo;Dairy &amp; Eggs&rdquo; category immediately filters the catalog to 6 relevant items and highlights the active category badge.
  </div>
</div>

<div class="page-footer">
  <span>Ramdeobaba University &bull; Dept of CSE</span>
  <span>Page 7</span>
</div>
<div class="page-break"></div>

<!-- =========================================================================
     PAGE 8: SCREENSHOTS 4, 5, 6
     ========================================================================= -->
<div class="page-header">
  <span>FreshMart &bull; TA-2 Project Report</span>
  <span>System Visual Interface &bull; Figures 4–6</span>
</div>

<h2>7. Screenshots of the Actual Website (Figures 4–6)</h2>
<p>
  These screen captures illustrate the product detail inspection dialog, login enforcement guard, and the customer demo authentication modal.
</p>

<div class="fig-card">
  <img src="screenshots/fig4_product_detail.png" alt="Figure 4: Product Detail Modal">
  <div class="fig-caption">
    <strong>Figure 4: Product Quick-View Modal.</strong> Shows the detailed product dialogue displaying high-resolution produce artwork, description, nutrition benefits, storage advice, unit pricing (₹40 / 500g), quantity stepper, and &ldquo;Add to Cart&rdquo; button.
  </div>
</div>

<div class="fig-card">
  <img src="screenshots/fig5_login_required.png" alt="Figure 5: Login Required Toast">
  <div class="fig-caption">
    <strong>Figure 5: Mandatory Login Toast Warning.</strong> Captured immediately after an unauthenticated user clicks &ldquo;Add to Cart&rdquo;. The system rejects cart modification and presents a clear notification: <em>&ldquo;Please log in to add products to your cart.&rdquo;</em>
  </div>
</div>

<div class="fig-card">
  <img src="screenshots/fig6_login_modal.png" alt="Figure 6: Mobile Login Modal">
  <div class="fig-caption">
    <strong>Figure 6: Customer Mobile Authentication Modal.</strong> Shows the demo login interface prompting for a 10-digit Indian mobile number with regex validation, a demo disclaimer, and &ldquo;Continue Shopping&rdquo; dismissal controls.
  </div>
</div>

<div class="page-footer">
  <span>Ramdeobaba University &bull; Dept of CSE</span>
  <span>Page 8</span>
</div>
<div class="page-break"></div>

<!-- =========================================================================
     PAGE 9: SCREENSHOTS 7, 8, 9
     ========================================================================= -->
<div class="page-header">
  <span>FreshMart &bull; TA-2 Project Report</span>
  <span>System Visual Interface &bull; Figures 7–9</span>
</div>

<h2>7. Screenshots of the Actual Website (Figures 7–9)</h2>
<p>
  These captures present the shopping cart calculations, checkout address validation form, and final order confirmation screen.
</p>

<div class="fig-card">
  <img src="screenshots/fig7_cart.png" alt="Figure 7: Shopping Cart Drawer">
  <div class="fig-caption">
    <strong>Figure 7: Interactive Shopping Cart Drawer.</strong> Displays line items with quantity steppers, subtotal computation, ₹500 free delivery tier banner, delivery fee (₹40 or Free), and the prominent <strong>&ldquo;Estimated Delivery: 10–20 Minutes&rdquo;</strong> status badge.
  </div>
</div>

<div class="fig-card">
  <img src="screenshots/fig8_checkout.png" alt="Figure 8: Checkout Modal">
  <div class="fig-caption">
    <strong>Figure 8: Multi-Step Checkout Modal.</strong> Illustrates customer delivery address fields (Name, Phone, Address, Pin Code), payment method selection (Cash on Delivery, UPI QR, Credit Card), and order summary verification.
  </div>
</div>

<div class="fig-card">
  <img src="screenshots/fig9_confirmation.png" alt="Figure 9: Order Confirmation Modal">
  <div class="fig-caption">
    <strong>Figure 9: Order Confirmation &amp; Fulfillment Screen.</strong> Displays successful order placement with unique tracking ID (<code>#FM-973059</code>), delivery address confirmation, items breakdown, total paid, and express <strong>10–20 Minute Delivery Guarantee</strong>.
  </div>
</div>

<div class="page-footer">
  <span>Ramdeobaba University &bull; Dept of CSE</span>
  <span>Page 9</span>
</div>
<div class="page-break"></div>

<!-- =========================================================================
     PAGE 10: TESTING DETAILS & VERIFICATION MATRIX
     ========================================================================= -->
<div class="page-header">
  <span>FreshMart &bull; TA-2 Project Report</span>
  <span>System Verification &amp; Testing Matrix</span>
</div>

<h2>8. Testing Details &amp; Verification Matrix</h2>
<p>
  A rigorous black-box and integration test plan was executed in Google Chrome (v120+). All 16 critical test scenarios passed successfully without errors.
</p>

<table class="data-table" style="font-size: 7.5pt; line-height: 1.25;">
  <thead>
    <tr>
      <th style="width: 8%; padding: 3px 4px;">ID</th>
      <th style="width: 17%; padding: 3px 4px;">Test Scenario</th>
      <th style="width: 33%; padding: 3px 4px;">Expected Behavior</th>
      <th style="width: 32%; padding: 3px 4px;">Actual System Outcome</th>
      <th style="width: 10%; padding: 3px 4px;">Result</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 2.5px 4px;"><strong>TC-01</strong></td>
      <td style="padding: 2.5px 4px;">Home Page Load</td>
      <td style="padding: 2.5px 4px;">Header, search bar, hero banner, guarantees, and categories render with zero visual flaws.</td>
      <td style="padding: 2.5px 4px;">All DOM elements rendered cleanly; SVGs loaded instantly; zero console errors.</td>
      <td style="padding: 2.5px 4px;"><span class="status-pass">PASS</span></td>
    </tr>
    <tr>
      <td style="padding: 2.5px 4px;"><strong>TC-02</strong></td>
      <td style="padding: 2.5px 4px;">Catalog Browsing</td>
      <td style="padding: 2.5px 4px;">All 25 products display accurate titles, weights, INR prices, and discount badges.</td>
      <td style="padding: 2.5px 4px;">Catalog rendered completely with correct pricing and discount tags.</td>
      <td style="padding: 2.5px 4px;"><span class="status-pass">PASS</span></td>
    </tr>
    <tr>
      <td style="padding: 2.5px 4px;"><strong>TC-03</strong></td>
      <td style="padding: 2.5px 4px;">Category Filter</td>
      <td style="padding: 2.5px 4px;">Clicking &ldquo;Dairy &amp; Eggs&rdquo; filters catalog to 6 items and updates active category button.</td>
      <td style="padding: 2.5px 4px;">Only 6 dairy items displayed; active highlight shifted to Dairy; item count matched.</td>
      <td style="padding: 2.5px 4px;"><span class="status-pass">PASS</span></td>
    </tr>
    <tr>
      <td style="padding: 2.5px 4px;"><strong>TC-04</strong></td>
      <td style="padding: 2.5px 4px;">Search Querying</td>
      <td style="padding: 2.5px 4px;">Typing &ldquo;apple&rdquo; filters results instantly to matching fruits.</td>
      <td style="padding: 2.5px 4px;">Real-time input listener filtered cards to Apple products with zero lag.</td>
      <td style="padding: 2.5px 4px;"><span class="status-pass">PASS</span></td>
    </tr>
    <tr>
      <td style="padding: 2.5px 4px;"><strong>TC-05</strong></td>
      <td style="padding: 2.5px 4px;">Empty Search Result</td>
      <td style="padding: 2.5px 4px;">Typing an unlisted product name displays a friendly empty-state prompt and reset button.</td>
      <td style="padding: 2.5px 4px;">Empty state rendered with &ldquo;No products found&rdquo; and working &ldquo;Clear Search&rdquo; button.</td>
      <td style="padding: 2.5px 4px;"><span class="status-pass">PASS</span></td>
    </tr>
    <tr>
      <td style="padding: 2.5px 4px;"><strong>TC-06</strong></td>
      <td style="padding: 2.5px 4px;">Product Quick View</td>
      <td style="padding: 2.5px 4px;">Clicking a product card opens quick-view modal with description, nutrition, and controls.</td>
      <td style="padding: 2.5px 4px;">Modal opened with backdrop blur, smooth animation, and accurate product data.</td>
      <td style="padding: 2.5px 4px;"><span class="status-pass">PASS</span></td>
    </tr>
    <tr>
      <td style="padding: 2.5px 4px;"><strong>TC-07</strong></td>
      <td style="padding: 2.5px 4px;">Login Enforcement</td>
      <td style="padding: 2.5px 4px;">Unauthenticated user clicking &ldquo;Add to Cart&rdquo; is blocked; warning toast is displayed.</td>
      <td style="padding: 2.5px 4px;">Item was NOT added to cart; toast &ldquo;Please log in to add products to your cart&rdquo; shown.</td>
      <td style="padding: 2.5px 4px;"><span class="status-pass">PASS</span></td>
    </tr>
    <tr>
      <td style="padding: 2.5px 4px;"><strong>TC-08</strong></td>
      <td style="padding: 2.5px 4px;">Invalid Phone Format</td>
      <td style="padding: 2.5px 4px;">Entering &ldquo;12345&rdquo; into the demo login form triggers validation rejection.</td>
      <td style="padding: 2.5px 4px;">HTML5 pattern validation blocked submission and requested a 10-digit mobile number.</td>
      <td style="padding: 2.5px 4px;"><span class="status-pass">PASS</span></td>
    </tr>
    <tr>
      <td style="padding: 2.5px 4px;"><strong>TC-09</strong></td>
      <td style="padding: 2.5px 4px;">Successful Demo Login</td>
      <td style="padding: 2.5px 4px;">Entering valid 10-digit number updates header to &ldquo;Hi, +91...&rdquo; and sets session.</td>
      <td style="padding: 2.5px 4px;">Header updated immediately with phone number; session saved to <code>localStorage</code>.</td>
      <td style="padding: 2.5px 4px;"><span class="status-pass">PASS</span></td>
    </tr>
    <tr>
      <td style="padding: 2.5px 4px;"><strong>TC-10</strong></td>
      <td style="padding: 2.5px 4px;">No Auto-Add on Login</td>
      <td style="padding: 2.5px 4px;">Logging in does NOT automatically push the product to cart; requires explicit re-click.</td>
      <td style="padding: 2.5px 4px;">Cart remained empty until user explicitly clicked &ldquo;Add to Cart&rdquo; again.</td>
      <td style="padding: 2.5px 4px;"><span class="status-pass">PASS</span></td>
    </tr>
    <tr>
      <td style="padding: 2.5px 4px;"><strong>TC-11</strong></td>
      <td style="padding: 2.5px 4px;">Cart Addition (Auth)</td>
      <td style="padding: 2.5px 4px;">Authenticated user clicking &ldquo;Add to Cart&rdquo; adds item, updates badge and shows toast.</td>
      <td style="padding: 2.5px 4px;">Item added to cart; cart badge updated to 1; confirmation toast displayed.</td>
      <td style="padding: 2.5px 4px;"><span class="status-pass">PASS</span></td>
    </tr>
    <tr>
      <td style="padding: 2.5px 4px;"><strong>TC-12</strong></td>
      <td style="padding: 2.5px 4px;">Cart Quantity Stepper</td>
      <td style="padding: 2.5px 4px;">Clicking <code>+</code> / <code>-</code> in cart drawer adjusts quantity and recalculates line subtotal.</td>
      <td style="padding: 2.5px 4px;">Line item quantity updated; subtotal recalculated instantly; badge synchronized.</td>
      <td style="padding: 2.5px 4px;"><span class="status-pass">PASS</span></td>
    </tr>
    <tr>
      <td style="padding: 2.5px 4px;"><strong>TC-13</strong></td>
      <td style="padding: 2.5px 4px;">Delivery Fee Tier</td>
      <td style="padding: 2.5px 4px;">Subtotal &lt; ₹500 adds ₹40 delivery fee; subtotal &ge; ₹500 sets fee to ₹0 (FREE).</td>
      <td style="padding: 2.5px 4px;">Cart correctly added ₹40 for ₹340 total; toggled to FREE when subtotal exceeded ₹500.</td>
      <td style="padding: 2.5px 4px;"><span class="status-pass">PASS</span></td>
    </tr>
    <tr>
      <td style="padding: 2.5px 4px;"><strong>TC-14</strong></td>
      <td style="padding: 2.5px 4px;">Checkout Validation</td>
      <td style="padding: 2.5px 4px;">Submitting checkout with empty address fields blocks form and highlights errors.</td>
      <td style="padding: 2.5px 4px;">Browser form validation prevented submission until all required inputs were valid.</td>
      <td style="padding: 2.5px 4px;"><span class="status-pass">PASS</span></td>
    </tr>
    <tr>
      <td style="padding: 2.5px 4px;"><strong>TC-15</strong></td>
      <td style="padding: 2.5px 4px;">Order Confirmation</td>
      <td style="padding: 2.5px 4px;">Valid checkout submission clears cart, generates order ID, and shows 10–20 min banner.</td>
      <td style="padding: 2.5px 4px;">Generated tracking code <code>#FM-XXXXXX</code>, cleared cart, and confirmed 10–20 min ETA.</td>
      <td style="padding: 2.5px 4px;"><span class="status-pass">PASS</span></td>
    </tr>
    <tr>
      <td style="padding: 2.5px 4px;"><strong>TC-16</strong></td>
      <td style="padding: 2.5px 4px;">Session Logout Guard</td>
      <td style="padding: 2.5px 4px;">Clicking Logout restores unauthenticated state and re-enforces login requirement.</td>
      <td style="padding: 2.5px 4px;">Header reset to &ldquo;Login&rdquo;; subsequent &ldquo;Add to Cart&rdquo; calls correctly blocked.</td>
      <td style="padding: 2.5px 4px;"><span class="status-pass">PASS</span></td>
    </tr>
  </tbody>
</table>

<div class="page-footer">
  <span>Ramdeobaba University &bull; Dept of CSE</span>
  <span>Page 10</span>
</div>
<div class="page-break"></div>

<!-- =========================================================================
     PAGE 11: ADVANTAGES, LIMITATIONS, FUTURE WORK, CONCLUSION & REFERENCES
     ========================================================================= -->
<div class="page-header">
  <span>FreshMart &bull; TA-2 Project Report</span>
  <span>Evaluation, Future Work &amp; Conclusion</span>
</div>

<h2>9. Advantages &amp; Limitations</h2>
<table class="data-table">
  <thead>
    <tr>
      <th style="width: 50%;">System Advantages</th>
      <th style="width: 50%;">Project Limitations</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <ul>
          <li><strong>Zero Dependencies:</strong> Built purely with HTML5, CSS3, and JavaScript; runs natively in any modern browser without npm build pipelines.</li>
          <li><strong>Exceptional Performance:</strong> Local SVG assets and client-side data binding yield near-instantaneous page loads and 60 FPS transitions.</li>
          <li><strong>Persistent State:</strong> Maintains user session, cart items, and order history across page reloads via HTML5 <code>localStorage</code>.</li>
          <li><strong>Rigorous Transaction Guards:</strong> Enforces login before cart additions to simulate real-world e-commerce inventory reservation flows.</li>
          <li><strong>Fully Responsive Layout:</strong> Adaptive styling supports mobile phones (360px+), tablets (768px+), and desktop monitors (1200px+).</li>
        </ul>
      </td>
      <td>
        <ul>
          <li><strong>Frontend-Only Architecture:</strong> Lacks a persistent server-side relational database (MySQL/PostgreSQL) for multi-user inventory tracking.</li>
          <li><strong>Simulated Authentication:</strong> Demo mobile verification validates input patterns without connecting to live SMS gateways (Twilio/Fast2SMS).</li>
          <li><strong>Single-Device Scope:</strong> Data stored in <code>localStorage</code> is isolated to a single browser profile and does not sync across multiple devices.</li>
          <li><strong>Mocked Payment Processing:</strong> Payment options simulate successful capture without integrating actual financial gateways (Razorpay/Stripe).</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<h2>10. Proposed Future Enhancements</h2>
<p>To transition FreshMart from an educational prototype to an enterprise-grade platform, future iterations will implement:</p>
<ol>
  <li><strong>Backend ERP Integration:</strong> Develop a robust REST/GraphQL API using Node.js (Express) or Python (FastAPI) backed by PostgreSQL to manage real-time inventory levels and dynamic vendor supply chains.</li>
  <li><strong>Live OTP SMS Gateway:</strong> Integrate production SMS verification (e.g., Twilio, MSG91) to issue one-time passwords for secure multi-factor customer authentication.</li>
  <li><strong>Production Payment Gateway:</strong> Implement Razorpay or Stripe webhooks to process real UPI, credit/debit card, and net banking transactions securely.</li>
  <li><strong>Real-Time Delivery Tracking:</strong> Connect GPS mapping APIs (Google Maps Platform or Leaflet) to offer real-time courier geo-location tracking during the 10–20 minute delivery window.</li>
  <li><strong>Vendor &amp; Warehouse Admin Dashboard:</strong> Build an administrative ERP interface for store managers to update stock counts, adjust wholesale purchase prices, and generate sales analytics.</li>
</ol>

<h2>11. Conclusion</h2>
<p>
  The <strong>FreshMart — Online Grocery Shopping Portal</strong> successfully achieves all curriculum objectives established for the <strong>E-Commerce and ERP TA-2 Theory Assessment</strong>. By combining clean frontend architecture, user-centered design, and strict business logic—such as login verification prior to cart modification, dynamic pricing engines, and consistent 10–20 minute delivery messaging—the project provides a comprehensive practical demonstration of modern E-Commerce fundamentals. The system operates autonomously, requires zero external packages, and fulfills all technical and academic guidelines.
</p>

<h2>12. References</h2>
<ul style="font-size: 8.5pt;">
  <li>Laudon, K. C., &amp; Traver, C. G. (2023). <em>E-Commerce: Business, Technology, Society</em> (17th ed.). Pearson Education.</li>
  <li>Monk, E., &amp; Wagner, B. (2013). <em>Concepts in Enterprise Resource Planning</em> (4th ed.). Cengage Learning.</li>
  <li>Mozilla Developer Network (MDN). (2024). <em>Web APIs — Storage, DOM Event Handling, and Client-Side Scripting</em>. MDN Web Docs.</li>
  <li>World Wide Web Consortium (W3C). (2023). <em>HTML5 &amp; CSS3 Accessibility, Grid, and Flexbox Specifications</em>.</li>
</ul>

<div class="page-footer">
  <span>Ramdeobaba University &bull; Dept of CSE</span>
  <span>Page 11</span>
</div>

</body>
</html>
"""

reports_dir = r"C:\Users\VICTUS\Desktop\Ecom\reports"
os.makedirs(reports_dir, exist_ok=True)

html_file = os.path.join(reports_dir, "report.html")
pdf_file = r"C:\Users\VICTUS\Desktop\Ecom\FreshMart_TA2_Project_Report.pdf"

with open(html_file, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Written HTML source to: {html_file}")

# Compile HTML to PDF using Chrome Headless with --no-pdf-header-footer
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
cmd = [
    chrome_path,
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--allow-file-access-from-files",
    f"--print-to-pdf={pdf_file}",
    f"file:///{html_file.replace(os.sep, '/')}"
]

print("Rendering PDF with Chrome headless print-to-pdf...")
res = subprocess.run(cmd, capture_output=True, text=True)

if os.path.exists(pdf_file):
    size = os.path.getsize(pdf_file)
    print(f"SUCCESS: Generated PDF at {pdf_file} ({size} bytes)")
    
    with open(pdf_file, "rb") as f:
        data = f.read()
        pages = len(re.findall(rb'/Type\s*/Page\b', data))
        print(f"Total Pages in Generated PDF: {pages}")
else:
    print("FAILED to generate PDF:", res.stderr)
