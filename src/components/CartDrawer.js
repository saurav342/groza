// ============================================
// GROZA — CART DRAWER COMPONENT
// ============================================

import store from '../store.js';

export function renderCartDrawer() {
  const items = store.cart;
  const subtotal = store.getCartTotal();
  const deliveryFee = subtotal > 50 ? 0 : 4.99;
  const gst = subtotal * 0.10;
  const total = subtotal + deliveryFee;
  const savings = items.reduce((sum, item) => {
    return sum + (item.originalPrice ? (item.originalPrice - item.price) * item.qty : 0);
  }, 0);

  return `
    <div class="cart-overlay ${store.cartOpen ? 'open' : ''}" id="cart-overlay" onclick="window.closeCart()"></div>
    <aside class="cart-drawer ${store.cartOpen ? 'open' : ''}" id="cart-drawer" role="dialog" aria-label="Shopping cart">
      <div class="cart-header">
        <h2 class="cart-header-title">
          <i data-lucide="shopping-bag" style="width:20px;height:20px"></i>
          Cart
          ${items.length > 0 ? `<span class="cart-header-count">${store.getCartCount()} items</span>` : ''}
        </h2>
        <button class="cart-close-btn" onclick="window.closeCart()" aria-label="Close cart">
          <i data-lucide="x" style="width:20px;height:20px"></i>
        </button>
      </div>

      <div class="cart-body">
        ${items.length === 0 ? `
          <div class="cart-empty">
            <div class="cart-empty-icon">🛒</div>
            <h3 class="cart-empty-title">Your cart is empty</h3>
            <p class="cart-empty-text">Add some fresh groceries to get started!</p>
            <button class="btn btn-primary" onclick="window.closeCart(); window.location.hash='#/'">
              Start Shopping
            </button>
          </div>
        ` : `
          ${items.map(item => `
            <div class="cart-item" data-cart-item-id="${item.id}">
              <div class="cart-item-image" style="overflow:hidden;display:flex;align-items:center;justify-content:center;background:var(--bg-secondary)">
                <img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;" />
              </div>
              <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-weight">${item.weight}</div>
                <div class="cart-item-bottom">
                  <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
                  <div class="cart-item-qty">
                    <button onclick="window.updateCartQty(${item.id}, ${item.qty - 1})" aria-label="Decrease quantity">
                      <i data-lucide="${item.qty === 1 ? 'trash-2' : 'minus'}" style="width:14px;height:14px"></i>
                    </button>
                    <span>${item.qty}</span>
                    <button onclick="window.updateCartQty(${item.id}, ${item.qty + 1})" aria-label="Increase quantity">
                      <i data-lucide="plus" style="width:14px;height:14px"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}

          <div class="cart-promo">
            <input type="text" placeholder="Promo code" aria-label="Enter promo code" id="promo-code-input" />
            <button onclick="window.applyPromo()">Apply</button>
          </div>
        `}
      </div>

      ${items.length > 0 ? `
        <div class="cart-footer">
          <div class="cart-summary">
            <div class="cart-summary-row">
              <span>Subtotal</span>
              <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="cart-summary-row">
              <span>Delivery</span>
              <span>${deliveryFee === 0 ? '<span class="savings">FREE</span>' : `$${deliveryFee.toFixed(2)}`}</span>
            </div>
            <div class="cart-summary-row">
              <span>GST (incl.)</span>
              <span>$${gst.toFixed(2)}</span>
            </div>
            ${savings > 0 ? `
              <div class="cart-summary-row">
                <span>You save</span>
                <span class="savings">−$${savings.toFixed(2)}</span>
              </div>
            ` : ''}
            <div class="cart-summary-row total">
              <span>Total</span>
              <span>$${total.toFixed(2)}</span>
            </div>
          </div>
          ${subtotal < 50 ? `
            <p style="font-size:var(--font-xs);color:var(--text-secondary);text-align:center;margin-bottom:var(--space-3)">
              Add $${(50 - subtotal).toFixed(2)} more for free delivery
            </p>
          ` : ''}
          <button class="cart-checkout-btn" onclick="window.closeCart(); window.location.hash='#/checkout'">
            Checkout — $${total.toFixed(2)}
            <i data-lucide="arrow-right" style="width:18px;height:18px"></i>
          </button>
        </div>
      ` : ''}
    </aside>
  `;
}

export default renderCartDrawer;
