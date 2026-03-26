import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import LusionScene from './LusionScene';

export default function Hero() {
  const headlineWords = "The last website your business will ever need.".split(" ");
  
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

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
      {/* 3D WebGL Background & Interactive Crystal */}
      <LusionScene />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-4" style={{ perspective: 1200 }}>
        <motion.div
          ref={ref}
          style={{ rotateX, rotateY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto glass-card p-10 sm:p-14 rounded-[2.5rem] border border-white/10 shadow-2xl shadow-blue-900/20"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Website Management, Simplified
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight tracking-tight text-white">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, type: "spring", bounce: 0.4 }}
                className="inline-block mr-3 last:mr-0"
              >
                {word === "ever" || word === "need." ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{word}</span>
                ) : (
                  word
                )}{' '}
              </motion.span>
            ))}
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-6 text-xl text-gray-300 font-sans mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            No logins. No dashboards. No stress. We build your site, host it, and manage it forever. If you need a change, just send us a message.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.a 
              href="#pricing"
              className="btn-primary text-lg group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get the £49 prototype
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a 
              href="#how-it-works"
              className="btn-secondary text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See how it works
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Feature badges */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.div whileHover={{ y: -5, scale: 1.02 }} className="glass-card p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-blue-500/20 hover:border-blue-500/30">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2 text-white">Lightning Fast</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Built with modern technology for speed and performance. No bloated code or slow loading times.</p>
          </motion.div>
          
          <motion.div whileHover={{ y: -5, scale: 1.02 }} className="glass-card p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-cyan-500/20 hover:border-cyan-500/30">
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2 text-white">Fully Managed</h3>
            <p className="text-gray-400 text-sm leading-relaxed">We host, update, and secure your website forever. You never have to worry about maintenance.</p>
          </motion.div>
          
          <motion.div whileHover={{ y: -5, scale: 1.02 }} className="glass-card p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-emerald-500/20 hover:border-emerald-500/30">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2 text-white">Zero Stress</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Need to update a photo or change some text? Just send us an email or WhatsApp message.</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 inline-flex flex-col items-center gap-2 text-blue-200/70"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <span className="text-[11px] tracking-[0.22em] uppercase font-heading">Scroll to explore</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-blue-300/90 via-blue-300/40 to-transparent overflow-hidden">
            <motion.div
              className="h-3 w-[1px] bg-blue-200"
              animate={{ y: [-2, 26, -2], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Marquee Banner */}
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
