import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { Check, Shield, Zap, Heart, Sparkles, LayoutTemplate, Star, Hexagon, Circle } from 'lucide-react';
import { TextReveal } from './TextReveal';

function TiltCard({ children, className = "", glowColor = "rgba(56, 189, 248, 0.15)" }: { children: React.ReactNode, className?: string, glowColor?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRel = e.clientX - rect.left;
    const mouseYRel = e.clientY - rect.top;
    
    x.set(mouseXRel / width - 0.5);
    y.set(mouseYRel / height - 0.5);
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
          background
        }}
      />
      <div style={{ transform: "translateZ(30px)" }} className="h-full relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative z-10 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-48 h-48 rounded-full bg-pink-500/10 blur-xl"
        />
        <motion.div
          animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[15%] right-[5%] w-64 h-64 rounded-full bg-cyan-500/10 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[40%] right-[10%] w-32 h-32 rounded-full bg-purple-500/10 blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
            <TextReveal text="Simple, transparent pricing" />
          </h2>
          <motion.p 
            className="text-lg text-gray-400 max-w-2xl mx-auto font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ delay: 0.3 }}
          >
            Choose the package that fits your business. No hidden fees. No long-term contracts. Just a website that works as hard as you do.
          </motion.p>
        </div>

        {/* Sandbox Offer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: "some" }}
          className="max-w-4xl mx-auto mb-16"
        >
          <TiltCard className="p-8 md:p-10 border-blue-500/30 overflow-hidden" glowColor="rgba(59, 130, 246, 0.2)">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1.5 text-sm font-semibold rounded-bl-lg rounded-tr-[1.5rem]">
              Try Before You Buy
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-4 md:mt-0">
              <div className="flex-1">
                <h3 className="text-2xl font-heading font-bold mb-2 text-white flex items-center gap-3">
                  <LayoutTemplate className="w-6 h-6 text-blue-400"/> The £49 Prototype
                </h3>
                <p className="text-3xl font-bold text-white mb-4">£49 <span className="text-base text-gray-400 font-normal">/ 24-hour turnaround</span></p>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  We build a custom interactive homepage blueprint in 24 hours. Link expires in 7 days.
                </p>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /> Custom Design (No Templates)</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /> Interactive Preview</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /> £49 deducted from setup fee if you proceed</li>
                </ul>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <button className="btn-primary w-full md:w-auto text-lg py-3 px-8">
                  Get Your Prototype
                </button>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Main Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Starter Quest */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ delay: 0.1 }}
          >
            <TiltCard className="p-8 md:p-10 flex flex-col h-full" glowColor="rgba(59, 130, 246, 0.15)">
              <div className="mb-8">
                <h3 className="text-2xl font-heading font-bold mb-2 text-white">Essential Package</h3>
                <p className="text-gray-400 mb-6">Everything a small business needs.</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-white">£499</span>
                  <span className="text-gray-400">Setup</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-blue-400">+ £30</span>
                  <span className="text-gray-400">/mo</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1 text-gray-300">
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Fully Managed Hosting & Security</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Lightning Fast Performance</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Unlimited Content Updates via WhatsApp</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Mobile Optimized Design</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Basic SEO Setup</span>
                </li>
              </ul>
              
              <button className="btn-secondary w-full text-lg py-3">
                Select Essential
              </button>
            </TiltCard>
          </motion.div>

          {/* Power-Up */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ delay: 0.2 }}
          >
            <TiltCard className="p-8 md:p-10 flex flex-col h-full border-cyan-500/30" glowColor="rgba(6, 182, 212, 0.2)">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg whitespace-nowrap z-20 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Most Popular
              </div>
              
              <div className="mb-8 mt-2">
                <h3 className="text-2xl font-heading font-bold mb-2 text-white">Growth Package</h3>
                <p className="text-gray-400 mb-6">SEO + Monthly Growth.</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-white">£899</span>
                  <span className="text-gray-400">Setup</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-cyan-400">+ £60</span>
                  <span className="text-gray-400">/mo</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1 text-gray-300">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-white">Everything in Essential, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Advanced Local SEO Strategy</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Monthly Performance Reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Priority WhatsApp Support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Quarterly Strategy Calls</span>
                </li>
              </ul>
              
              <button className="btn-primary w-full text-lg py-3">
                Select Growth
              </button>
            </TiltCard>
          </motion.div>
        </div>

        {/* Community Rewards */}
        <motion.div 
          className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ delay: 0.4 }}
        >
          <TiltCard className="p-6 flex items-start gap-4 border-white/5" glowColor="rgba(244, 63, 94, 0.15)">
            <Heart className="w-8 h-8 text-rose-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-heading font-semibold text-lg text-white mb-1">Hero Discount</h4>
              <p className="text-sm text-gray-400 leading-relaxed">15% Setup Discount for NHS, Social Care, and Armed Forces (Active/Veteran).</p>
            </div>
          </TiltCard>
          <TiltCard className="p-6 flex items-start gap-4 border-white/5" glowColor="rgba(251, 191, 36, 0.15)">
            <Zap className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-heading font-semibold text-lg text-white mb-1">Annual Commitment</h4>
              <p className="text-sm text-gray-400 leading-relaxed">Pay for 12 months upfront and get £100 off your initial build.</p>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
