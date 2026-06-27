// ============================================
// GROZA — HOME PAGE
// ============================================

import { products, getFeaturedProducts, getPopularProducts } from '../data/products.js';
import categories from '../data/categories.js';
import collections from '../data/collections.js';
import store from '../store.js';
import { renderProductCard, renderProductScrollRow } from '../components/ProductCard.js';

export function renderHomePage() {
  const featured = getFeaturedProducts();
  const popular = getPopularProducts();
  const recentlyViewed = store.recentlyViewed;

  return `
    <div class="page" id="home-page">
      <!-- Hero Section -->
      <section class="hero" aria-label="Hero banner">
        <div class="hero-inner">
          <div class="hero-content">
            <div class="hero-badge">
              <span class="dot"></span>
              Delivering across Australia
            </div>
            <h1 class="hero-title">
              Groceries delivered in <span class="highlight">minutes</span>
            </h1>
            <p class="hero-subtitle">
              Fresh groceries, everyday essentials, and more — delivered to your door across Australia.
            </p>
            <div class="hero-actions">
              <a href="#/categories" class="hero-cta">Shop Now</a>
              <a href="#/categories" class="hero-secondary-cta">Browse Categories →</a>
            </div>
            <div class="hero-stats">
              <div class="hero-stat">
                <div class="hero-stat-value">10K+</div>
                <div class="hero-stat-label">Products</div>
              </div>
              <div class="hero-stat">
                <div class="hero-stat-value">30 min</div>
                <div class="hero-stat-label">Avg. Delivery</div>
              </div>
              <div class="hero-stat">
                <div class="hero-stat-value">4.9★</div>
                <div class="hero-stat-label">Rating</div>
              </div>
            </div>
          </div>
          <div class="hero-illustration">
            <div class="hero-illustration-grid">
              <a href="#/product/1" class="hero-emoji-card" aria-label="Organic Avocados">🥑</a>
              <a href="#/product/9" class="hero-emoji-card" aria-label="Full Cream Milk">🥛</a>
              <a href="#/product/3" class="hero-emoji-card" aria-label="Fresh Strawberries">🍓</a>
              <a href="#/product/14" class="hero-emoji-card" aria-label="Sourdough Loaf">🍞</a>
              <a href="#/product/19" class="hero-emoji-card" aria-label="Beef Mince">🥩</a>
              <a href="#/product/28" class="hero-emoji-card" aria-label="Fresh Orange Juice">🍊</a>
            </div>
            <div class="hero-floating hero-floating-timer">
              <span class="timer-dot"></span>
              <span>Delivering now</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Coupon Banner -->
      <div class="container" style="padding-top:var(--space-6)">
        <div class="coupon-banner" onclick="navigator.clipboard.writeText('FRESH20').then(() => window.showToast({title:'Code copied!',message:'FRESH20 copied to clipboard',type:'success'}))">
          <div class="coupon-banner-text">🎉 Get 20% off on your first order!</div>
          <span class="coupon-banner-code">FRESH20</span>
        </div>
      </div>

      <!-- Flash Deals -->
      <div class="container">
        <div class="flash-deals">
          <div class="flash-deals-header">
            <h2 class="flash-deals-title">⚡ Flash Deals</h2>
            <div style="display:flex;align-items:center;gap:var(--space-4)">
              <div class="flash-timer" id="flash-timer">
                <span class="flash-timer-unit" id="flash-hours">02</span>
                <span class="flash-timer-sep">:</span>
                <span class="flash-timer-unit" id="flash-mins">45</span>
                <span class="flash-timer-sep">:</span>
                <span class="flash-timer-unit" id="flash-secs">30</span>
              </div>
              <a href="#/collection/weekly-specials" class="section-link">View All →</a>
            </div>
          </div>
          <div class="product-scroll-row hide-scrollbar">
            ${products.filter(p => p.discount >= 18).slice(0, 6).map(p => renderProductCard(p)).join('')}
          </div>
        </div>
      </div>

      <!-- Categories -->
      <section class="categories-section" aria-label="Shop by category">
        <div class="section-header container">
          <h2 class="section-title">Shop by Category</h2>
          <a href="#/categories" class="section-link">View All →</a>
        </div>
        <div class="container">
          <div class="categories-grid hide-scrollbar stagger-children">
            ${categories.map(cat => `
              <a href="#/category/${cat.id}" class="category-card animate-fade-in-up" aria-label="${cat.name}">
                <div class="category-icon">${cat.emoji}</div>
                <span class="category-name">${cat.name}</span>
                <span class="category-count">${cat.count} items</span>
              </a>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Featured Products -->
      ${renderProductScrollRow(featured, '🔥 Top Deals', '#/collection/weekly-specials')}

      <!-- Popular Collections -->
      <section class="section" aria-label="Popular collections">
        <div class="section-header container">
          <h2 class="section-title">Popular Collections</h2>
          <a href="#/categories" class="section-link">View All →</a>
        </div>
        <div class="container">
          <div class="collections-grid stagger-children">
            ${collections.map(col => `
              <a href="#/collection/${col.id}" class="collection-card animate-fade-in-up" aria-label="${col.name}">
                <div class="collection-card-emoji">${col.emoji}</div>
                <div class="collection-card-name">${col.name}</div>
                <div class="collection-card-count">${col.description}</div>
              </a>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Popular Products -->
      ${renderProductScrollRow(popular, '⭐ Best Sellers', '#/collection/best-sellers')}

      <!-- Australian Favourites -->
      ${renderProductScrollRow(
        products.filter(p => [24, 32, 35, 47, 50, 46, 14].includes(p.id)),
        '🦘 Aussie Favourites',
        '#/collection/australian-favourites'
      )}

      <!-- Recently Viewed -->
      ${recentlyViewed.length > 0 ? renderProductScrollRow(recentlyViewed, '👀 Recently Viewed') : ''}

      <!-- Footer -->
      <footer class="site-footer" role="contentinfo">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">groza</div>
            <p class="footer-desc">Fresh groceries delivered in minutes across Australia. Quality products at the best prices.</p>
          </div>
          <div>
            <h4 class="footer-col-title">Company</h4>
            <div class="footer-links">
              <a href="#" class="footer-link">About Us</a>
              <a href="#" class="footer-link">Careers</a>
              <a href="#" class="footer-link">Press</a>
              <a href="#" class="footer-link">Blog</a>
            </div>
          </div>
          <div>
            <h4 class="footer-col-title">Support</h4>
            <div class="footer-links">
              <a href="#" class="footer-link">Help Centre</a>
              <a href="#" class="footer-link">Contact Us</a>
              <a href="#" class="footer-link">Returns</a>
              <a href="#" class="footer-link">FAQs</a>
            </div>
          </div>
          <div>
            <h4 class="footer-col-title">Legal</h4>
            <div class="footer-links">
              <a href="#" class="footer-link">Privacy Policy</a>
              <a href="#" class="footer-link">Terms of Service</a>
              <a href="#" class="footer-link">Cookie Policy</a>
              <a href="#" class="footer-link">Accessibility</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span class="footer-copyright">© 2026 Groza. All rights reserved. Made in 🇦🇺 Australia.</span>
          <div class="footer-social">
            <a href="#" class="footer-social-link" aria-label="Instagram"><i data-lucide="instagram" style="width:18px;height:18px"></i></a>
            <a href="#" class="footer-social-link" aria-label="Twitter"><i data-lucide="twitter" style="width:18px;height:18px"></i></a>
            <a href="#" class="footer-social-link" aria-label="Facebook"><i data-lucide="facebook" style="width:18px;height:18px"></i></a>
          </div>
        </div>
      </footer>
    </div>
  `;
}

export function initHomePage() {
  // Flash deal countdown timer
  let totalSeconds = 2 * 3600 + 45 * 60 + 30;
  const timerInterval = setInterval(() => {
    totalSeconds--;
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      return;
    }
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    const hoursEl = document.getElementById('flash-hours');
    const minsEl = document.getElementById('flash-mins');
    const secsEl = document.getElementById('flash-secs');

    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
  }, 1000);

  // Clean up on route change
  window.addEventListener('hashchange', () => clearInterval(timerInterval), { once: true });
}

export default renderHomePage;
