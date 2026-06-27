// ============================================
// GROZA — SEARCH OVERLAY COMPONENT
// ============================================

import store from '../store.js';
import { products, searchProducts } from '../data/products.js';
import categories from '../data/categories.js';

export function renderSearchOverlay() {
  const popularSearches = ['Avocado', 'Milk', 'Bread', 'Chicken', 'Bananas', 'Tim Tams', 'Coffee', 'Eggs'];

  return `
    <div class="search-overlay ${store.searchOpen ? 'open' : ''}" id="search-overlay">
      <div class="search-header">
        <button class="search-back-btn" onclick="window.closeSearch()" aria-label="Close search">
          <i data-lucide="arrow-left" style="width:20px;height:20px"></i>
        </button>
        <div class="search-input-wrapper">
          <input type="text" class="search-input" placeholder="Search groceries, fruits, snacks…" 
                 id="search-input" aria-label="Search products" autocomplete="off" />
          <button class="search-voice-btn" aria-label="Voice search" onclick="window.voiceSearch()">
            <i data-lucide="mic" style="width:18px;height:18px"></i>
          </button>
        </div>
      </div>

      <div class="search-body" id="search-body">
        <div id="search-results">
          <!-- Default content (no query) -->
          <div class="search-section">
            <h3 class="search-section-title">Recent Searches</h3>
            <div class="search-suggestions">
              ${store.recentSearches.map(term => `
                <div class="search-recent-item" onclick="window.performSearch('${term}')">
                  <i data-lucide="clock" class="search-recent-icon"></i>
                  ${term}
                </div>
              `).join('')}
            </div>
          </div>

          <div class="search-section">
            <h3 class="search-section-title">Popular Searches</h3>
            <div class="search-popular-tags">
              ${popularSearches.map(term => `
                <button class="search-tag" onclick="window.performSearch('${term}')">${term}</button>
              `).join('')}
            </div>
          </div>

          <div class="search-section">
            <h3 class="search-section-title">Browse Categories</h3>
            <div class="search-category-filters hide-scrollbar">
              ${categories.map(cat => `
                <button class="chip" onclick="window.closeSearch(); window.location.hash='#/category/${cat.id}'">
                  ${cat.emoji} ${cat.name}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  input.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    if (query.length < 2) {
      // Show default content
      resultsContainer.innerHTML = getDefaultSearchContent();
      if (window.lucide) window.lucide.createIcons({ nodes: [resultsContainer] });
      return;
    }

    const results = searchProducts(query);
    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-section" style="text-align:center;padding:var(--space-12) 0">
          <div style="font-size:3rem;margin-bottom:var(--space-4)">🔍</div>
          <h3 style="font-size:var(--font-lg);font-weight:var(--weight-semibold);margin-bottom:var(--space-2)">No results found</h3>
          <p style="font-size:var(--font-sm);color:var(--text-secondary)">Try a different search term</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <div class="search-section">
        <h3 class="search-section-title">${results.length} results for "${query}"</h3>
        <div class="search-suggestions">
          ${results.slice(0, 8).map(product => `
            <div class="search-suggestion-item" onclick="window.closeSearch(); window.navigateToProduct(${product.id})">
              <div class="search-suggestion-icon" style="overflow:hidden;display:flex;align-items:center;justify-content:center;background:var(--bg-secondary);border-radius:var(--radius-sm)">
                <img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;" />
              </div>
              <div class="search-suggestion-text">
                <div class="search-suggestion-name">${highlightMatch(product.name, query)}</div>
                <div class="search-suggestion-category">${product.weight} · $${product.price.toFixed(2)}</div>
              </div>
            </div>
          `).join('')}
        </div>
        ${results.length > 8 ? `
          <button class="btn btn-secondary w-full" style="margin-top:var(--space-4)" 
                  onclick="window.closeSearch(); window.location.hash='#/search/${encodeURIComponent(query)}'">
            View all ${results.length} results
          </button>
        ` : ''}
      </div>
    `;
  });

  // Focus input when overlay opens
  if (store.searchOpen) {
    setTimeout(() => input.focus(), 300);
  }
}

function highlightMatch(text, query) {
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<span class="search-highlight">$1</span>');
}

function getDefaultSearchContent() {
  const popularSearches = ['Avocado', 'Milk', 'Bread', 'Chicken', 'Bananas', 'Tim Tams', 'Coffee', 'Eggs'];
  return `
    <div class="search-section">
      <h3 class="search-section-title">Recent Searches</h3>
      <div class="search-suggestions">
        ${store.recentSearches.map(term => `
          <div class="search-recent-item" onclick="window.performSearch('${term}')">
            <i data-lucide="clock" class="search-recent-icon"></i>
            ${term}
          </div>
        `).join('')}
      </div>
    </div>
    <div class="search-section">
      <h3 class="search-section-title">Popular Searches</h3>
      <div class="search-popular-tags">
        ${popularSearches.map(term => `
          <button class="search-tag" onclick="window.performSearch('${term}')">${term}</button>
        `).join('')}
      </div>
    </div>
  `;
}

export default renderSearchOverlay;
