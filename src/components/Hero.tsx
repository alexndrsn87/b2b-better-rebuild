import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import LusionScene from './LusionScene';

const sellingPoints = [
  'No Technical Skills Required',
  'Fixed Monthly Costs',
  'Google-Friendly Structure',
  'Unlimited WhatsApp Updates',
  'Fast Mobile Experience',
  'Hosting + Security Included',
  'Built to Convert Visitors',
  'Local SEO Foundations',
];

type HeroProps = {
  onRequestPrototype?: () => void;
};

export default function Hero({ onRequestPrototype }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 80, damping: 24, mass: 0.9 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 24, mass: 0.9 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['2.8deg', '-2.8deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-2.8deg', '2.8deg']);

  return (
    <section className="relative min-h-[88vh] flex flex-col justify-center overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28 bg-[var(--color-navy)]">
      <LusionScene />

      <div
        className="relative z-10 mx-auto mt-4 w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          ref={ref}
          onMouseMove={(e) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            x.set((e.clientX - rect.left) / rect.width - 0.5);
            y.set((e.clientY - rect.top) / rect.height - 0.5);
          }}
          onMouseLeave={() => {
            x.set(0);
            y.set(0);
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-5xl rounded-[2.5rem] glass-card p-12 sm:p-16 md:p-20"
          style={{
            rotateX,
            rotateY,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            willChange: 'transform, opacity',
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 glass-panel-light px-4 py-2 text-sm font-medium text-cyan-300/95"
          >
            For local businesses across the UK
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="mx-auto max-w-md font-sans text-base font-medium leading-snug text-gray-200 md:text-lg"
          >
            Right now, someone is Googling you — what do they find?
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-8 font-heading text-[2.35rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.5rem]"
          >
            <span className="block">You&apos;re brilliant at what you do.</span>
            <span className="mt-2 block">Your website should say so.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="mx-auto mt-10 max-w-xl font-sans text-lg font-medium leading-relaxed text-gray-300 md:text-xl"
          >
            We build it. We host it. We update it. You just answer your phone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
            className="mx-auto mt-12 w-full max-w-md"
          >
            <motion.button
              type="button"
              onClick={() => onRequestPrototype?.()}
              className="btn-hero-cta"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              See your site in 24 hours — £49
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.44 }}
            className="mt-8"
          >
            <Link
              to="/work"
              className="font-sans text-sm font-medium text-gray-400 transition-colors hover:text-white"
            >
              View our work →
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 mt-20 flex overflow-hidden border-y border-white/5 bg-white/5 py-5">
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[var(--color-navy)] via-transparent to-[var(--color-navy)]" />
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-sm font-heading font-medium uppercase tracking-widest text-blue-200/60">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              {sellingPoints.map((point) => (
                <React.Fragment key={`${i}-${point}`}>
                  <span>{point}</span>
                  <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500/50" aria-hidden />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
