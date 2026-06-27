// ============================================
// GROZA — PRODUCT DETAIL PAGE
// ============================================

import { getProductById, products } from '../data/products.js';
import categories from '../data/categories.js';
import store from '../store.js';
import { renderProductCard } from '../components/ProductCard.js';

export function renderProductPage({ id }) {
  const product = getProductById(id);
  if (!product) {
    return `
      <div class="page">
        <div class="container" style="text-align:center;padding:var(--space-16) 0">
          <div style="font-size:4rem;margin-bottom:var(--space-4)">🔍</div>
          <h1 style="font-size:var(--font-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-2)">Product not found</h1>
          <p style="color:var(--text-secondary);margin-bottom:var(--space-6)">The product you're looking for doesn't exist.</p>
          <a href="#/" class="btn btn-primary">Back to Home</a>
        </div>
      </div>
    `;
  }

  // Track recently viewed
  store.addRecentlyViewed(product);

  const category = categories.find(c => c.id === product.category);
  const qty = store.getCartItemQty(product.id);
  const isWishlisted = store.isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const ratingStars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '☆' : '');

  // Sample reviews
  const reviews = [
    { name: 'Sarah M.', initials: 'SM', rating: 5, date: '2 days ago', text: 'Absolutely fresh and perfect quality! Arrived quickly and well packaged.' },
    { name: 'James K.', initials: 'JK', rating: 4, date: '1 week ago', text: 'Good quality product. Would buy again. Delivery was on time.' },
    { name: 'Emma L.', initials: 'EL', rating: 5, date: '2 weeks ago', text: 'Love the freshness! This is now a regular on my shopping list.' },
  ];

  const hasNutrition = product.nutrition && Object.keys(product.nutrition).length > 0;

  return `
    <div class="page">
      <div class="container">
        <div class="category-page-breadcrumb" style="padding-top:var(--space-4)">
          <a href="#/">Home</a>
          <i data-lucide="chevron-right" style="width:14px;height:14px"></i>
          <a href="#/category/${product.category}">${category ? category.name : 'Category'}</a>
          <i data-lucide="chevron-right" style="width:14px;height:14px"></i>
          <span>${product.name}</span>
        </div>
      </div>

      <div class="product-page container">
        <div class="product-page-grid">
          <!-- Image Gallery -->
          <div class="product-gallery">
            <div class="product-gallery-main" id="product-main-image">
              <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="product-gallery-thumbs">
              <button class="product-gallery-thumb active">
                <img src="${product.image}" alt="${product.name}" />
              </button>
              <button class="product-gallery-thumb">📦</button>
              <button class="product-gallery-thumb">🏷️</button>
              <button class="product-gallery-thumb">📋</button>
            </div>
          </div>

          <!-- Product Info -->
          <div class="product-info">
            <div class="product-info-badges">
              ${product.badge === 'organic' ? '<span class="badge badge-success">🌱 Organic</span>' : ''}
              ${product.badge === 'new' ? '<span class="badge badge-primary">✨ New</span>' : ''}
              ${product.discount > 0 ? `<span class="badge badge-error">-${product.discount}% OFF</span>` : ''}
            </div>

            <h1 class="product-info-name">${product.name}</h1>
            <p class="product-info-weight">${product.weight}</p>

            <div class="product-info-rating">
              <span class="product-info-stars">${ratingStars}</span>
              <span class="product-info-rating-text">${product.rating} (${product.reviews} reviews)</span>
            </div>

            <div class="product-info-price-row">
              <span class="product-info-price">$${product.price.toFixed(2)}</span>
              ${product.originalPrice ? `
                <span class="product-info-original-price">$${product.originalPrice.toFixed(2)}</span>
                <span class="product-info-discount">Save $${(product.originalPrice - product.price).toFixed(2)}</span>
              ` : ''}
            </div>

            <div class="product-info-delivery">
              <i data-lucide="zap" style="width:16px;height:16px"></i>
              Delivery in ${product.delivery} · Free over $50
            </div>

            <div class="product-actions">
              <div class="product-qty-selector">
                <button onclick="window.setProductQty(${product.id}, -1)" aria-label="Decrease">
                  <i data-lucide="minus" style="width:16px;height:16px"></i>
                </button>
                <span id="product-qty-display">${qty || 1}</span>
                <button onclick="window.setProductQty(${product.id}, 1)" aria-label="Increase">
                  <i data-lucide="plus" style="width:16px;height:16px"></i>
                </button>
              </div>
              <button class="product-add-to-cart" onclick="window.addToCartFromPage(${product.id})">
                <i data-lucide="shopping-bag" style="width:18px;height:18px"></i>
                ${qty > 0 ? 'Update Cart' : 'Add to Cart'} — $${product.price.toFixed(2)}
              </button>
            </div>

            <div style="display:flex;gap:var(--space-3);margin-top:var(--space-2)">
              <button class="btn btn-ghost" onclick="window.toggleWishlist(${product.id})" style="flex:1">
                <i data-lucide="heart" style="width:16px;height:16px;${isWishlisted ? 'fill:#EF4444;color:#EF4444' : ''}"></i>
                ${isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
              <button class="btn btn-ghost" style="flex:1">
                <i data-lucide="share-2" style="width:16px;height:16px"></i>
                Share
              </button>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div style="margin-top:var(--space-8)">
          <div class="product-tabs" id="product-tabs">
            <button class="product-tab active" data-tab="details">Details</button>
            ${hasNutrition ? '<button class="product-tab" data-tab="nutrition">Nutrition</button>' : ''}
            <button class="product-tab" data-tab="reviews">Reviews (${product.reviews})</button>
          </div>

          <div id="product-tab-content">
            <div class="product-tab-content" id="tab-details">
              <h3 style="font-size:var(--font-base);font-weight:var(--weight-semibold);margin-bottom:var(--space-3);color:var(--text)">Description</h3>
              <p>${product.description}</p>
              <h3 style="font-size:var(--font-base);font-weight:var(--weight-semibold);margin:var(--space-4) 0 var(--space-3);color:var(--text)">Ingredients</h3>
              <p>${product.ingredients}</p>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        ${relatedProducts.length > 0 ? `
          <div class="section">
            <div class="section-header">
              <h2 class="section-title">Related Products</h2>
              <a href="#/category/${product.category}" class="section-link">View All →</a>
            </div>
            <div class="product-grid" style="grid-template-columns:repeat(2,1fr)">
              ${relatedProducts.map(p => renderProductCard(p)).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Sticky Add to Cart (Mobile) -->
      <div class="product-sticky-bar">
        <div>
          <span class="product-sticky-price">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span style="font-size:var(--font-xs);color:var(--text-tertiary);text-decoration:line-through;margin-left:var(--space-1)">$${product.originalPrice.toFixed(2)}</span>` : ''}
        </div>
        <button class="product-sticky-btn" onclick="window.addToCartFromPage(${product.id})">
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

export function initProductPage() {
  // Tab switching
  const tabs = document.querySelectorAll('.product-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabName = tab.dataset.tab;
      const contentEl = document.getElementById('product-tab-content');
      if (!contentEl) return;

      if (tabName === 'details') {
        // Already shown by default
      } else if (tabName === 'nutrition') {
        const productId = window.location.hash.match(/\/product\/(\d+)/);
        if (productId) {
          const product = getProductById(productId[1]);
          if (product && product.nutrition) {
            contentEl.innerHTML = `
              <div class="product-tab-content">
                <table class="nutrition-table">
                  <thead><tr><th>Nutrient</th><th>Per Serving</th></tr></thead>
                  <tbody>
                    ${Object.entries(product.nutrition).map(([key, val]) => `
                      <tr><td>${key.charAt(0).toUpperCase() + key.slice(1)}</td><td>${val}</td></tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `;
          }
        }
      } else if (tabName === 'reviews') {
        contentEl.innerHTML = `
          <div class="product-tab-content">
            ${['Sarah M.|SM|5|2 days ago|Absolutely fresh and perfect quality! Arrived quickly and well packaged.',
               'James K.|JK|4|1 week ago|Good quality product. Would buy again. Delivery was on time.',
               'Emma L.|EL|5|2 weeks ago|Love the freshness! This is now a regular on my shopping list.']
              .map(r => {
                const [name, initials, rating, date, text] = r.split('|');
                return `
                  <div class="review-card">
                    <div class="review-header">
                      <div class="review-avatar">${initials}</div>
                      <div>
                        <div class="review-name">${name}</div>
                        <div class="review-date">${date} · ${'★'.repeat(parseInt(rating))}${'☆'.repeat(5 - parseInt(rating))}</div>
                      </div>
                    </div>
                    <p class="review-text">${text}</p>
                  </div>
                `;
              }).join('')}
          </div>
        `;
      }
    });
  });

  // Gallery thumb clicking
  const thumbs = document.querySelectorAll('.product-gallery-thumb');
  const mainImageEl = document.getElementById('product-main-image');
  
  // Find current product
  const productIdMatch = window.location.hash.match(/\/product\/(\d+)/);
  const currentProduct = productIdMatch ? getProductById(productIdMatch[1]) : null;

  thumbs.forEach((thumb, idx) => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      
      if (mainImageEl && currentProduct) {
        if (idx === 0) {
          mainImageEl.innerHTML = `<img src="${currentProduct.image}" alt="${currentProduct.name}" />`;
        } else if (idx === 1) {
          mainImageEl.innerHTML = '📦';
        } else if (idx === 2) {
          mainImageEl.innerHTML = '🏷️';
        } else if (idx === 3) {
          mainImageEl.innerHTML = '📋';
        }
      }
    });
  });
}

export default renderProductPage;
