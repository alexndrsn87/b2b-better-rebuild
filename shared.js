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

/* ---- Unified beam FX ---- */
(function beamFX() {
  const stage = document.querySelector('.beam-stage');
  const host = document.querySelector('.beam-host');
  const canvas = document.getElementById('beamCanvas');
  const trackClip = document.querySelector('.ticker-track-clip');
  if (!stage || !host || !canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const gauss = () => ((Math.random() + Math.random() + Math.random()) - 1.5) * 0.67;

  let dpr = 1;
  let cw = 0;
  let ch = 0;
  let coreX = 0;       // canvas-local x of the beam core
  let roofY = 0;       // canvas-local y of the ticker roof line
  let columnHalf = 22; // half-width of the particle column (tight near base)

  let particles = [];
  const pointer = { active: false, x: 0, y: 0 };

  // Particle mode: 0 falling, 1 sliding on roof, 2 spilling off the edge
  const resetFalling = (p, randomY) => {
    // Uniform spread — the column should feel the same width top to bottom.
    const spread = columnHalf * (0.95 + Math.random() * 0.35);
    p.x = coreX + gauss() * spread;
    p.y = randomY ? Math.random() * Math.max(roofY - 2, 1) : -Math.random() * 44;
    p.vx = 0;
    p.vy = 0.18 + Math.random() * 0.55;
    p.speed = 0.28 + Math.random() * 0.9;
    p.phase = Math.random() * Math.PI * 2;
    p.alpha = 0.22 + Math.random() * 0.5;
    p.size = 0.78 + Math.random() * 1.1;
    p.mode = 0;
    p.drift = 0;
    p.life = 1;
  };

  const convertToSlide = (p) => {
    p.y = roofY - 1;
    const dir = p.x >= coreX ? 1 : -1;
    const offset = (p.x - coreX) * 0.012;
    // Slower lateral launch → particles cluster near the impact, creating the
    // "thick flow" pile-up the user asked for.
    p.vx = dir * (0.35 + Math.random() * 1.25) + offset;
    p.vy = 0;
    p.mode = 1;
    p.life = 1;
    p.alpha = 0.28 + Math.random() * 0.48;
    p.size = 0.72 + Math.random() * 1.04;
  };

  const initParticles = () => {
    const count = prefersReducedMotion ? 1200 : 3600;
    particles = new Array(count);
    for (let i = 0; i < count; i += 1) {
      const p = {};
      resetFalling(p, true);
      particles[i] = p;
    }
  };

  const updateGeometry = () => {
    const hostRect = host.getBoundingClientRect();
    cw = Math.max(120, Math.floor(hostRect.width));
    ch = Math.max(280, Math.floor(hostRect.height));

    const hostStyle = getComputedStyle(host);
    const coreStyle = hostStyle.getPropertyValue('--beam-core-x').trim();
    const coreWidthStr = hostStyle.getPropertyValue('--beam-width').trim();

    let corePct = 0.8;
    if (coreStyle.endsWith('%')) corePct = parseFloat(coreStyle) / 100;
    else if (coreStyle.endsWith('px')) corePct = parseFloat(coreStyle) / cw;

    coreX = clamp(Math.round(cw * corePct), 8, cw - 8);

    let coreWidthPx = 220;
    if (coreWidthStr.endsWith('px')) coreWidthPx = parseFloat(coreWidthStr);

    // Compute the actual roof Y by reading the ticker track-clip's position.
    if (trackClip) {
      const clipRect = trackClip.getBoundingClientRect();
      roofY = clamp(Math.round(clipRect.top - hostRect.top) + 1, 42, ch - 8);
    } else {
      roofY = clamp(ch - 72, 42, ch - 8);
    }

    // Feed the roof position back into CSS so the core/glow/flare end exactly there
    const roofGap = Math.max(0, ch - roofY);
    host.style.setProperty('--beam-roof-gap', `${roofGap}px`);

    // Column half-width — a good chunk of the visible glow width so particles
    // fill the pillar rather than sitting as a thin thread inside it.
    columnHalf = Math.max(22, Math.min(68, coreWidthPx * 0.22));
  };

  const resize = () => {
    const rect = host.getBoundingClientRect();
    const w = Math.max(120, Math.floor(rect.width));
    const h = Math.max(280, Math.floor(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    updateGeometry();
    initParticles();
  };

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('load', resize);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(resize).catch(() => {});
  }

  const syncPointerVars = () => {
    const px = clamp((pointer.x / Math.max(1, cw)) * 100, 0, 100);
    const py = clamp((pointer.y / Math.max(1, ch)) * 100, 0, 100);
    host.style.setProperty('--beam-cx', `${px}%`);
    host.style.setProperty('--beam-cy', `${py}%`);
  };

  stage.addEventListener('pointermove', (e) => {
    const rect = host.getBoundingClientRect();
    pointer.active = true;
    pointer.x = clamp(e.clientX - rect.left, 0, rect.width);
    pointer.y = clamp(e.clientY - rect.top, 0, rect.height);
    syncPointerVars();
  });

  stage.addEventListener('pointerleave', () => {
    pointer.active = false;
    pointer.x = coreX;
    pointer.y = ch * 0.42;
    host.style.setProperty('--beam-cx', '50%');
    host.style.setProperty('--beam-cy', '42%');
  });

  if (prefersReducedMotion) {
    ctx.clearRect(0, 0, cw, ch);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(255,242,0,0.6)';
    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }
    return;
  }

  pointer.x = coreX;
  pointer.y = ch * 0.42;

  (function loop() {
    ctx.clearRect(0, 0, cw, ch);
    ctx.globalCompositeOperation = 'lighter';

    // Tiny bright ribbon along the roof — enforces the "hit line" look
    ctx.fillStyle = 'rgba(255, 246, 130, 0.55)';
    ctx.fillRect(Math.max(0, coreX - 160), roofY - 1, Math.min(cw, 320), 1.1);

    // Smaller, more localised cursor influence — a splash, not a force field.
    const influenceRadius = Math.max(58, cw * 0.05);
    const nextParticles = [];

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];

      if (p.mode === 0) {
        // Gentler gravity — a soft drift rather than a plunge.
        p.vy += 0.005;
        p.y += p.speed + p.vy;

        // Uniform, very gentle column bias — keeps particles from wandering
        // far off but doesn't taper the width as they fall.
        p.vx += (coreX - p.x) * 0.0014;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < influenceRadius) {
            // Sharper falloff (^2.4) + lower force = localised splash.
            const pull = Math.pow(1 - dist / influenceRadius, 2.4);
            const nx = dx / dist;
            const ny = dy / dist;
            p.vx += nx * pull * 1.1 + -ny * pull * 0.5;
            p.vy += ny * pull * 0.7 + nx * pull * 0.3;
          }
        }

        p.x += p.vx;
        p.vx *= 0.93;
        p.vy *= 0.94;

        if (p.y >= roofY - 1) {
          convertToSlide(p);
        } else if (p.y > ch + 20 || p.x < -20 || p.x > cw + 20) {
          resetFalling(p, false);
        }

        // Uniform alpha envelope — constant column width.
        const envelopeHalf = columnHalf * 1.25;
        const edge = Math.abs((p.x - coreX) / Math.max(envelopeHalf, 1));
        const alpha = p.alpha * Math.max(0, 1 - edge * 0.9);
        if (alpha > 0.012) {
          ctx.fillStyle = `rgba(255,242,0,${alpha.toFixed(3)})`;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
        nextParticles.push(p);
      } else if (p.mode === 1) {
        p.x += p.vx;
        p.y = (roofY - 1.2) + Math.sin((p.x * 0.09) + p.phase) * 0.4;
        // Gentle outward acceleration — particles drift away from the impact
        // point instead of being flung.
        p.vx += ((p.x - coreX) / Math.max(coreX, 1)) * 0.009;
        p.vx *= 1.0014;
        p.life -= 0.0016;

        // Start lifting off before reaching the edge so spill curves away
        // rather than dropping straight down.
        const nearEdge = p.x <= 28 || p.x >= cw - 28;
        if (nearEdge) {
          p.mode = 2;
          p.drift = p.vx * 0.6;
          p.vy = 0.18 + Math.random() * 0.35;
          p.life = Math.max(p.life, 0.9);
        }

        const alpha = p.alpha * Math.max(0, p.life);
        ctx.fillStyle = `rgba(255,242,0,${alpha.toFixed(3)})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);

        if (p.life > 0) nextParticles.push(p);
        else {
          resetFalling(p, false);
          nextParticles.push(p);
        }
      } else {
        // Spilling off the edge — gentle outward arc, minimal gravity so
        // particles float away rather than plunging.
        p.x += p.drift;
        p.y += p.vy;
        p.vy += 0.018;
        p.drift *= 0.994;
        p.life -= 0.0055;

        const alpha = p.alpha * 0.82 * Math.max(0, p.life);
        ctx.fillStyle = `rgba(255,242,0,${alpha.toFixed(3)})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);

        if (p.life <= 0 || p.y > ch + 16 || p.x < -40 || p.x > cw + 40) {
          resetFalling(p, false);
        }
        nextParticles.push(p);
      }
    }

    particles = nextParticles;
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
