import React, { useEffect, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';

/** Soft radial highlight that follows the cursor — Lusion-style depth without extra WebGL */
export default function MouseGlow() {
  const [enabled, setEnabled] = useState(true);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 64, damping: 22, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 64, damping: 22, mass: 0.35 });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(pointer: coarse)');
    const update = () => {
      setEnabled(!mq.matches && !coarse.matches);
    };
    update();
    mq.addEventListener('change', update);
    coarse.addEventListener('change', update);
    return () => {
      mq.removeEventListener('change', update);
      coarse.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onLeave = () => {
      x.set(-9999);
      y.set(-9999);
    };
    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, x, y]);

  const background = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(56, 189, 248, 0.09) 0%, rgba(37, 99, 235, 0.04) 35%, transparent 65%)`;

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] mix-blend-screen"
      style={{ background }}
    />
  );
}
