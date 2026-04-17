/* ============ Homepage hero — fullscreen frosted focus ============ */
(function heroFocus() {
  const heroCard = document.querySelector('#top .hero-copy-glass');
  if (!heroCard) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  // #region agent log
  const nav = document.getElementById('siteNav');
  const scrollHint = document.querySelector('#top .scroll-hint');
  const heroRect = heroCard.getBoundingClientRect();
  const navRect = nav ? nav.getBoundingClientRect() : null;
  const hintRect = scrollHint ? scrollHint.getBoundingClientRect() : null;
  window.__agentLog && window.__agentLog({hypothesisId:'H3',location:'hero.js:14',message:'hero card and fold spacing snapshot',data:{heroLeft:Math.round(heroRect.left),heroRight:Math.round(heroRect.right),heroCenter:Math.round(heroRect.left+heroRect.width/2),viewportCenter:Math.round(window.innerWidth/2),navBottom:navRect?Math.round(navRect.bottom):null,heroTop:Math.round(heroRect.top),heroFromNav:navRect?Math.round(heroRect.top-navRect.bottom):null,heroToScrollHint:hintRect?Math.round(hintRect.top-heroRect.bottom):null}});
  // #endregion

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
  // #region agent log
  const problemRect = problemHead ? problemHead.getBoundingClientRect() : null;
  const promiseHead = document.getElementById('promise-head');
  const promiseRect = promiseHead ? promiseHead.getBoundingClientRect() : null;
  window.__agentLog && window.__agentLog({hypothesisId:'H4',location:'hero.js:85',message:'problem promise layout and dna target snapshot',data:{problemRight:problemRect?Math.round(problemRect.right):null,promiseTop:promiseRect?Math.round(promiseRect.top):null,dnaColumnTargetX:Math.round(pw*0.48),canvasWidth:pw,canvasCssWidth:pcanvas.getBoundingClientRect().width}});
  // #endregion
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

/* ---- Stage diagram diagnostics ---- */
(function stageDiagramDiagnostics() {
  const guest = document.querySelector('.stage-diagram--guest .diag-network');
  if (guest) {
    const n1 = guest.querySelector('.n1');
    const n2 = guest.querySelector('.n2');
    const l1 = guest.querySelector('.l1');
    if (n1 && n2 && l1) {
      const gr = guest.getBoundingClientRect();
      const n1r = n1.getBoundingClientRect();
      const n2r = n2.getBoundingClientRect();
      const l1r = l1.getBoundingClientRect();
      // #region agent log
      window.__agentLog && window.__agentLog({hypothesisId:'H5',location:'hero.js:122',message:'guest graph join geometry snapshot',data:{guestW:Math.round(gr.width),n1Center:[Math.round(n1r.left+n1r.width/2-gr.left),Math.round(n1r.top+n1r.height/2-gr.top)],n2Center:[Math.round(n2r.left+n2r.width/2-gr.left),Math.round(n2r.top+n2r.height/2-gr.top)],link1Rect:[Math.round(l1r.left-gr.left),Math.round(l1r.top-gr.top),Math.round(l1r.width),Math.round(l1r.height)]}});
      // #endregion
    }
  }

  document.querySelectorAll('.stage-diagram').forEach((diagram) => {
    diagram.addEventListener('mouseenter', () => {
      // #region agent log
      window.__agentLog && window.__agentLog({hypothesisId:'H5',location:'hero.js:130',message:'stage diagram hover observed',data:{diagramClasses:diagram.className}});
      // #endregion
    });
  });
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
