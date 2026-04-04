import React from 'react';
import { motion } from 'motion/react';
import { TextReveal } from './TextReveal';

const bodyBlocks = [
  <>
    It&apos;s not dramatic. It&apos;s just <span className="text-white/90">maths</span>.
  </>,
  <>
    Someone in your town Googles &ldquo;plumber near me&rdquo; or &ldquo;best beautician in [town]&rdquo;. They find
    three results. Two have proper websites. One has nothing, or a site that looks like it was built in 2009.
  </>,
];

export default function StatusQuoSection() {
  return (
    <section className="relative z-10 overflow-hidden border-t border-white/[0.06] bg-[var(--color-navy)] py-[var(--section-py)] px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ opacity: [0.2, 0.38, 0.2], scale: [1, 1.06, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-orange-500/10 blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.15, 0.32, 0.15], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 -right-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-[90px]"
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <motion.p
          className="mb-5 text-center font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400/85 sm:text-xs"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.45 }}
        >
          Straight talk
        </motion.p>

        <h2 className="mb-12 text-center font-heading text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-[2.65rem] md:leading-tight">
          <TextReveal text="Every week without a proper website, you're losing work to someone who has one." />
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="glass-card border-white/15 p-8 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.5)] md:p-12"
        >
          <div className="space-y-5 font-sans text-base leading-relaxed text-gray-400 md:text-lg">
            {bodyBlocks.map((block, i) => (
              <p key={i}>{block}</p>
            ))}

            <motion.p
              className="relative border-l-2 border-[var(--color-hero-cta)]/70 py-1 pl-5 font-heading text-lg font-semibold leading-snug text-white md:text-xl"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              Guess which one doesn&apos;t get the call.
            </motion.p>

            <p>
              This isn&apos;t a criticism. Most local businesses have been meaning to sort their website for years.
            </p>
            <p>It always gets pushed back because it seems complicated, expensive, and slow.</p>
            <p className="text-gray-300">
              We built Built Better specifically to make sure{' '}
              <span className="font-medium text-white">none of those things are true</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
