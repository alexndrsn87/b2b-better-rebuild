import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { Check, LayoutTemplate } from 'lucide-react';

function TiltCard({
  children,
  className = '',
  glowColor = 'rgba(59, 130, 246, 0.2)',
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
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
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`relative glass-card transition-shadow duration-300 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[1.5rem] opacity-0 transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background,
        }}
      />
      <div style={{ transform: 'translateZ(30px)' }} className="h-full relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

type PrototypeOfferProps = {
  onRequestPrototype?: () => void;
};

export default function PrototypeOffer({ onRequestPrototype }: PrototypeOfferProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 'some' }}
      className="max-w-4xl mx-auto"
    >
      <TiltCard className="p-8 md:p-10 border-blue-500/30 overflow-hidden" glowColor="rgba(59, 130, 246, 0.2)">
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1.5 text-sm font-semibold rounded-bl-lg rounded-tr-[1.5rem]">
          Try Before You Buy
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-4 md:mt-0">
          <div className="flex-1 text-left">
            <h2 className="text-2xl font-heading font-bold mb-2 text-white flex items-center gap-3 flex-wrap">
              <LayoutTemplate className="w-6 h-6 text-blue-400 shrink-0" />
              The £49 Prototype
            </h2>
            <p className="text-3xl font-bold text-white mb-4">
              £49 <span className="text-base text-gray-400 font-normal">/ 24-hour turnaround</span>
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              We build a custom interactive homepage blueprint in 24 hours. Link expires in 7 days.
            </p>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                Custom Design (No Templates)
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                Interactive Preview
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                £49 deducted from setup fee if you proceed
              </li>
            </ul>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onRequestPrototype?.()}
              className="btn-primary btn-shimmer w-full md:w-auto text-lg py-3 px-8"
            >
              Get the £49 prototype
            </button>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
