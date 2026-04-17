/* ============ B2B Better — Shared interactions ============ */
gsap.registerPlugin(ScrollTrigger);

// #region agent log
window.__agentLog = function(payload) {
  fetch('http://127.0.0.1:7355/ingest/59b67c2b-f119-482c-b1d9-9ec204749100',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'e8152b'},body:JSON.stringify({sessionId:'e8152b',runId:'run1',timestamp:Date.now(),...payload})}).catch(()=>{});
};
// #endregion

/* ---- Lenis smooth scroll ---- */
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
window.__lenis = lenis;

/* ---- Custom cursor ---- */
(function cursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  // #region agent log
  window.__agentLog({hypothesisId:'H1',location:'shared.js:19',message:'cursor elements initial state',data:{dotDisplay:getComputedStyle(dot).display,ringDisplay:getComputedStyle(ring).display,dotW:dot.offsetWidth,ringW:ring.offsetWidth}});
  // #endregion
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });
  (function loop() {
    rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a, button, .tilt').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      dot.style.width = '6px'; dot.style.height = '6px';
      ring.style.borderColor = '#FFF200';
      ring.style.width = '52px'; ring.style.height = '52px';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.width = '14px'; dot.style.height = '14px';
      ring.style.borderColor = 'rgba(250,250,247,.35)';
      ring.style.width = '40px'; ring.style.height = '40px';
    });
  });
})();

/* ---- Nav: scroll state + burger ---- */
(function nav() {
  const navEl = document.getElementById('siteNav');
  const burger = document.getElementById('burger');
  const overlay = document.getElementById('menuOverlay');
  const livelyTargets = document.querySelectorAll('.nav-logo, .nav-cta');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let freezeNavMotion = false;
  if (navEl) {
    const update = () => navEl.classList.toggle('is-scrolled', window.scrollY > 24);
    update(); addEventListener('scroll', update, { passive: true });
    // #region agent log
    const heroCard = document.querySelector('#top .hero-copy-glass');
    const navLinks = document.querySelectorAll('#siteNav nav a');
    const navRect = navEl.getBoundingClientRect();
    const heroRect = heroCard ? heroCard.getBoundingClientRect() : null;
    window.__agentLog({hypothesisId:'H2',location:'shared.js:61',message:'nav and hero spacing snapshot',data:{navBottom:Math.round(navRect.bottom),heroTop:heroRect?Math.round(heroRect.top):null,heroGap:heroRect?Math.round(heroRect.top-navRect.bottom):null,navFontSize:navLinks.length?getComputedStyle(navLinks[0]).fontSize:null}});
    // #endregion
    navEl.addEventListener('mouseenter', () => {
      freezeNavMotion = true;
      livelyTargets.forEach((el) => {
        el.style.setProperty('--mx', '0px');
        el.style.setProperty('--my', '0px');
      });
    });
    navEl.addEventListener('mouseleave', () => { freezeNavMotion = false; });
  }

  if (!prefersReducedMotion) {
    livelyTargets.forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        if (freezeNavMotion) return;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
        el.style.setProperty('--mx', `${x}px`);
        el.style.setProperty('--my', `${y}px`);
      });
      el.addEventListener('pointerleave', () => {
        el.style.setProperty('--mx', '0px');
        el.style.setProperty('--my', '0px');
      });
    });
  }

  if (burger && overlay) {
    burger.addEventListener('click', () => {
      const open = overlay.classList.contains('hidden');
      overlay.classList.toggle('hidden', !open);
      overlay.classList.toggle('flex', open);
    });
    overlay.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        overlay.classList.add('hidden');
        overlay.classList.remove('flex');
      })
    );
  }
})();

/* ---- Reveal on load ---- */
gsap.utils.toArray('[data-reveal]').forEach((el, i) => {
  gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, delay: 0.2 + i * 0.08, ease: 'power3.out' });
});

/* ---- Reveal on scroll ---- */
gsap.utils.toArray('[data-reveal-scroll]').forEach((el) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%' },
    y: 60, opacity: 0, duration: 1, ease: 'power3.out',
  });
});

/* ---- Stat count-up ---- */
gsap.utils.toArray('[data-count]').forEach((el) => {
  const end = parseFloat(el.dataset.count);
  const obj = { val: 0 };
  ScrollTrigger.create({
    trigger: el, start: 'top 85%', once: true,
    onEnter: () => {
      gsap.to(obj, {
        val: end, duration: 1.8, ease: 'power2.out',
        onUpdate: () => {
          if (el.firstChild) el.firstChild.nodeValue = end % 1 ? obj.val.toFixed(1) : Math.round(obj.val).toString();
        },
      });
    },
  });
});

/* ---- Tilt cards ---- */
document.querySelectorAll('.tilt').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});
