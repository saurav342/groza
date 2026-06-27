// ============================================
// GROZA — MAIN APPLICATION ENTRY
// ============================================

import './styles/index.css';
import store from './store.js';
import router from './router.js';
import { getProductById, products } from './data/products.js';
import collections from './data/collections.js';
import { showToast } from './components/Toast.js';
import { renderNavbar, initNavbarScroll } from './components/Navbar.js';
import { renderBottomNav } from './components/BottomNav.js';
import { renderCartDrawer } from './components/CartDrawer.js';
import { renderSearchOverlay, initSearch } from './components/SearchOverlay.js';
import { renderHomePage, initHomePage } from './pages/Home.js';
import { renderCategoryPage } from './pages/Category.js';
import { renderProductPage, initProductPage } from './pages/Product.js';
import { renderCartPage } from './pages/Cart.js';
import { renderCheckoutPage, initCheckoutPage } from './pages/Checkout.js';
import { renderSearchPage } from './pages/Search.js';
import { renderAccountPage } from './pages/Account.js';
import { renderOrdersPage } from './pages/Orders.js';
import { renderWishlistPage } from './pages/Wishlist.js';
import { renderRewardsPage } from './pages/Rewards.js';
import { renderSettingsPage } from './pages/Settings.js';
import { renderOrderTrackingPage } from './pages/OrderTracking.js';

// ============================================
// GLOBAL FUNCTIONS (accessible from onclick handlers)
// ============================================

window.showToast = showToast;

window.addToCart = function(productId) {
  const product = getProductById(productId);
  if (product) {
    store.addToCart(product);
    showToast({ title: 'Added to cart', message: `${product.name} added`, type: 'success' });
    refreshUI();
  }
};

window.updateCartQty = function(productId, qty) {
  store.updateCartQty(productId, qty);
  refreshUI();
};

window.removeFromCart = function(productId) {
  store.removeFromCart(productId);
  refreshUI();
};

window.toggleWishlist = function(productId) {
  const product = getProductById(productId);
  if (product) {
    store.toggleWishlist(product);
    const isNow = store.isInWishlist(productId);
    showToast({
      title: isNow ? 'Added to wishlist' : 'Removed from wishlist',
      message: product.name,
      type: isNow ? 'success' : 'info',
    });
    refreshUI();
  }
};

window.openCart = function() {
  store.openCart();
  updateCartDrawer();
};

window.closeCart = function() {
  store.closeCart();
  updateCartDrawer();
};

window.openSearch = function() {
  store.openSearch();
  updateSearchOverlay();
  setTimeout(() => {
    const input = document.getElementById('search-input');
    if (input) input.focus();
  }, 300);
};

window.closeSearch = function() {
  store.closeSearch();
  updateSearchOverlay();
};

window.toggleTheme = function() {
  store.toggleTheme();
  showToast({
    title: `${store.theme === 'dark' ? '🌙 Dark' : '☀️ Light'} mode`,
    message: 'Theme updated',
    type: 'info',
  });
  refreshUI();
};

window.navigateToProduct = function(productId) {
  router.navigate(`/product/${productId}`);
};

window.performSearch = function(term) {
  store.addRecentSearch(term);
  store.closeSearch();
  router.navigate(`/search/${encodeURIComponent(term)}`);
  updateSearchOverlay();
};

window.voiceSearch = function() {
  showToast({ title: 'Voice Search', message: 'Voice search coming soon!', type: 'info' });
};

window.showAddressSelector = function() {
  showToast({ title: 'Address Selector', message: 'Address selection coming soon!', type: 'info' });
};

window.applyPromo = function() {
  const input = document.getElementById('promo-code-input') || document.querySelector('.cart-promo input');
  const code = input ? input.value.trim() : '';
  if (code.toUpperCase() === 'FRESH20') {
    showToast({ title: 'Promo applied!', message: '20% off your order', type: 'success' });
  } else if (code) {
    showToast({ title: 'Invalid code', message: 'Please try a different promo code', type: 'error' });
  } else {
    showToast({ title: 'Enter a code', message: 'Please enter a promo code first', type: 'warning' });
  }
};

// Product page specific
window.setProductQty = function(productId, delta) {
  const display = document.getElementById('product-qty-display');
  if (display) {
    let qty = parseInt(display.textContent) + delta;
    if (qty < 1) qty = 1;
    if (qty > 20) qty = 20;
    display.textContent = qty;
  }
};

window.addToCartFromPage = function(productId) {
  const display = document.getElementById('product-qty-display');
  const qty = display ? parseInt(display.textContent) : 1;
  const product = getProductById(productId);
  if (product) {
    // Reset to desired quantity
    store.removeFromCart(productId);
    store.addToCart(product, qty);
    showToast({ title: 'Added to cart', message: `${qty}× ${product.name}`, type: 'success' });
    refreshUI();
  }
};

// ============================================
// UI REFRESH
// ============================================

function updateCartDrawer() {
  const cartWrapper = document.getElementById('cart-wrapper');
  if (cartWrapper) {
    cartWrapper.innerHTML = renderCartDrawer();
    if (window.lucide) window.lucide.createIcons({ nodes: [cartWrapper] });
  }
}

