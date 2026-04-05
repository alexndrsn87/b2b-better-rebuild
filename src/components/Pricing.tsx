import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'motion/react';
import {
  Ban,
  Check,
  FileStack,
  Infinity as InfinityIcon,
  KeyRound,
  Lock,
  MapPin,
  PhoneForwarded,
  Receipt,
  Server,
  Sparkles,
  Timer,
  TrendingUp,
} from 'lucide-react';
import { TextReveal } from './TextReveal';
import PrototypeOffer from './PrototypeOffer';

const tiers = [
  {
    id: 'found',
    title: 'Getting Found',
    tagline: 'For businesses that just need to exist online properly',
    forBody:
      'Getting Found is for the business owner who’s been meaning to sort their website for a while. You’re not after anything complicated — you just want to look professional online, have your phone number easy to find, and know that someone competent is looking after it. This does exactly that.',
    setup: 299,
    monthly: 25,
    popular: false,
    features: [
      '1-page professional site',
      'Domain setup',
      'Hosting included',
      'WhatsApp updates & support',
    ],
    accent: 'rgba(59, 130, 246, 0.35)',
    accentClass: 'from-blue-500/25 to-cyan-500/10',
    borderClass: 'border-blue-500/20',
    Icon: MapPin,
  },
  {
    id: 'win',
    title: 'Winning Work',
    tagline: 'For businesses that want their site to actively generate enquiries',
    forBody:
      'Winning Work is where most of our clients land. You want a site that doesn’t just exist — you want one that does something. Something that makes a visitor pick up the phone. We write the copy for you, build out the pages, and structure everything around getting you enquiries. This is the one.',
    setup: 399,
    monthly: 35,
    popular: true,
    features: [
      '4-page custom site',
      'Professional copy written for you',
      'Domain management',
      'Unlimited content updates',
      'Structured to drive enquiries',
    ],
    accent: 'rgba(6, 182, 212, 0.38)',
    accentClass: 'from-cyan-500/25 to-sky-500/10',
    borderClass: 'border-cyan-500/30',
    Icon: PhoneForwarded,
  },
  {
    id: 'authority',
    title: 'Owning Your Area',
    tagline: 'For businesses that want to dominate local search',
    forBody:
      'Owning Your Area is for the business that wants to be the first name people think of in their town. We set up your Google Business Profile, build your local SEO foundations, and send you a monthly report showing how you’re performing. For the business owner who is serious about growth.',
    setup: 599,
    monthly: 50,
    popular: false,
    features: [
      'Everything in Winning Work',
      'Google Business Profile setup',
      'Local SEO foundations',
      'Monthly performance reports',
    ],
    accent: 'rgba(168, 85, 247, 0.35)',
    accentClass: 'from-violet-500/25 to-fuchsia-500/10',
    borderClass: 'border-violet-500/25',
    Icon: TrendingUp,
  },
] as const;

const addOns = [
  { label: 'Extra Pages', price: '£49' },
  { label: 'Booking Widgets', price: '£75' },
  { label: 'Monthly Blog', price: '£60/mo' },
  { label: 'Social Media Graphics', price: '£75' },
];

type PricingProps = {
  onRequestPrototype?: () => void;
};

