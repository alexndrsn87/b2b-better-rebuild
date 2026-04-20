/* ============ B2B Better — Shared interactions ============ */
gsap.registerPlugin(ScrollTrigger);

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
  if (!dot) return;
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });
  if (ring) {
    (function loop() {
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();
  }
  document.querySelectorAll('a, button, .tilt').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      dot.style.width = '6px'; dot.style.height = '6px';
      if (ring) {
        ring.style.borderColor = '#FFF200';
        ring.style.width = '52px'; ring.style.height = '52px';
      }
    });
    el.addEventListener('mouseleave', () => {
      dot.style.width = '14px'; dot.style.height = '14px';
      if (ring) {
        ring.style.borderColor = 'rgba(250,250,247,.35)';
        ring.style.width = '40px'; ring.style.height = '40px';
      }
    });
  });
})();

/* ---- Hero beam cursor interaction ---- */
(function heroBeamFX() {
  const hero = document.getElementById('top');
  const beam = document.querySelector('.hero-beam');
  const tickerHit = document.querySelector('.ticker-beam-hit');
  if (!hero || !beam) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const ease = (start, target, factor) => start + (target - start) * factor;

  let targetHeat = 0;
  let heat = 0;

  hero.addEventListener('pointermove', (e) => {
    const rect = beam.getBoundingClientRect();
    const cx = rect.left + rect.width * 0.5;
    const cy = rect.top + rect.height * 0.55;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const distance = Math.hypot(dx, dy);
    const radius = Math.max(240, rect.width * 1.7);
    const proximity = clamp(1 - distance / radius, 0, 1);
    targetHeat = Math.pow(proximity, 0.55);

    const localX = clamp(((e.clientX - rect.left) / rect.width) * 100, 0, 100);
    const localY = clamp(((e.clientY - rect.top) / rect.height) * 100, 0, 100);
    beam.style.setProperty('--beam-cx', `${localX}%`);
    beam.style.setProperty('--beam-cy', `${localY}%`);
    const pushX = clamp(dx * 0.16, -28, 28) * proximity;
    const pushY = clamp((e.clientY - cy) * 0.08, -14, 14) * proximity;
    beam.style.setProperty('--beam-push-x', `${pushX.toFixed(2)}px`);
    beam.style.setProperty('--beam-push-y', `${pushY.toFixed(2)}px`);

    if (tickerHit) tickerHit.classList.toggle('is-energized', targetHeat > 0.52);
  });

  hero.addEventListener('pointerleave', () => {
    targetHeat = 0;
    beam.style.setProperty('--beam-cx', '50%');
    beam.style.setProperty('--beam-cy', '42%');
    beam.style.setProperty('--beam-push-x', '0px');
    beam.style.setProperty('--beam-push-y', '0px');
    if (tickerHit) tickerHit.classList.remove('is-energized');
  });

  (function loop() {
    heat = ease(heat, targetHeat, 0.12);
    beam.style.setProperty('--beam-heat', heat.toFixed(3));
    requestAnimationFrame(loop);
  })();
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
