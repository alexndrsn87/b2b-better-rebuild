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
    border: 'border-orange-400/50',
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
    return <Check className="mx-auto h-5 w-5 shrink-0 text-emerald-400" strokeWidth={2.5} aria-label="Included" />;
  }
  if (value === 'ICON_X') {
    return <X className="mx-auto h-5 w-5 shrink-0 text-rose-400/85" strokeWidth={2.25} aria-label="Not included" />;
  }
  if (value === 'n/a') {
    return <span className="text-gray-500">n/a</span>;
  }
  if (value.startsWith('✓')) {
    return <span className={hero ? 'text-orange-50' : 'text-emerald-200/90'}>{value}</span>;
  }
  if (value.startsWith('✗')) {
    return <span className={hero ? 'text-orange-100' : 'text-rose-200/80'}>{value}</span>;
  }
  return (
    <span className={`text-sm leading-snug ${hero ? 'text-orange-50' : 'text-gray-300'}`}>{value}</span>
  );
}

const TABLE_COL = 'min-w-[7.5rem] max-w-[10.5rem] px-2 py-3 align-top text-center sm:min-w-[8.5rem] sm:max-w-none sm:px-3 sm:py-3.5';
const TABLE_HERO = `${TABLE_COL} bg-orange-500/[0.1]`;
const TABLE_ROW_HEAD =
  'w-[32%] min-w-[9.5rem] max-w-[220px] px-3 py-3 text-left text-xs font-medium leading-snug text-gray-300 sm:w-auto sm:max-w-[14rem] sm:py-3.5 sm:text-sm';

