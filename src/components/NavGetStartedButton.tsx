import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

type NavGetStartedButtonProps = {
  onClick: () => void;
};

/**
 * Lusion-style nav CTA: animated gradient chrome, magnetic hover, specular sweep.
 * Scales back for reduced motion / coarse pointer.
 */
export default function NavGetStartedButton({ onClick }: NavGetStartedButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)');
    const sync = () => setLite(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useSpring(mx, { stiffness: 320, damping: 28, mass: 0.45 });
  const ty = useSpring(my, { stiffness: 320, damping: 28, mass: 0.45 });

  const onMove = (e: React.MouseEvent) => {
    if (lite || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 22);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 16);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      className="inline-block"
      style={{ x: tx, y: ty }}
      initial={false}
    >
      <div className={`nav-cta-lusion-shell ${lite ? 'nav-cta-lusion-shell--static' : ''}`}>
        <motion.button
          ref={btnRef}
          type="button"
          onClick={onClick}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="nav-cta-lusion-inner relative block overflow-hidden px-5 py-2.5 text-[0.95rem] font-semibold tracking-[-0.02em] text-white sm:px-7 sm:py-3 sm:text-[1.0625rem]"
          whileHover={lite ? undefined : { scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 24 }}
        >
          <span className="relative z-[1]">Get Started</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
