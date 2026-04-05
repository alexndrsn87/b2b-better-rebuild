import React from 'react';
import { motion } from 'motion/react';
import { TextReveal } from './TextReveal';

type FooterCTAProps = {
  onRequestPrototype?: () => void;
};

export default function FooterCTA({ onRequestPrototype }: FooterCTAProps) {
  return (
    <div className="relative z-10 overflow-hidden border-b border-white/5 py-[var(--section-py)]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-1/2 h-[min(100vw,720px)] w-[min(100vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-hero-cta)]/12 blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-amber-400/10 blur-[80px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-10 font-heading text-[1.85rem] font-extrabold leading-[1.12] tracking-tight text-white sm:mb-12 sm:text-4xl md:text-5xl lg:text-[2.75rem] lg:leading-tight">
          <TextReveal text="Ready to see what your business looks like online?" />
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-xl flex-col items-stretch gap-5"
        >
          <motion.button
            type="button"
            onClick={() => onRequestPrototype?.()}
            className="btn-hero-cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get my £49 prototype — done in 24 hours
          </motion.button>
          <p className="font-sans text-sm leading-relaxed text-gray-500 sm:text-[0.9375rem]">
            No commitment beyond the £49. No contract to sign. No dashboard to learn.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
