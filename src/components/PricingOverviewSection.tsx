import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { TextReveal } from './TextReveal';

const subBlocks = [
  'No hidden costs. No hourly rates. No surprise invoices.',
  'One clear monthly fee that covers your site, your hosting, your security, and your updates. Forever.',
  'And if you pay annually, your rate is locked in for life.',
];

const included = ['Your website', 'Hosting', 'Security', 'Updates on WhatsApp'];

export default function PricingOverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(40);
  const smoothX = useSpring(mouseX, { stiffness: 48, damping: 38 });
  const smoothY = useSpring(mouseY, { stiffness: 48, damping: 38 });
  const spotlight = useMotionTemplate`radial-gradient(680px circle at ${smoothX}% ${smoothY}%, rgba(96, 165, 250, 0.14) 0%, rgba(56, 189, 248, 0.07) 38%, transparent 56%)`;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden border-t border-white/[0.06] bg-[var(--color-navy)] py-[var(--section-py)] px-4 sm:px-6 lg:px-8"
      onPointerMove={(e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
        mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
      }}
      onPointerLeave={() => {
        mouseX.set(50);
        mouseY.set(40);
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ opacity: [0.2, 0.38, 0.2], scale: [1, 1.06, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-32 top-1/4 h-[min(100vw,420px)] w-[min(100vw,420px)] rounded-full bg-blue-500/12 blur-[96px]"
        />
        <motion.div
          animate={{ opacity: [0.18, 0.34, 0.18], y: [0, 24, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-400/10 blur-[88px]"
        />
        <motion.div className="absolute inset-0 opacity-[0.9]" style={{ background: spotlight }} />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)`,
            backgroundSize: '44px 44px',
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_min(36%,380px)] lg:items-center lg:gap-16">
        <div>
          <motion.p
            className="mb-5 text-center font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-400/90 sm:mb-6 sm:text-left sm:text-xs"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
          >
            Pricing
          </motion.p>

          <h2 className="mb-10 text-center font-heading text-[1.65rem] font-extrabold leading-[1.15] tracking-tight text-white sm:mb-12 sm:text-left sm:text-3xl md:text-4xl lg:text-[2.35rem] lg:leading-[1.12]">
            <TextReveal text="Professional. Managed. Fixed price. From £49 a month." />
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card border-sky-500/15 p-7 shadow-[0_24px_70px_-24px_rgba(37,99,235,0.2)] sm:p-9 md:p-10"
          >
            <div className="space-y-5 font-sans text-base leading-relaxed text-gray-400 md:text-[1.05rem]">
              {subBlocks.map((block, i) => (
                <motion.p
                  key={block}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * i, duration: 0.42 }}
                  className={i === 0 ? 'font-medium text-gray-300' : i === 1 ? 'text-gray-300' : 'text-gray-400'}
                >
                  {block}
                </motion.p>
              ))}
            </div>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <Link
                to="/pricing"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-6 py-4 text-center font-sans text-base font-bold tracking-tight text-white shadow-[0_12px_40px_-16px_rgba(0,0,0,0.45)] transition-[background,transform,box-shadow] hover:border-sky-400/30 hover:bg-white/[0.12] sm:w-auto sm:px-8 sm:text-lg"
              >
                See our plans
                <ArrowRight className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-gradient-to-br from-sky-500/15 via-white/[0.04] to-blue-600/10 p-6 shadow-[0_28px_80px_-28px_rgba(37,99,235,0.35)] sm:p-8">
            <p className="mb-1 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-sky-300/80">
              What you pay
            </p>
            <p className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              from{' '}
              <span className="bg-gradient-to-r from-sky-200 via-white to-cyan-200 bg-clip-text text-transparent">
                £49
              </span>
              <span className="text-2xl font-bold text-gray-400 sm:text-3xl">/mo</span>
            </p>
            <p className="mt-2 font-sans text-sm text-gray-400">Not thousands upfront. One predictable number.</p>

            <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                All in that fee
              </p>
              <ul className="space-y-2.5">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 font-sans text-sm text-gray-300">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 text-sky-300">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
