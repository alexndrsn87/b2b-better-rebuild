import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Server, MessageCircle, MapPinned } from 'lucide-react';
import { TextReveal } from '../components/TextReveal';
import TiltCard from '../components/TiltCard';

const pillars: {
  icon: typeof Sparkles;
  title: string;
  paragraphs: string[];
  glow: string;
}[] = [
  {
    icon: Sparkles,
    title: 'Zero-Risk Demo',
    paragraphs: [
      'We build a custom demo of your site first. If you love it, we launch it.',
      'No upfront risk—you only move forward when it feels right.',
    ],
    glow: 'rgba(59, 130, 246, 0.2)',
  },
  {
    icon: Server,
    title: 'Total Management',
    paragraphs: [
      'We handle hosting, SSL, and security.',
      'You never touch a server, a dashboard, or downtime worries.',
    ],
    glow: 'rgba(6, 182, 212, 0.22)',
  },
  {
    icon: MessageCircle,
    title: 'Unlimited Content Updates',
    paragraphs: [
      'Need to change a menu, price, or photo? Just WhatsApp us.',
      'It’s included in your monthly plan so you can focus on the day job.',
    ],
    glow: 'rgba(16, 185, 129, 0.18)',
  },
  {
    icon: MapPinned,
    title: 'Local SEO Power',
    paragraphs: [
      'We optimise your site so local customers find you on Google—not your competitors.',
      'Clear structure, honest copy.',
      'Search that matches how people actually search.',
    ],
    glow: 'rgba(168, 85, 247, 0.2)',
  },
];

export default function WhatWeDoPage() {
  return (
    <section className="relative z-10 py-[var(--section-py)] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-32 w-[min(90vw,520px)] h-[min(90vw,520px)] rounded-full bg-violet-500/20 blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.25, 0.45, 0.25], y: [0, 24, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-cyan-500/15 blur-[90px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2], x: [0, -30, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full bg-blue-600/12 blur-[110px]"
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-24 max-w-3xl mx-auto">
          <p className="text-[11px] sm:text-xs tracking-[0.28em] uppercase font-heading text-blue-400/90 mb-5">
            What we do
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-[3.75rem] font-heading font-extrabold mb-8 text-white leading-[1.05]">
            <TextReveal text="We Build, Manage, and Grow Your Online Presence." />
          </h1>
          <motion.div
            className="text-lg text-gray-400 font-sans leading-relaxed space-y-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <p>We’re a done-for-you partner for local businesses.</p>
            <p>You save time, we handle the tech—so your website stays professional without becoming another job.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="flex min-h-0"
            >
              <TiltCard className="p-8 md:p-12 flex flex-col h-full w-full" glowColor={pillar.glow}>
                <div className="glass-panel-dark mb-8 w-14 h-14 rounded-2xl flex items-center justify-center text-cyan-400">
                  <pillar.icon className="w-7 h-7" strokeWidth={1.75} />
                </div>
                <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-white mb-4">{pillar.title}</h2>
                <div className="text-gray-400 font-sans leading-relaxed flex-1 space-y-4">
                  {pillar.paragraphs.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
