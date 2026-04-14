import React, { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Building2,
  Handshake,
  Heart,
  MapPin,
  MessageCircle,
  Quote,
  ShieldCheck,
  Smartphone,
  Sparkles,
  X,
} from 'lucide-react';
import { TextReveal } from '../components/TextReveal';

const beliefs: { title: string; body: string; Icon: LucideIcon }[] = [
  {
    title: 'A website shouldn’t require a manual.',
    body: 'If you need a PDF to update your opening hours, something’s wrong.',
    Icon: BookOpen,
  },
  {
    title: 'Your time is worth more than learning a CMS.',
    body: 'You’re running a business — not studying for a web design exam.',
    Icon: ShieldCheck,
  },
  {
    title: 'Honesty about what we can’t do beats selling you everything.',
    body: 'We’d rather lose a sale than sell you the wrong thing.',
    Icon: Handshake,
  },
  {
    title: 'Local businesses are the backbone of the UK.',
    body: 'They deserve sites that look as serious as the work they do.',
    Icon: MapPin,
  },
  {
    title: 'If we’re not the right fit, we’ll tell you.',
    body: 'No hard sell. Life’s too short for awkward retainers.',
    Icon: Heart,
  },
];

const dontOffer = [
  'E-commerce shops',
  'Custom web applications',
  'Social media management',
  'Google Ads',
] as const;

