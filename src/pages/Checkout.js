// ============================================
// GROZA — CHECKOUT PAGE
// ============================================

import store from '../store.js';

let currentStep = 1;

export function renderCheckoutPage() {
  const items = store.cart;
  const subtotal = store.getCartTotal();
  const deliveryFee = subtotal > 50 ? 0 : 4.99;
  const gst = subtotal * 0.10;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return `
      <div class="page">
        <div class="container" style="text-align:center;padding:var(--space-16) 0">
          <div style="font-size:4rem;margin-bottom:var(--space-4)">🛒</div>
          <h1 style="font-size:var(--font-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-2)">Your cart is empty</h1>
          <p style="color:var(--text-secondary);margin-bottom:var(--space-6)">Add some products before checking out.</p>
          <a href="#/" class="btn btn-primary btn-lg">Start Shopping</a>
        </div>
      </div>
    `;
  }

  currentStep = 1;

  return `
    <div class="page">
      <div class="checkout-page">
        <h1 style="font-size:var(--font-2xl);font-weight:var(--weight-bold);margin-bottom:var(--space-6);text-align:center">Checkout</h1>

        <!-- Steps -->
        <div class="checkout-steps" id="checkout-steps">
          <div class="checkout-step active" data-step="1">
            <span class="checkout-step-number">1</span>
            <span class="checkout-step-label">Address</span>
          </div>
          <div class="checkout-step-line"></div>
          <div class="checkout-step" data-step="2">
            <span class="checkout-step-number">2</span>
            <span class="checkout-step-label">Delivery</span>
          </div>
          <div class="checkout-step-line"></div>
          <div class="checkout-step" data-step="3">
            <span class="checkout-step-number">3</span>
            <span class="checkout-step-label">Payment</span>
          </div>
          <div class="checkout-step-line"></div>
          <div class="checkout-step" data-step="4">
            <span class="checkout-step-number">4</span>
            <span class="checkout-step-label">Confirm</span>
          </div>
        </div>

        <!-- Step Content -->
        <div id="checkout-content">
          ${renderStep1()}
        </div>
      </div>
    </div>
  `;
}

function renderStep1() {
  const address = store.getCurrentAddress();
  return `
    <div class="checkout-section">
      <h2 class="checkout-section-title">
        <i data-lucide="map-pin" style="width:20px;height:20px;color:var(--primary)"></i>
        Delivery Address
      </h2>

      ${store.addresses.map((addr, i) => `
        <div class="payment-method ${i === store.selectedAddress ? 'selected' : ''}" 
             onclick="window.selectCheckoutAddress(${i})" style="margin-bottom:var(--space-3)">
          <div class="payment-method-radio"></div>
          <div>
            <div class="payment-method-name">${addr.label}</div>
            <div class="payment-method-desc">${addr.address}</div>
          </div>
        </div>
      `).join('')}

      <div class="checkout-form-group" style="margin-top:var(--space-4)">
        <label class="checkout-label">Or enter a new address</label>
        <input type="text" class="input" placeholder="Start typing your address..." id="new-address-input" />
      </div>

      <div class="checkout-nav">
        <a href="#/cart" class="btn btn-secondary">← Back to Cart</a>
        <button class="btn btn-primary" onclick="window.checkoutNext()">Continue →</button>
      </div>
    </div>
  `;
}

function renderStep2() {
  const slots = [
    { time: '10:00 - 11:00', date: 'Today', fee: 'Free' },
    { time: '11:00 - 12:00', date: 'Today', fee: 'Free' },
    { time: '14:00 - 15:00', date: 'Today', fee: '$2.99' },
    { time: '17:00 - 18:00', date: 'Today', fee: '$1.99' },
    { time: '09:00 - 10:00', date: 'Tomorrow', fee: 'Free' },
    { time: '12:00 - 13:00', date: 'Tomorrow', fee: 'Free' },
  ];

  return `
    <div class="checkout-section">
      <h2 class="checkout-section-title">
        <i data-lucide="clock" style="width:20px;height:20px;color:var(--primary)"></i>
        Delivery Slot
      </h2>

      <div class="delivery-slots" id="delivery-slots">
        ${slots.map((slot, i) => `
          <div class="delivery-slot ${i === 0 ? 'selected' : ''}" onclick="window.selectDeliverySlot(this)">
            <div class="delivery-slot-time">${slot.time}</div>
            <div class="delivery-slot-date">${slot.date}</div>
            <div class="delivery-slot-fee">${slot.fee}</div>
          </div>
        `).join('')}
      </div>

      <div class="checkout-nav">
        <button class="btn btn-secondary" onclick="window.checkoutBack()">← Back</button>
        <button class="btn btn-primary" onclick="window.checkoutNext()">Continue →</button>
      </div>
    </div>
  `;
}

