import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Ban,
  Check,
  FileStack,
  KeyRound,
  Lock,
  MapPin,
  MessageCircle,
  PhoneForwarded,
  Receipt,
  Server,
  Sparkles,
  Timer,
  TrendingUp,
  X,
} from 'lucide-react';
import { TextReveal } from './TextReveal';
import { whatsappUrlWithPrefill } from '../lib/whatsapp';

const BUYOUT_WHATSAPP = whatsappUrlWithPrefill(
  undefined,
  "Hi — I'd like to ask about the buyout option for my website.",
);

type PricingProps = {
  onRequestPrototype?: () => void;
};

const contrastRows: { feature: string; bb: boolean; agency: boolean }[] = [
  { feature: 'Fixed monthly price', bb: true, agency: false },
  { feature: 'See it before you commit', bb: true, agency: false },
  { feature: 'Live in 5 working days', bb: true, agency: false },
  { feature: 'Updates via WhatsApp', bb: true, agency: false },
  { feature: 'Hosting included', bb: true, agency: false },
  { feature: 'No hourly rates', bb: true, agency: false },
  { feature: 'No surprise invoices', bb: true, agency: false },
  { feature: 'Price-locked forever (annual)', bb: true, agency: false },
];

const planIntros = [
  {
    id: 'found',
    title: 'Getting Found',
    Icon: MapPin,
    accent: 'from-sky-500/20 to-cyan-500/10',
    border: 'border-white/12',
    body: (
      <>
        <p>
          Getting Found is for the business owner who&rsquo;s been meaning to sort this for a while. You don&rsquo;t
          need anything complicated. You need to exist online properly — with a number people can find, a site that loads
          on a phone, and the confidence that someone competent is looking after it.
        </p>
        <p className="text-gray-500">
          You&rsquo;re not trying to dominate Google. You just want to{' '}
          <span className="font-medium text-gray-300">stop being invisible</span>.
        </p>
      </>
    ),
  },
  {
    id: 'win',
    title: 'Winning Work',
    Icon: PhoneForwarded,
    popular: true,
    accent: 'from-orange-500/25 to-amber-500/12',
    border: 'border-orange-400/45',
    body: (
      <>
        <p>
          Winning Work is where most of our clients land. You don&rsquo;t just want a website that exists — you want one
          that makes people pick up the phone. We write the copy for you, build out the pages, and structure everything
          around one goal: turning visitors into enquiries.
        </p>
        <p className="font-medium text-orange-100/90">
          The most popular plan. And the one we&rsquo;d recommend for most local businesses.
        </p>
      </>
    ),
  },
  {
    id: 'own',
    title: 'Owning Your Area',
    Icon: TrendingUp,
    accent: 'from-violet-500/20 to-fuchsia-500/10',
    border: 'border-violet-400/25',
    body: (
      <>
        <p>
          Owning Your Area is for the business that wants to be the first name people think of in their town. We set up
          your Google Business Profile, lay the local SEO foundations, and send you a monthly report so you can see
          exactly how you&rsquo;re performing. For the business owner who is serious about growth.
        </p>
        <p className="text-gray-500">
          If you want to <span className="font-medium text-violet-200/90">dominate</span> your local area online, this
          is how you start.
        </p>
      </>
    ),
  },
];

/** Single-icon cells use ICON_CHECK / ICON_X; otherwise plain string. */
type Cell = string;

