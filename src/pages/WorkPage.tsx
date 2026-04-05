import React from 'react';
import { motion } from 'motion/react';
import { Link, useOutletContext } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TextReveal } from '../components/TextReveal';

export default function WorkPage() {
  const { openPrototype } = useOutletContext<{ openPrototype: () => void }>();

  return (
    <section className="relative z-10 py-[var(--section-py)] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <motion.p className="mb-8" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors font-sans"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </motion.p>

        <p className="text-[11px] sm:text-xs tracking-[0.28em] uppercase font-heading text-blue-400/90 mb-5">
          Proof
        </p>
        <h1 className="text-5xl md:text-6xl font-heading font-extrabold mb-10 text-white leading-tight">
          <TextReveal text="Our work" />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="glass-card p-8 md:p-12 space-y-6 font-sans text-gray-400 leading-relaxed"
        >
          <p>Every site we ship is built for one business — not copied from a template library.</p>
          <p>That means the clearest “sample” we can offer isn’t our logo bar. It’s your homepage, mocked up for you.</p>
          <p className="text-white font-medium">The £49 prototype shows exactly that within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button type="button" onClick={() => openPrototype?.()} className="btn-hero-cta">
              See your site in 24 hours — £49
            </button>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors py-3"
            >
              How it works →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
