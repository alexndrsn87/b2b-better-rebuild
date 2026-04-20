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
  const canvas = document.getElementById('heroBeamCanvas');
  const tickerHit = document.querySelector('.ticker-beam-hit');
  if (!hero || !beam || !canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (start, target, factor) => start + (target - start) * factor;
  const randomBeamOffset = () => ((Math.random() + Math.random() + Math.random()) - 1.5) * 0.26;

  let dpr = 1;
  let width = 0;
  let height = 0;
  let particles = [];
  let targetHeat = 0;
  let heat = 0;
  const pointer = { active: false, x: 0, y: 0 };

  const resetParticle = (particle, randomY) => {
    particle.xN = randomBeamOffset();
    particle.y = randomY ? Math.random() * height : -Math.random() * 60;
    particle.vx = 0;
    particle.speed = 0.45 + Math.random() * 1.2;
    particle.size = 0.6 + Math.random() * 1.2;
    particle.alpha = 0.08 + Math.random() * 0.2;
    particle.phase = Math.random() * Math.PI * 2;
    particle.wobble = 0.08 + Math.random() * 0.4;
  };

  const initParticles = () => {
    const count = prefersReducedMotion ? 700 : 2600;
    particles = Array.from({ length: count }, () => {
      const particle = {};
      resetParticle(particle, true);
      return particle;
    });
  };

  const resize = () => {
    const rect = beam.getBoundingClientRect();
    width = Math.max(72, Math.floor(rect.width));
    height = Math.max(280, Math.floor(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  };

  resize();
  window.addEventListener('resize', resize);

  hero.addEventListener('pointermove', (e) => {
    const rect = beam.getBoundingClientRect();
    const cx = rect.left + rect.width * 0.5;
    const cy = rect.top + rect.height * 0.56;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const distance = Math.hypot(dx, dy);
    const radius = Math.max(260, rect.width * 2.2);
    const proximity = clamp(1 - distance / radius, 0, 1);
    targetHeat = Math.pow(proximity, 0.5);

    pointer.active = true;
    pointer.x = clamp(e.clientX - rect.left, 0, rect.width);
    pointer.y = clamp(e.clientY - rect.top, 0, rect.height);

    const localX = clamp((pointer.x / rect.width) * 100, 0, 100);
    const localY = clamp((pointer.y / rect.height) * 100, 0, 100);
    beam.style.setProperty('--beam-cx', `${localX}%`);
    beam.style.setProperty('--beam-cy', `${localY}%`);
    if (tickerHit) tickerHit.classList.toggle('is-energized', targetHeat > 0.48);
  });

  hero.addEventListener('pointerleave', () => {
    pointer.active = false;
    targetHeat = 0;
    beam.style.setProperty('--beam-cx', '50%');
    beam.style.setProperty('--beam-cy', '42%');
    if (tickerHit) tickerHit.classList.remove('is-energized');
  });

  const renderStatic = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';
    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      const x = width * 0.5 + p.xN * width * 0.32;
      const y = p.y;
      const edge = Math.abs((x - width * 0.5) / (width * 0.5));
      const alpha = (0.09 + p.alpha * 0.8) * Math.max(0, 1 - edge * 1.6);
      if (alpha < 0.01) continue;
      ctx.fillStyle = `rgba(255,242,0,${alpha.toFixed(3)})`;
      ctx.fillRect(x, y, 1.1, 1.1);
    }
  };

  if (prefersReducedMotion) {
    renderStatic();
    return;
  }

  (function loop() {
    heat = lerp(heat, targetHeat, 0.11);
    beam.style.setProperty('--beam-heat', heat.toFixed(3));

    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';

    const veil = ctx.createRadialGradient(
      width * 0.5,
      height * 0.44,
      8,
      width * 0.5,
      height * 0.48,
      Math.max(width * 1.8, 180)
    );
    veil.addColorStop(0, `rgba(255,242,0,${(0.08 + heat * 0.16).toFixed(3)})`);
    veil.addColorStop(0.45, `rgba(255,242,0,${(0.035 + heat * 0.08).toFixed(3)})`);
    veil.addColorStop(1, 'rgba(255,242,0,0)');
    ctx.fillStyle = veil;
    ctx.fillRect(0, 0, width, height);

    const influenceRadius = Math.max(54, width * 0.58);
    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];

      p.y += p.speed * (1 + heat * 0.55);
      p.xN += Math.sin((p.y * 0.01) + p.phase) * 0.0008;

      let x = width * 0.5 + p.xN * width * 0.32 + Math.sin((p.y * 0.022) + p.phase) * p.wobble;
      if (pointer.active) {
        const dx = x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < influenceRadius) {
          const force = (1 - dist / influenceRadius) * (0.9 + heat * 1.35);
          p.vx += (dx / dist) * force * 0.95;
          p.y += Math.abs(dy / dist) * force * 0.42;
        }
      }

      x += p.vx;
      p.vx *= 0.9;

      const edge = Math.abs((x - width * 0.5) / (width * 0.5));
      const alpha = p.alpha * Math.max(0, 1 - edge * 1.72) * (0.85 + heat * 0.65);
      if (alpha > 0.01) {
        const size = p.size * (0.9 + heat * 0.2);
        ctx.fillStyle = `rgba(255,242,0,${alpha.toFixed(3)})`;
        ctx.fillRect(x, p.y, size, size);
      }

      if (p.y > height + 12 || x < -26 || x > width + 26) {
        resetParticle(p, false);
      }
    }

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