const detailRows: { label: string; cells: [Cell, Cell, Cell, Cell] }[] = [
  {
    label: "Who it's for",
    cells: [
      'Just starting out or keeping it simple',
      'Most local businesses that want work coming in',
      'Serious about dominating your local area',
      'Prefer to own outright with no monthly fee',
    ],
  },
  { label: 'Setup fee', cells: ['£299', '£499', '£799', 'Setup + buyout'] },
  { label: 'Monthly', cells: ['£49/mo', '£89/mo', '£149/mo', 'None'] },
  {
    label: 'Annual (pay upfront)',
    cells: ['£490/yr', '£890/yr — save £178', '£1,490/yr — save £298', 'n/a'],
  },
  { label: 'Pages', cells: ['3 pages', '6 pages', '6 pages', 'As chosen plan'] },
  {
    label: 'Copy written for you',
    cells: ['ICON_X', 'ICON_CHECK', 'ICON_CHECK', 'Quoted separately'],
  },
  {
    label: 'Domain management',
    cells: ['ICON_CHECK', '✓ Included', '✓ Included', '✓ Transferred to you'],
  },
  {
    label: 'Hosting & security',
    cells: ['✓ Included', '✓ Included', '✓ Included', 'Your responsibility'],
  },
  {
    label: 'Unlimited WhatsApp updates',
    cells: ['ICON_CHECK', 'ICON_CHECK', 'ICON_CHECK', '✗ Pay per change'],
  },
  {
    label: 'Google Business Profile setup',
    cells: ['ICON_X', 'ICON_X', '✓ Included', 'ICON_X'],
  },
  {
    label: 'Local SEO foundations',
    cells: ['Basic', 'Strong foundations', 'Full local SEO pack', 'Basic'],
  },
  {
    label: 'Monthly performance report',
    cells: ['ICON_X', 'ICON_X', '✓ Included', 'ICON_X'],
  },
  {
    label: 'Price-locked forever (annual)',
    cells: ['ICON_CHECK', '✓ Yes', '✓ Yes', 'n/a'],
  },
];

const addOns = [
  { label: 'Extra page', price: '£49', notes: 'Added any time' },
  { label: 'Booking widget', price: '£75 one-off', notes: 'Calendly, Acuity, etc.' },
  { label: 'Monthly blog post', price: '£60/mo', notes: 'Written & published for you' },
  { label: 'Social media graphics pack', price: '£75/mo', notes: '4 branded posts per month' },
  { label: 'Logo design', price: '£199 one-off', notes: '3 concepts, 2 revision rounds' },
  {
    label: 'Priority 24hr update turnaround',
    price: '£20/mo add-on',
    notes: 'Jump the queue on any changes',
  },
];

function CellContent({ value, hero }: { value: Cell; hero: boolean }) {
  if (value === 'ICON_CHECK') {
    return <Check className="mx-auto h-5 w-5 text-emerald-400" strokeWidth={2.5} aria-label="Included" />;
  }
  if (value === 'ICON_X') {
    return <X className="mx-auto h-5 w-5 text-rose-400/85" strokeWidth={2.25} aria-label="Not included" />;
  }
  if (value === 'n/a') {
    return <span className="text-gray-500">n/a</span>;
  }
  if (value.startsWith('✓')) {
    return <span className={hero ? 'text-orange-50/95' : 'text-emerald-200/90'}>{value}</span>;
  }
  if (value.startsWith('✗')) {
    return <span className={hero ? 'text-orange-100/90' : 'text-rose-200/80'}>{value}</span>;
  }
  return <span className={hero ? 'text-orange-50/95' : 'text-gray-300'}>{value}</span>;
}

function PricingHeroArt() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-[42%] hidden w-[min(90vw,520px)] -translate-x-1/2 md:block" aria-hidden>
      <svg viewBox="0 0 520 320" className="h-auto w-full opacity-[0.4]">
        <defs>
          <linearGradient id="ph-g" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="rgb(56, 189, 248)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(251, 146, 60)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(52, 211, 153)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 40 200 Q 140 60 260 120 T 480 100"
          fill="none"
          stroke="url(#ph-g)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx="260"
          cy="120"
          r="4"
          fill="rgb(251, 146, 60)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        />
      </svg>
    </div>
  );
}

function JourneyRibbon() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[52%] -z-10 hidden h-px lg:block" aria-hidden>
      <svg className="h-8 w-full text-white/[0.07]" preserveAspectRatio="none" viewBox="0 0 1200 32">
        <motion.path
          d="M 0 16 Q 300 4 600 16 T 1200 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        />
      </svg>
    </div>
  );
}

