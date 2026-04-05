import React, { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'motion/react';
import {
  ArrowRight,
  Check,
  Globe,
  Layers,
  MessageCircle,
  Monitor,
  Rocket,
  Shield,
  Sparkles,
} from 'lucide-react';

type Step = {
  id: string;
  n: number;
  title: string;
  accent: string;
  accentSoft: string;
  borderGlow: string;
  paragraphs: string[];
  highlight?: string;
};

const steps: Step[] = [
  {
    id: 'prototype',
    n: 1,
    title: 'The £49 Prototype',
    accent: 'rgba(251, 146, 60, 0.45)',
    accentSoft: 'from-orange-500/20 to-amber-500/10',
    borderGlow: 'border-orange-500/20',
    paragraphs: [
      'You send us a WhatsApp or fill in a short form. We ask three questions — what you do, who your best customers are, and what you want people to do when they find you.',
      'Within 24 hours, you have a working prototype of your homepage. A real, clickable site — not a template, not a wireframe. Built specifically for your business, from scratch.',
      'You can share it with your partner, your business partner, your best mate. Take your time. The link lives for seven days.',
      'If you love it, the £49 comes off your setup fee and we crack on.',
      'If it’s not right, we make changes until it is.',
      'If it’s not for you, we part as friends.',
    ],
  },
  {
    id: 'build',
    n: 2,
    title: 'Approval & Full Build',
    accent: 'rgba(56, 189, 248, 0.4)',
    accentSoft: 'from-sky-500/20 to-cyan-500/10',
    borderGlow: 'border-sky-500/20',
    paragraphs: [
      'Once you’re happy with the direction, we build out the full site — however many pages your plan includes. We write the copy if you’re on our Professional or Authority plan. We set up your domain and connect your hosting.',
      'We’ll send you a message when there’s something to review. Usually within three to five working days of your approval.',
    ],
  },
  {
    id: 'launch',
    n: 3,
    title: 'Launch',
    accent: 'rgba(168, 85, 247, 0.38)',
    accentSoft: 'from-violet-500/20 to-fuchsia-500/10',
    borderGlow: 'border-violet-500/20',
    paragraphs: [
      'We handle everything. You’ll get a WhatsApp when you’re live. From that moment, your business exists online — properly.',
      'Most of our clients are live within five working days of saying yes to the full build.',
    ],
  },
  {
    id: 'forever',
    n: 4,
    title: 'Forever After',
    accent: 'rgba(52, 211, 153, 0.42)',
    accentSoft: 'from-emerald-500/20 to-teal-500/10',
    borderGlow: 'border-emerald-500/20',
    highlight:
      'This is where most agencies disappear. We don’t.',
    paragraphs: [
      'Anytime you need something changed — new number, new prices, new services, new photos — just WhatsApp us. We’ll have it done within 48 hours.',
      'Your site stays fast, secure, and up to date. We monitor it. We handle the technical bits. You never need to log into a dashboard, speak to a hosting company, or think about your website again.',
      'You just do your job. We’ll make sure the internet knows you’re brilliant at it.',
    ],
  },
];

function StepGraphicPrototype() {
  return (
    <div className="relative flex h-full min-h-[260px] items-center justify-center lg:min-h-[300px]">
      <motion.div
        className="absolute inset-[8%] rounded-[1.25rem] bg-gradient-to-br from-orange-500/10 via-transparent to-cyan-500/8 blur-2xl"
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="relative w-full max-w-[340px] overflow-hidden rounded-2xl border border-white/15 bg-[#0a0f1a]/90 shadow-[0_24px_80px_-20px_rgba(234,88,12,0.25)]"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
          <div className="flex gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="ml-2 flex flex-1 items-center gap-2 rounded-lg bg-white/[0.06] px-2 py-1">
            <Monitor className="h-3.5 w-3.5 text-gray-500" aria-hidden />
            <span className="truncate font-sans text-[10px] text-gray-500">yourbusiness.co.uk</span>
          </div>
        </div>
        <div className="space-y-3 p-4">
            <div className="h-2.5 w-[85%] max-w-[85%] rounded-full bg-white/12" />
            <div className="h-2.5 w-[95%] max-w-[95%] rounded-full bg-white/8" />
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="aspect-[4/3] rounded-lg bg-gradient-to-br from-white/10 to-white/[0.02] ring-1 ring-white/10"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
        className="absolute -right-1 top-6 rounded-full border border-orange-400/35 bg-orange-500/20 px-3 py-1.5 font-heading text-xs font-bold text-orange-100 shadow-lg backdrop-blur-sm sm:right-4"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        £49 · 24h
      </motion.div>
      <motion.div
        className="absolute -left-1 bottom-10 flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/15 text-emerald-300 shadow-lg sm:left-2"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <MessageCircle className="h-5 w-5" />
      </motion.div>
    </div>
  );
}

function StepGraphicBuild() {
  return (
    <div className="relative flex h-full min-h-[260px] items-center justify-center lg:min-h-[300px]">
      <motion.div
        className="absolute inset-[10%] rounded-full bg-sky-500/10 blur-[60px]"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-[min(72%,260px)] rounded-2xl border border-white/12 bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-6 shadow-xl"
          style={{
            rotate: (i - 1) * 4,
            zIndex: 3 - i,
            top: `${18 + i * 12}%`,
          }}
          initial={{ opacity: 0, x: i % 2 ? 24 : -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.12, duration: 0.45 }}
        >
          <Layers className="mb-3 h-8 w-8 text-sky-400/80" strokeWidth={1.5} />
          <div className="space-y-2">
            <div className="h-2 w-[80%] rounded-full bg-white/15" />
            <div className="h-2 w-[60%] rounded-full bg-white/10" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function StepGraphicLaunch() {
  return (
    <div className="relative flex h-full min-h-[260px] items-center justify-center lg:min-h-[300px]">
      <motion.div
        className="absolute h-48 w-48 rounded-full border border-violet-400/20 bg-violet-500/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="relative flex h-36 w-36 items-center justify-center rounded-full border-2 border-violet-400/40 bg-gradient-to-br from-violet-500/25 to-fuchsia-600/15 shadow-[0_0_60px_-10px_rgba(168,85,247,0.5)]"
        initial={{ scale: 0.85, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border border-dashed border-white/20"
        />
        <Rocket className="relative z-10 h-14 w-14 text-violet-200" strokeWidth={1.35} />
      </motion.div>
      <motion.span
        className="absolute bottom-[18%] rounded-full bg-emerald-500/90 px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-white shadow-lg"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35 }}
      >
        Live
      </motion.span>
      <Globe className="absolute right-[12%] top-[20%] h-10 w-10 text-white/15" strokeWidth={1} aria-hidden />
    </div>
  );
}

function StepGraphicForever() {
  return (
    <div className="relative flex h-full min-h-[280px] flex-col items-center justify-center gap-6 lg:min-h-[320px]">
      <motion.div
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent"
        aria-hidden
      />
      <div className="relative flex flex-wrap items-center justify-center gap-4">
        {[Shield, MessageCircle, Sparkles].map((Icon, i) => (
          <motion.div
            key={`forever-icon-${i}`}
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-200"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 + i * 0.1 }}
            whileHover={{ y: -4, scale: 1.05 }}
          >
            <Icon className="h-7 w-7" strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>
      <svg viewBox="0 0 200 80" className="relative w-full max-w-[220px] text-emerald-400/45" aria-hidden>
        <motion.path
          d="M 20 40 Q 60 10 100 40 T 180 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: [0.35, 0.75, 0.35] }}
          transition={{ pathLength: { duration: 2.2, ease: 'easeOut' }, opacity: { duration: 5, repeat: Infinity } }}
        />
        <circle cx="100" cy="40" r="4" className="fill-emerald-400/70" />
      </svg>
      <p className="relative max-w-xs text-center font-sans text-xs leading-relaxed text-gray-500">
        Updates, monitoring, security — we stay on it so you don’t have to.
      </p>
    </div>
  );
}

const graphicById: Record<string, React.FC> = {
  prototype: StepGraphicPrototype,
  build: StepGraphicBuild,
  launch: StepGraphicLaunch,
  forever: StepGraphicForever,
};

export default function HowItWorksPage() {
  const { openPrototype } = useOutletContext<{ openPrototype: () => void }>();
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(35);
  const smoothX = useSpring(mouseX, { stiffness: 42, damping: 40 });
  const smoothY = useSpring(mouseY, { stiffness: 42, damping: 40 });
  const spotlight = useMotionTemplate`radial-gradient(900px circle at ${smoothX}% ${smoothY}%, rgba(56, 189, 248, 0.1) 0%, rgba(168, 85, 247, 0.06) 38%, transparent 55%)`;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden px-4 py-[var(--section-py)] sm:px-6 lg:px-8"
      onPointerMove={(e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
        mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
      }}
      onPointerLeave={() => {
        mouseX.set(50);
        mouseY.set(35);
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.06, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-32 top-0 h-[min(90vw,520px)] w-[min(90vw,520px)] rounded-full bg-violet-500/14 blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.38, 0.2], y: [0, 28, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 -left-40 h-96 w-96 rounded-full bg-cyan-500/12 blur-[90px]"
        />
        <motion.div className="absolute inset-0 opacity-[0.88]" style={{ background: spotlight }} />
        <div
          className="absolute inset-0 opacity-[0.032]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '44px 44px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto mb-20 max-w-4xl text-center md:mb-28">
          <motion.p
            className="mb-5 font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400/90 sm:text-xs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            How it works
          </motion.p>

          <h1 className="mb-8 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.5rem]">
            <span className="sr-only">Simple. Fast. Permanent.</span>
            <span aria-hidden className="flex flex-col items-center gap-2 sm:gap-3">
              {(['Simple.', 'Fast.', 'Permanent.'] as const).map((word, i) => (
                <motion.span
                  key={word}
                  className="block bg-gradient-to-r from-white via-cyan-100/95 to-violet-200/90 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.14, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-gray-400 md:text-xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            Here’s exactly what happens when you work with Built Better — from first message to live website and
            beyond.
          </motion.p>
        </header>

        <div className="relative space-y-24 md:space-y-32 lg:space-y-36">
          <div
            className="pointer-events-none absolute left-[1.25rem] top-0 hidden h-full w-px bg-gradient-to-b from-cyan-500/25 via-violet-500/20 to-emerald-500/25 md:block lg:left-8"
            aria-hidden
          />

          {steps.map((step, index) => {
            const Graphic = graphicById[step.id];
            const copyFirst = index % 2 === 0;

            return (
              <article key={step.id} className="relative md:pl-14 lg:pl-20">
                <div
                  className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[var(--color-navy)] font-heading text-sm font-bold text-white shadow-[0_0_24px_-4px_rgba(56,189,248,0.35)] md:flex lg:left-3 lg:top-3 lg:h-11 lg:w-11"
                  aria-hidden
                >
                  {step.n}
                </div>

                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                  <div className={copyFirst ? 'lg:order-1' : 'lg:order-2'}>
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 'some', margin: '-60px' }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className={`glass-card relative overflow-hidden border ${step.borderGlow} p-8 shadow-[0_28px_90px_-30px_rgba(0,0,0,0.55)] sm:p-10`}
                    >
                      <div
                        className={`pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-gradient-to-br ${step.accentSoft} blur-3xl`}
                        style={{ opacity: 0.9 }}
                      />
                      <h2 className="relative mb-6 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-[1.85rem] md:leading-tight">
                        Step {step.n}: {step.title}
                      </h2>
                      <div className="relative space-y-4 font-sans text-base leading-relaxed text-gray-400 md:text-[1.05rem]">
                        {step.highlight && (
                          <p className="border-l-2 border-emerald-400/60 py-0.5 pl-4 font-heading text-lg font-semibold text-white md:text-xl">
                            {step.highlight}
                          </p>
                        )}
                        {step.paragraphs.map((p, pi) => (
                          <p key={`${step.id}-p-${pi}`}>{p}</p>
                        ))}
                      </div>

                      {step.id === 'prototype' && (
                        <motion.div
                          className="relative mt-8"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          <button
                            type="button"
                            onClick={() => openPrototype?.()}
                            className="btn-hero-cta inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                          >
                            Get my £49 prototype
                            <ArrowRight className="h-5 w-5" aria-hidden />
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  <motion.div
                    className={`relative min-h-[240px] rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 sm:p-8 lg:min-h-[280px] ${copyFirst ? 'lg:order-2' : 'lg:order-1'}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 'some' }}
                    transition={{ duration: 0.5, delay: 0.08 }}
                    whileHover={{ borderColor: 'rgba(255,255,255,0.16)' }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-40"
                      style={{
                        background: `radial-gradient(400px circle at 50% 0%, ${step.accent}, transparent 70%)`,
                      }}
                    />
                    <div className="relative">
                      <Graphic />
                    </div>
                  </motion.div>
                </div>
              </article>
            );
          })}
        </div>

        <motion.div
          className="mx-auto mt-20 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center md:mt-28"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 font-heading text-sm font-semibold text-cyan-300/90">The short version</p>
          <ul className="flex flex-col gap-3 font-sans text-sm text-gray-400 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-2">
            {[
              'Prototype in 24 hours',
              'Full build in days',
              'Launch on WhatsApp',
              'We never go quiet',
            ].map((t) => (
              <li key={t} className="flex items-center justify-center gap-2 sm:justify-start">
                <Check className="h-4 w-4 shrink-0 text-emerald-400/90" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
