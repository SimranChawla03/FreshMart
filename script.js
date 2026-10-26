/**
 * FRESHMART — Fresh Groceries, Happy Lives
 * Comprehensive Frontend JavaScript Architecture
 * Single Page Application (SPA) supporting:
 * - Product Catalogue & Filtering
 * - Product Details with Gallery & Quantity controls
 * - Persistent Cart with Indian Rupee formatting & Delivery rules
 * - Client-side Validated Checkout
 * - Order Confirmation & Demo Authentication
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. PRODUCT DATABASE (25 Sample Grocery Products across 6 Categories)
  // =========================================================================
  const PRODUCTS = [
    // 1. Fruits & Vegetables
    {
      id: 'fv-01',
      name: 'Fresh Apples',
      category: 'fruits-veg',
      categoryName: 'Fruits & Vegetables',
      unit: '1 kg',
      price: 120,
      oldPrice: 140,
      image: 'assets/images/products/apples.svg',
      rating: 4.8,
      inStock: true,
      isFresh: true,
      isOrganic: true,
      isOnSale: true,
      description: 'Crisp, juicy and naturally sweet apples, sourced fresh from trusted orchards. Rich in dietary fiber, vitamin C, and antioxidants.'
    },
    {
      id: 'fv-02',
      name: 'Bananas',
      category: 'fruits-veg',
      categoryName: 'Fruits & Vegetables',
      unit: '1 kg',
      price: 60,
      oldPrice: 70,
      image: 'assets/images/products/bananas.svg',
      rating: 4.7,
      inStock: true,
      isFresh: true,
      isOrganic: false,
      isOnSale: false,
      description: 'Naturally ripened Robusta bananas rich in potassium and instant energy. Sourced daily from local partner farms.'
    },
    {
      id: 'fv-03',
      name: 'Tomatoes',
      category: 'fruits-veg',
      categoryName: 'Fruits & Vegetables',
      unit: '1 kg',
      price: 40,
      oldPrice: 50,
      image: 'assets/images/products/tomatoes.svg',
      rating: 4.6,
      inStock: true,
      isFresh: true,
      isOrganic: true,
      isOnSale: true,
      description: 'Firm and vibrant red farm-fresh hybrid tomatoes. Perfect for hearty curries, tangy soups, fresh salads, and sauces.'
    },
    {
      id: 'fv-04',
      name: 'Potatoes',
      category: 'fruits-veg',
      categoryName: 'Fruits & Vegetables',
      unit: '1 kg',
      price: 35,
      oldPrice: 40,
      image: 'assets/images/products/potatoes.svg',
      rating: 4.5,
      inStock: true,
      isFresh: true,
      isOrganic: false,
      isOnSale: false,
      description: 'Golden, thin-skinned everyday cooking potatoes. Unpolished and rich in complex carbohydrates and potassium.'
    },
    {
      id: 'fv-05',
      name: 'Onions',
      category: 'fruits-veg',
      categoryName: 'Fruits & Vegetables',
      unit: '1 kg',
      price: 40,
      oldPrice: 48,
      image: 'assets/images/products/onions.svg',
      rating: 4.6,
      inStock: true,
      isFresh: true,
      isOrganic: false,
      isOnSale: false,
      description: 'Pungent, flavorful red onions hand-sorted for quality. An indispensable base for curries, gravies, and Indian cooking.'
    },
    {
      id: 'fv-06',
      name: 'Carrots',
      category: 'fruits-veg',
      categoryName: 'Fruits & Vegetables',
      unit: '1 kg',
      price: 50,
      oldPrice: 65,
      image: 'assets/images/products/carrots.svg',
      rating: 4.7,
      inStock: true,
      isFresh: true,
      isOrganic: true,
      isOnSale: true,
      description: 'Sweet, crisp and crunchy orange carrots. Great for healthy salads, fresh juices, vegetable roasts, and desserts like halwa.'
    },

    // 2. Dairy & Eggs
    {
      id: 'de-01',
      name: 'Pure Cow Milk',
      category: 'dairy-eggs',
      categoryName: 'Dairy & Eggs',
      unit: '1 L',
      price: 60,
      oldPrice: 65,
      image: 'assets/images/products/milk.svg',
      rating: 4.9,
      inStock: true,
      isFresh: true,
      isOrganic: true,
      isOnSale: false,
      description: 'Pasteurized, homogenized pure whole cow milk with optimal cream content. Calcium-rich daily nutrition for the whole family.'
    },
    {
      id: 'de-02',
      name: 'Farm Fresh Eggs',
      category: 'dairy-eggs',
      categoryName: 'Dairy & Eggs',
      unit: 'Pack of 6',
      price: 55,
      oldPrice: 65,
      image: 'assets/images/products/eggs.svg',
      rating: 4.8,
      inStock: true,
      isFresh: true,
      isOrganic: true,
      isOnSale: true,
      description: 'Grade-A table eggs sourced from healthy, grain-fed hens. High in protein, essential choline, and vitamin B12.'
    },
    {
      id: 'de-03',
      name: 'Whole Wheat Bread',
      category: 'dairy-eggs',
      categoryName: 'Dairy & Eggs',
      unit: '400 g',
      price: 45,
      oldPrice: 50,
      image: 'assets/images/products/bread.svg',
      rating: 4.6,
      inStock: true,
      isFresh: true,
      isOrganic: false,
      isOnSale: false,
      description: 'Freshly baked 100% whole wheat bread loaf. Soft, fibrous and completely free of trans fats and chemical softeners.'
    },
    {
      id: 'de-04',
      name: 'Cheddar Cheese Block',
      category: 'dairy-eggs',
      categoryName: 'Dairy & Eggs',
      unit: '200 g',
      price: 135,
      oldPrice: 155,
      image: 'assets/images/products/cheese.svg',
      rating: 4.7,
      inStock: true,
      isFresh: false,
      isOrganic: false,
      isOnSale: true,
      description: 'Rich, smooth and creamy processed cheddar cheese block. Melts evenly over pizzas, grilled sandwiches, and pastas.'
    },
    {
      id: 'de-05',
      name: 'Pasteurized Butter',
      category: 'dairy-eggs',
      categoryName: 'Dairy & Eggs',
      unit: '100 g',
      price: 56,
      oldPrice: 60,
      image: 'assets/images/products/butter.svg',
      rating: 4.9,
      inStock: true,
      isFresh: false,
      isOrganic: false,
      isOnSale: false,
      description: 'Classic salted table butter made from fresh dairy cream. Spreads smoothly over warm toasts, parathas, and pancakes.'
    },
    {
      id: 'de-06',
      name: 'Crunchy Oat Cereal',
      category: 'dairy-eggs',
      categoryName: 'Dairy & Eggs',
      unit: '400 g',
      price: 180,
      oldPrice: 210,
      image: 'assets/images/products/cereal.svg',
      rating: 4.5,
      inStock: true,
      isFresh: false,
      isOrganic: true,
      isOnSale: true,
      description: 'Whole grain toasted rolled oats with crunchy honey clusters. A fiber-rich, wholesome breakfast to power your mornings.'
    },

    // 3. Snacks & Foods
    {
      id: 'sf-01',
      name: 'Crispy Potato Chips',
      category: 'snacks-foods',
      categoryName: 'Snacks & Foods',
      unit: '150 g',
      price: 50,
      oldPrice: 60,
      image: 'assets/images/products/chips.svg',
      rating: 4.5,
      inStock: true,
      isFresh: false,
      isOrganic: false,
      isOnSale: true,
      description: 'Golden, thinly sliced potatoes sprinkled with savoury sea salt and spices. The quintessential crispy teatime snack.'
    },
    {
      id: 'sf-02',
      name: 'Butter Cookies & Biscuits',
      category: 'snacks-foods',
      categoryName: 'Snacks & Foods',
      unit: '250 g',
      price: 75,
      oldPrice: 85,
      image: 'assets/images/products/biscuits.svg',
      rating: 4.6,
      inStock: true,
      isFresh: false,
      isOrganic: false,
      isOnSale: false,
      description: 'Melt-in-your-mouth Danish style butter cookies baked to golden perfection. Great pairing with evening tea or hot coffee.'
    },
    {
      id: 'sf-03',
      name: 'Premium Basmati Rice',
      category: 'snacks-foods',
      categoryName: 'Snacks & Foods',
      unit: '5 kg',
      price: 450,
      oldPrice: 520,
      image: 'assets/images/products/rice.svg',
      rating: 4.9,
      inStock: true,
      isFresh: false,
      isOrganic: true,
      isOnSale: true,
      description: 'Aged long-grain royal basmati rice renowned for its delicate floral aroma, fluffy non-sticky texture, and royal taste.'
    },
    {
      id: 'sf-04',
      name: 'Pure Sunflower Cooking Oil',
      category: 'snacks-foods',
      categoryName: 'Snacks & Foods',
      unit: '1 L',
      price: 145,
      oldPrice: 165,
      image: 'assets/images/products/cooking-oil.svg',
      rating: 4.7,
      inStock: true,
      isFresh: false,
      isOrganic: false,
      isOnSale: true,
      description: 'Refined sunflower oil enriched with vitamins A & D. Light, low absorption formula suitable for deep frying and everyday sautéing.'
    },

    // 4. Beverages
    {
      id: 'bv-01',
      name: 'Natural Orange Juice',
      category: 'beverages',
      categoryName: 'Beverages',
      unit: '1 L',
      price: 110,
      oldPrice: 130,
      image: 'assets/images/products/orange-juice.svg',
      rating: 4.8,
      inStock: true,
      isFresh: true,
      isOrganic: true,
      isOnSale: true,
      description: '100% pure squeezed Valencia oranges with natural fruit pulp. No added refined sugars, artificial flavors, or chemical preservatives.'
    },
    {
      id: 'bv-02',
      name: 'Spring Bottled Water',
      category: 'beverages',
      categoryName: 'Beverages',
      unit: '1 L (Pack of 2)',
      price: 40,
      oldPrice: 40,
      image: 'assets/images/products/bottled-water.svg',
      rating: 4.6,
      inStock: true,
      isFresh: false,
      isOrganic: false,
      isOnSale: false,
      description: 'Natural mineral spring water purified through multi-stage reverse osmosis and UV filtration. Clean, refreshing, and balanced in pH.'
    },
    {
      id: 'bv-03',
      name: 'Organic Green Tea',
      category: 'beverages',
      categoryName: 'Beverages',
      unit: '100 g',
      price: 160,
      oldPrice: 190,
      image: 'assets/images/products/tea.svg',
      rating: 4.8,
      inStock: true,
      isFresh: false,
      isOrganic: true,
      isOnSale: true,
      description: 'Handpicked whole leaf green tea from high altitude Nilgiri gardens. Rich in detoxifying flavonoids and epigallocatechin gallate (EGCG).'
    },

    // 5. Household Essentials
    {
      id: 'hh-01',
      name: 'Premium Detergent Liquid',
      category: 'household',
      categoryName: 'Household Essentials',
      unit: '1 L',
      price: 195,
      oldPrice: 230,
      image: 'assets/images/products/detergent.svg',
      rating: 4.8,
      inStock: true,
      isFresh: false,
      isOrganic: false,
      isOnSale: true,
      description: 'Advanced active enzyme laundry liquid detergent that lifts tough stains while maintaining vibrant fabric colors and softness.'
    },
    {
      id: 'hh-02',
      name: 'Sparkling Dishwashing Gel',
      category: 'household',
      categoryName: 'Household Essentials',
      unit: '500 ml',
      price: 90,
      oldPrice: 105,
      image: 'assets/images/products/dishwashing-liquid.svg',
      rating: 4.7,
      inStock: true,
      isFresh: false,
      isOrganic: false,
      isOnSale: false,
      description: 'Concentrated lemon degreasing gel. Cuts through baked-on grease on utensils with just a few drops, leaving a fresh citrus fragrance.'
    },
    {
      id: 'hh-03',
      name: 'Germ Protection Handwash',
      category: 'household',
      categoryName: 'Household Essentials',
      unit: '250 ml',
      price: 75,
      oldPrice: 85,
      image: 'assets/images/products/handwash.svg',
      rating: 4.9,
      inStock: true,
      isFresh: false,
      isOrganic: false,
      isOnSale: false,
      description: 'Antibacterial liquid hand soap with skin-hydrating glycerin and aloe vera extracts. Tough on 99.9% germs, gentle on sensitive hands.'
    },

    // 6. Personal Care
    {
      id: 'pc-01',
      name: 'Herbal Shampoo Bottle',
      category: 'personal-care',
      categoryName: 'Personal Care',
      unit: '340 ml',
      price: 185,
      oldPrice: 220,
      image: 'assets/images/products/shampoo.svg',
      rating: 4.7,
      inStock: true,
      isFresh: false,
      isOrganic: true,
      isOnSale: true,
      description: 'Nourishing herbal hair cleanser infused with bhringraj, shikakai and amla extracts to strengthen roots and reduce breakage.'
    },
    {
      id: 'pc-02',
      name: 'Fresh Mint Toothpaste',
      category: 'personal-care',
      categoryName: 'Personal Care',
      unit: '150 g',
      price: 85,
      oldPrice: 95,
      image: 'assets/images/products/toothpaste.svg',
      rating: 4.8,
      inStock: true,
      isFresh: false,
      isOrganic: false,
      isOnSale: false,
      description: 'Enamel-safe anti-cavity fluoride toothpaste with cooling spearmint crystals for 12-hour fresh breath and sparkling white teeth.'
    },
    {
      id: 'pc-03',
      name: 'Moisturizing Beauty Soap',
      category: 'personal-care',
      categoryName: 'Personal Care',
      unit: 'Pack of 3 (125g each)',
      price: 125,
      oldPrice: 150,
      image: 'assets/images/products/soap.svg',
      rating: 4.6,
      inStock: true,
      isFresh: false,
      isOrganic: false,
      isOnSale: true,
      description: 'Ultra-moisturizing grade-1 bathing bar with almond oil and rich cocoa butter that leaves skin visibly soft, supple, and radiant.'
    }
  ];

  // Delivery configuration
  const DELIVERY_THRESHOLD = 499; // Free delivery threshold
  const STANDARD_DELIVERY_FEE = 40; // Delivery fee below threshold

  // =========================================================================
  // 2. STATE MANAGEMENT & LOCAL STORAGE
  // =========================================================================
  const State = {
    cart: [],
    wishlist: new Set(),
    activeView: 'home',
    currentCategory: 'all',
    searchQuery: '',
    priceMax: 500,
    filters: {
      organic: false,
      fresh: false,
      onSale: false,
      bestRated: false
    },
    sortBy: 'popularity',
    selectedProduct: null,
    user: null,
    lastOrder: null
  };

  // Safe LocalStorage helpers
  function loadCartFromStorage() {
    try {
      const saved = localStorage.getItem('freshmart_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // validate item ids exist
          State.cart = parsed.filter(item => PRODUCTS.some(p => p.id === item.id));
        }
      }
    } catch (e) {
      console.warn('Could not parse saved cart, initializing empty cart.', e);
      State.cart = [];
    }
  }

  function saveCartToStorage() {
    try {
      localStorage.setItem('freshmart_cart', JSON.stringify(State.cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }

  function loadUserFromStorage() {
    try {
      const saved = localStorage.getItem('freshmart_user');
      if (saved) State.user = JSON.parse(saved);
    } catch (e) {
      State.user = null;
    }
  }

  function saveUserToStorage(user) {
    State.user = user;
    if (user) {
      localStorage.setItem('freshmart_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('freshmart_user');
    }
    updateUserUI();
  }

  function loadLastOrderFromStorage() {
    try {
      const saved = sessionStorage.getItem('freshmart_last_order');
      if (saved) State.lastOrder = JSON.parse(saved);
    } catch (e) {
      State.lastOrder = null;
    }
  }

  function saveLastOrderToStorage(order) {
    State.lastOrder = order;
    try {
      sessionStorage.setItem('freshmart_last_order', JSON.stringify(order));
    } catch (e) {
      console.error(e);
    }
  }

  // =========================================================================
  // 3. CART CALCULATIONS & BADGE
  // =========================================================================
  function getCartSummary() {
    let count = 0;
    let subtotal = 0;

    State.cart.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (product) {
        count += item.quantity;
        subtotal += product.price * item.quantity;
      }
    });

    const isFreeDelivery = subtotal >= DELIVERY_THRESHOLD || subtotal === 0;
    const deliveryCharge = (subtotal === 0 || isFreeDelivery) ? 0 : STANDARD_DELIVERY_FEE;
    const neededForFree = Math.max(0, DELIVERY_THRESHOLD - subtotal);
    const finalTotal = subtotal + deliveryCharge;

    return {
      count,
      subtotal,
      deliveryCharge,
      isFreeDelivery,
      neededForFree,
      finalTotal
    };
  }

  function updateCartBadge() {
    const summary = getCartSummary();
    const badge = document.getElementById('cartCountBadge');
    if (badge) {
      badge.textContent = summary.count;
    }
  }

  // Format INR currency
  function formatINR(amount) {
    return '₹' + amount.toLocaleString('en-IN');
  }

  // =========================================================================
  // 4. CART OPERATIONS
  // =========================================================================
  function addToCart(productId, quantity = 1) {
    // 1. Enforce Login requirement before adding to cart
    if (!State.user) {
      showToast('Please log in to add products to your cart.', 'error', true);
      openLoginModal();
      return;
    }

    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = State.cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      State.cart.push({ id: productId, quantity: quantity });
    }

    saveCartToStorage();
    updateCartBadge();
    showToast(`Product added to cart successfully! (${quantity} × ${product.name})`, 'success');

    // If currently on cart or checkout page, refresh views
    if (State.activeView === 'cart') renderCartView();
    if (State.activeView === 'checkout') renderCheckoutView();
  }

  function updateCartQuantity(productId, newQty) {
    const idx = State.cart.findIndex(item => item.id === productId);
    if (idx === -1) return;

    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }

    State.cart[idx].quantity = newQty;
    saveCartToStorage();
    updateCartBadge();

    if (State.activeView === 'cart') renderCartView();
    if (State.activeView === 'checkout') renderCheckoutView();
  }

  function removeFromCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    State.cart = State.cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartBadge();
    showToast(`Removed ${product ? product.name : 'item'} from Cart`, 'info');

    if (State.activeView === 'cart') renderCartView();
    if (State.activeView === 'checkout') renderCheckoutView();
  }

  function clearCart() {
    if (State.cart.length === 0) return;
    State.cart = [];
    saveCartToStorage();
    updateCartBadge();
    showToast('Your shopping cart has been cleared.', 'info');
    if (State.activeView === 'cart') renderCartView();
  }

  // =========================================================================
  // 5. VIEW NAVIGATION & ROUTING
  // =========================================================================
  function navigateTo(viewName, params = {}) {
    State.activeView = viewName;

    // Hide all views
    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.remove('active-view');
    });

    // Update active state in nav bar
    document.querySelectorAll('.category-nav-link').forEach(link => {
      const cat = link.getAttribute('data-category');
      if (viewName === 'home' && cat === 'home') {
        link.classList.add('active');
      } else if (viewName === 'catalog' && cat === State.currentCategory) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Render target view
    const target = document.getElementById(`${viewName}-view`);
    if (target) {
      target.classList.add('active-view');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // View specific initialization
    switch (viewName) {
      case 'home':
        renderFeaturedProducts();
        break;
      case 'catalog':
        if (params.category) State.currentCategory = params.category;
        if (params.search !== undefined) State.searchQuery = params.search;
        renderCatalog();
        break;
      case 'product-detail':
        if (params.productId) {
          const product = PRODUCTS.find(p => p.id === params.productId);
          if (product) {
            State.selectedProduct = product;
            renderProductDetail(product);
          }
        }
        break;
      case 'cart':
        renderCartView();
        break;
      case 'checkout':
        renderCheckoutView();
        break;
      case 'order-confirmation':
        renderOrderConfirmationView();
        break;
    }
  }

  // =========================================================================
  // 6. SCREEN 1: HOME PAGE RENDERING
  // =========================================================================
  function createProductCardHTML(product) {
    const isWishlisted = State.wishlist.has(product.id);
    return `
      <div class="product-card" data-id="${product.id}">
        <button class="product-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                data-wishlist-id="${product.id}" 
                title="Save to Wishlist" 
                aria-label="Wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        ${product.isOnSale ? `<span class="product-badge-discount">Sale</span>` : ''}

        <div class="product-image-container" data-view-product="${product.id}">
          <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        </div>

        <div class="product-info">
          <h3 class="product-name" data-view-product="${product.id}">${product.name}</h3>
          <span class="product-unit">(${product.unit})</span>

          <div class="product-price-row">
            <span class="product-price">${formatINR(product.price)}</span>
            ${product.oldPrice ? `<span class="product-old-price">${formatINR(product.oldPrice)}</span>` : ''}
          </div>

          <button class="btn-add-cart" data-add-id="${product.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    `;
  }

  function renderFeaturedProducts() {
    const container = document.getElementById('featuredProductGrid');
    if (!container) return;

    // Pick 8 featured items
    const featured = PRODUCTS.slice(0, 8);
    container.innerHTML = featured.map(createProductCardHTML).join('');
  }

  // =========================================================================
  // 7. SCREEN 2: PRODUCT LISTING / CATALOGUE RENDERING
  // =========================================================================
  function renderCatalog() {
    const grid = document.getElementById('catalogProductGrid');
    const emptyState = document.getElementById('catalogEmptyState');
    const catalogTitle = document.getElementById('catalogTitle');
    const itemCountSpan = document.getElementById('catalogItemCount');
    const priceDisplay = document.getElementById('priceRangeDisplay');
    const priceSlider = document.getElementById('priceRangeSlider');
    const breadcrumbCategory = document.getElementById('breadcrumbCategory');

    if (priceSlider) priceSlider.value = State.priceMax;
    if (priceDisplay) priceDisplay.textContent = `₹0 - ₹${State.priceMax}`;

    // Update active category in sidebar
    document.querySelectorAll('.category-filter-btn').forEach(btn => {
      const cat = btn.getAttribute('data-cat');
      if (cat === State.currentCategory) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Category Title & Breadcrumbs
    let catDisplayName = 'All Products';
    if (State.currentCategory === 'fruits-veg') catDisplayName = 'Fruits & Vegetables';
    else if (State.currentCategory === 'dairy-eggs') catDisplayName = 'Dairy & Eggs';
    else if (State.currentCategory === 'snacks-foods') catDisplayName = 'Snacks & Foods';
    else if (State.currentCategory === 'beverages') catDisplayName = 'Beverages';
    else if (State.currentCategory === 'household') catDisplayName = 'Household Essentials';
    else if (State.currentCategory === 'personal-care') catDisplayName = 'Personal Care';
    else if (State.currentCategory === 'offers') catDisplayName = 'Special Offers & Discounts';

    if (catalogTitle) {
      catalogTitle.textContent = State.searchQuery ? `Search: "${State.searchQuery}"` : catDisplayName;
    }
    if (breadcrumbCategory) {
      breadcrumbCategory.textContent = catDisplayName;
    }

    // Filter Logic
    let filtered = PRODUCTS.filter(product => {
      // Category filter
      if (State.currentCategory === 'offers') {
        if (!product.isOnSale) return false;
      } else if (State.currentCategory !== 'all' && product.category !== State.currentCategory) {
        return false;
      }

      // Search keyword filter
      if (State.searchQuery) {
        const query = State.searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(query);
        const matchCat = product.categoryName.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        if (!matchName && !matchCat && !matchDesc) return false;
      }

      // Price filter
      if (product.price > State.priceMax) return false;

      // Popular Checkbox filters
      if (State.filters.organic && !product.isOrganic) return false;
      if (State.filters.fresh && !product.isFresh) return false;
      if (State.filters.onSale && !product.isOnSale) return false;
      if (State.filters.bestRated && product.rating < 4.7) return false;

      return true;
    });

    // Sorting Logic
    if (State.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (State.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (State.sortBy === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Default / popularity (rating based)
      filtered.sort((a, b) => b.rating - a.rating);
    }

    // Render results
    if (itemCountSpan) {
      itemCountSpan.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} products`;
    }

    if (filtered.length === 0) {
      if (grid) grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
    } else {
      if (emptyState) emptyState.style.display = 'none';
      if (grid) grid.innerHTML = filtered.map(createProductCardHTML).join('');
    }
  }

  // =========================================================================
  // 8. SCREEN 3: PRODUCT DETAIL RENDERING
  // =========================================================================
  function renderProductDetail(product) {
    // Breadcrumbs
    const bcCat = document.getElementById('detailBreadcrumbCat');
    const bcName = document.getElementById('detailBreadcrumbName');
    if (bcCat) {
      bcCat.textContent = product.categoryName;
      bcCat.setAttribute('data-nav-category', product.category);
    }
    if (bcName) bcName.textContent = product.name;

    // Gallery & info
    const mainImg = document.getElementById('detailMainImage');
    const thumbsContainer = document.getElementById('detailThumbnails');
    const title = document.getElementById('detailTitle');
    const price = document.getElementById('detailPrice');
    const oldPrice = document.getElementById('detailOldPrice');
    const desc = document.getElementById('detailDescription');
    const qtySpan = document.getElementById('detailQtyValue');
    const addBtn = document.getElementById('detailAddBtn');
    const wishlistBtn = document.getElementById('detailWishlistBtn');

    if (mainImg) {
      mainImg.src = product.image;
      mainImg.alt = product.name;
    }

    if (title) title.textContent = `${product.name} (${product.unit})`;
    if (price) price.textContent = formatINR(product.price);
    if (oldPrice) {
      oldPrice.textContent = product.oldPrice ? formatINR(product.oldPrice) : '';
    }
    if (desc) desc.textContent = product.description;
    if (qtySpan) qtySpan.textContent = '1';

    if (addBtn) {
      addBtn.setAttribute('data-add-id', product.id);
    }

    if (wishlistBtn) {
      const isWish = State.wishlist.has(product.id);
      wishlistBtn.setAttribute('data-wishlist-id', product.id);
      wishlistBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="${isWish ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      `;
      wishlistBtn.style.color = isWish ? 'var(--accent-red)' : 'var(--text-light)';
    }

    // Thumbnails: 3 thumbnail angles
    if (thumbsContainer) {
      thumbsContainer.innerHTML = `
        <div class="gallery-thumb active" data-img-src="${product.image}">
          <img src="${product.image}" alt="${product.name} View 1">
        </div>
        <div class="gallery-thumb" data-img-src="${product.image}">
          <img src="${product.image}" alt="${product.name} View 2" style="transform: scale(0.9) rotate(10deg);">
        </div>
        <div class="gallery-thumb" data-img-src="${product.image}">
          <img src="${product.image}" alt="${product.name} View 3" style="transform: scale(0.85) scaleX(-1);">
        </div>
      `;
    }
  }

  // =========================================================================
  // 9. SCREEN 4: SHOPPING CART RENDERING
  // =========================================================================
  function renderCartView() {
    const listContainer = document.getElementById('cartItemsList');
    const emptyState = document.getElementById('cartEmptyState');
    const fullState = document.getElementById('cartFullState');
    const subtotalEl = document.getElementById('cartSubtotal');
    const deliveryEl = document.getElementById('cartDeliveryCharge');
    const totalEl = document.getElementById('cartFinalTotal');
    const deliveryNotice = document.getElementById('cartDeliveryNotice');

    const summary = getCartSummary();

    if (State.cart.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      if (fullState) fullState.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (fullState) fullState.style.display = 'grid';

    // Render items
    if (listContainer) {
      listContainer.innerHTML = State.cart.map(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        if (!product) return '';
        const lineTotal = product.price * item.quantity;
        return `
          <div class="cart-item-row" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="cart-item-img">
            <div class="cart-item-info">
              <h4 class="cart-item-name">${product.name} (${product.unit})</h4>
              <span class="cart-item-price-unit">${formatINR(product.price)} each</span>
            </div>
            <div class="quantity-picker">
              <button class="qty-btn" data-cart-minus="${product.id}">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" data-cart-plus="${product.id}">+</button>
            </div>
            <div class="cart-item-subtotal">${formatINR(lineTotal)}</div>
            <button class="btn-remove-item" data-cart-remove="${product.id}" title="Remove item" aria-label="Remove item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        `;
      }).join('');
    }

    // Totals
    if (subtotalEl) subtotalEl.textContent = formatINR(summary.subtotal);
    if (deliveryEl) {
      if (summary.isFreeDelivery) {
        deliveryEl.innerHTML = `<span class="free-delivery-badge">FREE</span>`;
      } else {
        deliveryEl.textContent = formatINR(summary.deliveryCharge);
      }
    }
    if (totalEl) totalEl.textContent = formatINR(summary.finalTotal);

    // Delivery banner
    if (deliveryNotice) {
      if (summary.isFreeDelivery) {
        deliveryNotice.innerHTML = `🎉 <strong>Congratulations!</strong> You have unlocked <strong>FREE Delivery</strong> (Estimated Delivery: 10–20 Minutes).`;
      } else {
        deliveryNotice.innerHTML = `🚚 Add <strong>${formatINR(summary.neededForFree)}</strong> more to your order to get <strong>FREE Delivery</strong>! (Estimated Delivery: 10–20 Minutes)`;
      }
    }
  }

  // =========================================================================
  // 10. SCREEN 5: CHECKOUT RENDERING & VALIDATION
  // =========================================================================
  function renderCheckoutView() {
    if (State.cart.length === 0) {
      showToast('Your cart is empty. Please add items before checkout.', 'error');
      navigateTo('catalog');
      return;
    }

    const summary = getCartSummary();
    const itemsTotal = document.getElementById('checkoutItemsTotal');
    const delivery = document.getElementById('checkoutDeliveryCharge');
    const finalAmount = document.getElementById('checkoutFinalTotal');

    if (itemsTotal) itemsTotal.textContent = formatINR(summary.subtotal);
    if (delivery) {
      delivery.innerHTML = summary.isFreeDelivery 
        ? `<span class="free-delivery-badge">FREE</span>` 
        : formatINR(summary.deliveryCharge);
    }
    if (finalAmount) finalAmount.textContent = formatINR(summary.finalTotal);

    // Pre-fill demo data if user is logged in
    if (State.user) {
      const nameInp = document.getElementById('checkoutFullName');
      const phoneInp = document.getElementById('checkoutPhone');
      if (nameInp && !nameInp.value) nameInp.value = State.user.name || '';
      if (phoneInp && !phoneInp.value) phoneInp.value = State.user.phone || '';
    }
  }

  function validateCheckoutForm() {
    let isValid = true;

    // Helper for error styling
    function setError(inputEl, errorEl, msg) {
      if (inputEl) inputEl.classList.add('error');
      if (errorEl) errorEl.textContent = msg;
      isValid = false;
    }

    function clearError(inputEl, errorEl) {
      if (inputEl) inputEl.classList.remove('error');
      if (errorEl) errorEl.textContent = '';
    }

    const nameInput = document.getElementById('checkoutFullName');
    const nameErr = document.getElementById('errCheckoutFullName');
    const phoneInput = document.getElementById('checkoutPhone');
    const phoneErr = document.getElementById('errCheckoutPhone');
    const emailInput = document.getElementById('checkoutEmail');
    const emailErr = document.getElementById('errCheckoutEmail');
    const addressInput = document.getElementById('checkoutAddress');
    const addressErr = document.getElementById('errCheckoutAddress');
    const cityInput = document.getElementById('checkoutCity');
    const cityErr = document.getElementById('errCheckoutCity');
    const pincodeInput = document.getElementById('checkoutPincode');
    const pincodeErr = document.getElementById('errCheckoutPincode');

    // Name Validation
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      setError(nameInput, nameErr, 'Please enter your full name (at least 2 letters).');
    } else {
      clearError(nameInput, nameErr);
    }

    // Phone Validation (10 digits Indian format)
    const phoneVal = phoneInput.value.trim().replace(/\D/g, '');
    if (!phoneVal || phoneVal.length !== 10) {
      setError(phoneInput, phoneErr, 'Please enter a valid 10-digit mobile number.');
    } else {
      clearError(phoneInput, phoneErr);
    }

    // Email Validation (optional, but validated if entered)
    const emailVal = emailInput.value.trim();
    if (emailVal) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailVal)) {
        setError(emailInput, emailErr, 'Please enter a valid email address.');
      } else {
        clearError(emailInput, emailErr);
      }
    } else {
      clearError(emailInput, emailErr);
    }

    // Address Validation
    if (!addressInput.value.trim() || addressInput.value.trim().length < 5) {
      setError(addressInput, addressErr, 'Please enter your complete street and house address.');
    } else {
      clearError(addressInput, addressErr);
    }

    // City Validation
    if (!cityInput.value.trim()) {
      setError(cityInput, cityErr, 'Please enter your city.');
    } else {
      clearError(cityInput, cityErr);
    }

    // PIN code Validation (6 digits)
    const pinVal = pincodeInput.value.trim().replace(/\D/g, '');
    if (!pinVal || pinVal.length !== 6) {
      setError(pincodeInput, pincodeErr, 'Please enter a valid 6-digit PIN code.');
    } else {
      clearError(pincodeInput, pincodeErr);
    }

    return isValid;
  }

  function handleOrderPlacement() {
    if (State.cart.length === 0) {
      showToast('Cannot place order: Cart is empty.', 'error');
      navigateTo('catalog');
      return;
    }

    if (!validateCheckoutForm()) {
      showToast('Please fix the highlighted errors before placing order.', 'error');
      return;
    }

    // Gather form values
    const fullName = document.getElementById('checkoutFullName').value.trim();
    const phone = document.getElementById('checkoutPhone').value.trim();
    const email = document.getElementById('checkoutEmail').value.trim();
    const address = document.getElementById('checkoutAddress').value.trim();
    const city = document.getElementById('checkoutCity').value.trim();
    const pincode = document.getElementById('checkoutPincode').value.trim();

    // Payment method
    const paymentRadio = document.querySelector('input[name="paymentMethod"]:checked');
    const paymentMethod = paymentRadio ? paymentRadio.value : 'Cash on Delivery';

    const summary = getCartSummary();

    // Generate unique order ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateCode = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const orderId = `FM${dateCode}-${randomSuffix}`;

    // Snapshot order items
    const orderItems = State.cart.map(item => {
      const p = PRODUCTS.find(prod => prod.id === item.id);
      return {
        id: item.id,
        name: p ? p.name : 'Grocery Item',
        unit: p ? p.unit : '1 unit',
        price: p ? p.price : 0,
        quantity: item.quantity,
        total: (p ? p.price : 0) * item.quantity
      };
    });

    const orderObj = {
      orderId,
      date: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      customer: {
        name: fullName,
        phone,
        email,
        address: `${address}, ${city} - ${pincode}`
      },
      paymentMethod,
      items: orderItems,
      subtotal: summary.subtotal,
      deliveryCharge: summary.deliveryCharge,
      finalTotal: summary.finalTotal,
      estimatedDelivery: '10–20 Minutes'
    };

    // Save order snapshot
    saveLastOrderToStorage(orderObj);

    // Clear cart now that order is placed successfully
    State.cart = [];
    saveCartToStorage();
    updateCartBadge();

    // Navigate to confirmation view
    navigateTo('order-confirmation');
  }

  // =========================================================================
  // 11. SCREEN 6: ORDER CONFIRMATION RENDERING
  // =========================================================================
  function renderOrderConfirmationView() {
    if (!State.lastOrder) {
      loadLastOrderFromStorage();
    }

    const order = State.lastOrder;
    if (!order) {
      navigateTo('home');
      return;
    }

    const idEl = document.getElementById('confOrderId');
    const dateEl = document.getElementById('confOrderDate');
    const totalEl = document.getElementById('confFinalTotal');
    const methodEl = document.getElementById('confPaymentMethod');
    const deliveryEl = document.getElementById('confEstDelivery');
    const itemsList = document.getElementById('confItemsList');

    if (idEl) idEl.textContent = order.orderId;
    if (dateEl) dateEl.textContent = order.date;
    if (totalEl) totalEl.textContent = formatINR(order.finalTotal);
    if (methodEl) methodEl.textContent = order.paymentMethod;
    if (deliveryEl) deliveryEl.textContent = order.estimatedDelivery;

    if (itemsList) {
      itemsList.innerHTML = order.items.map(item => `
        <div class="conf-item-row">
          <span class="name">${item.name} (${item.unit}) × ${item.quantity}</span>
          <span class="price">${formatINR(item.total)}</span>
        </div>
      `).join('') + `
        <div class="conf-item-row" style="color: var(--text-muted); font-size: 0.8rem; margin-top: 4px;">
          <span>Delivery Charges</span>
          <span>${order.deliveryCharge === 0 ? '<strong style="color: var(--primary);">FREE</strong>' : formatINR(order.deliveryCharge)}</span>
        </div>
      `;
    }
  }

  // =========================================================================
  // 12. DEMO USER LOGIN & MODAL
  // =========================================================================
  function openLoginModal() {
    const modal = document.getElementById('loginModal');
    const phoneErr = document.getElementById('errLoginPhone');
    const phoneInput = document.getElementById('loginInputPhone');
    if (phoneErr) phoneErr.textContent = '';
    if (phoneInput) phoneInput.classList.remove('error');
    if (modal) {
      modal.classList.add('active');
      if (phoneInput) setTimeout(() => phoneInput.focus(), 100);
    }
  }

  function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.classList.remove('active');
  }

  function updateUserUI() {
    const loginBtnText = document.getElementById('loginBtnText');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (State.user && State.user.phone) {
      const displayName = State.user.name ? State.user.name.split(' ')[0] : 'Account';
      if (loginBtnText) loginBtnText.textContent = `Hi, ${displayName}`;
      if (loginBtn) loginBtn.title = `Logged in as ${State.user.name || 'User'} (${State.user.phone})`;
      if (logoutBtn) logoutBtn.style.display = 'inline-flex';
    } else {
      if (loginBtnText) loginBtnText.textContent = 'Login';
      if (loginBtn) loginBtn.title = 'Account / Login';
      if (logoutBtn) logoutBtn.style.display = 'none';
    }
  }

  function handleDemoLogin(userName, userPhone) {
    saveUserToStorage({
      name: userName || 'Rahul Sharma',
      phone: userPhone || '9876543210'
    });
    closeLoginModal();
    showToast(`Logged in successfully as ${State.user.name}! You can now add products to your cart.`, 'success');
  }

  function handleDemoLogout() {
    saveUserToStorage(null);
    showToast('Logged out successfully. Login is now required to add items.', 'info');
  }

  // =========================================================================
  // 13. TOAST NOTIFICATIONS
  // =========================================================================
  function showToast(message, type = 'success', showLoginAction = false) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    let icon = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `;

    if (type === 'error') {
      toast.style.borderLeftColor = 'var(--accent-red)';
      icon = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      `;
    } else if (type === 'info') {
      toast.style.borderLeftColor = 'var(--accent-blue)';
      icon = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      `;
    }

    const actionHtml = showLoginAction
      ? `<button class="toast-action-btn" type="button" id="toastLoginBtn">Log In</button>`
      : '';

    toast.innerHTML = `${icon} <span>${message}</span> ${actionHtml}`;

    const toastLoginBtn = toast.querySelector('#toastLoginBtn');
    if (toastLoginBtn) {
      toastLoginBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openLoginModal();
      });
    }

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  // =========================================================================
  // 14. EVENT LISTENERS & DOM DELEGATION
  // =========================================================================
  function initEventListeners() {
    // Brand Logo Click -> Go Home
    const brand = document.getElementById('brandLogo');
    if (brand) {
      brand.addEventListener('click', () => navigateTo('home'));
    }

    // Top Header Navigation Links (Secondary Dark Green Nav)
    document.querySelectorAll('.category-nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = link.getAttribute('data-category');
        if (cat === 'home') {
          navigateTo('home');
        } else {
          navigateTo('catalog', { category: cat });
        }
      });
    });

    // Cart Button in Header
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
      cartBtn.addEventListener('click', () => navigateTo('cart'));
    }

    // Login Button in Header
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        if (!State.user) {
          openLoginModal();
        }
      });
    }

    // Logout Button in Header
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to log out of FreshMart?')) {
          handleDemoLogout();
        }
      });
    }

    // Modal Close
    const modalClose = document.getElementById('modalCloseBtn');
    if (modalClose) {
      modalClose.addEventListener('click', closeLoginModal);
    }
    const modalBackdrop = document.getElementById('loginModal');
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeLoginModal();
      });
    }

    // Demo Login Submit Form
    const loginForm = document.getElementById('demoLoginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const phoneInput = document.getElementById('loginInputPhone');
        const nameInput = document.getElementById('loginInputName');
        const phoneErr = document.getElementById('errLoginPhone');

        const phoneVal = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : '';
        const nameVal = nameInput ? nameInput.value.trim() : '';

        // Validate 10-digit Indian mobile number
        if (!phoneVal || phoneVal.length !== 10 || !/^[6-9]\d{9}$/.test(phoneVal)) {
          if (phoneInput) phoneInput.classList.add('error');
          if (phoneErr) phoneErr.textContent = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
          return;
        }

        if (phoneInput) phoneInput.classList.remove('error');
        if (phoneErr) phoneErr.textContent = '';

        handleDemoLogin(nameVal || 'Rahul Sharma', phoneVal);
      });
    }

    // Quick One-Click Demo User Button
    const quickDemoBtn = document.getElementById('quickDemoLoginBtn');
    if (quickDemoBtn) {
      quickDemoBtn.addEventListener('click', () => {
        handleDemoLogin('Rahul Sharma', '9876543210');
      });
    }

    // Global Search Form (Header)
    const searchForm = document.getElementById('globalSearchForm');
    const searchInput = document.getElementById('globalSearchInput');
    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        navigateTo('catalog', { search: query, category: 'all' });
      });

      // Live search typing with slight debounce
      let searchDebounce;
      searchInput.addEventListener('input', () => {
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(() => {
          if (State.activeView === 'catalog') {
            State.searchQuery = searchInput.value.trim();
            renderCatalog();
          }
        }, 250);
      });
    }

    // Hero Shop Now Button
    const heroShopNow = document.getElementById('heroShopNowBtn');
    if (heroShopNow) {
      heroShopNow.addEventListener('click', () => {
        navigateTo('catalog', { category: 'all' });
      });
    }

    // Shop By Category cards on Home Page
    document.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.getAttribute('data-cat');
        navigateTo('catalog', { category: cat });
      });
    });

    // View All Categories link
    const viewAllCat = document.getElementById('viewAllCategoriesLink');
    if (viewAllCat) {
      viewAllCat.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('catalog', { category: 'all' });
      });
    }

    // Catalog Sidebar Category Buttons
    document.querySelectorAll('.category-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        State.currentCategory = cat;
        renderCatalog();
      });
    });

    // Price Range Slider
    const priceSlider = document.getElementById('priceRangeSlider');
    const priceDisplay = document.getElementById('priceRangeDisplay');
    const applyPriceBtn = document.getElementById('applyPriceFilterBtn');
    if (priceSlider && priceDisplay) {
      priceSlider.addEventListener('input', () => {
        priceDisplay.textContent = `₹0 - ₹${priceSlider.value}`;
      });
    }
    if (applyPriceBtn && priceSlider) {
      applyPriceBtn.addEventListener('click', () => {
        State.priceMax = parseInt(priceSlider.value, 10);
        renderCatalog();
      });
    }

    // Checkbox Filters
    const cbOrganic = document.getElementById('filterOrganic');
    const cbFresh = document.getElementById('filterFresh');
    const cbOnSale = document.getElementById('filterOnSale');
    const cbBestRated = document.getElementById('filterBestRated');

    [cbOrganic, cbFresh, cbOnSale, cbBestRated].forEach(cb => {
      if (cb) {
        cb.addEventListener('change', () => {
          State.filters.organic = cbOrganic ? cbOrganic.checked : false;
          State.filters.fresh = cbFresh ? cbFresh.checked : false;
          State.filters.onSale = cbOnSale ? cbOnSale.checked : false;
          State.filters.bestRated = cbBestRated ? cbBestRated.checked : false;
          renderCatalog();
        });
      }
    });

    // Reset Filters Button
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        State.currentCategory = 'all';
        State.searchQuery = '';
        State.priceMax = 500;
        State.filters = { organic: false, fresh: false, onSale: false, bestRated: false };
        if (searchInput) searchInput.value = '';
        if (cbOrganic) cbOrganic.checked = false;
        if (cbFresh) cbFresh.checked = false;
        if (cbOnSale) cbOnSale.checked = false;
        if (cbBestRated) cbBestRated.checked = false;
        renderCatalog();
      });
    }

    // Catalog Sort Select
    const sortSelect = document.getElementById('catalogSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        State.sortBy = sortSelect.value;
        renderCatalog();
      });
    }

    // Product Detail Quantity Selectors
    const detailQtyMinus = document.getElementById('detailQtyMinus');
    const detailQtyPlus = document.getElementById('detailQtyPlus');
    const detailQtyVal = document.getElementById('detailQtyValue');
    if (detailQtyMinus && detailQtyVal) {
      detailQtyMinus.addEventListener('click', () => {
        let current = parseInt(detailQtyVal.textContent, 10) || 1;
        if (current > 1) detailQtyVal.textContent = current - 1;
      });
    }
    if (detailQtyPlus && detailQtyVal) {
      detailQtyPlus.addEventListener('click', () => {
        let current = parseInt(detailQtyVal.textContent, 10) || 1;
        detailQtyVal.textContent = current + 1;
      });
    }

    // Detail Add to Cart Button
    const detailAddBtn = document.getElementById('detailAddBtn');
    if (detailAddBtn && detailQtyVal) {
      detailAddBtn.addEventListener('click', () => {
        const id = detailAddBtn.getAttribute('data-add-id');
        const qty = parseInt(detailQtyVal.textContent, 10) || 1;
        if (id) addToCart(id, qty);
      });
    }

    // Cart Actions (Proceed to checkout & Continue Shopping)
    const proceedToCheckout = document.getElementById('proceedToCheckoutBtn');
    if (proceedToCheckout) {
      proceedToCheckout.addEventListener('click', () => navigateTo('checkout'));
    }

    const continueShoppingBtn = document.getElementById('cartContinueShoppingBtn');
    if (continueShoppingBtn) {
      continueShoppingBtn.addEventListener('click', () => navigateTo('catalog'));
    }

    const emptyContinueBtn = document.getElementById('emptyCartContinueBtn');
    if (emptyContinueBtn) {
      emptyContinueBtn.addEventListener('click', () => navigateTo('catalog'));
    }

    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to remove all items from your cart?')) {
          clearCart();
        }
      });
    }

    // Checkout Place Order Button
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    if (placeOrderBtn) {
      placeOrderBtn.addEventListener('click', handleOrderPlacement);
    }

    // Payment Option selection radio styling
    document.querySelectorAll('.payment-option-label').forEach(label => {
      label.addEventListener('click', () => {
        document.querySelectorAll('.payment-option-label').forEach(l => l.classList.remove('selected'));
        label.classList.add('selected');
      });
    });

    // Confirmation Continue Shopping Button
    const confContinueBtn = document.getElementById('confContinueShoppingBtn');
    if (confContinueBtn) {
      confContinueBtn.addEventListener('click', () => navigateTo('catalog'));
    }

    // Print Receipt Button
    const printReceiptBtn = document.getElementById('printReceiptBtn');
    if (printReceiptBtn) {
      printReceiptBtn.addEventListener('click', () => window.print());
    }

    // Event Delegation for dynamically rendered buttons (Add to cart, View details, Wishlist, Cart Qty)
    document.addEventListener('click', (e) => {
      // 1. Add to cart button
      const addBtn = e.target.closest('[data-add-id]');
      if (addBtn) {
        const id = addBtn.getAttribute('data-add-id');
        addToCart(id, 1);
        return;
      }

      // 2. View Product Detail
      const viewTrigger = e.target.closest('[data-view-product]');
      if (viewTrigger) {
        const id = viewTrigger.getAttribute('data-view-product');
        navigateTo('product-detail', { productId: id });
        return;
      }

      // 3. Wishlist Heart
      const wishBtn = e.target.closest('[data-wishlist-id]');
      if (wishBtn) {
        const id = wishBtn.getAttribute('data-wishlist-id');
        if (State.wishlist.has(id)) {
          State.wishlist.delete(id);
          wishBtn.classList.remove('active');
          showToast('Removed from Wishlist', 'info');
        } else {
          State.wishlist.add(id);
          wishBtn.classList.add('active');
          showToast('Saved to Wishlist!', 'success');
        }
        return;
      }

      // 4. Cart Quantity Minus
      const cartMinus = e.target.closest('[data-cart-minus]');
      if (cartMinus) {
        const id = cartMinus.getAttribute('data-cart-minus');
        const item = State.cart.find(i => i.id === id);
        if (item) updateCartQuantity(id, item.quantity - 1);
        return;
      }

      // 5. Cart Quantity Plus
      const cartPlus = e.target.closest('[data-cart-plus]');
      if (cartPlus) {
        const id = cartPlus.getAttribute('data-cart-plus');
        const item = State.cart.find(i => i.id === id);
        if (item) updateCartQuantity(id, item.quantity + 1);
        return;
      }

      // 6. Cart Remove Item
      const cartRemove = e.target.closest('[data-cart-remove]');
      if (cartRemove) {
        const id = cartRemove.getAttribute('data-cart-remove');
        removeFromCart(id);
        return;
      }

      // 7. Product Detail Thumbnail Click
      const thumb = e.target.closest('.gallery-thumb');
      if (thumb) {
        document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const mainImg = document.getElementById('detailMainImage');
        const imgSrc = thumb.getAttribute('data-img-src');
        if (mainImg && imgSrc) mainImg.src = imgSrc;
        return;
      }

      // 8. Breadcrumb category navigation
      const navCat = e.target.closest('[data-nav-category]');
      if (navCat) {
        const cat = navCat.getAttribute('data-nav-category');
        navigateTo('catalog', { category: cat });
        return;
      }
    });
  }

  // =========================================================================
  // 15. INITIALIZATION
  // =========================================================================
  function init() {
    loadCartFromStorage();
    loadUserFromStorage();
    updateCartBadge();
    updateUserUI();
    initEventListeners();

    // Default to home page
    navigateTo('home');
  }

  // Boot up when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