export default function Pricing({ onRequestPrototype }: PricingProps) {
  const rootRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(32);
  const smoothX = useSpring(mouseX, { stiffness: 48, damping: 38 });
  const smoothY = useSpring(mouseY, { stiffness: 48, damping: 38 });
  const spotlight = useMotionTemplate`radial-gradient(920px circle at ${smoothX}% ${smoothY}%, rgba(251, 146, 60, 0.07) 0%, rgba(56, 189, 248, 0.09) 42%, transparent 58%)`;

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
        mouseY.set(32);
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ opacity: [0.14, 0.32, 0.14], scale: [1, 1.05, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-[20%] top-[4%] h-[min(110vw,520px)] w-[min(110vw,520px)] rounded-full bg-orange-500/10 blur-[110px]"
        />
        <motion.div
          animate={{ opacity: [0.16, 0.3, 0.16], y: [0, 28, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute bottom-[8%] right-[-12%] h-[420px] w-[420px] rounded-full bg-cyan-500/11 blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="absolute left-1/3 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet-500/8 blur-[90px]"
        />
        <motion.div className="absolute inset-0 opacity-[0.92]" style={{ background: spotlight }} />
        <div
          className="absolute inset-0 opacity-[0.034]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.42) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-24 px-4 sm:space-y-28 sm:px-6 md:space-y-32 lg:px-8">
        {/* SECTION 1 — Hero (no pricing table) */}
        <header className="relative mx-auto max-w-4xl pb-8 text-center md:pb-16">
          <PricingHeroArt />
          <motion.p
            className="relative z-10 mb-5 font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400/85 sm:text-xs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            Clarity first
          </motion.p>
          <h1 className="relative z-10 mb-8 font-heading text-[1.85rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.2rem] lg:leading-[1.08]">
            <span className="block">
              <TextReveal text="One clear price. Everything included. No surprises." />
            </span>
            <motion.span
              className="mt-2 inline-block font-extrabold text-orange-400"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Ever.
            </motion.span>
          </h1>
          <motion.div
            className="relative z-10 mx-auto max-w-2xl space-y-4 font-sans text-base leading-relaxed text-gray-400 md:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <p className="text-gray-300">
              No hourly rates. No hosting invoices. No &lsquo;that&rsquo;ll cost extra.&rsquo; Just one monthly fee that
              covers your site, your hosting, your security, and your updates. Permanently.
            </p>
          </motion.div>
        </header>

        {/* SECTION 2 — Contrast */}
        <section aria-labelledby="pricing-contrast-heading" className="relative">
          <motion.div
            className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              id="pricing-contrast-heading"
              className="font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-[2.15rem]"
            >
              What you&rsquo;re{' '}
              <span className="bg-gradient-to-r from-rose-200 via-orange-200 to-amber-100 bg-clip-text text-transparent">
                not
              </span>{' '}
              paying for
            </h2>
            <p className="mt-3 font-heading text-sm font-medium uppercase tracking-[0.18em] text-gray-500 sm:text-xs">
              Most local businesses are paying for three things when they think they&rsquo;re paying for one.
            </p>
          </motion.div>

          <div className="mb-12 grid gap-12 lg:grid-cols-[1fr_minmax(260px,340px)] lg:items-center lg:gap-14">
            <motion.div
              className="mx-auto max-w-3xl space-y-5 font-sans text-base leading-relaxed text-gray-400 md:text-lg lg:mx-0"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p>
                A traditional agency charges a build fee. Then a hosting fee. Then an hourly rate every time you want
                something changed. And the agency that was so attentive pre-sale? Gone. You&rsquo;re in a ticket system
                now. Add it up over 12 months and the average local business website costs between{' '}
                <span className="text-gray-300">£3,000 and £10,000 in year one</span>. For a site that might not even
                work properly on a phone.
              </p>
              <p className="text-gray-300">
                Built Better wraps everything — design, hosting, security, updates, support — into one fixed monthly fee.
                So you always know what you&rsquo;re paying. And you never deal with a ticket system.
              </p>
            </motion.div>

            <motion.div
              className="relative mx-auto flex min-h-[260px] w-full max-w-sm items-center justify-center lg:mx-0 lg:max-w-none"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              aria-hidden
            >
              <div className="relative h-[220px] w-full max-w-[300px]">
                {([Receipt, Server, Timer] as const).map((Icon, i) => (
                  <motion.div
                    key={['receipt', 'server', 'timer'][i]}
                    className="absolute left-1/2 flex w-[92%] -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 shadow-lg backdrop-blur-sm"
                    style={{ top: `${6 + i * 22}%`, zIndex: 3 - i }}
                    initial={{ opacity: 0, y: 14, rotate: -2 + i * 2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: -2 + i * 2 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 + i * 0.1, duration: 0.45 }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gray-400">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-heading text-xs font-semibold text-white/90 sm:text-sm">
                        {i === 0 ? 'Build invoice' : i === 1 ? 'Hosting renewal' : 'Hourly change'}
                      </p>
                      <p className="font-sans text-[10px] text-gray-500 sm:text-xs">Separate · another login</p>
                    </div>
                    <Ban className="h-4 w-4 shrink-0 text-rose-400/75 sm:h-5 sm:w-5" />
                  </motion.div>
                ))}
                <motion.div
                  className="absolute bottom-0 left-1/2 z-10 w-[88%] -translate-x-1/2 rounded-[1.25rem] border border-emerald-500/35 bg-gradient-to-b from-emerald-500/15 to-cyan-500/10 px-5 py-4 text-center shadow-[0_20px_50px_-18px_rgba(16,185,129,0.35)]"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <FileStack className="mx-auto h-8 w-8 text-emerald-300" strokeWidth={1.5} />
                  <p className="mt-2 font-heading text-sm font-bold text-white sm:text-base">One fee. All of it.</p>
                  <p className="mt-0.5 font-sans text-[10px] text-emerald-200/75 sm:text-xs">Design · host · secure · WhatsApp</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] shadow-[0_32px_100px_-40px_rgba(0,0,0,0.55)] backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left font-sans text-sm md:text-base">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-4 pl-5 font-heading font-semibold text-gray-500 md:px-6 md:py-5 md:pl-8" />
                    <th className="px-4 py-4 font-heading text-base font-bold text-white md:px-6 md:text-lg">
                      Built Better
                    </th>
                    <th className="px-4 py-4 pr-5 font-heading text-base font-bold text-gray-400 md:px-6 md:pr-8 md:text-lg">
                      Traditional agency
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contrastRows.map((row, i) => (
                    <tr key={row.feature} className="border-b border-white/[0.06] last:border-0">
                      <th
                        scope="row"
                        className="px-4 py-3.5 pl-5 font-medium text-gray-300 md:px-6 md:py-4 md:pl-8 md:font-normal"
                      >
                        {row.feature}
                      </th>
                      <td className="px-4 py-3.5 md:px-6 md:py-4">
                        {row.bb ? (
                          <Check className="h-5 w-5 text-emerald-400" strokeWidth={2.5} aria-label="Yes" />
                        ) : (
                          <X className="h-5 w-5 text-rose-400/80" strokeWidth={2.25} aria-label="No" />
                        )}
                      </td>
                      <td className="px-4 py-3.5 pr-5 md:px-6 md:py-4 md:pr-8">
                        {row.agency ? (
                          <Check className="h-5 w-5 text-emerald-400/50" strokeWidth={2.5} aria-label="Yes" />
                        ) : (
                          <X className="h-5 w-5 text-rose-400/75" strokeWidth={2.25} aria-label="No" />
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-white/10 bg-white/[0.02]">
                    <th scope="row" className="px-4 py-4 pl-5 text-left font-medium text-gray-200 md:px-6 md:pl-8">
                      Typical setup cost
                    </th>
                    <td className="px-4 py-4 font-heading font-semibold tabular-nums text-emerald-300 md:px-6">
                      From £299
                    </td>
                    <td className="px-4 py-4 pr-5 font-heading tabular-nums text-gray-400 md:px-6 md:pr-8">
                      £2,000 – £8,000
                    </td>
                  </tr>
                  <tr className="bg-white/[0.02]">
                    <th scope="row" className="px-4 py-4 pl-5 text-left font-medium text-gray-200 md:px-6 md:pl-8">
                      Typical monthly cost
                    </th>
                    <td className="px-4 py-4 font-heading font-semibold tabular-nums text-emerald-300 md:px-6">
                      From £49/mo
                    </td>
                    <td className="px-4 py-4 pr-5 font-heading tabular-nums text-gray-400 md:px-6 md:pr-8">
                      £100–£500+/mo
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </section>

        {/* SECTION 3 — Goldilocks plan intros */}
        <section aria-labelledby="pricing-journey-heading" className="relative">
          <JourneyRibbon />
          <motion.div
            className="mb-12 text-center md:mb-16"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              id="pricing-journey-heading"
              className="font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl"
            >
              Three ways to grow online
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-base text-gray-400 md:text-lg">
              Each tier is a step — from visible, to busy, to the name people remember.
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch lg:gap-6">
            {planIntros.map((plan, index) => (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col overflow-hidden rounded-[1.75rem] border ${plan.border} bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 shadow-[0_28px_90px_-32px_rgba(0,0,0,0.55)] backdrop-blur-sm md:p-9 ${
                  plan.popular ? 'lg:z-10 lg:-my-2 lg:scale-[1.03] lg:px-10 lg:py-10' : ''
                }`}
              >
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${plan.accent} blur-3xl opacity-95`}
                />
                {plan.popular ? (
                  <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/40 bg-gradient-to-r from-orange-500/90 to-amber-500/85 px-4 py-1.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-navy)] shadow-lg shadow-orange-500/25">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden />
                      Most popular
                    </span>
                  </div>
                ) : null}
                <div className="relative mb-6 flex items-start gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.07] ${
                      plan.popular ? 'text-orange-200' : 'text-cyan-200'
                    }`}
                  >
                    <plan.Icon className="h-7 w-7" strokeWidth={1.6} aria-hidden />
                  </div>
                  <h3 className="font-heading text-xl font-extrabold text-white md:text-2xl">{plan.title}</h3>
                </div>
                <div className="relative flex flex-1 flex-col gap-4 font-sans text-sm leading-relaxed text-gray-400 md:text-[0.9375rem]">
                  {plan.body}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* SECTION 5 — Annual price lock (warm orange block) */}
        <motion.section
          className="relative overflow-hidden rounded-[1.85rem] border border-orange-400/25 bg-gradient-to-br from-orange-500/[0.14] via-amber-950/20 to-[var(--color-navy)]/80 p-8 md:p-12 lg:p-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-orange-400/15 blur-[100px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-amber-500/10 blur-[90px]" />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_minmax(260px,320px)] lg:items-center">
            <div>
              <h2 className="mb-6 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-[2.35rem] md:leading-tight">
                Pay once a year.{' '}
                <span className="text-orange-200">Lock your rate in forever.</span>
              </h2>
              <div className="space-y-5 font-sans text-base leading-relaxed text-orange-50/90 md:text-lg">
                <p>
                  Annual subscribers pay for ten months and get twelve. But the more important benefit is this:{' '}
                  <strong className="font-semibold text-white">your rate never goes up.</strong>
                </p>
                <p className="text-orange-50/75">
                  As Built Better grows, our prices will reflect that. Monthly subscribers may see price increases with 30
                  days&rsquo; notice. Annual subscribers are immune to this — permanently — as long as they remain
                  subscribed.
                </p>
                <p className="text-sm text-orange-100/65 md:text-base">
                  This is our way of rewarding the clients who back us early.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <motion.div
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 px-5 py-4"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-rose-300/90">
                  <TrendingUp className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-white">Monthly</p>
                  <p className="font-sans text-xs text-gray-400">Standard rate · may change with notice</p>
                </div>
                <ArrowUpRight className="ml-auto h-5 w-5 shrink-0 text-rose-300/60" aria-hidden />
              </motion.div>
              <motion.div
                className="flex items-center gap-4 rounded-2xl border border-orange-300/35 bg-orange-500/10 px-5 py-4 shadow-inner shadow-orange-500/10"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-400/25 text-orange-100">
                  <Lock className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-white">Annual</p>
                  <p className="font-sans text-xs text-orange-100/80">Your price — locked for good</p>
                </div>
                <Check className="ml-auto h-6 w-6 shrink-0 text-emerald-300" strokeWidth={2.5} aria-hidden />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 4 — Full pricing table */}
        <section aria-labelledby="pricing-full-heading">
          <motion.div
            className="mb-10 text-center md:mb-12"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              id="pricing-full-heading"
              className="font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl"
            >
              The full picture
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-sans text-sm text-gray-500 md:text-base">
              Every plan, every line — so there&rsquo;s nothing hiding in the footnotes.
            </p>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025] shadow-[0_40px_120px_-48px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left font-sans text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="sticky left-0 z-20 min-w-[140px] bg-[var(--color-navy)]/95 px-3 py-4 pl-4 font-heading text-[10px] font-semibold uppercase tracking-wider text-gray-500 backdrop-blur-sm sm:min-w-[160px] sm:px-4 sm:pl-5 sm:text-xs">
                      &nbsp;
                    </th>
                    <th className="px-3 py-4 font-heading text-sm font-bold text-white sm:px-4 sm:text-base">
                      Getting Found
                    </th>
                    <th className="relative z-0 px-3 py-4 font-heading text-sm font-bold text-orange-100 sm:px-4 sm:text-base">
                      <div className="pointer-events-none absolute inset-0 bg-orange-500/[0.15]" aria-hidden />
                      <span className="relative z-10">
                        <span className="mr-1 text-orange-400" aria-hidden>
                          ★
                        </span>
                        Winning Work
                      </span>
                    </th>
                    <th className="px-3 py-4 font-heading text-sm font-bold text-white sm:px-4 sm:text-base">
                      Owning Your Area
                    </th>
                    <th className="px-3 py-4 pr-4 font-heading text-sm font-bold text-amber-100/90 sm:px-5">
                      Buyout (Own It)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {detailRows.map((row) => (
                    <tr key={row.label} className="border-b border-white/[0.06]">
                      <th
                        scope="row"
                        className="sticky left-0 z-10 bg-[var(--color-navy)]/90 px-3 py-3.5 pl-4 text-left font-medium text-gray-300 backdrop-blur-sm sm:px-4 sm:py-4 sm:pl-5"
                      >
                        {row.label}
                      </th>
                      {row.cells.map((cell, ci) => {
                        const isHero = ci === 1;
                        return (
                          <td
                            key={ci}
                            className={`px-3 py-3.5 align-middle sm:px-4 sm:py-4 ${
                              isHero ? 'bg-orange-500/[0.08]' : ''
                            }`}
                          >
                            <CellContent value={cell} hero={isHero} />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="border-t border-white/10">
                    <th className="sticky left-0 bg-[var(--color-navy)] px-3 py-5 pl-4 sm:pl-5" />
                    <td className="px-3 py-5 align-top sm:px-4">
                      <button
                        type="button"
                        onClick={() => onRequestPrototype?.()}
                        className="inline-flex w-full min-w-[8rem] items-center justify-center gap-1 rounded-xl border border-white/15 bg-white/[0.06] py-2.5 font-sans text-xs font-semibold text-white transition-colors hover:border-cyan-400/35 hover:bg-white/[0.1] sm:text-sm"
                      >
                        Get started
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </button>
                    </td>
                    <td className="bg-orange-500/[0.1] px-3 py-5 align-top sm:px-4">
                      <button
                        type="button"
                        onClick={() => onRequestPrototype?.()}
                        className="inline-flex w-full min-w-[8rem] items-center justify-center gap-1 rounded-xl border border-orange-400/50 bg-orange-500/20 py-2.5 font-sans text-xs font-semibold text-orange-50 transition-colors hover:bg-orange-500/30 sm:text-sm"
                      >
                        Get started
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </button>
                    </td>
                    <td className="px-3 py-5 align-top sm:px-4">
                      <button
                        type="button"
                        onClick={() => onRequestPrototype?.()}
                        className="inline-flex w-full min-w-[8rem] items-center justify-center gap-1 rounded-xl border border-white/15 bg-white/[0.06] py-2.5 font-sans text-xs font-semibold text-white transition-colors hover:border-cyan-400/35 hover:bg-white/[0.1] sm:text-sm"
                      >
                        Get started
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </button>
                    </td>
                    <td className="px-3 py-5 pr-4 align-top sm:px-4 sm:pr-5">
                      <a
                        href={BUYOUT_WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full min-w-[8rem] items-center justify-center gap-1 rounded-xl border border-amber-400/30 bg-amber-500/10 py-2.5 font-sans text-xs font-semibold text-amber-100 transition-colors hover:bg-amber-500/20 sm:text-sm"
                      >
                        <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                        Ask us about buyout
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </section>

        {/* SECTION 6 — Add-ons (light footnote) */}
        <motion.section
          aria-labelledby="pricing-addons-heading"
          className="mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            id="pricing-addons-heading"
            className="mb-2 text-center font-heading text-lg font-bold text-white md:text-xl"
          >
            Need something extra? Bolt it on whenever.
          </h2>
          <p className="mb-8 text-center font-sans text-xs leading-relaxed text-gray-500 md:text-sm">
            No pressure, no jargon, no package upgrades. If there&rsquo;s something specific you need, just ask.
            Everything below can be added to any plan at any time.
          </p>
          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <table className="w-full border-collapse text-left font-sans text-xs text-gray-400 md:text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-4 py-3 font-heading font-semibold text-gray-500">Add-on</th>
                  <th className="px-4 py-3 font-heading font-semibold text-gray-500">Price</th>
                  <th className="hidden px-4 py-3 font-heading font-semibold text-gray-500 sm:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {addOns.map((row) => (
                  <tr key={row.label} className="border-b border-white/[0.04] last:border-0">
                    <td className="px-4 py-3.5 text-gray-300">
                      <span className="block">{row.label}</span>
                      <span className="mt-1 block text-[11px] leading-snug text-gray-600 sm:hidden">{row.notes}</span>
                    </td>
                    <td className="px-4 py-3.5 font-medium tabular-nums text-gray-200">{row.price}</td>
                    <td className="hidden px-4 py-3.5 text-gray-500 sm:table-cell">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* SECTION 7 — Footer CTA */}
        <motion.footer
          className="relative overflow-hidden rounded-[1.85rem] border border-cyan-400/20 bg-gradient-to-b from-white/[0.06] to-cyan-950/10 px-6 py-12 text-center md:px-12 md:py-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[80px]" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-emerald-500/10 blur-[70px]" />
          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-500/10 text-cyan-200">
                <KeyRound className="h-8 w-8" strokeWidth={1.5} aria-hidden />
              </div>
            </div>
            <h2 className="mb-5 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-[2.1rem]">
              Not ready to commit? See your site first.
            </h2>
            <div className="space-y-4 font-sans text-sm leading-relaxed text-gray-400 md:text-base">
              <p>
                For £49, we&rsquo;ll build you a working homepage prototype in 24 hours. It&rsquo;s yours to review,
                share, and think about. If you love it and want to proceed, the £49 comes off your setup fee.
              </p>
              <p className="text-gray-500">
                If you&rsquo;re not ready, you&rsquo;ve spent less than a tank of diesel to make an informed decision. We
                think that&rsquo;s the fairest offer in web design.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onRequestPrototype?.()}
              className="btn-primary btn-shimmer mx-auto mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold"
            >
              Get my £49 prototype — ready in 24 hours
              <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
            <p className="mt-5 font-sans text-xs text-gray-500">
              No commitment beyond the £49. No contract. No dashboard. No hassle.
            </p>
            <p className="mt-8 font-sans text-sm text-gray-500">
              Questions first?{' '}
              <Link to="/contact" className="text-cyan-400 underline decoration-cyan-500/30 underline-offset-2 hover:text-cyan-300">
                Contact
              </Link>
              {' · '}
              <Link to="/faq" className="text-cyan-400 underline decoration-cyan-500/30 underline-offset-2 hover:text-cyan-300">
                FAQ
              </Link>
            </p>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