function updateSearchOverlay() {
  const searchWrapper = document.getElementById('search-wrapper');
  if (searchWrapper) {
    searchWrapper.innerHTML = renderSearchOverlay();
    if (window.lucide) window.lucide.createIcons({ nodes: [searchWrapper] });
    initSearch();
  }
}

function refreshUI() {
  // Update navbar cart badge
  const badge = document.getElementById('cart-badge');
  const count = store.getCartCount();
  const cartBtn = document.getElementById('cart-btn');
  if (cartBtn) {
    const existingBadge = cartBtn.querySelector('.badge-count');
    if (count > 0) {
      if (existingBadge) {
        existingBadge.textContent = count;
        existingBadge.classList.add('pop');
        setTimeout(() => existingBadge.classList.remove('pop'), 300);
      } else {
        const newBadge = document.createElement('span');
        newBadge.className = 'badge-count pop';
        newBadge.id = 'cart-badge';
        newBadge.textContent = count;
        cartBtn.appendChild(newBadge);
      }
    } else if (existingBadge) {
      existingBadge.remove();
    }
  }

  // Update bottom nav cart badge
  const bottomNav = document.getElementById('bottom-nav');
  if (bottomNav) {
    bottomNav.innerHTML = renderBottomNav().replace(/<nav[^>]*>|<\/nav>/g, '');
    if (window.lucide) window.lucide.createIcons({ nodes: [bottomNav] });
  }

  // Update cart drawer if open
  if (store.cartOpen) {
    updateCartDrawer();
  }

  // Re-render current page content to update product cards
  router.handleRoute();
}

// ============================================
// APP SHELL
// ============================================

function renderAppShell() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNavbar()}
    <div id="search-wrapper">${renderSearchOverlay()}</div>
    <div id="cart-wrapper">${renderCartDrawer()}</div>
    <main id="page-content" style="transition: opacity 0.15s ease, transform 0.15s ease;">
    </main>
    ${renderBottomNav()}
  `;
}

// ============================================
// ROUTE REGISTRATION
// ============================================

router.register('/', () => {
  const html = renderHomePage();
  setTimeout(initHomePage, 100);
  return html;
});

router.register('/categories', () => renderCategoryPage({}));
router.register('/category/:slug', (params) => renderCategoryPage(params));

router.register('/product/:id', (params) => {
  const html = renderProductPage(params);
  setTimeout(initProductPage, 100);
  return html;
});

router.register('/cart', () => renderCartPage());

router.register('/checkout', () => {
  const html = renderCheckoutPage();
  setTimeout(initCheckoutPage, 100);
  return html;
});

router.register('/search', () => renderSearchPage({}));
router.register('/search/:query', (params) => renderSearchPage(params));

router.register('/account', () => renderAccountPage());
router.register('/orders', () => renderOrdersPage());
router.register('/wishlist', () => renderWishlistPage());
router.register('/rewards', () => renderRewardsPage());
router.register('/settings', () => renderSettingsPage());
router.register('/order-tracking', () => renderOrderTrackingPage());

// Collection routes
router.register('/collection/:id', (params) => {
  const collection = collections.find(c => c.id === params.id);
  if (!collection) {
    return `<div class="page"><div class="container" style="text-align:center;padding:var(--space-16) 0">
      <h1>Collection not found</h1>
      <a href="#/" class="btn btn-primary" style="margin-top:var(--space-4)">Back to Home</a>
    </div></div>`;
  }
  const import_products = products;
  const filteredProducts = import_products.filter(collection.productFilter);
  const { renderProductCard } = require('./components/ProductCard.js');
  
  return `
    <div class="page">
      <div class="container" style="padding-top:var(--space-6)">
        <div class="category-page-header">
          <div class="category-page-breadcrumb">
            <a href="#/">Home</a>
            <i data-lucide="chevron-right" style="width:14px;height:14px"></i>
            <span>${collection.name}</span>
          </div>
          <h1 class="category-page-title">${collection.emoji} ${collection.name}</h1>
          <p class="category-page-count">${collection.description} · ${filteredProducts.length} products</p>
        </div>
        <div class="product-grid stagger-children">
          ${filteredProducts.map(p => `<div class="animate-fade-in-up">${renderProductCard(p)}</div>`).join('')}
        </div>
      </div>
    </div>
  `;
});

// ============================================
// INITIALIZE APP
// ============================================

function init() {
  // Wait for Lucide to load
  const startApp = () => {
    renderAppShell();
    initNavbarScroll();
    initSearch();
    router.init();

    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    console.log('%c🥑 Groza', 'color:#16A34A;font-size:24px;font-weight:bold');
    console.log('%cInstant Grocery Delivery — Australia', 'color:#64748B;font-size:12px');
  };

  // Check if lucide is loaded
  if (window.lucide) {
    startApp();
  } else {
    // Wait for script to load
    const checkLucide = setInterval(() => {
      if (window.lucide) {
        clearInterval(checkLucide);
        startApp();
      }
    }, 50);
    // Fallback: start anyway after 2 seconds
    setTimeout(() => {
      clearInterval(checkLucide);
      startApp();
    }, 2000);
  }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
