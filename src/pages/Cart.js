// ============================================
// GROZA — CART PAGE
// ============================================

import store from '../store.js';

export function renderCartPage() {
  const items = store.cart;
  const subtotal = store.getCartTotal();
  const deliveryFee = subtotal > 50 ? 0 : 4.99;
  const gst = subtotal * 0.10;
  const total = subtotal + deliveryFee;
  const savings = items.reduce((sum, item) => {
    return sum + (item.originalPrice ? (item.originalPrice - item.price) * item.qty : 0);
  }, 0);

  if (items.length === 0) {
    return `
      <div class="page">
        <div class="container" style="text-align:center;padding:var(--space-16) 0">
          <div style="font-size:5rem;margin-bottom:var(--space-4)">🛒</div>
          <h1 style="font-size:var(--font-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-2)">Your cart is empty</h1>
          <p style="color:var(--text-secondary);margin-bottom:var(--space-6)">Looks like you haven't added anything yet.</p>
          <a href="#/" class="btn btn-primary btn-lg">Start Shopping</a>
        </div>
      </div>
    `;
  }

  return `
    <div class="page">
      <div class="container" style="max-width:900px;margin:0 auto;padding-top:var(--space-6)">
        <h1 style="font-size:var(--font-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-6)">
          Shopping Cart <span style="color:var(--text-secondary);font-weight:var(--weight-medium)">(${store.getCartCount()} items)</span>
        </h1>

        <div style="display:grid;grid-template-columns:1fr;gap:var(--space-6)">
          <div>
            ${items.map(item => `
              <div class="cart-item" data-cart-item-id="${item.id}" style="border-bottom:1px solid var(--border);padding:var(--space-4) 0">
                <div class="cart-item-image" style="width:80px;height:80px;border-radius:var(--radius-lg);overflow:hidden;display:flex;align-items:center;justify-content:center;background:var(--bg-secondary)">
                  <img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;" />
                </div>
                <div class="cart-item-details" style="flex:1">
                  <a href="#/product/${item.id}" class="cart-item-name" style="font-size:var(--font-base)">${item.name}</a>
                  <div class="cart-item-weight">${item.weight}</div>
                  <div class="cart-item-bottom" style="margin-top:var(--space-2)">
                    <div>
                      <span class="cart-item-price" style="font-size:var(--font-base)">$${(item.price * item.qty).toFixed(2)}</span>
                      ${item.originalPrice ? `<span style="font-size:var(--font-xs);color:var(--text-tertiary);text-decoration:line-through;margin-left:var(--space-2)">$${(item.originalPrice * item.qty).toFixed(2)}</span>` : ''}
                    </div>
                    <div class="cart-item-qty" style="border-color:var(--primary)">
                      <button onclick="window.updateCartQty(${item.id}, ${item.qty - 1})" style="color:var(--primary)">
                        <i data-lucide="${item.qty === 1 ? 'trash-2' : 'minus'}" style="width:14px;height:14px"></i>
                      </button>
                      <span style="font-weight:var(--weight-bold);color:var(--primary)">${item.qty}</span>
                      <button onclick="window.updateCartQty(${item.id}, ${item.qty + 1})" style="color:var(--primary)">
                        <i data-lucide="plus" style="width:14px;height:14px"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}

            <div class="cart-promo" style="margin-top:var(--space-5)">
              <input type="text" placeholder="Enter promo code" class="input" style="border-radius:var(--radius-md)" />
              <button class="btn btn-outline" onclick="window.applyPromo()">Apply</button>
            </div>
          </div>

          <div>
            <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:var(--space-6);position:sticky;top:calc(var(--navbar-height) + var(--space-4))">
              <h3 style="font-size:var(--font-lg);font-weight:var(--weight-bold);margin-bottom:var(--space-5)">Order Summary</h3>
              <div class="cart-summary" style="margin-bottom:var(--space-5)">
                <div class="cart-summary-row">
                  <span>Subtotal (${store.getCartCount()} items)</span>
                  <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="cart-summary-row">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee === 0 ? '<span class="savings">FREE</span>' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div class="cart-summary-row">
                  <span>GST (incl.)</span>
                  <span>$${gst.toFixed(2)}</span>
                </div>
                ${savings > 0 ? `
                  <div class="cart-summary-row">
                    <span>Total Savings</span>
                    <span class="savings">−$${savings.toFixed(2)}</span>
                  </div>
                ` : ''}
                <div class="cart-summary-row total">
                  <span>Total</span>
                  <span>$${total.toFixed(2)}</span>
                </div>
              </div>

              ${subtotal < 50 ? `
                <div style="background:var(--primary-lighter);border-radius:var(--radius-md);padding:var(--space-3);margin-bottom:var(--space-4);text-align:center">
                  <p style="font-size:var(--font-xs);color:var(--primary-dark);font-weight:var(--weight-semibold)">
                    🚚 Add $${(50 - subtotal).toFixed(2)} more for free delivery
                  </p>
                  <div style="height:4px;background:var(--border);border-radius:2px;margin-top:var(--space-2);overflow:hidden">
                    <div style="height:100%;background:var(--primary);border-radius:2px;width:${Math.min(100, (subtotal / 50) * 100)}%;transition:width 0.5s ease"></div>
                  </div>
                </div>
              ` : ''}

              <a href="#/checkout" class="cart-checkout-btn" style="text-decoration:none">
                Proceed to Checkout — $${total.toFixed(2)}
                <i data-lucide="arrow-right" style="width:18px;height:18px"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export default renderCartPage;