function renderStep3() {
  const methods = [
    { name: 'Credit / Debit Card', desc: 'Visa, Mastercard', icon: '💳' },
    { name: 'Apple Pay', desc: 'Pay with Apple Pay', icon: '🍎' },
    { name: 'Google Pay', desc: 'Pay with Google Pay', icon: '📱' },
    { name: 'PayPal', desc: 'Pay with PayPal', icon: '🅿️' },
  ];

  return `
    <div class="checkout-section">
      <h2 class="checkout-section-title">
        <i data-lucide="credit-card" style="width:20px;height:20px;color:var(--primary)"></i>
        Payment Method
      </h2>

      <div class="payment-methods" id="payment-methods">
        ${methods.map((m, i) => `
          <div class="payment-method ${i === 0 ? 'selected' : ''}" onclick="window.selectPaymentMethod(this)">
            <div class="payment-method-radio"></div>
            <div class="payment-method-icon">${m.icon}</div>
            <div>
              <div class="payment-method-name">${m.name}</div>
              <div class="payment-method-desc">${m.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top:var(--space-5);padding:var(--space-4);background:var(--bg-secondary);border-radius:var(--radius-md)">
        <div class="checkout-form-group">
          <label class="checkout-label">Card Number</label>
          <input type="text" class="input" placeholder="4242 4242 4242 4242" id="card-number" />
        </div>
        <div class="checkout-form-row">
          <div class="checkout-form-group">
            <label class="checkout-label">Expiry</label>
            <input type="text" class="input" placeholder="MM / YY" id="card-expiry" />
          </div>
          <div class="checkout-form-group">
            <label class="checkout-label">CVC</label>
            <input type="text" class="input" placeholder="123" id="card-cvc" />
          </div>
        </div>
      </div>

      <div class="checkout-nav">
        <button class="btn btn-secondary" onclick="window.checkoutBack()">← Back</button>
        <button class="btn btn-primary" onclick="window.checkoutNext()">Place Order →</button>
      </div>
    </div>
  `;
}

function renderStep4() {
  const items = store.cart;
  const subtotal = store.getCartTotal();
  const deliveryFee = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + deliveryFee;
  const orderId = 'GRZ-' + Math.random().toString(36).slice(2, 8).toUpperCase();

  return `
    <div class="checkout-section">
      <div class="order-confirmation">
        <div class="order-confirmation-icon">✅</div>
        <h2 class="order-confirmation-title">Order Placed!</h2>
        <p class="order-confirmation-text">Your order has been confirmed and is being prepared for delivery.</p>
        <div class="order-confirmation-id">${orderId}</div>

        <div style="text-align:left;margin-top:var(--space-6)">
          <h3 style="font-size:var(--font-base);font-weight:var(--weight-semibold);margin-bottom:var(--space-4)">Order Summary</h3>
          ${items.map(item => `
            <div style="display:flex;justify-content:space-between;padding:var(--space-2) 0;font-size:var(--font-sm)">
              <span style="display:inline-flex;align-items:center;gap:var(--space-2)">
                <img src="${item.image}" alt="${item.name}" style="width:24px;height:24px;border-radius:var(--radius-sm);object-fit:cover" />
                ${item.name} × ${item.qty}
              </span>
              <span>$${(item.price * item.qty).toFixed(2)}</span>
            </div>
          `).join('')}
          <div class="divider"></div>
          <div style="display:flex;justify-content:space-between;font-weight:var(--weight-bold)">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
          </div>
        </div>

        <div style="display:flex;gap:var(--space-3);margin-top:var(--space-6)">
          <a href="#/order-tracking" class="btn btn-primary" style="flex:1">Track Order</a>
          <a href="#/" class="btn btn-secondary" style="flex:1" onclick="window.clearCartAfterOrder()">Continue Shopping</a>
        </div>
      </div>
    </div>
  `;
}

export function initCheckoutPage() {
  currentStep = 1;

  window.checkoutNext = function() {
    currentStep++;
    if (currentStep > 4) currentStep = 4;
    updateCheckoutStep();
  };

  window.checkoutBack = function() {
    currentStep--;
    if (currentStep < 1) currentStep = 1;
    updateCheckoutStep();
  };

  window.selectCheckoutAddress = function(index) {
    store.setSelectedAddress(index);
    document.querySelectorAll('#checkout-content .payment-method').forEach((el, i) => {
      el.classList.toggle('selected', i === index);
    });
  };

  window.selectDeliverySlot = function(el) {
    document.querySelectorAll('.delivery-slot').forEach(s => s.classList.remove('selected'));
    el.classList.add('selected');
  };

  window.selectPaymentMethod = function(el) {
    document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
    el.classList.add('selected');
  };

  window.clearCartAfterOrder = function() {
    store.clearCart();
  };
}

function updateCheckoutStep() {
  const content = document.getElementById('checkout-content');
  const steps = document.querySelectorAll('.checkout-step');
  const lines = document.querySelectorAll('.checkout-step-line');

  if (!content) return;

  steps.forEach((step, i) => {
    const stepNum = i + 1;
    step.classList.remove('active', 'completed');
    if (stepNum === currentStep) step.classList.add('active');
    else if (stepNum < currentStep) step.classList.add('completed');
  });

  lines.forEach((line, i) => {
    line.classList.toggle('completed', i + 1 < currentStep);
  });

  const stepRenderers = [null, renderStep1, renderStep2, renderStep3, renderStep4];
  content.innerHTML = stepRenderers[currentStep]();

  if (window.lucide) window.lucide.createIcons({ nodes: [content] });
}

export default renderCheckoutPage;
