// ============================================
// GROZA — WISHLIST PAGE
// ============================================

import store from '../store.js';
import { renderProductCard } from '../components/ProductCard.js';

export function renderWishlistPage() {
  const items = store.wishlist;

  return `
    <div class="page">
      <div class="account-page">
        <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-6)">
          <a href="#/account" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:var(--radius-md);color:var(--text-secondary)">
            <i data-lucide="arrow-left" style="width:20px;height:20px"></i>
          </a>
          <h1 style="font-size:var(--font-2xl);font-weight:var(--weight-bold)">Wishlist</h1>
          <span style="font-size:var(--font-sm);color:var(--text-secondary)">(${items.length} items)</span>
        </div>

        ${items.length === 0 ? `
          <div class="wishlist-empty">
            <div class="wishlist-empty-icon">💚</div>
            <h2 class="wishlist-empty-title">Your wishlist is empty</h2>
            <p class="wishlist-empty-text">Save your favourite products for later!</p>
            <a href="#/" class="btn btn-primary" style="margin-top:var(--space-6)">Browse Products</a>
          </div>
        ` : `
          <div class="product-grid stagger-children">
            ${items.map(p => `<div class="animate-fade-in-up">${renderProductCard(p)}</div>`).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}

export default renderWishlistPage;
