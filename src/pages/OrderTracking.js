// ============================================
// GROZA — ORDER TRACKING PAGE
// ============================================

export function renderOrderTrackingPage() {
  const steps = [
    { title: 'Order Confirmed', time: '10:30 AM', completed: true },
    { title: 'Preparing Your Order', time: '10:35 AM', completed: true },
    { title: 'Quality Check', time: '10:42 AM', completed: true },
    { title: 'Out for Delivery', time: '10:48 AM', active: true },
    { title: 'Delivered', time: 'Estimated 10:58 AM', completed: false },
  ];

  return `
    <div class="page">
      <div class="account-page">
        <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-6)">
          <a href="#/orders" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:var(--radius-md);color:var(--text-secondary)">
            <i data-lucide="arrow-left" style="width:20px;height:20px"></i>
          </a>
          <h1 style="font-size:var(--font-2xl);font-weight:var(--weight-bold)">Track Order</h1>
        </div>

        <!-- Delivery ETA -->
        <div style="background:var(--primary-lighter);border-radius:var(--radius-xl);padding:var(--space-6);text-align:center;margin-bottom:var(--space-6)">
          <div style="font-size:var(--font-sm);color:var(--primary-dark);font-weight:var(--weight-medium)">Estimated Delivery</div>
          <div style="font-size:var(--font-3xl);font-weight:var(--weight-extrabold);color:var(--primary-dark);margin:var(--space-2) 0" id="delivery-eta">10 min</div>
          <div style="font-size:var(--font-sm);color:var(--primary-dark)">Your order is on its way! 🚗</div>
        </div>

        <!-- Map Placeholder -->
        <div style="background:var(--bg-secondary);border-radius:var(--radius-xl);height:200px;display:flex;align-items:center;justify-content:center;margin-bottom:var(--space-6);border:1px solid var(--border);overflow:hidden;position:relative">
          <div style="font-size:3rem">🗺️</div>
          <div style="position:absolute;bottom:var(--space-3);left:var(--space-3);right:var(--space-3);background:var(--bg);border-radius:var(--radius-md);padding:var(--space-3);display:flex;align-items:center;gap:var(--space-3);box-shadow:var(--shadow-md)">
            <div style="width:40px;height:40px;border-radius:var(--radius-full);background:var(--primary-lighter);display:flex;align-items:center;justify-content:center;font-size:1.2rem">🚗</div>
            <div style="flex:1">
              <div style="font-size:var(--font-sm);font-weight:var(--weight-semibold)">Alex is delivering your order</div>
              <div style="font-size:var(--font-xs);color:var(--text-secondary)">Toyota Corolla · AB-123</div>
            </div>
            <button class="btn btn-sm btn-primary">
              <i data-lucide="phone" style="width:14px;height:14px"></i>
            </button>
          </div>
        </div>

        <!-- Timeline -->
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:var(--space-5)">
          <h3 style="font-size:var(--font-base);font-weight:var(--weight-semibold);margin-bottom:var(--space-4)">Order Progress</h3>
          <div class="tracking-timeline">
            ${steps.map((step, i) => `
              <div class="tracking-step ${step.completed ? 'completed' : ''} ${step.active ? 'active' : ''}">
                <div class="tracking-step-indicator">
                  <div class="tracking-step-dot">
                    ${step.completed ? '<i data-lucide="check" style="width:12px;height:12px"></i>' : ''}
                  </div>
                  ${i < steps.length - 1 ? '<div class="tracking-step-line"></div>' : ''}
                </div>
                <div class="tracking-step-content">
                  <div class="tracking-step-title">${step.title}</div>
                  <div class="tracking-step-time">${step.time}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Order Details -->
        <div style="margin-top:var(--space-6)">
          <h3 style="font-size:var(--font-base);font-weight:var(--weight-semibold);margin-bottom:var(--space-3)">Order Details</h3>
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:var(--space-4)">
            <div style="display:flex;justify-content:space-between;font-size:var(--font-sm);margin-bottom:var(--space-2)">
              <span style="color:var(--text-secondary)">Order ID</span>
              <span style="font-weight:var(--weight-semibold)">GRZ-A7B3K2</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:var(--font-sm);margin-bottom:var(--space-2)">
              <span style="color:var(--text-secondary)">Placed at</span>
              <span>10:30 AM, 27 Jun 2026</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:var(--font-sm)">
              <span style="color:var(--text-secondary)">Delivering to</span>
              <span>42 Collins St, Melbourne</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export default renderOrderTrackingPage;
