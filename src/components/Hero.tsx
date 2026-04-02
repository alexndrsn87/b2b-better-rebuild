import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, ShieldCheck, Wallet } from 'lucide-react';
import LusionScene from './LusionScene';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 80, damping: 24, mass: 0.9 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 24, mass: 0.9 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['2.8deg', '-2.8deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-2.8deg', '2.8deg']);

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

  return (
    <section className="relative pt-14 pb-14 lg:pt-16 lg:pb-16 overflow-hidden min-h-[82vh] flex flex-col justify-center">
      <LusionScene />

      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-4"
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
          className="max-w-5xl mx-auto glass-card p-10 sm:p-14 rounded-[2.5rem]"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-light text-cyan-300/95 text-sm font-medium mb-8 border border-white/10"
          >
            Done-for-you websites for local teams
          </motion.p>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white max-w-[min(100%,48rem)] mx-auto leading-[1.12] tracking-tight">
            Websites that win more work for{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
              local businesses
            </span>
            .
          </h1>
          <p className="mt-5 text-xl md:text-2xl text-gray-200 font-sans font-semibold tracking-tight max-w-xl mx-auto leading-snug">
            Look like the pro you are online—without living in a dashboard.
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-6 text-lg text-gray-400 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Save time on tech. We handle the build, hosting, and updates—so you can stay focused on customers, jobs,
            and the work that pays the bills.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-10 flex justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/pricing" className="btn-primary btn-shimmer text-lg group inline-flex items-center justify-center">
                See Your Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left"
          >
            <div className="glass-panel px-5 py-4 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-heading font-semibold text-white text-sm">No technical skills required</p>
                <p className="text-gray-400 text-sm mt-1 leading-snug">You never need to log into hosting or touch code.</p>
              </div>
            </div>
            <div className="glass-panel px-5 py-4 rounded-2xl flex items-start gap-3">
              <Wallet className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-heading font-semibold text-white text-sm">Fixed monthly costs</p>
                <p className="text-gray-400 text-sm mt-1 leading-snug">One clear plan—predictable spend, no surprise bills.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-14 border-y border-white/5 bg-white/5 py-4 overflow-hidden flex whitespace-nowrap relative z-10">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[var(--color-navy)] via-transparent to-[var(--color-navy)] z-10 pointer-events-none"></div>
        <div className="animate-marquee flex gap-8 items-center text-sm font-heading font-medium text-blue-200/60 uppercase tracking-widest">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              {sellingPoints.map((point) => (
                <React.Fragment key={`${i}-${point}`}>
                  <span>{point}</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500/50"></span>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
