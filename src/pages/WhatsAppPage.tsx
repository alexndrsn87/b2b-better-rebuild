import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowLeft, ExternalLink } from 'lucide-react';
import { TextReveal } from '../components/TextReveal';

const WHATSAPP_URL =
  import.meta.env.VITE_WHATSAPP_URL?.trim() || 'https://wa.me/447000000000';

export default function WhatsAppPage() {
  return (
    <section className="relative z-10 py-[var(--section-py)] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-[min(100vw,480px)] h-[min(100vw,480px)] rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-[80px]" />
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.p
          className="mb-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors font-sans"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </motion.p>

        <div className="text-center mb-10">
          <p className="text-[11px] sm:text-xs tracking-[0.28em] uppercase font-heading text-emerald-400/90 mb-4">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white leading-tight">
            <TextReveal text="WhatsApp us" />
          </h1>
          <motion.p
            className="text-lg text-gray-400 font-sans leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            The fastest way to get changes made, ask questions, or send new photos and copy. We monitor messages in
            working hours and reply as soon as we can.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-10 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass-panel-dark text-emerald-400 mb-6 mx-auto">
            <MessageCircle className="w-8 h-8" strokeWidth={1.75} />
          </div>
          <p className="text-gray-300 font-sans leading-relaxed mb-8">
            Tap below to open WhatsApp with our number. Say who you are and what you need—we&apos;ll pick it up from
            there.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-shimmer inline-flex items-center justify-center gap-2 text-lg"
          >
            Open WhatsApp
            <ExternalLink className="w-5 h-5 opacity-90" />
          </a>
          <p className="mt-6 text-xs text-gray-500 font-sans">
            Can&apos;t open the app? Save our number from your onboarding message or email us—we&apos;ll get you
            connected.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
