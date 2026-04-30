/* =========================================================
   B2B Better — v2 upgrades
   Layered on top of shared.js
   ========================================================= */

/* ---------- Compound-stack: hero word with ghost layers ---------- */
(function compoundStack() {
  const stacks = document.querySelectorAll('.compound-stack');
  if (!stacks.length) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  stacks.forEach((stack) => {
    const main = stack.querySelector('.cs-main');
    if (!main) return;
    // Build 4 ghost layers with the same text
    const text = main.textContent;
    for (let i = 0; i < 4; i += 1) {
      const layer = document.createElement('span');
      layer.className = 'cs-layer';
      layer.setAttribute('aria-hidden', 'true');
      layer.textContent = text;
      stack.insertBefore(layer, main);
    }

    if (reduced) {
      stack.classList.add('is-stacked');
      return;
    }

    const heroBox = stack.closest('.hero-copy-glass') || stack.closest('section') || document.body;
    let resetTimer = 0;

    const puff = () => {
      const dots = 18;
      for (let i = 0; i < dots; i += 1) {
        const dot = document.createElement('span');
        dot.className = 'cs-puff-dot';
        const a = (Math.PI * 2 * i) / dots + (Math.random() - 0.5) * 0.5;
        const r = 16 + Math.random() * 40;
        dot.style.setProperty('--dx', `${Math.cos(a) * r}px`);
        dot.style.setProperty('--dy', `${Math.sin(a) * r - 8}px`);
        dot.style.setProperty('--dur', `${700 + Math.random() * 350}ms`);
        dot.style.setProperty('--size', `${1.8 + Math.random() * 2.8}px`);
        dot.addEventListener('animationend', () => dot.remove(), { once: true });
        stack.appendChild(dot);
      }
    };

    const activate = () => {
      clearTimeout(resetTimer);
      stack.classList.add('is-energized');
      stack.classList.add('is-stacked');
      puff();
    };

    const deactivate = () => {
      stack.classList.remove('is-energized');
      // Slow reset back to normal over 3-4 seconds.
      stack.classList.remove('is-stacked');
      resetTimer = setTimeout(() => {
        stack.classList.remove('is-energized');
      }, 3600);
    };

    heroBox.addEventListener('pointerenter', activate);
    heroBox.addEventListener('pointerleave', deactivate);
  });
})();