export default function AboutPage() {
  const { openPrototype } = useOutletContext<{ openPrototype: () => void }>();
  const rootRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(35);
  const smoothX = useSpring(mouseX, { stiffness: 48, damping: 38 });
  const smoothY = useSpring(mouseY, { stiffness: 48, damping: 38 });
  const spotlight = useMotionTemplate`radial-gradient(880px circle at ${smoothX}% ${smoothY}%, rgba(251, 146, 60, 0.09) 0%, rgba(56, 189, 248, 0.08) 42%, transparent 58%)`;

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
        mouseY.set(35);
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.06, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-24 top-[6%] h-[min(100vw,460px)] w-[min(100vw,460px)] rounded-full bg-orange-500/12 blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.18, 0.36, 0.18], y: [0, 28, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[10%] left-0 h-80 w-80 rounded-full bg-cyan-500/11 blur-[90px]"
        />
        <motion.div className="absolute inset-0 opacity-[0.9]" style={{ background: spotlight }} />
        <div
          className="absolute inset-0 opacity-[0.032]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '44px 44px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-24 px-4 sm:space-y-28 sm:px-6 md:space-y-32 lg:px-8">
        <header className="mx-auto max-w-4xl text-center">
          <h1 className="mb-10 font-heading text-[1.85rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.1rem] lg:leading-[1.08]">
            <TextReveal text="Here’s the truth about Built Better." />
          </h1>
        </header>

        {/* Opening truth + contrast graphic */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="space-y-6 font-sans text-base leading-relaxed text-gray-400 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55 }}
          >
            <p>
              Most web agencies were built for big businesses. They have account managers, project managers,
              designers, developers, and a coffee machine that costs more than your first car. They charge accordingly.
            </p>
            <p>
              For a local plumber, a personal trainer, or a family-run shop — that&rsquo;s overkill. You don&rsquo;t
              need a £5,000 website with a three-month timeline. You need something that looks brilliant, loads fast on
              a phone, and can be updated without logging into anything.
            </p>
            <p className="font-medium text-gray-300">
              Built Better exists because that thing didn&rsquo;t exist at a price that made sense, with a process that
              wasn&rsquo;t painful.
            </p>
          </motion.div>

          <motion.div
            className="relative flex min-h-[300px] items-center justify-center lg:min-h-[360px]"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative grid w-full max-w-md grid-cols-2 gap-4">
              <motion.div
                className="relative flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="mb-2 flex items-center gap-2 text-gray-500">
                  <Building2 className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  <span className="font-heading text-[10px] font-semibold uppercase tracking-widest">The usual</span>
                </div>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-2 rounded-full bg-white/[0.08]"
                    style={{ width: `${100 - i * 12}%` }}
                  />
                ))}
                <p className="mt-3 font-sans text-[11px] leading-snug text-gray-600">
                  Layers of people · layers of cost · layers of waiting
                </p>
              </motion.div>
              <motion.div
                className="relative flex flex-col items-center justify-center rounded-2xl border border-cyan-500/25 bg-gradient-to-b from-cyan-500/10 to-white/[0.03] p-5 shadow-[0_24px_60px_-24px_rgba(34,211,238,0.2)]"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Smartphone className="mb-3 h-12 w-12 text-cyan-300/90" strokeWidth={1.25} aria-hidden />
                <p className="text-center font-heading text-sm font-bold text-white">What you actually need</p>
                <p className="mt-1 text-center font-sans text-xs text-cyan-200/75">Fast · clear · someone on WhatsApp</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Founder */}
        <motion.section
          className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-orange-500/[0.06] p-8 md:p-12 lg:p-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55 }}
        >
          <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-orange-500/15 blur-[80px]" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-[70px]" />
          <div className="relative grid gap-10 lg:grid-cols-[200px_1fr] lg:gap-14">
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="flex h-44 w-44 items-center justify-center rounded-3xl border border-white/15 bg-[var(--color-navy)]/80 font-heading text-4xl font-extrabold text-white shadow-2xl ring-2 ring-orange-400/20 sm:h-48 sm:w-48 sm:text-5xl">
                  A
                </div>
                <div className="absolute -bottom-2 -right-2 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-orange-200 shadow-lg backdrop-blur-sm">
                  <Quote className="h-5 w-5" aria-hidden />
                </div>
                <p className="mt-3 text-center font-sans text-[11px] text-gray-500 lg:text-left">
                  Swap this block for a photo whenever you&rsquo;re ready.
                </p>
              </div>
            </div>
            <div>
              <h2 className="mb-6 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                From me
              </h2>
              <div className="space-y-5 font-sans text-base leading-relaxed text-gray-400 md:text-lg">
                <p className="text-white/95">
                  I&rsquo;m <span className="font-semibold text-white">Alex</span>. I run Built Better.
                </p>
                <p>
                  I didn&rsquo;t start this to &ldquo;disrupt the web industry&rdquo; — I started it because I kept
                  watching people I know get quoted silly money and silly timelines for something that should be
                  straightforward: a site that looks like they give a damn, loads properly on a phone, and doesn&rsquo;t
                  need a manual when the number on the door changes.
                </p>
                <p>
                  The market felt like a split screen: DIY tools that all look the same, or agencies pricing like
                  you&rsquo;re a bank. Neither side seemed embarrassed about leaving a small shop waiting weeks for a
                  tiny text change.
                </p>
                <p>
                  The moment that really stuck was a friend sliding their laptop across a caf&eacute; table and showing
                  me an invoice for a &ldquo;content update&rdquo; — a few lines and a new opening hour. They&rsquo;d
                  waited twelve days. I remember thinking:{' '}
                  <span className="italic text-gray-300">
                    that isn&rsquo;t a service problem; that&rsquo;s someone being treated like a ticket number.
                  </span>
                </p>
                <p>
                  So Built Better is my answer to that — one clear offer, fixed pricing, WhatsApp instead of portals,
                  and the £49 prototype so you can see real work before you commit. If we&rsquo;re not the right fit,
                  I&rsquo;d rather say so early than waste your time.
                </p>
              </div>
              <motion.button
                type="button"
                onClick={() => openPrototype?.()}
                className="btn-hero-cta mt-8 w-full sm:w-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                See it for yourself — £49 prototype
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* What we believe */}
        <section aria-labelledby="about-believe-heading">
          <motion.h2
            id="about-believe-heading"
            className="mb-4 text-center font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What we believe
          </motion.h2>
          <motion.p
            className="mx-auto mb-12 max-w-xl text-center font-sans text-sm text-gray-500 md:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            Short lines. Meant to be read by humans, not search robots.
          </motion.p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((b, i) => (
              <motion.li
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                whileHover={{ y: -4 }}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.45)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-orange-400/20 bg-orange-500/10 text-orange-200">
                  <b.Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-white">{b.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-gray-500">{b.body}</p>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* What we don't do */}
        <motion.section
          className="relative overflow-hidden rounded-[1.75rem] border border-rose-500/20 bg-gradient-to-b from-rose-500/[0.07] to-white/[0.02] p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.5 }}
        >
          <div className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 translate-x-1/3 rounded-full bg-rose-500/10 blur-[90px]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-200/90">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                Costly signalling
              </div>
              <h2 className="mb-6 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
                What we don&rsquo;t do
              </h2>
              <div className="space-y-5 font-sans text-base leading-relaxed text-gray-400 md:text-lg">
                <p>
                  We don&rsquo;t do e-commerce shops. We don&rsquo;t do custom web applications. We don&rsquo;t do
                  social media management. We don&rsquo;t do Google Ads.
                </p>
                <p className="font-medium text-gray-300">
                  We do one thing: professional, managed websites for local UK businesses. We do it very well, and
                  we&rsquo;re focused on it entirely.
                </p>
                <p className="flex items-start gap-2 text-gray-500">
                  <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400/80" aria-hidden />
                  If you need something we don&rsquo;t offer, we&rsquo;ll point you in the right direction.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {dontOffer.map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + i * 0.07 }}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3.5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-500/15 text-rose-300">
                    <X className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                  </div>
                  <span className="font-sans text-sm font-medium text-gray-300 md:text-base">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
}
