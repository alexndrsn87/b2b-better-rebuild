import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowLeft, ExternalLink } from 'lucide-react';
import { TextReveal } from '../components/TextReveal';
import { whatsappUrlWithPrefill } from '../lib/whatsapp';

const WHATSAPP_URL = whatsappUrlWithPrefill();

export default function WhatsAppPage() {
  return (
    <section className="relative z-10 py-[var(--section-py)] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-[min(100vw,480px)] h-[min(100vw,480px)] rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-[80px]" />
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.p
          className="mb-8"
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

        <div className="text-center mb-14 md:mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-extrabold mb-8 text-white leading-tight">
            <TextReveal text="WhatsApp us" />
          </h1>
          <motion.div
            className="text-lg text-gray-400 font-sans leading-relaxed space-y-4 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p>The fastest way to get changes made, ask questions, or send new photos and copy.</p>
            <p>We monitor messages in working hours and reply as soon as we can.</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass-panel-dark text-emerald-400 mb-8 mx-auto">
            <MessageCircle className="w-8 h-8" strokeWidth={1.75} />
          </div>
          <div className="text-gray-300 font-sans leading-relaxed mb-10 space-y-4 max-w-md mx-auto">
            <p>Tap below to open WhatsApp with our number.</p>
            <p>Say who you are and what you need—we&apos;ll pick it up from there.</p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-shimmer inline-flex items-center justify-center gap-2 text-lg"
          >
            Open WhatsApp
            <ExternalLink className="w-5 h-5 opacity-90" />
          </a>
          <div className="mt-8 text-xs text-gray-500 font-sans space-y-3 max-w-sm mx-auto">
            <p>Can&apos;t open the app?</p>
            <p>Save our number from your onboarding message or email us—we&apos;ll get you connected.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