/* ---------- Engine: interactive 5-stage pipeline ---------- */
(function engineInteractive() {
  const root = document.querySelector('[data-engine]');
  if (!root) return;
  const nodes = [...root.querySelectorAll('.engine-node')];
  const railFill = root.querySelector('.engine-rail-fill');
  const detail = root.querySelector('[data-engine-detail]');
  if (!nodes.length || !detail) return;

  const STAGES = [
    {
      title: 'Strategy',
      lede: 'ICP diagnosis, show thesis, commercial goals. A blueprint that ties every episode to a sales outcome before a single camera rolls.',
      bullets: ['ICP & buyer-committee map', 'Show thesis + episode architecture', 'Content-to-pipeline model'],
      visual: 'strategy',
    },
    {
      title: 'Guest booking',
      lede: 'A curated pipeline of target-account guests. Your next guest is also your next deal conversation — every invitation opens a door your reps couldn\u2019t.',
      bullets: ['Target-account guest graph', 'Sales-aligned invitation flow', 'Dedicated guest producer'],
      visual: 'guest',
    },
    {
      title: 'Production',
      lede: 'Studio-grade video, editing, episodic packaging. We remove the ops burden so you ship on cadence — not on willpower.',
      bullets: ['Pre-production & run-sheets', 'Full-stack editing', 'Episodic packaging'],
      visual: 'production',
    },
    {
      title: 'Rep enablement',
      lede: 'Episodes become cold-open ammo. Sales get clips, quotes, and openers that get replies — the content finally shows up where deals are won.',
      bullets: ['Cold-open clip library', 'Quote cards + talk-tracks', 'CRM-linked distribution'],
      visual: 'enablement',
    },
    {
      title: 'Distribution',
      lede: 'Multi-channel rollout across social, email, and paid. One recording, weeks of pipeline — compounding every time it ships.',
      bullets: ['Social + newsletter cadence', 'Paid amplification', 'Pipeline-linked reporting'],
      visual: 'distribution',
    },
  ];

  const visualHTML = {
    strategy: `
      <svg viewBox="0 0 400 300" class="w-full h-full">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#FFF200" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#FFF200" stop-opacity="0.15"/>
          </linearGradient>
        </defs>
        <g stroke="rgba(250,250,247,0.14)" stroke-dasharray="2 4" fill="none">
          <line x1="50" y1="90" x2="350" y2="90"/>
          <line x1="50" y1="150" x2="350" y2="150"/>
          <line x1="50" y1="210" x2="350" y2="210"/>
          <line x1="120" y1="40" x2="120" y2="260"/>
          <line x1="200" y1="40" x2="200" y2="260"/>
          <line x1="280" y1="40" x2="280" y2="260"/>
        </g>
        <g fill="url(#g1)" stroke="rgba(255,242,0,0.6)">
          <rect x="80" y="60" width="80" height="60" rx="8"/>
          <rect x="220" y="120" width="80" height="60" rx="8"/>
          <rect x="160" y="180" width="80" height="60" rx="8"/>
        </g>
        <g fill="#FAFAF7" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing="1">
          <text x="60" y="52">ICP</text>
          <text x="200" y="112">SHOW</text>
          <text x="140" y="172">GOAL</text>
        </g>
        <circle cx="200" cy="150" r="6" fill="#FFF200" style="animation: pulseNode 2s ease-in-out infinite"/>
      </svg>`,
    guest: `
      <svg viewBox="0 0 400 300" class="w-full h-full">
        <g stroke="rgba(255,242,0,0.35)" fill="none" stroke-width="1">
          <line x1="200" y1="150" x2="80" y2="80"/>
          <line x1="200" y1="150" x2="320" y2="80"/>
          <line x1="200" y1="150" x2="320" y2="220"/>
          <line x1="200" y1="150" x2="80" y2="220"/>
          <line x1="200" y1="150" x2="200" y2="50"/>
          <line x1="200" y1="150" x2="200" y2="250"/>
          <line x1="80" y1="80" x2="200" y2="50"/>
          <line x1="320" y1="80" x2="200" y2="50"/>
        </g>
        <g fill="#111">
          <circle cx="80" cy="80" r="14" stroke="rgba(255,242,0,0.8)"/>
          <circle cx="320" cy="80" r="14" stroke="rgba(95,201,255,0.7)"/>
          <circle cx="200" cy="50" r="14" stroke="rgba(184,255,147,0.8)"/>
          <circle cx="80" cy="220" r="14" stroke="rgba(95,201,255,0.7)"/>
          <circle cx="320" cy="220" r="14" stroke="rgba(255,242,0,0.7)"/>
          <circle cx="200" cy="250" r="14" stroke="rgba(184,255,147,0.7)"/>
        </g>
        <circle cx="200" cy="150" r="20" fill="#FFF200"/>
        <text x="200" y="155" fill="#0B0B0C" font-family="Space Grotesk" font-size="12" font-weight="700" text-anchor="middle">YOU</text>
        <g fill="#FAFAF7" font-family="JetBrains Mono, monospace" font-size="9" text-anchor="middle">
          <text x="80" y="85">VP</text>
          <text x="320" y="85">CMO</text>
          <text x="200" y="55">CRO</text>
          <text x="80" y="225">DIR</text>
          <text x="320" y="225">GM</text>
          <text x="200" y="255">VP</text>
        </g>
      </svg>`,
    production: `
      <svg viewBox="0 0 400 300" class="w-full h-full">
        <g stroke="rgba(250,250,247,0.1)" fill="none">
          <line x1="40" y1="80" x2="360" y2="80"/>
          <line x1="40" y1="140" x2="360" y2="140"/>
          <line x1="40" y1="200" x2="360" y2="200"/>
        </g>
        <g>
          <rect x="60" y="60" width="48" height="32" rx="4" fill="rgba(255,242,0,0.22)" stroke="rgba(255,242,0,0.7)"/>
          <rect x="130" y="68" width="80" height="24" rx="4" fill="rgba(255,242,0,0.18)" stroke="rgba(255,242,0,0.6)"/>
          <rect x="240" y="60" width="100" height="32" rx="4" fill="rgba(255,242,0,0.22)" stroke="rgba(255,242,0,0.7)"/>
          <rect x="60" y="128" width="120" height="24" rx="4" fill="rgba(95,201,255,0.16)" stroke="rgba(95,201,255,0.55)"/>
          <rect x="200" y="120" width="60" height="40" rx="4" fill="rgba(95,201,255,0.2)" stroke="rgba(95,201,255,0.55)"/>
          <rect x="280" y="128" width="80" height="24" rx="4" fill="rgba(95,201,255,0.16)" stroke="rgba(95,201,255,0.55)"/>
          <rect x="60" y="188" width="70" height="24" rx="4" fill="rgba(184,255,147,0.18)" stroke="rgba(184,255,147,0.55)"/>
          <rect x="150" y="188" width="50" height="24" rx="4" fill="rgba(184,255,147,0.18)" stroke="rgba(184,255,147,0.55)"/>
          <rect x="220" y="188" width="90" height="24" rx="4" fill="rgba(184,255,147,0.18)" stroke="rgba(184,255,147,0.55)"/>
        </g>
        <g fill="rgba(250,250,247,0.55)" font-family="JetBrains Mono, monospace" font-size="9" letter-spacing="1">
          <text x="40" y="50">VIDEO</text>
          <text x="40" y="118">AUDIO</text>
          <text x="40" y="178">CUTS</text>
        </g>
        <line x1="200" y1="30" x2="200" y2="230" stroke="#FFF200" stroke-width="1.5" style="animation: playhead 6s linear infinite"/>
      </svg>`,
    enablement: `
      <svg viewBox="0 0 400 300" class="w-full h-full">
        <g>
          <rect x="60" y="70" width="140" height="44" rx="10" fill="rgba(250,250,247,0.04)" stroke="rgba(250,250,247,0.14)"/>
          <rect x="80" y="90" width="100" height="4" rx="2" fill="rgba(250,250,247,0.18)"/>
          <rect x="80" y="98" width="60" height="4" rx="2" fill="rgba(250,250,247,0.12)"/>

          <rect x="80" y="140" width="200" height="44" rx="10" fill="rgba(255,242,0,0.1)" stroke="rgba(255,242,0,0.4)"/>
          <rect x="100" y="158" width="120" height="4" rx="2" fill="rgba(255,242,0,0.55)"/>
          <rect x="100" y="166" width="80" height="4" rx="2" fill="rgba(255,242,0,0.3)"/>

          <rect x="130" y="210" width="200" height="44" rx="10" fill="rgba(250,250,247,0.05)" stroke="rgba(250,250,247,0.18)"/>
          <rect x="150" y="230" width="130" height="4" rx="2" fill="rgba(250,250,247,0.22)"/>
          <rect x="150" y="238" width="90" height="4" rx="2" fill="rgba(250,250,247,0.14)"/>
        </g>
        <g font-family="JetBrains Mono, monospace" font-size="9" fill="rgba(250,250,247,0.55)">
          <text x="60" y="60">COLD OPEN</text>
          <text x="80" y="130">CLIP · 42s · QUOTE CARD</text>
          <text x="130" y="200">TALK-TRACK</text>
        </g>
        <circle cx="280" cy="162" r="6" fill="#FFF200" style="animation: pulseNode 2s ease-in-out infinite"/>
      </svg>`,
    distribution: `
      <svg viewBox="0 0 400 300" class="w-full h-full">
        <g stroke="rgba(255,242,0,0.4)" fill="none">
          <path d="M80 150 Q 180 60 320 80"/>
          <path d="M80 150 Q 180 110 320 150"/>
          <path d="M80 150 Q 180 200 320 220"/>
          <path d="M80 150 Q 180 230 320 280"/>
        </g>
        <circle cx="80" cy="150" r="20" fill="#FFF200"/>
        <text x="80" y="155" fill="#0B0B0C" font-family="Space Grotesk" font-size="11" font-weight="700" text-anchor="middle">EP</text>
        <g>
          <circle cx="320" cy="80" r="14" fill="rgba(255,242,0,0.15)" stroke="rgba(255,242,0,0.7)"/>
          <circle cx="320" cy="150" r="14" fill="rgba(95,201,255,0.15)" stroke="rgba(95,201,255,0.7)"/>
          <circle cx="320" cy="220" r="14" fill="rgba(184,255,147,0.15)" stroke="rgba(184,255,147,0.7)"/>
          <circle cx="320" cy="280" r="14" fill="rgba(250,250,247,0.1)" stroke="rgba(250,250,247,0.4)"/>
        </g>
        <g font-family="JetBrains Mono, monospace" font-size="9" fill="rgba(250,250,247,0.7)" text-anchor="start">
          <text x="342" y="84">YT</text>
          <text x="342" y="154">LI</text>
          <text x="342" y="224">NL</text>
          <text x="342" y="284">AD</text>
        </g>
      </svg>`,
  };

  const render = (i) => {
    const s = STAGES[i];
    detail.innerHTML = `
      <div class="engine-detail-copy">
        <div class="section-eyebrow is-yolk" style="margin-bottom: 18px;">Stage 0${i + 1}</div>
        <h3>${s.title}</h3>
        <p class="lede">${s.lede}</p>
        <ul>${s.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
      </div>
      <div class="engine-detail-visual">${visualHTML[s.visual] || ''}</div>
    `;
    nodes.forEach((n, j) => {
      n.classList.toggle('is-active', j === i);
      n.classList.toggle('is-passed', j < i);
    });
    if (railFill) {
      const pct = (i / (STAGES.length - 1)) * 100;
      railFill.style.width = `${pct}%`;
    }
  };

  nodes.forEach((n, i) => {
    n.addEventListener('click', () => render(i));
    n.addEventListener('mouseenter', () => render(i));
  });
  render(0);

  // Auto-advance on scroll into view
  let auto = 0;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      clearInterval(auto);
      let i = 0;
      auto = setInterval(() => {
        i = (i + 1) % STAGES.length;
        render(i);
      }, 3200);
      io.disconnect();
    });
  }, { threshold: 0.3 });
  io.observe(root);
  // Stop autoplay if the user interacts
  root.addEventListener('pointerdown', () => clearInterval(auto));
  root.addEventListener('pointermove', () => clearInterval(auto), { once: true });
})();

