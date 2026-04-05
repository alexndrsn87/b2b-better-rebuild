import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 48;
const COLORS = ['#38BDF8', '#A855F7', '#F472B6', '#34D399', '#FBBF24'];

const vertexShader = `
  varying vec3 vColor;
  varying float vFocus;
  varying vec3 vNormal;
  uniform vec2 uMouse;
  uniform float uViewportWidth;
  uniform float uViewportHeight;

  void main() {
    vColor = instanceColor;
    vNormal = normalize(normalMatrix * normal);
    
    // Calculate world position of instance
    vec4 worldPosition = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    
    // Calculate distance to mouse in world coordinates
    vec2 mousePos = uMouse * vec2(uViewportWidth, uViewportHeight) * 0.5;
    float dist = distance(worldPosition.xy, mousePos);
    
    // Focus factor: 1.0 when close, 0.0 when far
    float focus = smoothstep(8.0, 0.0, dist);
    vFocus = focus;

    // Stronger scale on focus for a more reactive feel
    float scale = 1.0 + focus * 0.75;
    
    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position * scale, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vFocus;
  varying vec3 vNormal;

  void main() {
    // Base opacity
    float alpha = 0.22 + vFocus * 0.65;
    
    // Soften edges to simulate "out of focus" (Fresnel effect)
    // vNormal.z is 1.0 at the center facing the camera, and 0.0 at the edges
    float edgeSoftness = smoothstep(0.0, 0.8, vNormal.z);
    
    // Make it even blurrier when not in focus
    float blur = mix(pow(edgeSoftness, 3.0), edgeSoftness, vFocus);
    alpha *= blur;
    
    // Simulate "out of focus" by softening the color based on focus
    vec3 finalColor = mix(vColor * 0.72, vColor, vFocus);
    // Add a subtle bloom-like lift at high focus
    finalColor += vColor * pow(vFocus, 2.0) * 0.2;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function ParticleField() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, clock } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));
  const targetMouse = useRef(new THREE.Vector2(0, 0));
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = new THREE.Color();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 2.2;
      const y = (Math.random() - 0.5) * viewport.height * 2.2;
      const z = (Math.random() - 0.5) * 4 - 2;
      const scale = Math.random() * 0.7 + 0.45;
      const speed = (Math.random() * 0.05 + 0.02) * 0.5; // ~50% slower, more fluid drift
      const colorIdx = Math.floor(Math.random() * COLORS.length);
      temp.push({
        x,
        y,
        z,
        originX: x,
        originY: y,
        originZ: z,
        currentX: x,
        currentY: y,
        currentZ: z,
        velocityX: 0,
        velocityY: 0,
        velocityZ: 0,
        scale,
        speed,
        colorIdx,
        offset: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, [viewport.width, viewport.height]);

  useEffect(() => {
    if (!mesh.current) return;
    particles.forEach((p, i) => {
      color.set(COLORS[p.colorIdx]);
      mesh.current!.setColorAt(i, color);
    });
    mesh.current.instanceColor!.needsUpdate = true;
  }, [particles]);

  const uniforms = useMemo(() => ({
    uMouse: { value: new THREE.Vector2(0, 0) },
    uViewportWidth: { value: viewport.width },
    uViewportHeight: { value: viewport.height }
  }), [viewport.width, viewport.height]);

  useFrame(() => {
    if (!mesh.current || !materialRef.current) return;
    
    mouse.current.lerp(targetMouse.current, 0.12);
    materialRef.current.uniforms.uMouse.value = mouse.current;
    
    const targetX = (mouse.current.x * viewport.width) / 2;
    const targetY = (mouse.current.y * viewport.height) / 2;
    const time = clock.getElapsedTime();

    particles.forEach((particle, i) => {
      const floatY = Math.sin(time * particle.speed + particle.offset) * 0.45;
      const floatX = Math.cos(time * particle.speed * 0.8 + particle.offset) * 0.35;
      
      const homeX = particle.originX + floatX;
      const homeY = particle.originY + floatY;
      const homeZ = particle.originZ;

      const dx = targetX - particle.currentX;
      const dy = targetY - particle.currentY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const influenceRadius = 6.5;
      const falloff = Math.max(0, 1 - dist / influenceRadius);
      const cursorForce = falloff * falloff;

      // Elastic spring to home + magnetic pull toward cursor
      particle.velocityX += (homeX - particle.currentX) * 0.022 + dx * cursorForce * 0.03;
      particle.velocityY += (homeY - particle.currentY) * 0.022 + dy * cursorForce * 0.03;
      particle.velocityZ += (homeZ - particle.currentZ) * 0.02 + cursorForce * 0.04;

      particle.velocityX *= 0.9;
      particle.velocityY *= 0.9;
      particle.velocityZ *= 0.88;

      particle.currentX += particle.velocityX;
      particle.currentY += particle.velocityY;
      particle.currentZ += particle.velocityZ;

      if (!Number.isFinite(particle.currentX) || !Number.isFinite(particle.currentY) || !Number.isFinite(particle.currentZ)) {
        particle.currentX = homeX;
        particle.currentY = homeY;
        particle.currentZ = homeZ;
        particle.velocityX = 0;
        particle.velocityY = 0;
        particle.velocityZ = 0;
      }

      dummy.position.set(particle.currentX, particle.currentY, particle.currentZ);
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[0.36, 14, 14]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </instancedMesh>
  );
}

export default function LusionScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.35]} gl={{ antialias: false, powerPreference: 'high-performance' }}>
        <ambientLight intensity={0.85} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#A855F7" />
        <ParticleField />
      </Canvas>
    </div>
  );
}
