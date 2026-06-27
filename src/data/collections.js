// ============================================
// GROZA — COLLECTIONS DATA
// ============================================

export const collections = [
  { id: 'weekly-specials', name: 'Weekly Specials', emoji: '🏷️', description: 'This week\'s best deals', productFilter: p => p.discount >= 15 },
  { id: 'fresh-today', name: 'Fresh Today', emoji: '🌿', description: 'Freshly stocked today', productFilter: p => ['fruits-vegetables', 'bakery', 'dairy-eggs'].includes(p.category) },
  { id: 'best-sellers', name: 'Best Sellers', emoji: '⭐', description: 'Most loved products', productFilter: p => p.reviews >= 200 },
  { id: 'australian-favourites', name: 'Aussie Favourites', emoji: '🦘', description: 'Classic Australian products', productFilter: p => [24, 32, 35, 47, 50, 46].includes(p.id) },
  { id: 'organic-picks', name: 'Organic Picks', emoji: '🌱', description: 'Certified organic products', productFilter: p => p.badge === 'organic' },
  { id: 'under-10', name: 'Under $10', emoji: '💰', description: 'Great value under $10', productFilter: p => p.price < 10 },
];

export default collections;
