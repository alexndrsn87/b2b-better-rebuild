/* ============ Homepage hero — saturn-like orb + responsive glow ============ */
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

  // Distorted yellow sphere — smaller + pushed right
  const geo = new THREE.IcosahedronGeometry(1.0, 64);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseStrength: { value: 0 },
      uColor: { value: new THREE.Color('#FFF200') },
      uScroll: { value: 0 },
      uHeat: { value: 0 },
    },
    vertexShader: `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uMouseStrength;
      uniform float uScroll;
      uniform float uHeat;
      varying vec3 vNormal;
      varying float vDisplace;
      vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
      vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
      vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
      float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
        vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
        vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
        vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
        i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
        float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);
        vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
        vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
        vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
        vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
        vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
        vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
        return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}
      void main(){
        vNormal = normalize(normalMatrix * normal);
        vec3 pos = position;
        float n = snoise(pos * 0.9 + vec3(uTime * 0.25));
        float n2 = snoise(pos * 2.2 + vec3(uTime * 0.45));
        // Mouse pull — distorts toward cursor direction
        vec3 mouseDir = normalize(vec3(uMouse.x, uMouse.y, 0.2));
        float pull = max(dot(normalize(pos), mouseDir), 0.0);
        float displace = n * 0.16 + n2 * 0.04 + pull * uMouseStrength * 0.35 - uScroll * 0.03;
        displace += uHeat * 0.04;
        vDisplace = displace;
        pos += normal * displace;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uHeat;
      varying vec3 vNormal;
      varying float vDisplace;
      void main(){
        float rim = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.2);
        vec3 col = mix(uColor * 0.35, uColor, rim);
        col += rim * 0.3;
        col += vec3(vDisplace * 0.25);
        col = mix(col, vec3(1.0, 0.94, 0.5), uHeat * 0.18);
        vec3 cherenkov = vec3(0.2, 0.68, 1.0) * pow(rim, 2.8) * uHeat * 1.8;
        col += cherenkov;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const sphere = new THREE.Mesh(geo, mat);
  scene.add(sphere);

  // Saturn-style ring system
  const ringA = new THREE.Mesh(
    new THREE.TorusGeometry(1.58, 0.03, 16, 180),
    new THREE.MeshBasicMaterial({ color: '#FFF200', transparent: true, opacity: 0.24 })
  );
  const ringB = new THREE.Mesh(
    new THREE.TorusGeometry(1.85, 0.02, 16, 220),
    new THREE.MeshBasicMaterial({ color: '#5fc9ff', transparent: true, opacity: 0.2 })
  );
  const ringC = new THREE.Mesh(
    new THREE.TorusGeometry(2.05, 0.016, 12, 200),
    new THREE.MeshBasicMaterial({ color: '#FFF200', transparent: true, opacity: 0.14 })
  );
  ringA.rotation.set(Math.PI / 2.42, 0.2, 0.45);
  ringB.rotation.set(Math.PI / 2.25, -0.15, -0.32);
  ringC.rotation.set(Math.PI / 2.58, 0.32, 0.2);
  scene.add(ringA, ringB, ringC);

  resize(); addEventListener('resize', resize);

  // Mouse tracking — visible sphere translation so cursor control is obvious
  const mouse = new THREE.Vector2();
  const target = new THREE.Vector2();
  let mouseStrength = 0;
  let hasMoved = false;
  const hint = document.getElementById('cursorHint');
  addEventListener('pointermove', (e) => {
    const nx = (e.clientX / innerWidth) * 2 - 1;
    const ny = -((e.clientY / innerHeight) * 2 - 1);
    target.set(nx, ny);
    mouseStrength = 1;
    if (!hasMoved) {
      hasMoved = true;
      if (hint) hint.classList.add('is-hidden');
    }
  });

  // Auto-fade hint after 5s even if user doesn't move
  setTimeout(() => { if (hint) hint.classList.add('is-hidden'); }, 5500);

  let scrollNorm = 0;
  ScrollTrigger.create({
    trigger: '#top', start: 'top top', end: 'bottom top',
    onUpdate: (self) => { scrollNorm = self.progress; },
  });

  const baseX = 3.45, baseY = -0.16;
  const projected = new THREE.Vector3();
  let heat = 0;

  function render(t) {
    mat.uniforms.uTime.value = t * 0.001;
    mouse.lerp(target, 0.12);
    mat.uniforms.uMouse.value.copy(mouse);
    mouseStrength = Math.max(0, mouseStrength - 0.005);
    mat.uniforms.uMouseStrength.value = mouseStrength;
    mat.uniforms.uScroll.value = scrollNorm;

    // Keep orb near its anchored position with subtle cursor sway
    sphere.position.x = baseX + mouse.x * 0.3;
    sphere.position.y = baseY + mouse.y * 0.18;
    const s = 1 - scrollNorm * 0.14;
    sphere.scale.set(s, s, s);
    sphere.rotation.y += 0.0018 + mouse.x * 0.0012;
    sphere.rotation.x += 0.001 - mouse.y * 0.0008;

    projected.copy(sphere.position).project(camera);
    const proximity = Math.max(0, 1 - Math.hypot(mouse.x - projected.x, mouse.y - projected.y) * 1.8);
    const heatTarget = proximity * Math.max(0.4, mouseStrength);
    heat += (heatTarget - heat) * 0.08;
    mat.uniforms.uHeat.value = heat;

    ringA.position.copy(sphere.position);
    ringB.position.copy(sphere.position);
    ringC.position.copy(sphere.position);
    ringA.scale.setScalar(s * 0.98);
    ringB.scale.setScalar(s * 1.02);
    ringC.scale.setScalar(s * 1.05);
    ringA.rotation.z += 0.006;
    ringB.rotation.z -= 0.0045;
    ringC.rotation.z += 0.003;
    ringB.material.opacity = 0.16 + heat * 0.46;
    ringC.material.opacity = 0.1 + heat * 0.24;
    ringB.material.color.setRGB(0.35 + heat * 0.55, 0.72 + heat * 0.2, 1.0);

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
