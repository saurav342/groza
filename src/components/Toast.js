// ============================================
// GROZA — TOAST NOTIFICATION SYSTEM
// ============================================

let toastContainer = null;

function ensureContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast({ title, message = '', type = 'success', duration = 3000 }) {
  const container = ensureContainer();

  const iconMap = {
    success: '<i data-lucide="check-circle"></i>',
    error: '<i data-lucide="x-circle"></i>',
    warning: '<i data-lucide="alert-triangle"></i>',
    info: '<i data-lucide="info"></i>',
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${iconMap[type]}</span>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
    <button class="toast-close" onclick="this.closest('.toast').remove()">
      <i data-lucide="x" style="width:14px;height:14px"></i>
    </button>
  `;

  container.appendChild(toast);

  if (window.lucide) window.lucide.createIcons({ nodes: [toast] });

  // Auto-remove
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

export default showToast;
