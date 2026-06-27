// ============================================
// GROZA — SPA ROUTER
// ============================================

const router = {
  routes: {},
  currentRoute: null,
  previousRoute: null,

  register(path, handler) {
    this.routes[path] = handler;
  },

  navigate(path) {
    window.location.hash = path;
  },

  getParams() {
    const hash = window.location.hash.slice(1) || '/';
    const parts = hash.split('/').filter(Boolean);
    return parts;
  },

  matchRoute(hash) {
    const path = hash || '/';

    // Exact match
    if (this.routes[path]) {
      return { handler: this.routes[path], params: {} };
    }

    // Pattern matching (e.g., /product/:id, /category/:slug)
    for (const [pattern, handler] of Object.entries(this.routes)) {
      const patternParts = pattern.split('/').filter(Boolean);
      const pathParts = path.split('/').filter(Boolean);

      if (patternParts.length !== pathParts.length) continue;

      const params = {};
      let match = true;

      for (let i = 0; i < patternParts.length; i++) {
        if (patternParts[i].startsWith(':')) {
          params[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
        } else if (patternParts[i] !== pathParts[i]) {
          match = false;
          break;
        }
      }

      if (match) {
        return { handler, params };
      }
    }

    return null;
  },

  async handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const result = this.matchRoute(hash);

    if (!result) {
      // 404 — redirect to home
      this.navigate('/');
      return;
    }

    this.previousRoute = this.currentRoute;
    this.currentRoute = hash;

    const app = document.getElementById('app');
    const pageContainer = document.getElementById('page-content');

    if (pageContainer) {
      // Page transition
      pageContainer.style.opacity = '0';
      pageContainer.style.transform = 'translateY(8px)';

      await new Promise(r => setTimeout(r, 150));

      const content = result.handler(result.params);
      pageContainer.innerHTML = content;
      // Scroll to top
      window.scrollTo({ top: 0 });

      // Trigger animations
      requestAnimationFrame(() => {
        pageContainer.style.opacity = '1';
        pageContainer.style.transform = 'translateY(0)';

        // Initialize Lucide icons in new content
        if (window.lucide) {
          window.lucide.createIcons();
        }
      });
    }

    // Update active states
    this.updateActiveNav(hash);
  },

  updateActiveNav(hash) {
    // Update bottom nav
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.route === hash || 
        (hash === '/' && item.dataset.route === '/') ||
        (hash.startsWith('/categor') && item.dataset.route === '/categories') ||
        (hash.startsWith('/search') && item.dataset.route === '/search') ||
        (hash.startsWith('/cart') && item.dataset.route === '/cart') ||
        (hash.startsWith('/account') && item.dataset.route === '/account'));
    });
  },

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());

    // Set default route if none
    if (!window.location.hash) {
      window.location.hash = '/';
    }

    this.handleRoute();
  },
};

export default router;
