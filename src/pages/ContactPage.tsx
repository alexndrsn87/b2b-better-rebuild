import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'motion/react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  ExternalLink,
  Mail,
  MessageCircle,
  Sparkles,
  Zap,
} from 'lucide-react';
import { TextReveal } from '../components/TextReveal';
import {
  whatsappDisplayLabel,
  whatsappUrlWithPrefill,
} from '../lib/whatsapp';

const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL?.trim() || 'hello@built-better.co.uk';

const WHATSAPP_HREF = whatsappUrlWithPrefill();
const WHATSAPP_LABEL = whatsappDisplayLabel();

const nextSteps = [
  {
    title: 'You message us',
    body: 'WhatsApp or email — whichever feels easier. No form fields, no login.',
    Icon: MessageCircle,
    accent: 'text-emerald-300',
    ring: 'from-emerald-500/30 to-teal-500/10',
  },
  {
    title: 'We reply within three hours',
    body: 'During business hours, usually faster. A clear window beats “we’ll be in touch”.',
    Icon: Clock,
    accent: 'text-cyan-300',
    ring: 'from-cyan-500/30 to-sky-500/10',
  },
  {
    title: 'A few quick questions',
    body: 'We’ll understand what you need. If it’s a good fit, we’ll get your prototype started.',
    Icon: Zap,
    accent: 'text-violet-300',
    ring: 'from-violet-500/30 to-fuchsia-500/10',
  },
  {
    title: 'No sales theatre',
    body: 'No 45-minute discovery call. Just a straightforward conversation — then we build.',
    Icon: Sparkles,
    accent: 'text-amber-300',
    ring: 'from-amber-500/30 to-orange-500/10',
  },
];