/* ---------- Compounding calculator ---------- */
(function compoundingCalculator() {
  const card = document.querySelector('[data-calc]');
  if (!card) return;

  const epIn = card.querySelector('[data-calc-episodes]');
  const guestIn = card.querySelector('[data-calc-guests]');
  const replyIn = card.querySelector('[data-calc-reply]');
  const dealIn = card.querySelector('[data-calc-deal]');

  const epVal = card.querySelector('[data-calc-episodes-val]');
  const guestVal = card.querySelector('[data-calc-guests-val]');
  const replyVal = card.querySelector('[data-calc-reply-val]');
  const dealVal = card.querySelector('[data-calc-deal-val]');

  const meetings = card.querySelector('[data-out-meetings]');
  const pipeline = card.querySelector('[data-out-pipeline]');
  const multiplier = card.querySelector('[data-out-mult]');
  const chart = card.querySelector('[data-calc-chart]');
  const replyLegend = card.querySelector('[data-legend-reply]');
  const pipelineLegend = card.querySelector('[data-legend-pipeline]');

  const fmt = (n) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(n > 10000 ? 0 : 1)}k`;
    return Math.round(n).toLocaleString();
  };

  const setProgress = (input) => {
    const min = +input.min || 0;
    const max = +input.max || 100;
    const v = +input.value;
    const p = ((v - min) / (max - min)) * 100;
    input.style.setProperty('--p', `${p}%`);
  };

  const update = () => {
    const eps = +epIn.value;            // episodes per month
    const guests = +guestIn.value;      // target-account guests per episode (0-3)
    const replyMult = +replyIn.value;   // 1.0 - 4.0 reply rate multiplier vs baseline
    const dealSize = +dealIn.value;     // avg deal size in $k

    // Derived numbers — honest back-of-envelope heuristics.
    // Meetings = episodes * guests * (0.6 = guest-booking conversion) + eps * (reply-mult * baseline reply 2/episode)
    const guestMeetings = eps * guests * 0.6;
    const replyBaseline = 2; // meetings-from-clip baseline per episode
    const clipMeetings = eps * replyBaseline * replyMult;
    const monthlyMeetings = guestMeetings + clipMeetings;

    // Pipeline = meetings * 0.22 (meeting -> opp) * dealSize
    const monthlyPipeline = monthlyMeetings * 0.22 * dealSize * 1000;

    // 12-month compound: content library keeps paying out. Each month also gets re-play from back-catalogue.
    let cumulative = 0;
    const months = [];
    for (let m = 1; m <= 12; m += 1) {
      // Compounding factor: 1 + (m-1) * 0.08 -- back-catalog keeps lifting pipeline by ~8% per month
      const comp = 1 + (m - 1) * 0.085;
      const monthVal = monthlyPipeline * comp;
      cumulative += monthVal;
      months.push(monthVal);
    }

    // Vs. campaign baseline (just monthly, flat, decaying)
    let campaign = 0;
    for (let m = 1; m <= 12; m += 1) {
      // campaign decay: 100%, 60%, 35%, 20%, 10%, then 0
      const decay = Math.max(0, Math.pow(0.55, m - 1));
      campaign += monthlyPipeline * decay;
    }

    const mult = campaign > 0 ? cumulative / campaign : 1;

    // Paint
    epVal.textContent = eps;
    guestVal.textContent = guests;
    replyVal.textContent = `${replyMult.toFixed(1)}×`;
    dealVal.textContent = `$${dealSize}k`;

    meetings.textContent = fmt(monthlyMeetings);
    pipeline.firstChild.nodeValue = `$${fmt(cumulative)}`;
    multiplier.textContent = `${mult.toFixed(1)}×`;
    if (replyLegend) replyLegend.textContent = `${Math.round(monthlyMeetings)} meetings/mo`;
    if (pipelineLegend) pipelineLegend.textContent = `$${fmt(cumulative)} 12-mo`;

    // Chart
    const peak = Math.max(...months);
    chart.querySelectorAll('.month').forEach((el, i) => {
      const bar = el.querySelector('.bar');
      const h = peak > 0 ? (months[i] / peak) * 100 : 0;
      bar.style.height = `${Math.max(4, h)}%`;
    });

    [epIn, guestIn, replyIn, dealIn].forEach(setProgress);
  };

  [epIn, guestIn, replyIn, dealIn].forEach((el) => el.addEventListener('input', update));
  update();
})();

/* ---------- Proof tiles — animated sparkline ---------- */
(function proofSparks() {
  document.querySelectorAll('.proof-tile .spark').forEach((spark) => {
    const bars = 16;
    let html = '';
    for (let i = 0; i < bars; i += 1) {
      const h = Math.round(6 + Math.sin(i * 0.7) * 8 + Math.random() * 14 + i * 0.6);
      html += `<span style="height:${h}px"></span>`;
    }
    spark.innerHTML = html;
  });
})();

/* ---------- Tweaks panel ---------- */
(function tweaks() {
  const panel = document.getElementById('tweaksPanel');
  const toggle = document.getElementById('tweaksToggle');
  if (!panel || !toggle) return;

  // Listen for tweaks toggle from host (even if the user never uses our FAB)
  window.addEventListener('message', (e) => {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === '__activate_edit_mode') panel.classList.add('is-open');
    if (e.data.type === '__deactivate_edit_mode') panel.classList.remove('is-open');
  });
  // Announce availability
  try {
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  } catch (_) { /* no-op */ }

  toggle.addEventListener('click', () => panel.classList.toggle('is-open'));
  const closeBtn = panel.querySelector('[data-tw-close]');
  if (closeBtn) closeBtn.addEventListener('click', () => panel.classList.remove('is-open'));

  // Yolk hue slider
  const yolkRange = panel.querySelector('[data-tw-yolk]');
  const yolkOut = panel.querySelector('[data-tw-yolk-val]');
  const applyYolk = (h) => {
    // oklch for nicer highlights; h is hue degrees (50-100 for yellow-green range)
    const hex = {
      52:  '#FFD400',
      58:  '#FFE000',
      64:  '#FFF200',
      70:  '#F8FF3D',
      76:  '#DFFF5C',
      82:  '#BEFF71',
      88:  '#8EFF8B',
    };
    // choose closest
    const keys = Object.keys(hex).map(Number);
    const near = keys.reduce((a, b) => Math.abs(b - h) < Math.abs(a - h) ? b : a);
    const col = hex[near];
    document.documentElement.style.setProperty('--yolk', col);
    // Tailwind utility classes use a fixed colour — override the most visible ones
    document.querySelectorAll('.bg-yolk').forEach((el) => { el.style.backgroundColor = col; });
    document.querySelectorAll('.text-yolk').forEach((el) => { el.style.color = col; });
    document.querySelectorAll('.border-yolk').forEach((el) => { el.style.borderColor = col; });
    yolkOut.textContent = col;
    yolkRange.style.setProperty('--p', `${((h - 52) / (88 - 52)) * 100}%`);
  };
  yolkRange.addEventListener('input', () => applyYolk(+yolkRange.value));
  applyYolk(+yolkRange.value);

  // Beam intensity
  const beamSegs = panel.querySelectorAll('[data-tw-beam] button');
  beamSegs.forEach((btn) => {
    btn.addEventListener('click', () => {
      beamSegs.forEach((b) => b.classList.remove('is-on'));
      btn.classList.add('is-on');
      document.body.setAttribute('data-beam', btn.dataset.val);
    });
  });

  // Type variant
  const typeSegs = panel.querySelectorAll('[data-tw-type] button');
  typeSegs.forEach((btn) => {
    btn.addEventListener('click', () => {
      typeSegs.forEach((b) => b.classList.remove('is-on'));
      btn.classList.add('is-on');
      document.body.setAttribute('data-type', btn.dataset.val);
    });
  });
})();

/* ---------- keyframes for inline SVGs (engine visuals) ---------- */
(function injectKeyframes() {
  const css = `
    @keyframes pulseNode {
      0%, 100% { r: 6; opacity: 1; }
      50% { r: 10; opacity: 0.7; }
    }
    @keyframes playhead {
      from { transform: translateX(-160px); }
      to   { transform: translateX(160px); }
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
})();

/* ---------- Generic u-fade-in on scroll ---------- */
(function uFade() {
  const els = document.querySelectorAll('.u-fade');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach((el) => io.observe(el));
})();

/* ---------- Team carousel controls ---------- */
(function teamCarousel() {
  const track = document.querySelector('[data-team-carousel]');
  const prev = document.querySelector('[data-team-prev]');
  const next = document.querySelector('[data-team-next]');
  if (!track || !prev || !next) return;

  const step = () => Math.max(260, Math.floor(track.clientWidth * 0.78));
  prev.addEventListener('click', () => {
    track.scrollBy({ left: -step(), behavior: 'smooth' });
  });
  next.addEventListener('click', () => {
    track.scrollBy({ left: step(), behavior: 'smooth' });
  });
})();
