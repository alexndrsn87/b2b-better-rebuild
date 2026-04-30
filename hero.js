/* ============ Homepage hero — fullscreen frosted focus ============ */
(function heroFocus() {
  const heroCard = document.querySelector('#top .hero-copy-glass');
  if (!heroCard) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  heroCard.addEventListener('pointermove', (e) => {
    const r = heroCard.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    heroCard.style.transform = `perspective(1200px) rotateX(${-y * 3.2}deg) rotateY(${x * 3.2}deg) translateZ(0)`;
  });
  heroCard.addEventListener('pointerleave', () => {
    heroCard.style.transform = '';
  });
})();

/* ---- Problem → Promise: pin + particle morph ---- */
(function problemPromise() {
  // Pin problem section so it holds before fading
  const pinEl = document.getElementById('problemPin');
  const problemHead = document.getElementById('problem-head');
  if (pinEl && problemHead) {
    ScrollTrigger.create({
      trigger: pinEl,
      start: 'top 20%',
      end: '+=420',
      pin: '.problem-content',
      pinSpacing: true,
    });
    // Hold the headline crisp for a long range, then fade late
    gsap.timeline({
      scrollTrigger: {
        trigger: pinEl, start: 'top 20%', end: '+=420', scrub: true,
      },
    })
      .to({}, { duration: 0.6 }) // hold
      .to(problemHead, { opacity: 0.18, filter: 'blur(6px)', duration: 0.4 });
  }

  // Promise reveal
  const promiseHead = document.getElementById('promise-head');
  if (promiseHead) {
    gsap.from(promiseHead, {
      scrollTrigger: { trigger: promiseHead, start: 'top 80%' },
      y: 60, opacity: 0, duration: 1.2, ease: 'power3.out',
    });
  }

  // Problem beam particles (same family as top hero beam)
  const pcanvas = document.getElementById('particles');
  if (!pcanvas) return;
  const pctx = pcanvas.getContext('2d');
  if (!pctx) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const gauss = () => ((Math.random() + Math.random() + Math.random()) - 1.5) * 0.67;

  let dpr = 1;
  let pw = 0;
  let ph = 0;
  let beamX = 0;
  let beamTop = 0;
  let beamBottom = 0;
  let columnHalf = 0;
  const particles = [];
  const pointer = { active: false, x: 0, y: 0 };

  function resizeP() {
    const rect = pcanvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    pw = pcanvas.width = Math.floor(rect.width * dpr);
    ph = pcanvas.height = Math.floor(rect.height * dpr);
    pcanvas.style.width = rect.width + 'px';
    pcanvas.style.height = rect.height + 'px';
    beamX = pw * 0.5;
    beamTop = ph * 0.1;
    beamBottom = ph * 0.86;
    columnHalf = Math.max(14 * dpr, Math.min(52 * dpr, pw * 0.032));
  }

  const resetParticle = (p, randomY) => {
    const spread = columnHalf * (0.9 + Math.random() * 0.45);
    p.lane = gauss() * spread;
    p.x = beamX + p.lane;
    p.y = randomY
      ? beamTop + Math.random() * Math.max(beamBottom - beamTop, 1)
      : beamTop - Math.random() * 52 * dpr;
    p.vx = 0;
    p.vy = (0.13 + Math.random() * 0.38) * dpr;
    p.speed = (0.2 + Math.random() * 0.65) * dpr;
    p.phase = Math.random() * Math.PI * 2;
    p.alpha = 0.28 + Math.random() * 0.48;
    p.size = (0.68 + Math.random() * 0.9) * dpr;
  };

  const initParticles = () => {
    particles.length = 0;
    const count = reducedMotion ? 360 : 1200;
    for (let i = 0; i < count; i += 1) {
      const p = {};
      resetParticle(p, true);
      particles.push(p);
    }
  };

  resizeP();
  initParticles();
  addEventListener('resize', () => {
    resizeP();
    initParticles();
  });

  pcanvas.addEventListener('pointermove', (e) => {
    const rect = pcanvas.getBoundingClientRect();
    pointer.active = true;
    pointer.x = (e.clientX - rect.left) * dpr;
    pointer.y = (e.clientY - rect.top) * dpr;
  });
  pcanvas.addEventListener('pointerleave', () => {
    pointer.active = false;
    pointer.x = beamX;
    pointer.y = (beamTop + beamBottom) * 0.5;
  });

  if (reducedMotion) {
    pctx.clearRect(0, 0, pw, ph);
    pctx.fillStyle = 'rgba(255,242,0,0.55)';
    particles.forEach((p) => pctx.fillRect(p.x, p.y, p.size, p.size));
    return;
  }

  (function draw() {
    pctx.clearRect(0, 0, pw, ph);
    pctx.globalCompositeOperation = 'lighter';

    const influenceRadius = 72 * dpr;
    particles.forEach((p) => {
      p.vy += 0.0038 * dpr;
      p.y += p.speed + p.vy;

      const laneX = beamX + p.lane;
      p.vx += (laneX - p.x) * 0.0035;

      if (pointer.active) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < influenceRadius) {
          const pull = Math.pow(1 - dist / influenceRadius, 2.4);
          const nx = dx / dist;
          const ny = dy / dist;
          p.vx += nx * pull * 1.05 + -ny * pull * 0.45;
          p.vy += ny * pull * 0.66 + nx * pull * 0.24;
        }
      }

      p.x += p.vx;
      p.vx *= 0.93;
      p.vy *= 0.94;

      if (p.y > beamBottom + 12 * dpr || p.x < -30 * dpr || p.x > pw + 30 * dpr) {
        resetParticle(p, false);
      }

      const envelopeHalf = columnHalf * 1.22;
      const edge = Math.abs((p.x - beamX) / Math.max(envelopeHalf, 1));
      const tDepth = clamp((p.y - beamTop) / Math.max(beamBottom - beamTop, 1), 0, 1);
      const depth = 0.56 + tDepth * 0.44;
      const alpha = p.alpha * Math.max(0, 1 - edge * 0.88) * depth;
      if (alpha > 0.012) {
        pctx.fillStyle = `rgba(255,242,0,${alpha.toFixed(3)})`;
        pctx.fillRect(p.x, p.y, p.size, p.size);
      }
    });

    requestAnimationFrame(draw);
  })();
})();

/* ---- Engine stages reveal ---- */
gsap.utils.toArray('.stage').forEach((stage) => {
  gsap.from(stage, {
    scrollTrigger: { trigger: stage, start: 'top 85%' },
    y: 60, opacity: 0, duration: 1, ease: 'power3.out',
  });
  const dot = stage.querySelector('.stage-dot');
  if (dot) {
    gsap.from(dot, {
      scrollTrigger: { trigger: stage, start: 'top 85%' },
      scale: 0, duration: 0.8, ease: 'back.out(2)', delay: 0.2,
    });
  }
});

/* ---- CTA period pulse ---- */
gsap.to('#cta-period', { scale: 1.4, repeat: -1, yoyo: true, duration: 1.4, ease: 'sine.inOut' });
