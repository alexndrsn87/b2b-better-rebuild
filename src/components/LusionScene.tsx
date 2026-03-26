import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

const PARTICLE_COUNT = 120;
const COLORS = ['#38BDF8', '#A855F7', '#F472B6', '#34D399', '#FBBF24'];

function ParticleField() {
  const mesh = useRef<THREE.InstancedMesh>(null);
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
  const color = useMemo(() => new THREE.Color(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 1.8;
      const y = (Math.random() - 0.5) * viewport.height * 1.8;
      const z = (Math.random() - 0.5) * 6 - 3;
      const scale = Math.random() * 0.8 + 0.5;
      const speed = Math.random() * 0.05 + 0.02; // Much slower
      const colorIdx = Math.floor(Math.random() * COLORS.length);
      temp.push({ x, y, z, originX: x, originY: y, originZ: z, scale, speed, colorIdx, offset: Math.random() * Math.PI * 2 });
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
  }, [particles, color]);

  useFrame(() => {
    if (!mesh.current) return;
    
    // Very heavy damping for serene, slow reaction
    mouse.current.lerp(targetMouse.current, 0.02);
    
    const targetX = (mouse.current.x * viewport.width) / 2;
    const targetY = (mouse.current.y * viewport.height) / 2;
    const time = clock.getElapsedTime();

    particles.forEach((particle, i) => {
      // Extremely gentle floating
      const floatY = Math.sin(time * particle.speed + particle.offset) * 0.4;
      const floatX = Math.cos(time * particle.speed * 0.7 + particle.offset) * 0.3;
      
      let currentX = particle.originX + floatX;
      let currentY = particle.originY + floatY;
      let currentZ = particle.originZ;

      // Subtle, slow repulsion
      const dx = currentX - targetX;
      const dy = currentY - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const force = Math.max(0, 4 - dist);
      
      if (force > 0) {
        // Very slow, graceful push
        currentX += (dx / dist) * force * 0.1;
        currentY += (dy / dist) * force * 0.1;
        currentZ += force * 0.2;
      }

      dummy.position.set(currentX, currentY, currentZ);
      
      // "Focus" effect: scale up and become more opaque when mouse is near
      const focusFactor = Math.max(0, 1 - dist / 3.5);
      const focusScale = 1 + focusFactor * 0.25;
      dummy.scale.setScalar(particle.scale * focusScale);
      
      // We can't easily change individual instance opacity without a custom shader,
      // but we can simulate "focus" by scaling and subtle z-movement (already done).
      // For now, the scale and slow reaction provide the "serene focus" feel.
      
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[0.25, 32, 32]} />
      <meshStandardMaterial 
        transparent 
        opacity={0.85} 
        roughness={0.8}
        metalness={0.1}
      />
    </instancedMesh>
  );
}

export default function LusionScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#A855F7" />
        <ParticleField />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
