import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
};

export default function TiltCard({
  children,
  className = '',
  glowColor = 'rgba(56, 189, 248, 0.15)',
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseXRel = e.clientX - rect.left;
    const mouseYRel = e.clientY - rect.top;
    x.set(mouseXRel / rect.width - 0.5);
    y.set(mouseYRel / rect.height - 0.5);
    mouseX.set(mouseXRel);
    mouseY.set(mouseYRel);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 40%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className={`relative glass-card transition-shadow duration-300 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[1.5rem] opacity-0 transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background,
        }}
      />
      <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }} className="h-full relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
