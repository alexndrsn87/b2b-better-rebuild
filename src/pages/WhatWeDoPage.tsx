import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Server, MessageCircle, MapPinned } from 'lucide-react';
import { TextReveal } from '../components/TextReveal';

const pillars = [
  {
    icon: Sparkles,
    title: 'Zero-Risk Demo',
    body:
      'We build a custom demo of your site first. If you love it, we launch it. No upfront risk—you only move forward when it feels right.',
  },
  {
    icon: Server,
    title: 'Total Management',
    body:
      'We handle hosting, SSL, and security. You never have to touch a server, read a dashboard, or worry about downtime.',
  },
  {
    icon: MessageCircle,
    title: 'Unlimited Content Updates',
    body:
      'Need to change a menu, price, or photo? Just WhatsApp us. It’s included in your monthly plan so you can focus on the day job.',
  },
  {
    icon: MapPinned,
    title: 'Local SEO Power',
    body:
      'We optimise your site so local customers find you on Google—not your competitors. Clear structure, honest copy, and search that matches how people actually search.',
  },
];

export default function WhatWeDoPage() {
  return (
    <section className="relative z-10 py-[var(--section-py)] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <p className="text-[11px] sm:text-xs tracking-[0.28em] uppercase font-heading text-blue-400/90 mb-4">
            What we do
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-bold mb-6 text-white leading-tight">
            <TextReveal text="We Build, Manage, and Grow Your Online Presence." />
          </h1>
          <motion.p
            className="text-lg text-gray-400 font-sans leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            We’re a done-for-you partner for local businesses. You save time, we handle the tech—so your website stays
            professional without becoming another job on your list.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="glass-card p-8 md:p-10 flex flex-col h-full"
            >
              <div className="glass-panel-dark mb-6 w-14 h-14 rounded-2xl flex items-center justify-center text-cyan-400">
                <pillar.icon className="w-7 h-7" strokeWidth={1.75} />
              </div>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-white mb-3">{pillar.title}</h2>
              <p className="text-gray-400 font-sans leading-relaxed flex-1">{pillar.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
