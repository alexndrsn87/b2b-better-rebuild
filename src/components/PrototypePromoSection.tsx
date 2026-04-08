import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

type PrototypePromoSectionProps = {
  onRequestPrototype?: () => void;
};

const paragraphs = [
  'Most agencies ask for thousands before you see a single pixel.',
  'We do it differently.',
  'For £49, we build you a working prototype of your homepage in 24 hours. Not a template — a real, custom design built specifically for your business.',
  'You get a link you can click through, share with your family, and show to your mates.',
  'If you love it and want to proceed, the £49 comes off your setup fee.',
  'If you don’t want to go ahead, you keep the prototype link for seven days — and we part as friends.',
  'For less than a tank of diesel, you get to see exactly what you’d be buying.',
];

const fairestDealLine = 'We think that’s the fairest deal in web design.';

export default function PrototypePromoSection({ onRequestPrototype }: PrototypePromoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 55, damping: 32 });
  const smoothY = useSpring(mouseY, { stiffness: 55, damping: 32 });

  const spotlight = useMotionTemplate`radial-gradient(720px circle at ${smoothX}% ${smoothY}%, rgba(251, 146, 60, 0.14) 0%, rgba(56, 189, 248, 0.08) 38%, transparent 55%)`;

  const cx = useMotionValue(0.5);
  const cy = useMotionValue(0.5);
  const smoothCx = useSpring(cx, { stiffness: 200, damping: 24 });
  const smoothCy = useSpring(cy, { stiffness: 200, damping: 24 });
  const cardRotateX = useTransform(smoothCy, [0, 1], [5.5, -5.5]);
  const cardRotateY = useTransform(smoothCx, [0, 1], [-6.5, 6.5]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden border-t border-white/[0.06] bg-[var(--color-navy)] px-4 pb-10 pt-[var(--section-py)] sm:px-6 sm:pb-12 lg:px-8"
      onPointerMove={(e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
        mouseY.set(((e.clientY - rect.top) / rect.height) * 100);

        if (cardRef.current) {
          const cr = cardRef.current.getBoundingClientRect();
          cx.set((e.clientX - cr.left) / cr.width);
          cy.set((e.clientY - cr.top) / cr.height);
        }
      }}
      onPointerLeave={() => {
        mouseX.set(50);
        mouseY.set(45);
        cx.set(0.5);
        cy.set(0.5);
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.12, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-40 top-1/4 h-[min(90vw,480px)] w-[min(90vw,480px)] rounded-full bg-orange-500/15 blur-[110px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.42, 0.2], y: [0, 24, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-0 right-0 h-[min(100vw,560px)] w-[min(100vw,560px)] rounded-full bg-cyan-500/12 blur-[120px]"
        />
        <motion.div className="absolute inset-0 opacity-[0.92]" style={{ background: spotlight }} />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.p
          className="mb-6 text-center font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-400/90 sm:mb-8 sm:text-xs"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
        >
          The £49 prototype
        </motion.p>

        <div className="mx-auto mb-12 max-w-5xl text-center sm:mb-16 md:mb-20">
          <motion.h2
            className="font-heading text-[2.65rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem] xl:leading-[1.05]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 'some' }}
            variants={{
              visible: { transition: { staggerChildren: 0.14, delayChildren: 0.06 } },
            }}
          >
            <motion.span
              className="block"
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              We build first.
            </motion.span>
            <motion.span
              className="mt-3 block bg-gradient-to-r from-white via-white to-orange-200/95 bg-clip-text text-transparent md:mt-5"
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              You decide after.
            </motion.span>
          </motion.h2>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          <motion.div
            className="glass-card relative overflow-hidden p-8 md:p-10 lg:col-span-7 xl:p-12"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.div
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-orange-500/12 blur-3xl"
              animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.15, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative space-y-3.5 font-sans text-base leading-relaxed text-gray-400 md:text-lg">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ delay: 0.08 + i * 0.04, duration: 0.45 }}
                  className={i === 1 ? 'font-heading text-lg font-semibold text-white md:text-xl' : undefined}
                >
                  {p}
                </motion.p>
              ))}
              <motion.p
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ delay: 0.08 + paragraphs.length * 0.04, duration: 0.45 }}
                className="font-heading text-lg font-semibold leading-snug text-orange-200/95 md:text-xl"
              >
                {fairestDealLine}
              </motion.p>
            </div>

            <motion.div
              className="relative mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <motion.button
                type="button"
                onClick={() => onRequestPrototype?.()}
                className="btn-hero-cta group inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get my £49 prototype
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative lg:col-span-5"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <motion.div
              ref={cardRef}
              className="relative mx-auto max-w-md perspective-[1000px] lg:mx-0 lg:max-w-none"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="relative overflow-visible rounded-[1.5rem] border border-white/15 bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-1 shadow-[0_28px_80px_-24px_rgba(234,88,12,0.35)] backdrop-blur-xl"
                style={{
                  rotateX: cardRotateX,
                  rotateY: cardRotateY,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="relative overflow-hidden rounded-[1.35rem] bg-[#070b14]/90 p-5 pt-6 md:p-6 md:pt-7">
                  <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                    </div>
                    <span className="ml-2 font-mono text-[10px] text-gray-500">your-business.preview</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 w-[75%] rounded bg-white/10" />
                    <div className="h-3 w-full rounded bg-white/[0.07]" />
                    <div className="h-3 w-5/6 rounded bg-white/[0.07]" />
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="aspect-video rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/10 ring-1 ring-white/10" />
                      <div className="flex flex-col justify-center gap-2">
                        <div className="h-2 w-full rounded bg-white/10" />
                        <div className="h-2 w-4/5 rounded bg-white/[0.06]" />
                        <div className="h-8 w-24 rounded-full bg-orange-500/40" />
                      </div>
                    </div>
                  </div>
                  <motion.div
                    className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-3.5 py-2 text-sm font-bold text-white shadow-[0_8px_28px_-4px_rgba(234,88,12,0.55)] ring-2 ring-white/35"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Sparkles className="h-4 w-4 shrink-0" />
                    £49 · 24h
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            <p className="mt-6 text-center font-sans text-sm text-gray-500 lg:text-left">
              Custom preview — not a generic template.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
