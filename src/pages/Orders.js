// ============================================
// GROZA — ORDERS PAGE
// ============================================

export function renderOrdersPage() {
  const orders = [
    { id: 'GRZ-A7B3K2', date: '25 Jun 2026', status: 'Delivered', statusClass: 'badge-success', items: ['/images/products/products-string-bag-white-isolated-background-concept-green-shopping-good-nutrition-delivery-products-environmental-protection_99571-266.jpg', '/images/products/supplies-food-help-box-full-vegetables-canned-cereal-eggs-fruits-donation-box-delivery-charity-with-copy-space_280499-37.jpg', '/images/products/milk-carton-with-blue-cap-white-background_187299-47518.jpg', '/images/products/bag-donated-food-concept-delivery-necessary-foodstuffs-white-background_183793-4674.jpg'], total: 28.50, itemCount: 6 },
    { id: 'GRZ-K9M1P5', date: '22 Jun 2026', status: 'Delivered', statusClass: 'badge-success', items: ['/images/products/food-donations-food-delivery-concept_168508-697.jpg', '/images/products/food-set_266732-17178.jpg', '/images/products/food-bags-home-kitchen-health-concept-order-products-online-delivering-products-home_493343-3676.jpg'], total: 34.20, itemCount: 4 },
    { id: 'GRZ-R4T8W1', date: '18 Jun 2026', status: 'Delivered', statusClass: 'badge-success', items: ['/images/products/space-chips-product-shot_23-2152002408.jpg', '/images/products/foodstuff-donation-isolated-white-background-with-clipping-path-storage-delivery-various-food-pasta-cooking-oil-canned-food-cardboard-box_39768-15901.jpg', '/images/products/foodstuff-donation-storage-delivery-white-background-with-clipping-path-various-food-pasta-cooking-oil-canned-food_39768-8198.jpg', '/images/products/foodstuff-donation-storage-delivery-white-background-with-clipping-path-various-food-pasta-cooking-oil-canned-food_39768-8198.jpg'], total: 22.65, itemCount: 5 },
    { id: 'GRZ-L2N6J8', date: '12 Jun 2026', status: 'Delivered', statusClass: 'badge-success', items: ['/images/products/food-donations-food-delivery-concept_168508-697.jpg', '/images/products/food-donations-food-delivery-concept_168508-697.jpg', '/images/products/products-string-bag-white-isolated-background-concept-green-shopping-good-nutrition-delivery-products-environmental-protection_99571-266.jpg'], total: 45.00, itemCount: 3 },
  ];

  return `
    <div class="page">
      <div class="account-page">
        <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-6)">
          <a href="#/account" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:var(--radius-md);color:var(--text-secondary)">
            <i data-lucide="arrow-left" style="width:20px;height:20px"></i>
          </a>
          <h1 style="font-size:var(--font-2xl);font-weight:var(--weight-bold)">My Orders</h1>
        </div>

        <div class="stagger-children">
          ${orders.map(order => `
            <div class="order-card animate-fade-in-up">
              <div class="order-card-header">
                <div>
                  <div class="order-card-id">${order.id}</div>
                  <div class="order-card-date">${order.date}</div>
                </div>
                <span class="badge ${order.statusClass}">${order.status}</span>
              </div>
              <div class="order-card-body">
                <div class="order-items-preview">
                  ${order.items.map(imgSrc => `<div class="order-item-thumb"><img src="${imgSrc}" alt="Product" /></div>`).join('')}
                  ${order.itemCount > order.items.length ? `
                    <div class="order-item-thumb" style="font-size:var(--font-xs);color:var(--text-secondary)">+${order.itemCount - order.items.length}</div>
                  ` : ''}
                </div>
              </div>
              <div class="order-card-footer">
                <div class="order-total">${order.itemCount} items · $${order.total.toFixed(2)}</div>
                <button class="btn btn-sm btn-outline" onclick="window.showToast({title:'Reordering...',message:'Items added to cart',type:'success'})">Reorder</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export default renderOrdersPage;
