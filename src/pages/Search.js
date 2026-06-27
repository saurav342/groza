// ============================================
// GROZA — SEARCH RESULTS PAGE
// ============================================

import { searchProducts, products } from '../data/products.js';
import { renderProductCard } from '../components/ProductCard.js';

export function renderSearchPage({ query }) {
  const decodedQuery = query ? decodeURIComponent(query) : '';
  const results = decodedQuery ? searchProducts(decodedQuery) : products;

  return `
    <div class="page">
      <div class="container" style="padding-top:var(--space-6)">
        <div class="category-page-header">
          <div class="category-page-breadcrumb">
            <a href="#/">Home</a>
            <i data-lucide="chevron-right" style="width:14px;height:14px"></i>
            <span>Search</span>
          </div>
          <h1 class="category-page-title">
            ${decodedQuery ? `Results for "${decodedQuery}"` : 'All Products'}
          </h1>
          <p class="category-page-count">${results.length} products found</p>
        </div>

        <div class="category-sort-bar">
          <div class="category-filters hide-scrollbar">
            <button class="chip active">All</button>
            <button class="chip">On Sale</button>
            <button class="chip">Organic</button>
            <button class="chip">Top Rated</button>
            <button class="chip">Under $10</button>
          </div>
          <select aria-label="Sort products">
            <option>Relevance</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>

        ${results.length > 0 ? `
          <div class="product-grid stagger-children">
            ${results.map(p => `<div class="animate-fade-in-up">${renderProductCard(p)}</div>`).join('')}
          </div>
        ` : `
          <div style="text-align:center;padding:var(--space-16) 0">
            <div style="font-size:4rem;margin-bottom:var(--space-4)">🔍</div>
            <h2 style="font-size:var(--font-xl);font-weight:var(--weight-semibold);margin-bottom:var(--space-2)">No products found</h2>
            <p style="font-size:var(--font-sm);color:var(--text-secondary)">Try a different search term or browse categories.</p>
            <a href="#/categories" class="btn btn-primary" style="margin-top:var(--space-6)">Browse Categories</a>
          </div>
        `}
      </div>
    </div>
  `;
}

export default renderSearchPage;
