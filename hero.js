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
      end: '+=700',
      pin: '.problem-content',
      pinSpacing: true,
    });
    // Hold the headline crisp for a long range, then fade late
    gsap.timeline({
      scrollTrigger: {
        trigger: pinEl, start: 'top 20%', end: '+=700', scrub: true,
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

  // Particle morph
  const pcanvas = document.getElementById('particles');
  if (!pcanvas) return;
  const pctx = pcanvas.getContext('2d');
  let pw, ph; const particles = [];
  function resizeP() {
    const rect = pcanvas.getBoundingClientRect();
    pw = pcanvas.width = rect.width * devicePixelRatio;
    ph = pcanvas.height = rect.height * devicePixelRatio;
    pcanvas.style.width = rect.width + 'px';
    pcanvas.style.height = rect.height + 'px';
  }
  resizeP(); addEventListener('resize', resizeP);
  for (let i = 0; i < 110; i++) {
    particles.push({
      x: Math.random() * pw, y: Math.random() * ph,
      vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 0.6,
    });
  }
  let morph = 0;
  ScrollTrigger.create({
    trigger: pcanvas, start: 'top bottom', end: 'bottom top',
    onUpdate: (self) => { morph = self.progress; },
  });
  (function draw() {
    pctx.clearRect(0, 0, pw, ph);
    const cx = pw * 0.48, cy = ph * 0.55, colH = ph * 0.5;
    particles.forEach((p, i) => {
      const tx = cx + Math.sin(i * 0.7) * 8;
      const ty = cy - colH / 2 + (i / particles.length) * colH;
      p.x += (tx - p.x) * morph * 0.08 + p.vx * (1 - morph);
      p.y += (ty - p.y) * morph * 0.08 + p.vy * (1 - morph);
      if (!morph) {
        if (p.x < 0 || p.x > pw) p.vx *= -1;
        if (p.y < 0 || p.y > ph) p.vy *= -1;
      }
      pctx.fillStyle = morph > 0.4 ? '#FFF200' : 'rgba(250,250,247,.3)';
      pctx.beginPath(); pctx.arc(p.x, p.y, p.r * devicePixelRatio, 0, Math.PI * 2); pctx.fill();
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
