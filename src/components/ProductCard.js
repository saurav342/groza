// ============================================
// GROZA — PRODUCT CARD COMPONENT
// ============================================

import store from '../store.js';
import { showToast } from './Toast.js';

export function renderProductCard(product) {
  const qty = store.getCartItemQty(product.id);
  const isWishlisted = store.isInWishlist(product.id);

  const badgeMap = {
    discount: `<span class="product-badge discount">-${product.discount}%</span>`,
    new: '<span class="product-badge new">NEW</span>',
    organic: '<span class="product-badge organic">Organic</span>',
  };

  const badge = product.badge ? badgeMap[product.badge] || '' : 
    (product.discount >= 15 ? `<span class="product-badge discount">-${product.discount}%</span>` : '');

  const ratingStars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '½' : '');

  return `
    <article class="product-card" data-product-id="${product.id}" onclick="window.navigateToProduct(${product.id})">
      <div class="product-card-image">
        ${badge}
        <button class="product-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                onclick="event.stopPropagation(); window.toggleWishlist(${product.id})" 
                aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
          <i data-lucide="${isWishlisted ? 'heart' : 'heart'}" style="width:16px;height:16px;${isWishlisted ? 'fill:currentColor' : ''}"></i>
        </button>
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" />
      </div>
      <div class="product-card-body">
        <div class="product-delivery">
          <i data-lucide="zap" style="width:12px;height:12px"></i>
          ${product.delivery}
        </div>
        <h3 class="product-name">${product.name}</h3>
        <span class="product-weight">${product.weight}</span>
        <div class="product-rating">
          <span class="stars">${ratingStars}</span>
          <span class="count">(${product.reviews})</span>
        </div>
      </div>
      <div class="product-card-footer">
        <div class="product-price">
          <span class="current">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span class="original">$${product.originalPrice.toFixed(2)}</span>` : ''}
        </div>
        ${qty > 0 ? `
          <div class="product-qty-control" onclick="event.stopPropagation()">
            <button class="product-qty-btn" onclick="window.updateCartQty(${product.id}, ${qty - 1})">−</button>
            <span class="product-qty-value">${qty}</span>
            <button class="product-qty-btn" onclick="window.updateCartQty(${product.id}, ${qty + 1})">+</button>
          </div>
        ` : `
          <button class="product-add-btn" onclick="event.stopPropagation(); window.addToCart(${product.id})">
            <i data-lucide="plus" style="width:14px;height:14px"></i> Add
          </button>
        `}
      </div>
    </article>
  `;
}

export function renderProductGrid(products, title = '', viewAllLink = '') {
  if (!products.length) return '';
  return `
    <div class="section">
      ${title ? `
        <div class="section-header container">
          <h2 class="section-title">${title}</h2>
          ${viewAllLink ? `<a href="${viewAllLink}" class="section-link">View All →</a>` : ''}
        </div>
      ` : ''}
      <div class="container">
        <div class="product-grid">
          ${products.map(p => renderProductCard(p)).join('')}
        </div>
      </div>
    </div>
  `;
}

export function renderProductScrollRow(products, title = '', viewAllLink = '') {
  if (!products.length) return '';
  return `
    <div class="section">
      ${title ? `
        <div class="section-header container">
          <h2 class="section-title">${title}</h2>
          ${viewAllLink ? `<a href="${viewAllLink}" class="section-link">View All →</a>` : ''}
        </div>
      ` : ''}
      <div class="container">
        <div class="product-scroll-row hide-scrollbar">
          ${products.map(p => renderProductCard(p)).join('')}
        </div>
      </div>
    </div>
  `;
}

export default renderProductCard;
