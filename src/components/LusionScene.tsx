import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

const PARTICLE_COUNT = 60;
const COLORS = ['#38BDF8', '#A855F7', '#F472B6', '#34D399', '#FBBF24'];

const vertexShader = `
  varying vec3 vColor;
  varying float vFocus;
  uniform vec2 uMouse;
  uniform float uViewportWidth;
  uniform float uViewportHeight;

  void main() {
    vColor = instanceColor;
    
    // Calculate world position of instance
    vec4 worldPosition = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    
    // Calculate distance to mouse in world coordinates
    // uMouse is -1 to 1, so we scale it to viewport
    vec2 mousePos = uMouse * vec2(uViewportWidth, uViewportHeight) * 0.5;
    float dist = distance(worldPosition.xy, mousePos);
    
    // Focus factor: 1.0 when close, 0.0 when far
    float focus = smoothstep(5.0, 0.0, dist);
    vFocus = focus;

    // Scale up slightly on focus
    float scale = 1.0 + focus * 0.4;
    
    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position * scale, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vFocus;

  void main() {
    // Very transparent by default (0.05), becomes more solid on focus (0.6)
    float alpha = 0.05 + vFocus * 0.55;
    
    // Simulate "out of focus" by softening the color based on focus
    vec3 finalColor = mix(vColor * 0.8, vColor, vFocus);
    
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
      const scale = Math.random() * 0.6 + 0.4;
      const speed = Math.random() * 0.02 + 0.01; // Extremely slow
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
  }, [particles]);

  const uniforms = useMemo(() => ({
    uMouse: { value: new THREE.Vector2(0, 0) },
    uViewportWidth: { value: viewport.width },
    uViewportHeight: { value: viewport.height }
  }), [viewport.width, viewport.height]);

  useFrame(() => {
    if (!mesh.current || !materialRef.current) return;
    
    mouse.current.lerp(targetMouse.current, 0.015); // Even slower reaction
    materialRef.current.uniforms.uMouse.value = mouse.current;
    
    const targetX = (mouse.current.x * viewport.width) / 2;
    const targetY = (mouse.current.y * viewport.height) / 2;
    const time = clock.getElapsedTime();

    particles.forEach((particle, i) => {
      const floatY = Math.sin(time * particle.speed + particle.offset) * 0.3;
      const floatX = Math.cos(time * particle.speed * 0.6 + particle.offset) * 0.2;
      
      let currentX = particle.originX + floatX;
      let currentY = particle.originY + floatY;
      let currentZ = particle.originZ;

      const dx = currentX - targetX;
      const dy = currentY - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const force = Math.max(0, 4.5 - dist);
      
      if (force > 0) {
        currentX += (dx / dist) * force * 0.08;
        currentY += (dy / dist) * force * 0.08;
        currentZ += force * 0.15;
      }

      dummy.position.set(currentX, currentY, currentZ);
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[0.3, 32, 32]} />
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
