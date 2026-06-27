// ============================================
// GROZA — GLOBAL STATE STORE
// ============================================

const STORAGE_KEY = 'groza_state';

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      cart: state.cart,
      wishlist: state.wishlist,
      recentlyViewed: state.recentlyViewed,
      addresses: state.addresses,
      selectedAddress: state.selectedAddress,
      theme: state.theme,
      recentSearches: state.recentSearches,
    }));
  } catch { /* quota exceeded */ }
}

const saved = loadState();

const store = {
  // Cart
  cart: saved.cart || [],

  // Wishlist
  wishlist: saved.wishlist || [],

  // Recently viewed products
  recentlyViewed: saved.recentlyViewed || [],

  // Recent searches
  recentSearches: saved.recentSearches || ['Avocado', 'Milk', 'Sourdough bread', 'Bananas'],

  // Addresses
  addresses: saved.addresses || [
    { id: 1, label: 'Home', address: '42 Collins Street, Melbourne VIC 3000', isDefault: true },
    { id: 2, label: 'Work', address: '100 George Street, Sydney NSW 2000', isDefault: false },
  ],
  selectedAddress: saved.selectedAddress || 0,

  // Theme
  theme: saved.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),

  // UI State (not persisted)
  cartOpen: false,
  searchOpen: false,

  // Listeners
  _listeners: new Set(),

  subscribe(fn) {
    this._listeners.add(fn);
    return () => this._listeners.delete(fn);
  },

  _notify() {
    saveState(this);
    this._listeners.forEach(fn => fn(this));
  },

  // Cart methods
  addToCart(product, qty = 1) {
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      this.cart.push({ ...product, qty });
    }
    this._notify();
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this._notify();
  },

  updateCartQty(productId, qty) {
    if (qty <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.qty = qty;
      this._notify();
    }
  },

  getCartTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  },

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + item.qty, 0);
  },

  getCartItemQty(productId) {
    const item = this.cart.find(item => item.id === productId);
    return item ? item.qty : 0;
  },

  clearCart() {
    this.cart = [];
    this._notify();
  },

  // Wishlist methods
  toggleWishlist(product) {
    const idx = this.wishlist.findIndex(item => item.id === product.id);
    if (idx >= 0) {
      this.wishlist.splice(idx, 1);
    } else {
      this.wishlist.push(product);
    }
    this._notify();
  },

  isInWishlist(productId) {
    return this.wishlist.some(item => item.id === productId);
  },

  // Recently viewed
  addRecentlyViewed(product) {
    this.recentlyViewed = [
      product,
      ...this.recentlyViewed.filter(p => p.id !== product.id),
    ].slice(0, 10);
    this._notify();
  },

  // Search
  addRecentSearch(term) {
    this.recentSearches = [
      term,
      ...this.recentSearches.filter(s => s !== term),
    ].slice(0, 8);
    this._notify();
  },

  // Theme
  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
    this._notify();
  },

  setTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    this._notify();
  },

  // Address
  setSelectedAddress(index) {
    this.selectedAddress = index;
    this._notify();
  },

  getCurrentAddress() {
    return this.addresses[this.selectedAddress] || this.addresses[0];
  },

  // Cart drawer
  openCart() {
    this.cartOpen = true;
    document.body.style.overflow = 'hidden';
    this._notify();
  },

  closeCart() {
    this.cartOpen = false;
    document.body.style.overflow = '';
    this._notify();
  },

  // Search overlay
  openSearch() {
    this.searchOpen = true;
    document.body.style.overflow = 'hidden';
    this._notify();
  },

  closeSearch() {
    this.searchOpen = false;
    document.body.style.overflow = '';
    this._notify();
  },
};

// Initialize theme
document.documentElement.setAttribute('data-theme', store.theme);

export default store;
