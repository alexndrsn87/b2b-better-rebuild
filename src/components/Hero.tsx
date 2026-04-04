import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import LusionScene from './LusionScene';
import StatusQuoSection from './StatusQuoSection';

const trustTickerStatements = [
  'No logins. Ever.',
  'No surprise bills. Ever.',
  'No waiting weeks. Ever.',
  'No tech jargon. Ever.',
  'No hidden charges. Ever.',
  'No disappearing after launch. Ever.',
];

function TrustTickerStrip({ leadSeparator = false, stripKey }: { leadSeparator?: boolean; stripKey: string }) {
  return (
    <>
      {trustTickerStatements.map((line, i) => (
        <React.Fragment key={`${stripKey}-${line}`}>
          {(i > 0 || leadSeparator) && (
            <span
              className="mx-4 inline-block h-4 w-px shrink-0 bg-[var(--color-hero-cta)]/75 md:mx-5"
              aria-hidden
            />
          )}
          <span className="shrink-0 font-sans text-[0.9375rem] font-semibold tracking-tight text-white md:text-lg">
            {line}
          </span>
        </React.Fragment>
      ))}
    </>
  );
}

type HeroProps = {
  onRequestPrototype?: () => void;
};

export default function Hero({ onRequestPrototype }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 80, damping: 24, mass: 0.9 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 24, mass: 0.9 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['2.8deg', '-2.8deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-2.8deg', '2.8deg']);

  return (
    <>
    <section className="relative flex min-h-[88vh] flex-col justify-center overflow-hidden bg-[var(--color-navy)] pb-20 pt-6 lg:pb-28 lg:pt-8">
      <LusionScene />

      <div
        className="relative z-10 mx-auto mt-4 w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          ref={ref}
          onMouseMove={(e) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            x.set((e.clientX - rect.left) / rect.width - 0.5);
            y.set((e.clientY - rect.top) / rect.height - 0.5);
          }}
          onMouseLeave={() => {
            x.set(0);
            y.set(0);
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-5xl rounded-[2.5rem] glass-card p-12 sm:p-16 md:p-20"
          style={{
            rotateX,
            rotateY,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            willChange: 'transform, opacity',
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 glass-panel-light px-4 py-2 text-sm font-medium text-cyan-300/95"
          >
            For local businesses across the UK
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="mx-auto max-w-md font-sans text-base font-medium leading-snug text-gray-200 md:text-lg"
          >
            Right now, someone is Googling you — what do they find?
          </motion.p>

          <div className="hero-headline-glow mx-auto mt-8 max-w-[52rem]">
            <h1 className="hero-headline font-heading text-[2.35rem] sm:text-5xl md:text-6xl lg:text-[3.35rem] xl:text-[3.65rem]">
              <span className="hero-line">
                <span className="hero-line-inner">
                  You&apos;re <span className="hero-word-brilliant">brilliant</span> at what you do.
                </span>
              </span>
              <span className="hero-line">
                <span className="hero-line-inner">
                  <span className="hero-word-website">Your website</span> should{' '}
                  <span className="hero-word-sayso">say so.</span>
                </span>
              </span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="mx-auto mt-10 max-w-xl font-sans text-lg font-medium leading-relaxed text-gray-300 md:text-xl"
          >
            We build it. We host it. We update it. You just answer your phone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
            className="mx-auto mt-12 w-full max-w-md"
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
            transition={{ delay: 0.44 }}
            className="mt-8"
          >
            <Link
              to="/work"
              className="font-sans text-sm font-medium text-gray-400 transition-colors hover:text-white"
            >
              View our work →
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="relative z-10 mt-20 overflow-hidden border-y border-white/10 bg-[var(--color-navy)] py-3.5 md:py-4"
        aria-label="Trust promises"
      >
        <div className="animate-marquee-trust flex w-max items-center">
          <div className="flex items-center">
            <TrustTickerStrip stripKey="a" />
          </div>
          <div className="flex items-center" aria-hidden>
            <TrustTickerStrip stripKey="b" leadSeparator />
          </div>
        </div>
      </div>
    </section>
    <StatusQuoSection />
    </>
  );
}
