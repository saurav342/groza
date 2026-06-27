// ============================================
// GROZA — CATEGORY PAGE
// ============================================

import { getProductsByCategory, products } from '../data/products.js';
import categories from '../data/categories.js';
import { renderProductCard } from '../components/ProductCard.js';

export function renderCategoryPage({ slug }) {
  // If no slug, show all categories
  if (!slug) {
    return `
      <div class="page">
        <div class="container">
          <div class="category-page-header">
            <h1 class="category-page-title">All Categories</h1>
            <p class="category-page-count">${categories.length} categories</p>
          </div>
          <div class="categories-grid stagger-children" style="overflow:visible;display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-4)">
            ${categories.map(cat => `
              <a href="#/category/${cat.id}" class="category-card animate-fade-in-up" style="min-width:unset">
                <div class="category-icon" style="width:72px;height:72px;font-size:2.5rem">${cat.emoji}</div>
                <span class="category-name" style="font-size:var(--font-sm)">${cat.name}</span>
                <span class="category-count">${cat.count} items</span>
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  const category = categories.find(c => c.id === slug);
  if (!category) {
    return `
      <div class="page">
        <div class="container" style="text-align:center;padding:var(--space-16) 0">
          <div style="font-size:4rem;margin-bottom:var(--space-4)">🔍</div>
          <h1 style="font-size:var(--font-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-2)">Category not found</h1>
          <p style="color:var(--text-secondary);margin-bottom:var(--space-6)">The category you're looking for doesn't exist.</p>
          <a href="#/" class="btn btn-primary">Back to Home</a>
        </div>
      </div>
    `;
  }

  const categoryProducts = getProductsByCategory(slug);

  return `
    <div class="page">
      <div class="container">
        <div class="category-page-header">
          <div class="category-page-breadcrumb">
            <a href="#/">Home</a>
            <i data-lucide="chevron-right" style="width:14px;height:14px"></i>
            <span>${category.name}</span>
          </div>
          <h1 class="category-page-title">${category.emoji} ${category.name}</h1>
          <p class="category-page-count">${categoryProducts.length} products</p>
        </div>

        <div class="category-sort-bar">
          <div class="category-filters hide-scrollbar">
            <button class="chip active">All</button>
            <button class="chip">On Sale</button>
            <button class="chip">New</button>
            <button class="chip">Organic</button>
            <button class="chip">Top Rated</button>
          </div>
          <select aria-label="Sort products" id="category-sort">
            <option>Sort by</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
            <option>Newest</option>
          </select>
        </div>

        <div class="product-grid stagger-children">
          ${categoryProducts.map(p => `<div class="animate-fade-in-up">${renderProductCard(p)}</div>`).join('')}
        </div>

        ${categoryProducts.length === 0 ? `
          <div style="text-align:center;padding:var(--space-12) 0">
            <div style="font-size:3rem;margin-bottom:var(--space-4)">${category.emoji}</div>
            <h2 style="font-size:var(--font-lg);font-weight:var(--weight-semibold);margin-bottom:var(--space-2)">No products yet</h2>
            <p style="font-size:var(--font-sm);color:var(--text-secondary)">Check back soon!</p>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

export default renderCategoryPage;
