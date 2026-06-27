// ============================================
// GROZA — REWARDS PAGE
// ============================================

export function renderRewardsPage() {
  return `
    <div class="page">
      <div class="account-page">
        <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-6)">
          <a href="#/account" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:var(--radius-md);color:var(--text-secondary)">
            <i data-lucide="arrow-left" style="width:20px;height:20px"></i>
          </a>
          <h1 style="font-size:var(--font-2xl);font-weight:var(--weight-bold)">Rewards</h1>
        </div>

        <div class="rewards-card">
          <div class="rewards-points">450</div>
          <div class="rewards-label">Groza Points</div>
          <div class="rewards-tier">👑 Gold Member</div>
          <div class="rewards-progress">
            <div class="rewards-progress-bar">
              <div class="rewards-progress-fill" style="width:60%"></div>
            </div>
            <div class="rewards-progress-text">550 more points to reach Platinum</div>
          </div>
        </div>

        <h2 style="font-size:var(--font-lg);font-weight:var(--weight-bold);margin-bottom:var(--space-4)">Available Rewards</h2>

        <div class="stagger-children">
          ${[
            { emoji: '🎫', name: '$5 Off Your Next Order', points: 200, desc: 'Minimum spend $30' },
            { emoji: '🚚', name: 'Free Delivery', points: 150, desc: 'Valid on any order' },
            { emoji: '🎁', name: '10% Off Fresh Produce', points: 300, desc: 'Valid for 7 days' },
            { emoji: '☕', name: 'Free Coffee Capsules', points: 250, desc: '10-pack flat white blend' },
          ].map(reward => `
            <div class="account-menu-item animate-fade-in-up" style="cursor:pointer">
              <div class="account-menu-icon" style="font-size:1.5rem;background:var(--primary-lighter)">
                ${reward.emoji}
              </div>
              <div class="account-menu-text">
                <div class="account-menu-label">${reward.name}</div>
                <div class="account-menu-desc">${reward.desc}</div>
              </div>
              <span class="badge badge-primary">${reward.points} pts</span>
            </div>
          `).join('')}
        </div>

        <h2 style="font-size:var(--font-lg);font-weight:var(--weight-bold);margin:var(--space-8) 0 var(--space-4)">Refer a Friend</h2>

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:var(--space-6);text-align:center">
          <div style="font-size:3rem;margin-bottom:var(--space-3)">🤝</div>
          <h3 style="font-size:var(--font-lg);font-weight:var(--weight-semibold);margin-bottom:var(--space-2)">Give $15, Get $15</h3>
          <p style="font-size:var(--font-sm);color:var(--text-secondary);margin-bottom:var(--space-4)">Share your code and both you and your friend get $15 off!</p>
          <div style="display:flex;gap:var(--space-2);max-width:300px;margin:0 auto">
            <input type="text" class="input" value="JOHN15" readonly style="text-align:center;font-weight:var(--weight-bold);letter-spacing:2px" />
            <button class="btn btn-primary" onclick="navigator.clipboard.writeText('JOHN15').then(() => window.showToast({title:'Copied!',message:'Referral code copied',type:'success'}))">Copy</button>
          </div>
        </div>

        <h2 style="font-size:var(--font-lg);font-weight:var(--weight-bold);margin:var(--space-8) 0 var(--space-4)">How Points Work</h2>

        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-3);text-align:center">
          ${[
            { emoji: '🛒', title: 'Shop', desc: 'Earn 1 point per $1 spent' },
            { emoji: '⭐', title: 'Collect', desc: 'Points accumulate automatically' },
            { emoji: '🎁', title: 'Redeem', desc: 'Use points for rewards' },
          ].map(step => `
            <div style="padding:var(--space-4);background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg)">
              <div style="font-size:2rem;margin-bottom:var(--space-2)">${step.emoji}</div>
              <div style="font-size:var(--font-sm);font-weight:var(--weight-semibold)">${step.title}</div>
              <div style="font-size:var(--font-xs);color:var(--text-secondary);margin-top:2px">${step.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export default renderRewardsPage;