function ContactHeroGraphic() {
  return (
    <div className="pointer-events-none absolute right-[-8%] top-1/2 hidden w-[min(52vw,420px)] -translate-y-1/2 lg:block" aria-hidden>
      <svg viewBox="0 0 400 400" className="h-auto w-full opacity-[0.55]">
        <defs>
          <linearGradient id="cg-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.9" />
            <stop offset="55%" stopColor="rgb(167, 139, 250)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(52, 211, 153)" stopOpacity="0.35" />
          </linearGradient>
          <radialGradient id="cg-glow" cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="rgb(56, 189, 248)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(15, 23, 42)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="160" fill="url(#cg-glow)" />
        <motion.path
          d="M 48 220 Q 120 80 220 140 T 360 200"
          fill="none"
          stroke="url(#cg-stroke)"
          strokeWidth="1.25"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="118"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        />
        <motion.circle
          cx="200"
          cy="200"
          r="86"
          fill="none"
          stroke="rgba(56,189,248,0.12)"
          strokeWidth="1"
          animate={{ rotate: [0, 6, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '200px 200px' }}
        />
      </svg>
    </div>
  );
}

function ChannelDecal({ variant }: { variant: 'wa' | 'mail' | 'proto' }) {
  if (variant === 'wa') {
    return (
      <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 opacity-50" aria-hidden>
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <defs>
            <linearGradient id="wa-d" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(52, 211, 153)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path
            d="M 20 70 Q 8 40 28 22 Q 48 4 78 12 Q 108 20 112 52 Q 116 84 88 98 Q 60 112 32 96 L 12 108 L 20 70 Z"
            fill="url(#wa-d)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />
        </svg>
      </div>
    );
  }
  if (variant === 'mail') {
    return (
      <div className="pointer-events-none absolute -left-4 bottom-0 h-24 w-32 opacity-40" aria-hidden>
        <svg viewBox="0 0 140 100" className="h-full w-full">
          <path
            d="M 8 28 L 70 62 L 132 28 M 8 28 L 8 78 L 132 78 L 132 28"
            fill="none"
            stroke="rgba(147, 197, 253, 0.35)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
  return (
    <div className="pointer-events-none absolute right-4 top-1/2 h-36 w-36 -translate-y-1/2 opacity-35" aria-hidden>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <linearGradient id="p-d" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(251, 191, 36)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="rgb(244, 114, 182)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <rect x="12" y="18" width="76" height="64" rx="14" fill="url(#p-d)" stroke="rgba(255,255,255,0.1)" />
        <path d="M 28 42 H 72 M 28 56 H 62 M 28 70 H 52" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function ContactPage() {
  const { openPrototype } = useOutletContext<{ openPrototype: () => void }>();
  const rootRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(40);
  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 38 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 38 });
  const spotlight = useMotionTemplate`radial-gradient(780px circle at ${smoothX}% ${smoothY}%, rgba(52, 211, 153, 0.09) 0%, rgba(56, 189, 248, 0.08) 38%, transparent 55%)`;

  return (
    <section
      ref={rootRef}
      className="relative z-10 overflow-x-clip py-[var(--section-py)]"
      onPointerMove={(e) => {
        if (!rootRef.current) return;
        const rect = rootRef.current.getBoundingClientRect();
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
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-24 top-[6%] h-[min(100vw,400px)] w-[min(100vw,400px)] rounded-full bg-emerald-500/11 blur-[96px]"
        />
        <motion.div
          animate={{ opacity: [0.18, 0.34, 0.18], y: [0, 22, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute bottom-[6%] right-[-5%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[100px]"
        />
        <motion.div className="absolute inset-0 opacity-[0.92]" style={{ background: spotlight }} />
        <div
          className="absolute inset-0 opacity-[0.038]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.p
          className="mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-sans text-sm text-gray-400 transition-colors hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to home
          </Link>
        </motion.p>

        <header className="relative mb-14 md:mb-20">
          <ContactHeroGraphic />
          <motion.p
            className="mb-4 font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-400/90 sm:text-xs"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Contact
          </motion.p>
          <h1 className="relative z-10 mb-6 max-w-[22ch] font-heading text-[1.85rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.15rem]">
            <TextReveal text="Let's talk. No commitment required." />
          </h1>
          <motion.div
            className="relative z-10 max-w-xl space-y-4 font-sans text-base leading-relaxed text-gray-400 md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.45 }}
          >
            <p className="flex flex-wrap items-center gap-2 text-gray-300">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-500/10 text-emerald-300">
                <Clock className="h-4 w-4" strokeWidth={2} aria-hidden />
              </span>
              <span>
                We typically reply within <strong className="font-semibold text-white">three hours</strong> during
                business hours. Usually faster.
              </span>
            </p>
            <p className="text-sm text-gray-500 md:text-base">
              That isn&apos;t small talk — it&apos;s our way of saying we&apos;re here and we mean it.
            </p>
          </motion.div>
        </header>

        <motion.h2
          className="mb-8 font-heading text-xl font-bold text-white sm:text-2xl"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Three ways to reach us
        </motion.h2>

        <div className="mb-20 grid gap-6 md:grid-cols-3">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.04] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-emerald-400/35"
          >
            <ChannelDecal variant="wa" />
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/25 to-teal-500/10 text-emerald-300 ring-1 ring-white/10">
              <MessageCircle className="h-7 w-7" strokeWidth={1.75} aria-hidden />
            </div>
            <h3 className="relative z-10 mt-6 font-heading text-lg font-bold text-white">WhatsApp</h3>
            <p className="relative z-10 mt-1 font-mono text-sm text-emerald-200/90">{WHATSAPP_LABEL}</p>
            <p className="relative z-10 mt-4 font-sans text-sm leading-relaxed text-gray-400">
              The fastest way. We usually reply within a few hours.
            </p>
            <p className="relative z-10 mt-3 text-xs text-gray-500">
              Opens with your first message ready — nothing to type unless you want to.
            </p>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500/90 py-3.5 font-sans text-sm font-semibold text-[var(--color-navy)] shadow-lg shadow-emerald-500/20 transition-[transform,filter] hover:brightness-110 active:scale-[0.98] sm:text-base"
            >
              Chat on WhatsApp
              <ExternalLink className="h-4 w-4 opacity-90" aria-hidden />
            </a>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.04] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-cyan-400/35"
          >
            <ChannelDecal variant="mail" />
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/25 to-sky-500/10 text-cyan-300 ring-1 ring-white/10">
              <Mail className="h-7 w-7" strokeWidth={1.75} aria-hidden />
            </div>
            <h3 className="relative z-10 mt-6 font-heading text-lg font-bold text-white">Email</h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="relative z-10 mt-1 inline-block font-mono text-sm text-cyan-200/90 underline decoration-cyan-500/30 underline-offset-2 transition-colors hover:text-cyan-100"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="relative z-10 mt-4 font-sans text-sm leading-relaxed text-gray-400">
              If you prefer to write.
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="group relative overflow-hidden rounded-3xl border border-amber-400/25 bg-gradient-to-b from-amber-500/[0.12] to-white/[0.03] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-amber-400/45"
          >
            <ChannelDecal variant="proto" />
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/35 to-orange-500/15 text-amber-200 ring-1 ring-amber-400/25">
              <Sparkles className="h-7 w-7" strokeWidth={1.75} aria-hidden />
            </div>
            <p className="relative z-10 mt-4 inline-flex rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-amber-200/95">
              Best next step
            </p>
            <h3 className="relative z-10 mt-3 font-heading text-lg font-bold text-white">The £49 prototype</h3>
            <p className="relative z-10 mt-4 font-sans text-sm leading-relaxed text-gray-300">
              The best way to see what we can do — with zero risk.
            </p>
            <button
              type="button"
              onClick={() => openPrototype()}
              className="relative z-10 mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-amber-400/40 bg-amber-400/15 py-3.5 font-sans text-sm font-semibold text-amber-100 transition-[transform,background-color] hover:bg-amber-400/25 active:scale-[0.98] sm:text-base"
            >
              Start the £49 prototype
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </motion.article>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-12"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(56,189,248,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.35) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
            aria-hidden
          />
          <div className="relative z-10 mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">What happens next</h2>
            <p className="max-w-md font-sans text-sm text-gray-400">
              Straight line from first message to something you can actually look at — no funnel, no pressure.
            </p>
          </div>

          <ol className="relative z-10 grid gap-0 md:grid-cols-2">
            {nextSteps.map(({ title, body, Icon, accent, ring }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="relative flex gap-5 border-t border-white/[0.08] py-8 first:border-t-0 md:odd:border-r md:odd:pr-10 md:even:pl-10 md:[&:nth-child(-n+2)]:border-t-0"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${ring} ring-1 ring-white/10`}
                >
                  <Icon className={`h-6 w-6 ${accent}`} strokeWidth={1.75} aria-hidden />
                </div>
                <div>
                  <p className="font-heading text-base font-semibold text-white md:text-lg">{title}</p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-gray-400 md:text-base">{body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>

        <motion.p
          className="mt-12 text-center font-sans text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Prefer the dedicated WhatsApp page?{' '}
          <Link to="/whatsapp" className="text-cyan-400 underline decoration-cyan-500/30 underline-offset-2 hover:text-cyan-300">
            Open it here
          </Link>
          .
        </motion.p>
      </div>
    </section>
  );
}
