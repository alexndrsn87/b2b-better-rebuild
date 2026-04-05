import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { TextReveal } from './TextReveal';

const steps: {
  day: string;
  title: string;
  paragraphs: string[];
  accent: string;
}[] = [
  {
    day: 'Day 1',
    title: 'We ask three questions.',
    paragraphs: [
      'Not a 40-page brief. Not a strategy call. Just: what do you do, who are your best customers, and what do you want people to do when they find you?',
      'Takes ten minutes of your time.',
    ],
    accent: 'rgba(56, 189, 248, 0.35)',
  },
  {
    day: 'Day 2',
    title: 'You see your website.',
    paragraphs: [
      'Not a wireframe. Not a mood board. A working, clickable site — built specifically for your business.',
      'You see exactly what you’re getting before you commit to a penny beyond the £49.',
    ],
    accent: 'rgba(168, 85, 247, 0.3)',
  },
  {
    day: 'Day 3',
    title: 'You tell us what to change.',
    paragraphs: [
      'Love it? Great. Want something different? We change it.',
      'This is a conversation, not a take-it-or-leave-it. You have full say before anything goes live.',
    ],
    accent: 'rgba(34, 197, 94, 0.28)',
  },
  {
    day: 'Day 5',
    title: 'You go live. We stay.',
    paragraphs: [
      'We handle the domain, the hosting, and the launch. You’ll get a WhatsApp from us when you’re live.',
      'Then we’re on hand forever after — for updates, changes, anything.',
    ],
    accent: 'rgba(251, 146, 60, 0.32)',
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 35 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 35 });

  const spotlight = useMotionTemplate`radial-gradient(680px circle at ${smoothX}% ${smoothY}%, rgba(56, 189, 248, 0.11) 0%, rgba(168, 85, 247, 0.05) 35%, transparent 58%)`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'center 0.45'],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0.08, 1]);
  const railOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0.85]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden border-t border-white/[0.06] bg-[var(--color-navy)] py-[var(--section-py)] px-4 sm:px-6 lg:px-8"
      onPointerMove={(e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        mouseX.set(x);
        mouseY.set(y);
      }}
      onPointerLeave={() => {
        mouseX.set(50);
        mouseY.set(40);
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.08, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-20 top-0 h-[min(100vw,520px)] w-[min(100vw,520px)] rounded-full bg-violet-500/12 blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]"
        />
        <motion.div
          className="absolute inset-0 opacity-90"
          style={{ background: spotlight }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
            backgroundSize: '44px 44px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.p
          className="mb-5 text-center font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400/85 sm:text-xs"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
        >
          How it works
        </motion.p>

        <h2 className="mx-auto mb-16 max-w-4xl text-center font-heading text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:mb-20 sm:text-4xl md:text-5xl lg:text-[2.75rem] lg:leading-tight">
          <TextReveal text='From "yes please" to live website in five days.' />
        </h2>

        {/* Desktop timeline rail — reserve height so the track never overlaps the cards */}
        <div className="relative z-0 mb-6 hidden min-h-[3.5rem] xl:mb-10 xl:block xl:min-h-[4.25rem]">
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-1/2 z-0 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500/25 via-blue-500/35 to-violet-500/25"
              style={{ scaleX: railScale, opacity: railOpacity, transformOrigin: 'left center' }}
            />
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4 xl:gap-6">
          {steps.map((step, i) => (
            <motion.article
              key={step.day}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some', margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -8,
                transition: { type: 'spring', stiffness: 420, damping: 22 },
              }}
              className="group relative flex flex-col glass-card p-7 md:p-8"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-[1.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(420px circle at 50% 0%, ${step.accent}, transparent 65%)`,
                }}
              />
              <div className="relative mb-5 flex items-center gap-3">
                <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-cyan-400/90">
                  {step.day}
                </span>
                <span
                  className="h-px flex-1 bg-gradient-to-r from-cyan-500/35 to-transparent opacity-60 xl:hidden"
                  aria-hidden
                />
              </div>
              <h3 className="relative mb-4 font-heading text-xl font-bold leading-snug text-white md:text-2xl">
                {step.title}
              </h3>
              <div className="relative space-y-3 font-sans text-sm leading-relaxed text-gray-400 md:text-[0.9375rem]">
                {step.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
              <motion.div
                className="relative mt-6 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-xs font-bold text-white/50 group-hover:border-cyan-400/25 group-hover:text-cyan-300/90"
                whileHover={{ scale: 1.08, rotate: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              >
                {i + 1}
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