export default function Pricing({ onRequestPrototype }: PricingProps) {
  const rootRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(35);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 40 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 40 });
  const spotlight = useMotionTemplate`radial-gradient(900px circle at ${smoothX}% ${smoothY}%, rgba(168, 85, 247, 0.1) 0%, rgba(56, 189, 248, 0.08) 40%, transparent 58%)`;

  return (
    <section
      ref={rootRef}
      id="pricing"
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
          animate={{ opacity: [0.2, 0.42, 0.2], scale: [1, 1.08, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-32 top-[8%] h-[min(100vw,480px)] w-[min(100vw,480px)] rounded-full bg-violet-500/14 blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.18, 0.38, 0.18], y: [0, 32, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-[12%] right-0 h-96 w-96 rounded-full bg-cyan-500/12 blur-[90px]"
        />
        <motion.div className="absolute inset-0 opacity-[0.9]" style={{ background: spotlight }} />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '44px 44px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-24 px-4 sm:space-y-28 sm:px-6 md:space-y-32 lg:px-8">
        {/* Page hero */}
        <header className="mx-auto max-w-4xl text-center">
          <motion.p
            className="mb-5 font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400/90 sm:text-xs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            Pricing
          </motion.p>
          <h1 className="mb-8 font-heading text-[1.85rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.15rem] lg:leading-[1.08]">
            <TextReveal text="One clear price. Everything included. No surprises. Ever." />
          </h1>
        </header>

        {/* Section 1: What you’re NOT paying for */}
        <section aria-labelledby="pricing-not-paying-heading" className="relative">
          <div className="mb-12 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.55 }}
            >
              <h2
                id="pricing-not-paying-heading"
                className="mb-6 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl"
              >
                What you’re{' '}
                <span className="bg-gradient-to-r from-rose-300 via-orange-200 to-amber-200 bg-clip-text text-transparent">
                  not
                </span>{' '}
                paying for
              </h2>
              <div className="space-y-5 font-sans text-base leading-relaxed text-gray-400 md:text-lg">
                <p>
                  Most local businesses who &lsquo;have a website&rsquo; are actually paying for at least three
                  separate things: a build cost, a hosting bill, and an hourly rate every time they want something
                  changed. The agency that built it is often unreachable. The hosting company is a ticket system in a
                  foreign country.
                </p>
                <p className="font-medium text-gray-300">
                  With Built Better, there is one bill. It covers everything.
                </p>
                <p>
                  No hourly rates. No hosting invoices. No &lsquo;that&rsquo;ll cost extra&rsquo; for a phone number
                  change. One price, every month, for as long as you want us.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative order-1 flex min-h-[280px] items-center justify-center lg:order-2 lg:min-h-[340px]"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full max-w-md">
                {([Receipt, Server, Timer] as const).map((Icon, i) => (
                  <motion.div
                    key={['receipt', 'server', 'timer'][i]}
                    className="absolute left-1/2 flex w-[88%] -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 shadow-lg backdrop-blur-sm"
                    style={{ top: `${8 + i * 22}%`, zIndex: 3 - i }}
                    initial={{ opacity: 0, y: 16, rotate: -2 + i * 2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: -2 + i * 2 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.12, duration: 0.45 }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gray-400">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-heading text-sm font-semibold text-white/90">
                        {i === 0 ? 'Agency invoice' : i === 1 ? 'Hosting renewal' : 'Hourly change request'}
                      </p>
                      <p className="font-sans text-xs text-gray-500">Another login · another bill</p>
                    </div>
                    <Ban className="h-5 w-5 shrink-0 text-rose-400/80" aria-hidden />
                  </motion.div>
                ))}
                <motion.div
                  className="relative z-10 mx-auto mt-[62%] flex max-w-[78%] flex-col items-center gap-2 rounded-[1.35rem] border border-emerald-500/35 bg-gradient-to-b from-emerald-500/15 to-cyan-500/10 px-6 py-6 text-center shadow-[0_24px_60px_-20px_rgba(16,185,129,0.35)]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                >
                  <FileStack className="mx-auto h-9 w-9 text-emerald-300" strokeWidth={1.5} aria-hidden />
                  <p className="font-heading text-lg font-bold text-white">One bill. Everything in it.</p>
                  <p className="font-sans text-sm text-emerald-200/80">Build · hosting · updates · us on WhatsApp</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl">
          <PrototypeOffer onRequestPrototype={onRequestPrototype} />
        </div>

        {/* Section 2: The plans */}
        <section aria-labelledby="pricing-plans-heading">
          <motion.div
            className="mb-14 text-center md:mb-16"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              id="pricing-plans-heading"
              className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-[2.35rem]"
            >
              The plans
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-base text-gray-400 md:text-lg">
              Named for where you want your business to go — not a feature checklist you have to decode.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-7">
            {tiers.map((tier, index) => (
              <motion.article
                key={tier.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some', margin: '-40px' }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`relative flex flex-col overflow-hidden rounded-[1.75rem] border ${tier.borderClass} bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 shadow-[0_28px_80px_-28px_rgba(0,0,0,0.55)] md:p-9`}
              >
                <div
                  className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${tier.accentClass} blur-3xl opacity-90`}
                />
                {tier.popular && (
                  <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1.5 font-heading text-[10px] font-bold uppercase tracking-wider text-white shadow-lg ring-1 ring-white/25">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden />
                    Most popular
                  </div>
                )}
                <div className="relative mb-6 flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.08] text-cyan-200"
                    style={{ boxShadow: `0 0 40px -8px ${tier.accent}` }}
                  >
                    <tier.Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-white md:text-2xl">{tier.title}</h3>
                    <p className="mt-1 font-sans text-sm leading-snug text-gray-400 md:text-[0.9375rem]">
                      {tier.tagline}
                    </p>
                  </div>
                </div>
                <p className="relative mb-8 flex-1 font-sans text-sm leading-relaxed text-gray-400 md:text-[0.9375rem]">
                  {tier.forBody}
                </p>
                <div className="relative mb-6 border-t border-white/10 pt-6">
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="font-heading text-4xl font-extrabold tabular-nums text-white">£{tier.setup}</span>
                    <span className="font-sans text-sm text-gray-500">setup</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-2xl font-bold tabular-nums text-cyan-400">+ £{tier.monthly}</span>
                    <span className="font-sans text-gray-500">/month</span>
                  </div>
                </div>
                <ul className="relative mb-8 space-y-3 font-sans text-sm text-gray-300 md:text-[0.9375rem]">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" strokeWidth={2.25} aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onRequestPrototype?.()}
                  className={
                    tier.popular
                      ? 'btn-primary btn-shimmer relative z-10 mt-auto w-full py-3.5 text-base font-semibold'
                      : 'btn-secondary relative z-10 mt-auto w-full py-3.5 text-base font-semibold'
                  }
                >
                  {tier.popular ? 'Start with this plan' : 'Get started'}
                </button>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Section 3: Annual — rate lock framing */}
        <motion.section
          className="relative overflow-hidden rounded-[1.75rem] border border-violet-500/25 bg-gradient-to-br from-violet-500/[0.12] via-white/[0.04] to-cyan-500/[0.08] p-8 md:p-12 lg:p-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55 }}
        >
          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-violet-500/20 blur-[100px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-cyan-500/15 blur-[80px]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_280px] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200/90">
                <Lock className="h-3.5 w-3.5" aria-hidden />
                Annual
              </div>
              <h2 className="mb-6 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
                Pay annually. Lock your rate in forever.
              </h2>
              <div className="space-y-5 font-sans text-base leading-relaxed text-gray-300 md:text-lg">
                <p>
                  Annual subscribers pay for ten months and get twelve. But more importantly,{' '}
                  <span className="font-medium text-white">your rate never goes up</span>. While monthly prices may
                  change as we grow, your annual rate is yours permanently — as long as you remain a subscriber.
                </p>
                <p className="text-gray-400">
                  This is our way of rewarding the clients who commit to their online presence. And it saves you the
                  equivalent of two months every year.
                </p>
              </div>
            </div>
            <motion.div
              className="relative flex flex-col items-center justify-center rounded-2xl border border-white/12 bg-black/25 px-6 py-10 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.45 }}
            >
              <p className="mb-1 font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                Billed annually
              </p>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-6xl font-extrabold tabular-nums text-transparent bg-gradient-to-r from-cyan-200 via-white to-violet-200 bg-clip-text md:text-7xl">
                  10
                </span>
                <span className="font-heading text-lg font-bold text-white/90">months</span>
              </div>
              <p className="mt-2 max-w-[14rem] font-sans text-sm leading-snug text-gray-400">
                Covers a full year of us — your online presence for all twelve months.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-1.5" aria-hidden>
                {Array.from({ length: 12 }).map((_, d) => (
                  <span
                    key={d}
                    className={`h-2 w-2 rounded-full ${d < 10 ? 'bg-cyan-400/70' : 'bg-white/15 ring-1 ring-white/20'}`}
                  />
                ))}
              </div>
              <p className="mt-3 font-sans text-[11px] text-gray-500">Ten on the invoice · twelve in the calendar</p>
              <div className="mt-6 flex items-center gap-2 font-sans text-sm text-emerald-300/95">
                <InfinityIcon className="h-4 w-4 shrink-0" aria-hidden />
                Rate locked — not a promo, a guarantee
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 4: Buyout */}
        <motion.section
          className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.03] p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.5 }}
        >
          <div className="pointer-events-none absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 translate-x-1/4 rounded-full bg-amber-500/10 blur-[80px]" />
          <div className="relative grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-14">
            <div className="flex justify-center lg:justify-start">
              <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-amber-400/25 bg-gradient-to-br from-amber-500/15 to-orange-600/10 shadow-[0_20px_60px_-24px_rgba(245,158,11,0.35)]">
                <KeyRound className="h-14 w-14 text-amber-200/90" strokeWidth={1.25} aria-hidden />
              </div>
            </div>
            <div>
              <h2 className="mb-5 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-[2rem]">
                Prefer to own your website outright?
              </h2>
              <div className="space-y-4 font-sans text-base leading-relaxed text-gray-400 md:text-lg">
                <p>
                  We offer a one-off buyout option. You get the full site files, domain transfer, and a handover call.
                  After that, it&rsquo;s yours to do with as you like — host it wherever you want, update it however you
                  want.
                </p>
                <p className="text-gray-500">
                  We&rsquo;ll be honest: most clients find the managed subscription more convenient. But we&rsquo;d
                  rather you know the option exists.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10"
        >
          <h3 className="mb-2 text-center font-heading text-xl font-extrabold text-white md:text-2xl">Add-ons</h3>
          <p className="mb-8 text-center font-sans text-sm text-gray-500">
            Bolt on when you need them — no pressure.
          </p>
          <ul className="grid grid-cols-1 gap-3 font-sans sm:grid-cols-2">
            {addOns.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5"
              >
                <span className="text-sm text-gray-300 md:text-base">{item.label}</span>
                <span className="font-heading text-sm font-semibold tabular-nums text-white md:text-base">
                  {item.price}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
