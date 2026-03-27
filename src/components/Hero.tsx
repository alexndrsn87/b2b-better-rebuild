import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import LusionScene from './LusionScene';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
};

const word = {
  hidden: { opacity: 0, y: 36, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 95, damping: 18 },
  },
};

type HeroProps = {
  onRequestPrototype?: () => void;
};

export default function Hero({ onRequestPrototype }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRel = e.clientX - rect.left;
    const mouseYRel = e.clientY - rect.top;
    x.set(mouseXRel / width - 0.5);
    y.set(mouseYRel / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      className="relative pt-14 pb-14 lg:pt-16 lg:pb-16 overflow-hidden min-h-[82vh] flex flex-col justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <LusionScene />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-4" style={{ perspective: 1200 }}>
        <motion.div
          ref={ref}
          style={{ rotateX, rotateY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-5xl mx-auto glass-card p-10 sm:p-14 rounded-[2.5rem]"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-light text-blue-300 text-sm font-medium mb-8 border border-white/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            Website Management, Simplified
          </motion.div>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="font-heading font-bold mb-6 leading-[1.12] text-4xl sm:text-6xl md:text-7xl lg:text-8xl flex flex-wrap justify-center gap-x-[0.12em] gap-y-2 max-w-[min(100%,52rem)] mx-auto tracking-tight text-white"
          >
            {['The', 'last'].map((w) => (
              <motion.span key={w} variants={word} className="inline-block">
                {w}
              </motion.span>
            ))}
            <motion.span
              variants={word}
              className="inline-block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-[length:220%_auto] bg-clip-text text-transparent hero-gradient-sweep"
            >
              website
            </motion.span>
            {['your', 'business', 'will'].map((w) => (
              <motion.span key={w} variants={word} className="inline-block">
                {w}
              </motion.span>
            ))}
            <motion.span
              variants={word}
              className="inline-block bg-gradient-to-r from-cyan-300 via-blue-400 to-sky-300 bg-[length:220%_auto] bg-clip-text text-transparent hero-gradient-sweep-delayed"
            >
              ever need.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.55 }}
            className="mt-6 text-xl text-gray-300 font-sans mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            No logins. No dashboards. No stress. We build your site, host it, and manage it forever. If you need a change, just send us a message.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              type="button"
              onClick={() => onRequestPrototype?.()}
              className="btn-primary text-lg group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get the £49 prototype
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.a
              href="#how-it-works"
              className="glass-panel text-lg font-medium text-white px-8 py-3.5 rounded-full border border-white/15 inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See how it works
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-blue-400/30"
          >
            <div className="glass-panel-dark mb-4 flex h-12 w-12 items-center justify-center rounded-full text-blue-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2 text-white">Lightning Fast</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Built with modern technology for speed and performance. No bloated code or slow loading times.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-cyan-400/30"
          >
            <div className="glass-panel-dark mb-4 flex h-12 w-12 items-center justify-center rounded-full text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2 text-white">Fully Managed</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We host, update, and secure your website forever. You never have to worry about maintenance.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-emerald-400/30"
          >
            <div className="glass-panel-dark mb-4 flex h-12 w-12 items-center justify-center rounded-full text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2 text-white">Zero Stress</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Need to update a photo or change some text? Just send us an email or WhatsApp message.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 inline-flex flex-col items-center gap-2 text-blue-200/70"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-[11px] tracking-[0.22em] uppercase font-heading">Scroll to explore</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-blue-300/90 via-blue-300/40 to-transparent overflow-hidden">
            <motion.div
              className="h-3 w-[1px] bg-cyan-300"
              animate={{ y: [-2, 26, -2], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>

      <div className="mt-14 border-y border-white/5 bg-white/5 py-4 overflow-hidden flex whitespace-nowrap relative z-10">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[var(--color-navy)] via-transparent to-[var(--color-navy)] z-10 pointer-events-none"></div>
        <div className="animate-marquee flex gap-8 items-center text-sm font-heading font-medium text-blue-200/60 uppercase tracking-widest">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <span>Zero Maintenance</span>
              <span className="w-2 h-2 rounded-full bg-blue-500/50"></span>
              <span>Lightning Fast</span>
              <span className="w-2 h-2 rounded-full bg-blue-500/50"></span>
              <span>SEO Optimized</span>
              <span className="w-2 h-2 rounded-full bg-blue-500/50"></span>
              <span>Mobile Ready</span>
              <span className="w-2 h-2 rounded-full bg-blue-500/50"></span>
              <span>Fully Managed</span>
              <span className="w-2 h-2 rounded-full bg-blue-500/50"></span>
              <span>Cancel Anytime</span>
              <span className="w-2 h-2 rounded-full bg-blue-500/50"></span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
