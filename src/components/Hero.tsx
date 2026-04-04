import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const sellingPoints = [
  'No Technical Skills Required',
  'Fixed Monthly Costs',
  'Google-Friendly Structure',
  'Unlimited WhatsApp Updates',
  'Fast Mobile Experience',
  'Hosting + Security Included',
  'Built to Convert Visitors',
  'Local SEO Foundations',
];

type HeroProps = {
  onRequestPrototype?: () => void;
};

export default function Hero({ onRequestPrototype }: HeroProps) {
  return (
    <section className="relative isolate flex min-h-[min(100svh,56rem)] flex-col overflow-hidden bg-[var(--color-navy)]">
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt=""
          width={1920}
          height={1440}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[center_35%]"
        />
        {/* Navy wash so type stays crisp; keeps photography visible at edges */}
        <div
          className="absolute inset-0 bg-[#070b14]/88"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#070b14]/95 via-[#070b14]/55 to-[#070b14]/90"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#070b14]/80 via-transparent to-[#070b14]/80"
          aria-hidden
        />
      </div>
      <span className="sr-only">
        Background photograph: interior of a local service business (salon).
      </span>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-4 py-28 text-center sm:px-6 sm:py-32 lg:px-8 lg:py-36">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55"
        >
          For local businesses across the UK
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="mx-auto mt-6 max-w-md font-sans text-base font-medium leading-snug text-white/88 md:text-lg"
        >
          Right now, someone is Googling you — what do they find?
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-8 font-heading text-[2.35rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.5rem]"
        >
          <span className="block">You&apos;re brilliant at what you do.</span>
          <span className="mt-2 block">Your website should say so.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mx-auto mt-10 max-w-xl font-sans text-lg font-medium leading-relaxed text-white/78 md:text-xl md:leading-relaxed"
        >
          We build it. We host it. We update it. You just answer your phone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36 }}
          className="mx-auto mt-12 w-full max-w-md sm:max-w-none"
        >
          <motion.button
            type="button"
            onClick={() => onRequestPrototype?.()}
            className="btn-hero-cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            See your site in 24 hours — £49
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.48 }}
          className="mt-8"
        >
          <Link
            to="/work"
            className="font-sans text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            View our work →
          </Link>
        </motion.div>
      </div>

      <div className="relative z-10 mt-auto border-t border-white/[0.07] bg-black/25 py-5 backdrop-blur-[2px]">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy)] via-transparent to-[var(--color-navy)] pointer-events-none z-10" />
        <div className="animate-marquee flex gap-8 items-center whitespace-nowrap text-xs font-heading font-medium uppercase tracking-[0.22em] text-white/30 sm:text-sm">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              {sellingPoints.map((point) => (
                <React.Fragment key={`${i}-${point}`}>
                  <span>{point}</span>
                  <span className="h-1 w-1 shrink-0 rounded-full bg-white/25" aria-hidden />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
