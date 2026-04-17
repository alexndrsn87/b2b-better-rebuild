/* ============ Homepage hero — minimal interstellar black hole ============ */
import * as THREE from 'three';

const canvas = document.getElementById('hero-canvas');
if (canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.z = 7.5;

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
  };

  // Core singularity
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.92, 80, 80),
    new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uHeat: { value: 0 },
      },
      vertexShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPos = position;
          vec3 p = position;
          p += normal * sin((position.y * 2.8) + uTime * 0.45) * 0.012;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uHeat;
        varying vec3 vNormal;
        varying vec3 vPos;
        void main() {
          float rim = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.4);
          vec3 base = vec3(0.008, 0.01, 0.015);
          vec3 warm = vec3(0.2, 0.16, 0.1) * rim * 0.6;
          vec3 cherenkov = vec3(0.22, 0.66, 1.0) * rim * uHeat * 1.2;
          gl_FragColor = vec4(base + warm + cherenkov, 1.0);
        }
      `,
    })
  );
  scene.add(core);

  // Minimal accretion rings
  const ringInner = new THREE.Mesh(
    new THREE.TorusGeometry(1.34, 0.06, 18, 200),
    new THREE.MeshBasicMaterial({ color: '#ffcc5f', transparent: true, opacity: 0.2 })
  );
  const ringOuter = new THREE.Mesh(
    new THREE.TorusGeometry(1.64, 0.04, 16, 200),
    new THREE.MeshBasicMaterial({ color: '#4fa8ff', transparent: true, opacity: 0.1 })
  );
  ringInner.rotation.set(Math.PI / 2.55, 0.1, 0.22);
  ringOuter.rotation.set(Math.PI / 2.35, -0.16, -0.28);
  scene.add(ringInner, ringOuter);

  // Subtle lensing halo
  const halo = new THREE.Mesh(
    new THREE.RingGeometry(1.92, 2.3, 180),
    new THREE.MeshBasicMaterial({ color: '#5faeff', transparent: true, opacity: 0.08, side: THREE.DoubleSide })
  );
  halo.rotation.x = Math.PI / 2.28;
  scene.add(halo);

  resize();
  addEventListener('resize', resize);

  const mouse = new THREE.Vector2();
  const target = new THREE.Vector2();
  let hasMoved = false;
  const hint = document.getElementById('cursorHint');
  addEventListener('pointermove', (e) => {
    const nx = (e.clientX / innerWidth) * 2 - 1;
    const ny = -((e.clientY / innerHeight) * 2 - 1);
    target.set(nx, ny);
    if (!hasMoved) {
      hasMoved = true;
      if (hint) hint.classList.add('is-hidden');
    }
  });

  setTimeout(() => { if (hint) hint.classList.add('is-hidden'); }, 5500);

  let scrollNorm = 0;
  ScrollTrigger.create({
    trigger: '#top',
    start: 'top top',
    end: 'bottom top',
    onUpdate: (self) => { scrollNorm = self.progress; },
  });

  const projected = new THREE.Vector3();
  const baseX = 3.35;
  const baseY = -0.12;
  let heat = 0;

  function render(t) {
    const time = t * 0.001;
    core.material.uniforms.uTime.value = time;

    mouse.lerp(target, 0.08);

    core.position.x = baseX + mouse.x * 0.17;
    core.position.y = baseY + mouse.y * 0.13;
    const s = 1 - scrollNorm * 0.12;
    core.scale.setScalar(s);

    ringInner.position.copy(core.position);
    ringOuter.position.copy(core.position);
    halo.position.copy(core.position);

    ringInner.scale.setScalar(s);
    ringOuter.scale.setScalar(s * 1.02);
    halo.scale.setScalar(s * 1.04);

    ringInner.rotation.z += 0.0034;
    ringOuter.rotation.z -= 0.0026;
    halo.rotation.z += 0.0009;

    projected.copy(core.position).project(camera);
    const proximity = Math.max(0, 1 - Math.hypot(mouse.x - projected.x, mouse.y - projected.y) * 1.75);
    heat += (proximity - heat) * 0.08;
    core.material.uniforms.uHeat.value = heat;
    ringOuter.material.opacity = 0.08 + heat * 0.16;
    halo.material.opacity = 0.06 + heat * 0.1;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

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
    const cx = pw * 0.72, cy = ph * 0.55, colH = ph * 0.5;
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
