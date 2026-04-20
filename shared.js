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
  const beamCanvas = document.getElementById('heroBeamCanvas');
  const tickerCanvas = document.getElementById('tickerBeamCanvas');
  const tickerHit = document.querySelector('.ticker-beam-hit');
  if (!hero || !beam || !beamCanvas || !tickerCanvas) return;

  const beamCtx = beamCanvas.getContext('2d', { alpha: true });
  const tickerCtx = tickerCanvas.getContext('2d', { alpha: true });
  if (!beamCtx || !tickerCtx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const randomBeamOffset = () => ((Math.random() + Math.random() + Math.random()) - 1.5) * 0.28;

  let dpr = 1;
  let beamWidth = 0;
  let beamHeight = 0;
  let tickerWidth = 0;
  let tickerHeight = 0;
  let beamParticles = [];
  let tickerParticles = [];
  let impactX = 0;
  let impactYBeam = 0;
  let beamLeft = 0;
  let tickerLeft = 0;
  const pointer = { active: false, x: 0, y: 0 };
  const roofY = 30;
  const tickerParticleCap = 2400;

  const resetBeamParticle = (particle, randomY) => {
    particle.xN = randomBeamOffset();
    particle.y = randomY ? Math.random() * beamHeight : -Math.random() * 80;
    particle.vx = 0;
    particle.vy = 0;
    particle.speed = 0.62 + Math.random() * 1.55;
    particle.size = 0.8 + Math.random() * 1.15;
    particle.alpha = 0.24 + Math.random() * 0.48;
    particle.phase = Math.random() * Math.PI * 2;
    particle.wobble = 0.14 + Math.random() * 0.65;
  };

  const spawnTickerParticle = (xAtTicker) => {
    const x = clamp(xAtTicker, 6, tickerWidth - 6);
    const dir = x >= impactX ? 1 : -1;
    tickerParticles.push({
      x,
      y: roofY - 1,
      vx: dir * (1.15 + Math.random() * 2.9) + (x - impactX) * 0.018,
      vy: 0,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.26 + Math.random() * 0.42,
      size: 0.74 + Math.random() * 1.06,
      mode: 1, // 1 slide, 2 spill
      drift: 0,
      life: 1,
    });
    if (tickerParticles.length > tickerParticleCap) tickerParticles.shift();
  };

  const initParticles = () => {
    const beamCount = prefersReducedMotion ? 1000 : 5200;
    tickerParticles = [];

    beamParticles = Array.from({ length: beamCount }, () => {
      const particle = {};
      resetBeamParticle(particle, true);
      return particle;
    });
  };

  const updateGeometry = () => {
    const beamRect = beam.getBoundingClientRect();
    const tickerRect = tickerCanvas.getBoundingClientRect();
    beamLeft = beamRect.left;
    tickerLeft = tickerRect.left;

    const beamCenterViewportX = beamRect.left + (beamRect.width * 0.5);
    impactX = clamp(beamCenterViewportX - tickerRect.left, 8, tickerWidth - 8);
    impactYBeam = clamp((tickerRect.top + roofY - 1) - beamRect.top, 42, beamHeight - 6);
    if (tickerHit) tickerHit.style.left = `${impactX}px`;
  };

  const resize = () => {
    const beamRect = beam.getBoundingClientRect();
    const tickerRect = tickerCanvas.getBoundingClientRect();

    beamWidth = Math.max(72, Math.floor(beamRect.width));
    beamHeight = Math.max(280, Math.floor(beamRect.height));
    tickerWidth = Math.max(220, Math.floor(tickerRect.width));
    tickerHeight = Math.max(56, Math.floor(tickerRect.height));

    dpr = Math.min(window.devicePixelRatio || 1, 2);

    beamCanvas.width = Math.floor(beamWidth * dpr);
    beamCanvas.height = Math.floor(beamHeight * dpr);
    beamCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    tickerCanvas.width = Math.floor(tickerWidth * dpr);
    tickerCanvas.height = Math.floor(tickerHeight * dpr);
    tickerCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    initParticles();
    updateGeometry();
  };

  resize();
  window.addEventListener('resize', resize);

  const syncPointerVars = () => {
    const px = clamp((pointer.x / Math.max(1, beamWidth)) * 100, 0, 100);
    const py = clamp((pointer.y / Math.max(1, beamHeight)) * 100, 0, 100);
    beam.style.setProperty('--beam-cx', `${px}%`);
    beam.style.setProperty('--beam-cy', `${py}%`);
  };

  hero.addEventListener('pointermove', (e) => {
    const rect = beam.getBoundingClientRect();
    pointer.active = true;
    pointer.x = clamp(e.clientX - rect.left, 0, rect.width);
    pointer.y = clamp(e.clientY - rect.top, 0, rect.height);
    syncPointerVars();
  });

  hero.addEventListener('pointerleave', () => {
    pointer.active = false;
    pointer.x = beamWidth * 0.5;
    pointer.y = beamHeight * 0.42;
    beam.style.setProperty('--beam-cx', '50%');
    beam.style.setProperty('--beam-cy', '42%');
  });

  const renderStatic = () => {
    beamCtx.clearRect(0, 0, beamWidth, beamHeight);
    beamCtx.globalCompositeOperation = 'source-over';
    for (let i = 0; i < beamParticles.length; i += 1) {
      const p = beamParticles[i];
      const t = clamp(p.y / Math.max(impactYBeam, 1), 0, 1);
      const squeeze = 1 - (t * 0.74);
      const x = beamWidth * 0.5 + p.xN * beamWidth * 0.34 * squeeze;
      const y = p.y;
      const edge = Math.abs((x - beamWidth * 0.5) / (beamWidth * 0.5));
      const alpha = p.alpha * Math.max(0, 1 - edge * 1.65);
      if (alpha < 0.01) continue;
      beamCtx.fillStyle = `rgba(255,242,0,${alpha.toFixed(3)})`;
      beamCtx.fillRect(x, y, 1.1, 1.1);
    }

    tickerCtx.clearRect(0, 0, tickerWidth, tickerHeight);
    tickerCtx.globalCompositeOperation = 'source-over';
    tickerCtx.fillStyle = 'rgba(255,242,0,0.75)';
    tickerCtx.fillRect(impactX - 3, roofY - 1, 6, 2);
  };

  if (prefersReducedMotion) {
    renderStatic();
    return;
  }

  pointer.x = beamWidth * 0.5;
  pointer.y = beamHeight * 0.42;

  (function loop() {
    updateGeometry();

    beamCtx.clearRect(0, 0, beamWidth, beamHeight);
    beamCtx.globalCompositeOperation = 'lighter';

    const influenceRadius = Math.max(90, beamWidth * 0.78);
    for (let i = 0; i < beamParticles.length; i += 1) {
      const p = beamParticles[i];

      p.vy += 0.012;
      p.y += p.speed + p.vy;
      p.xN += Math.sin((p.y * 0.01) + p.phase) * 0.0008;

      const t = clamp(p.y / Math.max(impactYBeam, 1), 0, 1);
      const squeeze = 1 - (t * 0.74);
      let x = beamWidth * 0.5 + p.xN * beamWidth * 0.34 * squeeze + Math.sin((p.y * 0.022) + p.phase) * p.wobble * (0.65 + (1 - t) * 0.4);
      if (pointer.active) {
        const dx = x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < influenceRadius) {
          const normX = dx / dist;
          const normY = dy / dist;
          const pull = Math.pow(1 - dist / influenceRadius, 1.65);
          const swirlX = -normY;
          const swirlY = normX;
          p.vx += normX * pull * 3.9 + swirlX * pull * 2.2;
          p.vy += normY * pull * 2.4 + swirlY * pull * 1.2;
        }
      }

      x += p.vx;
      p.vx *= 0.91;
      p.vy *= 0.9;

      const edge = Math.abs((x - beamWidth * 0.5) / (beamWidth * 0.5));
      const alpha = p.alpha * Math.max(0, 1 - edge * 1.72);
      if (alpha > 0.01) {
        beamCtx.fillStyle = `rgba(255,242,0,${alpha.toFixed(3)})`;
        beamCtx.fillRect(x, p.y, p.size, p.size);
      }

      if (p.y >= impactYBeam) {
        const viewportX = beamLeft + x;
        const xAtTicker = viewportX - tickerLeft;
        if (Math.random() < 0.72) spawnTickerParticle(xAtTicker);
        resetBeamParticle(p, false);
      } else if (p.y > beamHeight + 14 || x < -24 || x > beamWidth + 24) {
        resetBeamParticle(p, false);
      }
    }

    tickerCtx.clearRect(0, 0, tickerWidth, tickerHeight);
    tickerCtx.globalCompositeOperation = 'lighter';
    tickerCtx.fillStyle = 'rgba(255, 242, 0, 0.45)';
    tickerCtx.fillRect(0, roofY - 1, tickerWidth, 1.2);
    for (let i = 0; i < tickerParticles.length; i += 1) {
      const p = tickerParticles[i];
      const centerX = impactX;

      if (p.mode === 1) {
        p.x += p.vx;
        p.y = (roofY - 1.2) + Math.sin((p.x * 0.09) + p.phase) * 0.35;
        p.vx += ((p.x - centerX) / Math.max(centerX, 1)) * 0.016;
        p.vx *= 1.0028;
        p.life -= 0.0026;
        if (p.x <= 10 || p.x >= tickerWidth - 10) {
          p.mode = 2;
          p.drift = p.vx * 0.2;
          p.vy = 0.7 + Math.random() * 0.85;
        }
      } else {
        p.x += p.drift;
        p.y += p.vy;
        p.vy += 0.06;
        p.life -= 0.008;
      }

      const alpha = p.alpha * (p.mode === 2 ? 0.8 : 1) * Math.max(0, p.life);
      tickerCtx.fillStyle = `rgba(255,242,0,${alpha.toFixed(3)})`;
      tickerCtx.fillRect(p.x, p.y, p.size, p.size);
    }
    tickerParticles = tickerParticles.filter((particle) => {
      if (particle.life <= 0) return false;
      if (particle.mode === 2 && particle.y > tickerHeight + 14) return false;
      return particle.x > -20 && particle.x < tickerWidth + 20;
    });

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