export default function Pricing({ onRequestPrototype }: PricingProps) {
  const rootRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(32);
  const smoothX = useSpring(mouseX, { stiffness: 48, damping: 38 });
  const smoothY = useSpring(mouseY, { stiffness: 48, damping: 38 });
  const spotlight = useMotionTemplate`radial-gradient(880px circle at ${smoothX}% ${smoothY}%, rgba(251, 146, 60, 0.06) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 60%)`;

  return (
    <section
      ref={rootRef}
      id="pricing"
      className="relative z-10 overflow-x-hidden py-[var(--section-py)]"
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
          animate={{ opacity: [0.12, 0.26, 0.12], scale: [1, 1.04, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-[15%] top-[6%] h-[min(90vw,440px)] w-[min(90vw,440px)] rounded-full bg-orange-500/10 blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.14, 0.28, 0.14], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[10%] right-[-8%] h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[96px]"
        />
        <motion.div className="absolute inset-0 opacity-[0.9]" style={{ background: spotlight }} />
        <div
          className="absolute inset-0 opacity-[0.032]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl space-y-16 px-4 sm:space-y-20 sm:px-6 lg:px-8">
        {/* Hero */}
        <header className="mx-auto max-w-3xl text-center">
          <motion.p
            className="mb-4 font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400/85 sm:text-xs"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Clarity first
          </motion.p>
          <h1 className="mb-6 font-heading text-[1.75rem] font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">
            <span className="block">
              <TextReveal text="One clear price. Everything included. No surprises." />
            </span>
            <motion.span
              className="mt-1 inline-block text-orange-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              Ever.
            </motion.span>
          </h1>
          <motion.p
            className="font-sans text-base leading-relaxed text-gray-400 md:text-lg"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
          >
            No hourly rates. No hosting invoices. No &lsquo;that&rsquo;ll cost extra.&rsquo; Just one monthly fee that
            covers your site, your hosting, your security, and your updates. Permanently.
          </motion.p>
        </header>

        {/* Contrast */}
        <section aria-labelledby="pricing-contrast-heading" className="space-y-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="pricing-contrast-heading"
              className="font-heading text-xl font-extrabold tracking-tight text-white sm:text-2xl md:text-3xl"
            >
              What you&rsquo;re{' '}
              <span className="bg-gradient-to-r from-rose-200 via-orange-200 to-amber-100 bg-clip-text text-transparent">
                not
              </span>{' '}
              paying for
            </h2>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-gray-500 sm:text-sm sm:normal-case sm:tracking-normal sm:text-gray-400">
              Most local businesses are paying for three things when they think they&rsquo;re paying for one.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <div className="space-y-4 font-sans text-base leading-relaxed text-gray-400">
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
            </div>

            <div className="mx-auto flex w-full max-w-sm flex-col gap-3 lg:mx-0 lg:max-w-none" aria-hidden>
              {([Receipt, Server, Timer] as const).map((Icon, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-gray-400">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-heading text-xs font-semibold text-white/90 sm:text-sm">
                      {i === 0 ? 'Build invoice' : i === 1 ? 'Hosting renewal' : 'Hourly change'}
                    </p>
                    <p className="text-[10px] text-gray-500 sm:text-xs">Separate bill · extra login</p>
                  </div>
                  <Ban className="h-4 w-4 shrink-0 text-rose-400/75" />
                </div>
              ))}
              <div className="rounded-xl border border-emerald-500/35 bg-gradient-to-b from-emerald-500/12 to-cyan-500/8 px-4 py-3 text-center">
                <FileStack className="mx-auto h-7 w-7 text-emerald-300" strokeWidth={1.5} />
                <p className="mt-1.5 font-heading text-sm font-bold text-white">One fee. All of it.</p>
                <p className="text-[10px] text-emerald-200/75 sm:text-xs">Design · host · secure · WhatsApp</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 pl-4 sm:pl-5" />
                    <th className="px-4 py-3 font-heading font-bold text-white">Built Better</th>
                    <th className="px-4 py-3 pr-4 font-heading font-bold text-gray-400 sm:pr-5">Traditional agency</th>
                  </tr>
                </thead>
                <tbody>
                  {contrastRows.map((row) => (
                    <tr key={row.feature} className="border-b border-white/[0.06]">
                      <th scope="row" className="px-4 py-3 pl-4 text-left font-normal text-gray-300 sm:pl-5">
                        {row.feature}
                      </th>
                      <td className="px-4 py-3">
                        <div className="flex justify-center sm:justify-start">
                          {row.bb ? (
                            <Check className="h-5 w-5 text-emerald-400" strokeWidth={2.5} aria-label="Yes" />
                          ) : (
                            <X className="h-5 w-5 text-rose-400/80" strokeWidth={2.25} aria-label="No" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 pr-4 sm:pr-5">
                        <div className="flex justify-center sm:justify-start">
                          {row.agency ? (
                            <Check className="h-5 w-5 text-emerald-400/45" strokeWidth={2.5} aria-label="Yes" />
                          ) : (
                            <X className="h-5 w-5 text-rose-400/75" strokeWidth={2.25} aria-label="No" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-white/10 bg-white/[0.02]">
                    <th scope="row" className="px-4 py-3.5 pl-4 text-left font-medium text-gray-200 sm:pl-5">
                      Typical setup cost
                    </th>
                    <td className="px-4 py-3.5 font-heading font-semibold tabular-nums text-emerald-300">
                      From £299
                    </td>
                    <td className="px-4 py-3.5 pr-4 font-heading tabular-nums text-gray-400 sm:pr-5">
                      £2,000 – £8,000
                    </td>
                  </tr>
                  <tr className="bg-white/[0.02]">
                    <th scope="row" className="px-4 py-3.5 pl-4 text-left font-medium text-gray-200 sm:pl-5">
                      Typical monthly cost
                    </th>
                    <td className="px-4 py-3.5 font-heading font-semibold tabular-nums text-emerald-300">
                      From £49/mo
                    </td>
                    <td className="px-4 py-3.5 pr-4 font-heading tabular-nums text-gray-400 sm:pr-5">
                      £100–£500+/mo
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Plan intros */}
        <section aria-labelledby="pricing-journey-heading" className="space-y-8">
          <div className="text-center">
            <h2
              id="pricing-journey-heading"
              className="font-heading text-xl font-extrabold text-white sm:text-2xl md:text-3xl"
            >
              Three ways to grow online
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-400 sm:text-base">
              From showing up, to winning enquiries, to owning your patch — pick the stage that fits.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
            {planIntros.map((plan) => (
              <article
                key={plan.id}
                className={`relative flex flex-col overflow-hidden rounded-2xl border ${plan.border} bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-lg md:p-7`}
              >
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${plan.accent} blur-2xl opacity-90`}
                />
                {plan.popular ? (
                  <span className="relative mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-400/40 bg-orange-500/20 px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-orange-100">
                    <Sparkles className="h-3 w-3" aria-hidden />
                    Most popular
                  </span>
                ) : null}
                <div className="relative mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/[0.07] ${
                      plan.popular ? 'text-orange-200' : 'text-cyan-200'
                    }`}
                  >
                    <plan.Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                  </div>
                  <h3 className="font-heading text-lg font-extrabold text-white md:text-xl">{plan.title}</h3>
                </div>
                <div className="relative flex flex-1 flex-col gap-3 text-sm leading-relaxed text-gray-400">
                  {plan.body}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Annual lock */}
        <section className="relative overflow-hidden rounded-2xl border border-orange-400/25 bg-gradient-to-br from-orange-500/[0.12] to-[var(--color-navy)] p-6 md:p-10">
          <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-orange-400/12 blur-[80px]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_280px] lg:items-center">
            <div>
              <h2 className="mb-4 font-heading text-xl font-extrabold text-white sm:text-2xl md:text-3xl">
                Pay once a year. <span className="text-orange-200">Lock your rate in forever.</span>
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-orange-50/90 md:text-base">
                <p>
                  Annual subscribers pay for ten months and get twelve. But the more important benefit is this:{' '}
                  <strong className="font-semibold text-white">your rate never goes up.</strong>
                </p>
                <p className="text-orange-50/75">
                  As Built Better grows, our prices will reflect that. Monthly subscribers may see price increases with
                  30 days&rsquo; notice. Annual subscribers are immune to this — permanently — as long as they remain
                  subscribed.
                </p>
                <p className="text-sm text-orange-100/70">
                  This is our way of rewarding the clients who back us early.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-rose-300/90">
                  <TrendingUp className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-sm font-semibold text-white">Monthly</p>
                  <p className="text-xs text-gray-400">Can change with notice</p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-rose-300/50" aria-hidden />
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-orange-300/35 bg-orange-500/10 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-400/25 text-orange-100">
                  <Lock className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-sm font-semibold text-white">Annual</p>
                  <p className="text-xs text-orange-100/80">Price locked for good</p>
                </div>
                <Check className="h-5 w-5 shrink-0 text-emerald-300" strokeWidth={2.5} aria-hidden />
              </div>
            </div>
          </div>
        </section>

        {/* Full comparison */}
        <section aria-labelledby="pricing-full-heading" className="space-y-6">
          <div className="text-center">
            <h2 id="pricing-full-heading" className="font-heading text-xl font-extrabold text-white sm:text-2xl md:text-3xl">
              Compare plans in full
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-gray-500">
              Scroll sideways on smaller screens. <span className="text-gray-400">★ Winning Work</span> is what most
              people choose.
            </p>
          </div>

          <div className="-mx-4 rounded-2xl border border-white/10 bg-white/[0.025] sm:mx-0">
            <div className="overflow-x-auto overscroll-x-contain px-4 pb-1 pt-1 sm:px-0">
              <table className="w-full min-w-[640px] border-collapse sm:min-w-0">
                <thead>
                  <tr className="border-b border-white/10 bg-[var(--color-navy)]">
                    <th className={`${TABLE_ROW_HEAD} bg-[var(--color-navy)] py-4 align-bottom`} />
                    <th className={`${TABLE_COL} bg-[var(--color-navy)] pb-3 pt-4 font-heading text-xs font-bold text-white sm:text-sm`}>
                      Getting Found
                    </th>
                    <th
                      className={`${TABLE_HERO} pb-3 pt-4 font-heading text-xs font-bold text-orange-100 sm:text-sm`}
                    >
                      <span className="text-orange-400" aria-hidden>
                        ★{' '}
                      </span>
                      Winning Work
                    </th>
                    <th className={`${TABLE_COL} bg-[var(--color-navy)] pb-3 pt-4 font-heading text-xs font-bold text-white sm:text-sm`}>
                      Owning Your Area
                    </th>
                    <th className={`${TABLE_COL} bg-[var(--color-navy)] pb-3 pt-4 font-heading text-xs font-bold leading-tight text-amber-100/90 sm:text-sm`}>
                      <span className="block">Buyout</span>
                      <span className="block font-sans text-[10px] font-normal text-amber-200/60 sm:text-xs">
                        Own it outright
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {detailRows.map((row) => (
                    <tr key={row.label} className="border-b border-white/[0.06]">
                      <th scope="row" className={`${TABLE_ROW_HEAD} bg-[var(--color-navy)]`}>
                        {row.label}
                      </th>
                      {row.cells.map((cell, ci) => {
                        const isHero = ci === 1;
                        return (
                          <td key={ci} className={isHero ? TABLE_HERO : `${TABLE_COL} bg-transparent`}>
                            <CellContent value={cell} hero={isHero} />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="border-t border-white/10">
                    <th scope="row" className={`${TABLE_ROW_HEAD} bg-[var(--color-navy)] py-4 font-medium text-gray-200`}>
                      Next step
                    </th>
                    <td className={`${TABLE_COL} py-4`}>
                      <button
                        type="button"
                        onClick={() => onRequestPrototype?.()}
                        className="w-full rounded-lg border border-white/15 bg-white/[0.06] py-2 text-xs font-semibold text-white hover:border-cyan-400/35 sm:text-sm"
                      >
                        Get started →
                      </button>
                    </td>
                    <td className={`${TABLE_HERO} py-4`}>
                      <button
                        type="button"
                        onClick={() => onRequestPrototype?.()}
                        className="w-full rounded-lg border border-orange-400/45 bg-orange-500/20 py-2 text-xs font-semibold text-orange-50 hover:bg-orange-500/30 sm:text-sm"
                      >
                        Get started →
                      </button>
                    </td>
                    <td className={`${TABLE_COL} py-4`}>
                      <button
                        type="button"
                        onClick={() => onRequestPrototype?.()}
                        className="w-full rounded-lg border border-white/15 bg-white/[0.06] py-2 text-xs font-semibold text-white hover:border-cyan-400/35 sm:text-sm"
                      >
                        Get started →
                      </button>
                    </td>
                    <td className={`${TABLE_COL} py-4`}>
                      <a
                        href={BUYOUT_WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-1 rounded-lg border border-amber-400/30 bg-amber-500/10 py-2 text-center text-xs font-semibold text-amber-100 hover:bg-amber-500/20 sm:text-sm"
                      >
                        <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        Ask buyout →
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section aria-labelledby="pricing-addons-heading" className="mx-auto max-w-xl space-y-4">
          <div className="text-center">
            <h2 id="pricing-addons-heading" className="font-heading text-lg font-bold text-white md:text-xl">
              Need something extra?
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-gray-500 md:text-sm">
              Bolt on any time — no package games. Ask if you need something that isn&rsquo;t listed.
            </p>
          </div>
          <div className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.06] bg-white/[0.02]">
            {addOns.map((row) => (
              <div key={row.label} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <span className="text-sm text-gray-300">{row.label}</span>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 sm:justify-end sm:text-right">
                  <span className="text-sm font-medium tabular-nums text-white">{row.price}</span>
                  <span className="text-xs text-gray-500">{row.notes}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <footer className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-b from-white/[0.05] to-cyan-950/10 px-5 py-10 text-center md:px-10 md:py-14">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -left-20 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[64px]" />
            <div className="absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-[56px]" />
          </div>
          <div className="relative mx-auto max-w-lg">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-500/10 text-cyan-200">
              <KeyRound className="h-7 w-7" strokeWidth={1.5} aria-hidden />
            </div>
            <h2 className="mb-4 font-heading text-xl font-extrabold text-white sm:text-2xl md:text-3xl">
              Not ready to commit? See your site first.
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-gray-400">
              <p>
                For £49, we&rsquo;ll build you a working homepage prototype in 24 hours. If you go ahead, the £49 comes
                off your setup fee.
              </p>
              <p className="text-gray-500">
                If not, you&rsquo;ve spent less than a tank of diesel to decide with your eyes open.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onRequestPrototype?.()}
              className="btn-primary btn-shimmer mx-auto mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold sm:text-base"
            >
              Get my £49 prototype — 24 hours
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
            </button>
            <p className="mt-4 text-xs text-gray-500">
              No commitment beyond the £49. No contract. No dashboard.
            </p>
            <p className="mt-6 text-sm text-gray-500">
              <Link to="/contact" className="text-cyan-400 underline decoration-cyan-500/30 underline-offset-2 hover:text-cyan-300">
                Contact
              </Link>
              {' · '}
              <Link to="/faq" className="text-cyan-400 underline decoration-cyan-500/30 underline-offset-2 hover:text-cyan-300">
                FAQ
              </Link>
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
