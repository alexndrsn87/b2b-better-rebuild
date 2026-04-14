import React, { useRef, useState } from 'react';
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
  PhoneForwarded,
  Receipt,
  Server,
  Sparkles,
  Timer,
  TrendingUp,
  X,
} from 'lucide-react';
import { whatsappUrlWithPrefill } from '../lib/whatsapp';

type PricingProps = {
  onRequestPrototype?: () => void;
};

/** Match home sections (PricingOverviewSection, StatusQuoSection): glass + type scale */
const glassSky = 'glass-card border-sky-500/15 shadow-[0_24px_70px_-24px_rgba(37,99,235,0.2)]';
const glassStrong = 'glass-card border-white/15 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.5)]';
const glassPad = 'p-7 sm:p-9 md:p-10';
const eyebrowHome = 'font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-400/90 sm:text-xs';
const sectionTitleHome =
  'font-heading text-[1.65rem] font-extrabold leading-[1.22] tracking-tight text-white sm:text-3xl sm:leading-[1.2] md:text-4xl lg:text-[2.35rem] lg:leading-[1.18]';
const sectionLeadHome = 'mx-auto mt-3 max-w-xl font-sans text-base leading-relaxed text-gray-400 sm:text-lg';
const bodyHome = 'font-sans text-base leading-relaxed text-gray-400 md:text-lg';

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
    id: 'presence',
    title: 'Presence',
    Icon: MapPin,
    accent: 'from-sky-500/20 to-cyan-500/10',
    body: (
      <>
        <p>
          Presence is for the business owner who&rsquo;s been meaning to sort this for a while. You don&rsquo;t need
          anything complicated — just a professional site that loads on a phone, a number people can find, and the
          confidence that someone competent is looking after it.
        </p>
        <p className="text-gray-500">
          You&rsquo;re not trying to dominate Google. You just want to{' '}
          <span className="font-medium text-gray-300">stop being invisible</span>.
        </p>
      </>
    ),
  },
  {
    id: 'active',
    title: 'Active',
    Icon: PhoneForwarded,
    popular: true,
    accent: 'from-orange-500/25 to-amber-500/12',
    body: (
      <>
        <p>
          Active is where most of our clients land. You don&rsquo;t just want a website that exists — you want one that
          makes people pick up the phone. We write the copy, build the pages, and send you a monthly snapshot so you can
          see it working.
        </p>
        <p className="font-medium text-orange-100/90">
          The most popular plan. And the one we&rsquo;d recommend for most local businesses.
        </p>
      </>
    ),
  },
  {
    id: 'growth',
    title: 'Growth',
    Icon: TrendingUp,
    accent: 'from-violet-500/20 to-fuchsia-500/10',
    body: (
      <>
        <p>
          Growth is for the business that wants to be the first name people think of in their town. We handle your
          Google Business Profile, write a monthly blog post, and lay the local SEO foundations that compound over time.
        </p>
        <p className="text-gray-500">
          If you want to <span className="font-medium text-violet-200/90">dominate</span> your local area online, this
          is how you do it.
        </p>
      </>
    ),
  },
];

type Cell = string;

const detailRows: { label: string; cells: [Cell, Cell, Cell] }[] = [
  {
    label: "Who it's for",
    cells: [
      'Just starting out or keeping it simple',
      'Most local businesses that want work coming in',
      'Serious about dominating your local area',
    ],
  },
  { label: 'No setup fee', cells: ['ICON_CHECK', 'ICON_CHECK', 'ICON_CHECK'] },
  { label: 'Monthly', cells: ['£49/mo', '£99/mo', '£149/mo'] },
  {
    label: 'Annual (pay upfront)',
    cells: ['£490/yr — save £98', '£990/yr — save £198', '£1,490/yr — save £298'],
  },
  { label: 'Pages', cells: ['3 pages', '5 pages', '6 pages'] },
  {
    label: 'Copy written for you',
    cells: ['ICON_X', 'ICON_CHECK', 'ICON_CHECK'],
  },
  {
    label: 'Hosting & security',
    cells: ['ICON_CHECK', 'ICON_CHECK', 'ICON_CHECK'],
  },
  {
    label: 'WhatsApp updates',
    cells: ['3 per month', 'ICON_CHECK', 'ICON_CHECK'],
  },
  {
    label: 'Monthly snapshot',
    cells: ['ICON_X', 'ICON_CHECK', 'ICON_CHECK'],
  },
  {
    label: 'Google Business Profile',
    cells: ['ICON_X', 'ICON_X', 'ICON_CHECK'],
  },
  {
    label: 'Monthly blog post',
    cells: ['ICON_X', 'ICON_X', 'ICON_CHECK'],
  },
  {
    label: 'Local SEO',
    cells: ['Basic', 'Strong foundations', 'Full local SEO pack'],
  },
  {
    label: 'Annual price lock',
    cells: ['ICON_CHECK', 'ICON_CHECK', 'ICON_CHECK'],
  },
];

const addOns = [
  { label: 'Domain sourcing & management', price: '£35/yr', notes: 'We source, register & renew — you never think about it' },
  { label: 'Extra page', price: '£49 one-off', notes: 'Added any time' },
  { label: 'Booking / enquiry widget', price: '£75 one-off', notes: 'Calendly, Acuity, Tally — embedded & styled' },
  { label: 'Google Business Profile setup', price: '£75 one-off', notes: 'Optimised listing, photos, categories' },
  { label: 'Review collection page', price: '£39 one-off', notes: 'A single link that sends customers straight to your Google review form' },
  { label: 'Monthly blog post', price: '£60/mo', notes: 'Written & published for you' },
  { label: 'Logo design', price: '£199 one-off', notes: '3 concepts, 2 revision rounds' },
  { label: 'Annual site refresh', price: '£149 one-off', notes: 'New look, updated copy, fresh photos — once a year' },
  {
    label: 'Priority same-day updates',
    price: '£20/mo',
    notes: 'Jump the queue — changes turned around the same day',
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
  if (hero && value.startsWith('£')) {
    return (
      <span className="text-lg font-extrabold leading-tight tracking-tight text-orange-100">{value}</span>
    );
  }
  return (
    <span className={`text-base leading-snug ${hero ? 'text-orange-50' : 'text-gray-300'}`}>{value}</span>
  );
}

const TABLE_COL =
  'max-w-[14rem] min-w-[7.5rem] px-3 py-4 align-top text-center text-base leading-snug [overflow-wrap:anywhere] sm:min-w-[9rem] sm:max-w-none sm:px-4';
/** Active column body cells only — subtle vertical band (not used in thead; thead is one unified bar). */
const TABLE_HERO = `${TABLE_COL} bg-orange-500/[0.08]`;
const TABLE_ROW_HEAD =
  'w-[34%] min-w-[10rem] max-w-[240px] px-4 py-4 text-left text-sm font-medium leading-snug text-gray-300 sm:w-[30%] sm:max-w-[16rem] sm:text-base';

type PlanKey = 'presence' | 'active' | 'growth';

const BASE_PRICES: Record<PlanKey, number> = { presence: 49, active: 99, growth: 149 };
const PLAN_LABELS: Record<PlanKey, string> = { presence: 'Presence', active: 'Active', growth: 'Growth' };

function Toggle({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 ${
        checked ? 'border-orange-400 bg-orange-500' : 'border-white/20 bg-white/10'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

function BuildYourPackage() {
  const [plan, setPlan] = useState<PlanKey>('active');
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [blogPost, setBlogPost] = useState(false);
  const [priorityUpdates, setPriorityUpdates] = useState(false);
  const [domainManagement, setDomainManagement] = useState(false);

  const baseMonthly = BASE_PRICES[plan];
  const extrasMonthly = (blogPost ? 60 : 0) + (priorityUpdates ? 20 : 0);
  const totalMonthly = baseMonthly + extrasMonthly;
  // Annual = 10 months price (2 months free)
  const totalAnnual = totalMonthly * 10;
  const annualSaving = totalMonthly * 2;

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className={sectionTitleHome}>Build your package</h2>
        <p className={sectionLeadHome}>Pick your plan, bolt on the extras you want, and see your total.</p>
      </div>

      <div className="mx-auto max-w-lg space-y-5">
        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
          {(['monthly', 'annual'] as const).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBilling(b)}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                billing === b
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {b === 'monthly' ? 'Monthly' : (
                <span className="flex items-center justify-center gap-2">
                  Annual
                  <span className="rounded-full bg-emerald-500/25 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                    2 months free
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Plan selector */}
        <div className={`overflow-hidden p-5 ${glassSky}`}>
          <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Base plan
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(BASE_PRICES) as PlanKey[]).map((key) => {
              const mo = BASE_PRICES[key];
              const displayPrice = billing === 'annual' ? `£${mo * 10}/yr` : `£${mo}/mo`;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPlan(key)}
                  className={`rounded-xl border py-3 text-center transition-all duration-150 ${
                    plan === key
                      ? 'border-orange-400/60 bg-orange-500/20 text-white'
                      : 'border-white/10 bg-white/[0.04] text-gray-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span className="block font-heading text-sm font-bold">{PLAN_LABELS[key]}</span>
                  <span className={`block text-xs tabular-nums ${plan === key ? 'text-orange-200' : 'text-gray-500'}`}>
                    {displayPrice}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recurring extras */}
        <div className={`overflow-hidden ${glassSky}`}>
          <p className="px-5 pb-2 pt-5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Subscription extras
          </p>
          <div className="divide-y divide-white/[0.06]">
            {[
              { id: 'blog', label: 'Monthly blog post', sub: 'Written & published for you', mo: 60, checked: blogPost, set: setBlogPost },
              { id: 'priority', label: 'Priority same-day updates', sub: 'Jump the queue on any changes', mo: 20, checked: priorityUpdates, set: setPriorityUpdates },
            ].map(({ id, label, sub, mo, checked, set }) => {
              const displayPrice = billing === 'annual' ? `+£${mo * 10}/yr` : `+£${mo}/mo`;
              return (
                <div key={id} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="min-w-0 flex-1">
                    <label htmlFor={id} className="cursor-pointer font-sans text-base font-medium text-gray-200">
                      {label}
                    </label>
                    <p className="text-sm text-gray-500">{sub}</p>
                  </div>
                  <span className={`shrink-0 text-base tabular-nums font-medium ${checked ? 'text-emerald-300' : 'text-gray-500'}`}>
                    {displayPrice}
                  </span>
                  <Toggle id={id} checked={checked} onChange={set} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Annual extras */}
        <div className={`overflow-hidden ${glassSky}`}>
          <p className="px-5 pb-2 pt-5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            One-off annual add-on
          </p>
          <div className="divide-y divide-white/[0.06]">
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0 flex-1">
                <label htmlFor="domain" className="cursor-pointer font-sans text-base font-medium text-gray-200">
                  Domain sourcing & management
                </label>
                <p className="text-sm text-gray-500">We source, register & renew — you never think about it</p>
              </div>
              <span className={`shrink-0 text-base tabular-nums font-medium ${domainManagement ? 'text-emerald-300' : 'text-gray-500'}`}>
                +£35/yr
              </span>
              <Toggle id="domain" checked={domainManagement} onChange={setDomainManagement} />
            </div>
          </div>
        </div>

        {/* Total */}
        <motion.div
          layout
          className="rounded-[1.5rem] border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 to-cyan-500/5 px-6 py-5 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.45)] backdrop-blur-sm"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/80">
                Your total
              </p>
              {billing === 'monthly' ? (
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-heading text-4xl font-extrabold tabular-nums text-white">
                    £{totalMonthly}
                  </span>
                  <span className="text-sm text-gray-400">/month</span>
                </div>
              ) : (
                <>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-heading text-4xl font-extrabold tabular-nums text-white">
                      £{totalAnnual}
                    </span>
                    <span className="text-sm text-gray-400">/year</span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-emerald-300">
                    saving £{annualSaving} vs monthly
                  </p>
                </>
              )}
              {domainManagement && (
                <p className="mt-1 text-xs text-gray-500">+ £35/yr for domain</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">{PLAN_LABELS[plan]} plan</p>
              {billing === 'annual' && (
                <p className="text-xs text-emerald-300/70">2 months free</p>
              )}
            </div>
          </div>
          <p className="mt-4 border-t border-white/[0.06] pt-3 text-[11px] text-gray-600">
            All prices exclude VAT.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

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
      className="relative z-10 overflow-x-hidden bg-[var(--color-navy)] py-[var(--section-py)]"
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

      <div className="relative z-10 mx-auto max-w-7xl space-y-16 px-4 sm:space-y-20 sm:px-6 lg:px-8">
        {/* Hero */}
        <header className="mx-auto max-w-4xl text-center">
          <div className={`${glassSky} ${glassPad}`}>
            <motion.p
              className={`mb-5 sm:mb-6 ${eyebrowHome}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Clarity first
            </motion.p>
            <h1 className="pricing-hero-title font-heading text-white">
              <motion.span
                className="pricing-hero-title-line px-1 sm:px-2"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                One clear price. Everything included.
              </motion.span>
              <motion.span
                className="pricing-hero-title-line mt-2.5 px-1 sm:mt-3 sm:px-2"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                No surprises.{' '}
                <motion.span
                  className="text-orange-400"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  Ever.
                </motion.span>
              </motion.span>
            </h1>
            <motion.p
              className="mx-auto mt-8 max-w-xl font-sans text-base font-medium leading-relaxed text-gray-200 sm:mt-10 md:text-lg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
            >
              No hourly rates. No hosting invoices. No &lsquo;that&rsquo;ll cost extra.&rsquo; Just one monthly fee that
              covers your site, your hosting, your security, and your updates. Permanently.
            </motion.p>
          </div>
        </header>

        {/* Contrast */}
        <section aria-labelledby="pricing-contrast-heading" className="space-y-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="pricing-contrast-heading" className={sectionTitleHome}>
              What you&rsquo;re{' '}
              <span className="bg-gradient-to-r from-rose-200 via-orange-200 to-amber-100 bg-clip-text text-transparent">
                not
              </span>{' '}
              paying for
            </h2>
            <p className="mt-3 font-sans text-base text-gray-500 sm:text-lg sm:text-gray-400">
              Most local businesses are paying for three things when they think they&rsquo;re paying for one.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-14">
            <div className="mx-auto flex max-w-xl flex-col justify-center space-y-6 font-sans text-lg font-normal leading-relaxed text-gray-300 md:max-w-none md:text-xl">
              <p>
                A traditional agency charges a build fee. Then a hosting fee. Then an hourly rate every time you want
                something changed. And the agency that was so attentive pre-sale? Gone. You&rsquo;re in a ticket system
                now. Add it up over 12 months and the average local business website costs between{' '}
                <span className="font-medium text-white">£3,000 and £10,000 in year one</span>. For a site that might not
                even work properly on a phone.
              </p>
              <p className="font-medium text-white">
                Built Better wraps everything — design, hosting, security, updates, support — into one fixed monthly fee.
                So you always know what you&rsquo;re paying. And you never deal with a ticket system.
              </p>
            </div>

            <div className="mx-auto flex w-full max-w-md flex-col lg:mx-0 lg:max-w-none" aria-hidden>
              <div className={`flex flex-col overflow-hidden ${glassStrong} p-0`}>
                <div className="divide-y divide-white/[0.08]">
                  {([Receipt, Server, Timer] as const).map((Icon, i) => (
                    <div key={i} className="flex gap-3 px-5 py-4 sm:px-6 sm:py-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-gray-400">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-heading text-base font-semibold tracking-tight text-white sm:text-lg">
                            {i === 0 ? 'Build invoice' : i === 1 ? 'Hosting renewal' : 'Hourly change'}
                          </p>
                          <p className="mt-0.5 text-sm text-gray-500 sm:text-[0.9375rem]">
                            Separate bill · extra login
                          </p>
                        </div>
                        <Ban className="mt-0.5 h-5 w-5 shrink-0 text-rose-400/80" aria-hidden />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-emerald-500/25 bg-gradient-to-b from-emerald-500/[0.14] to-cyan-500/[0.06] px-5 py-6 text-center sm:px-6">
                  <FileStack className="mx-auto h-8 w-8 text-emerald-300" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-lg font-bold tracking-tight text-white sm:text-xl">
                    One fee. All of it.
                  </p>
                  <p className="mt-1 text-sm font-medium text-emerald-200/90 sm:text-base">
                    Design · host · secure · WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-4xl px-0 sm:px-2">
            <div className="pricing-agency-compare-shell overflow-hidden">
              <div className="pricing-agency-compare-inner overflow-x-auto">
                <table className="w-full min-w-[420px] border-separate border-spacing-0 text-left">
                  <thead>
                    <tr className="border-b border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-transparent">
                      <th scope="col" className="w-[46%] px-5 py-6 text-left sm:w-[44%] sm:px-7 sm:py-7">
                        <span className="sr-only">Feature</span>
                      </th>
                      <th
                        scope="col"
                        className="border-l border-white/[0.08] px-4 py-6 text-center sm:px-6 sm:py-7"
                      >
                        <span className="font-heading text-lg font-extrabold tracking-tight text-white sm:text-xl">
                          Built Better
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="border-l border-white/[0.08] px-4 py-6 text-center sm:px-6 sm:py-7"
                      >
                        <span className="font-heading text-base font-semibold tracking-tight text-gray-400 sm:text-lg">
                          Traditional agency
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contrastRows.map((row) => (
                      <tr
                        key={row.feature}
                        className="border-b border-white/[0.05] transition-colors hover:bg-white/[0.03]"
                      >
                        <th
                          scope="row"
                          className="px-5 py-4 text-left text-base font-normal leading-snug text-gray-300 sm:px-7 sm:py-5 sm:text-[1.05rem]"
                        >
                          {row.feature}
                        </th>
                        <td className="border-l border-white/[0.06] px-3 py-4 text-center sm:px-5 sm:py-5">
                          <div className="flex justify-center">
                            {row.bb ? (
                              <Check
                                className="h-6 w-6 text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.45)]"
                                strokeWidth={2.35}
                                aria-label="Yes"
                              />
                            ) : (
                              <X
                                className="h-6 w-6 text-rose-400/90 drop-shadow-[0_0_10px_rgba(251,113,133,0.35)]"
                                strokeWidth={2.25}
                                aria-label="No"
                              />
                            )}
                          </div>
                        </td>
                        <td className="border-l border-white/[0.06] px-3 py-4 text-center sm:px-5 sm:py-5">
                          <div className="flex justify-center">
                            {row.agency ? (
                              <Check
                                className="h-6 w-6 text-emerald-400/55 drop-shadow-[0_0_8px_rgba(52,211,153,0.25)]"
                                strokeWidth={2.5}
                                aria-label="Yes"
                              />
                            ) : (
                              <X
                                className="h-6 w-6 text-rose-400/85 drop-shadow-[0_0_10px_rgba(251,113,133,0.35)]"
                                strokeWidth={2.25}
                                aria-label="No"
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t border-cyan-400/15 bg-gradient-to-r from-cyan-500/[0.07] via-white/[0.02] to-rose-500/[0.06]">
                      <th
                        scope="row"
                        className="px-5 py-5 text-left text-base font-semibold text-gray-100 sm:px-7 sm:text-lg"
                      >
                        Setup cost
                      </th>
                      <td className="border-l border-white/[0.08] px-3 py-5 text-center sm:px-5">
                        <span className="font-heading text-base font-bold tabular-nums text-cyan-200 drop-shadow-[0_0_14px_rgba(34,211,238,0.35)] sm:text-lg">
                          None — ever
                        </span>
                      </td>
                      <td className="border-l border-white/[0.08] px-3 py-5 text-center sm:px-5">
                        <span className="font-heading text-base tabular-nums text-gray-400 sm:text-lg">
                          £2,000 – £8,000
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-white/[0.02] transition-colors hover:bg-white/[0.04]">
                      <th
                        scope="row"
                        className="rounded-bl-2xl px-5 py-5 text-left text-base font-semibold text-gray-100 sm:px-7 sm:text-lg"
                      >
                        Typical monthly cost
                      </th>
                      <td className="border-l border-white/[0.08] px-3 py-5 text-center sm:px-5">
                        <span className="font-heading text-base font-bold tabular-nums text-cyan-200 drop-shadow-[0_0_14px_rgba(34,211,238,0.35)] sm:text-lg">
                          From £49/mo
                        </span>
                      </td>
                      <td className="rounded-br-2xl border-l border-white/[0.08] px-3 py-5 text-center sm:px-5">
                        <span className="font-heading text-base tabular-nums text-gray-400 sm:text-lg">
                          £100–£500+/mo
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Plan intros */}
        <section aria-labelledby="pricing-journey-heading" className="space-y-8">
          <div className="text-center">
            <h2 id="pricing-journey-heading" className={sectionTitleHome}>
              Three ways to grow online
            </h2>
            <p className={sectionLeadHome}>From showing up, to winning enquiries, to owning your patch — pick the stage that fits.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 pt-6 md:gap-10 lg:grid-cols-3 lg:gap-8">
            {planIntros.map((plan) => (
              <div key={plan.id} className="relative">
                {plan.popular ? (
                  <div
                    className="pointer-events-none absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-[42%] sm:-translate-y-[48%]"
                    aria-hidden
                  >
                    <div className="flex rotate-[-6deg] items-center gap-2 rounded-full border border-orange-200/55 bg-gradient-to-b from-orange-400 via-amber-500 to-amber-700 px-4 py-2.5 shadow-[0_10px_40px_-4px_rgba(234,88,12,0.65),inset_0_1px_0_rgba(255,255,255,0.35)] ring-[3px] ring-orange-400/25">
                      <Sparkles className="h-4 w-4 shrink-0 text-white drop-shadow-sm" strokeWidth={2} aria-hidden />
                      <span className="font-heading text-[11px] font-extrabold uppercase tracking-[0.18em] text-white drop-shadow-sm sm:text-xs sm:tracking-[0.22em]">
                        Most popular
                      </span>
                    </div>
                  </div>
                ) : null}
                <article
                  className={`relative flex h-full flex-col overflow-hidden ${glassStrong} p-8 sm:p-9 md:p-10 ring-1 ${
                    plan.id === 'active' ? 'ring-orange-400/50' : plan.id === 'growth' ? 'ring-violet-400/25' : 'ring-white/12'
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${plan.accent} blur-2xl opacity-90`}
                  />
                  <div className="relative z-10 mb-6 flex flex-col items-center text-center">
                    <div
                      className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.08] shadow-inner sm:h-16 sm:w-16 ${
                        plan.popular ? 'text-orange-200' : plan.id === 'growth' ? 'text-violet-200' : 'text-cyan-200'
                      }`}
                    >
                      <plan.Icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.5} aria-hidden />
                    </div>
                    <h3 className="font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                      {plan.title}
                    </h3>
                  </div>
                  <div className="relative z-10 flex flex-1 flex-col gap-4 text-left text-base leading-relaxed text-gray-400 md:text-lg">
                    {plan.body}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

        {/* Build your package */}
        <BuildYourPackage />

        {/* Annual lock */}
        <section className="relative overflow-hidden rounded-[1.5rem] border border-orange-400/25 bg-gradient-to-br from-orange-500/[0.12] to-[var(--color-navy)] p-6 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.45)] backdrop-blur-sm md:p-10">
          <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-orange-400/12 blur-[80px]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_280px] lg:items-center">
            <div>
              <h2 className={`mb-4 ${sectionTitleHome}`}>
                Pay once a year. <span className="text-orange-200">Lock your rate in forever.</span>
              </h2>
              <div className="space-y-4 font-sans text-base leading-relaxed text-orange-50/90 md:text-lg">
                <p>
                  Annual subscribers pay for ten months and get twelve. But the more important benefit is this:{' '}
                  <strong className="font-semibold text-white">your rate never goes up.</strong>
                </p>
                <p className="text-orange-50/75">
                  As Built Better grows, our prices will reflect that. Monthly subscribers may see price increases with
                  30 days&rsquo; notice. Annual subscribers are immune to this — permanently — as long as they remain
                  subscribed.
                </p>
                <p className="text-base text-orange-100/70">
                  This is our way of rewarding the clients who back us early.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/12 bg-black/20 px-4 py-3 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-rose-300/90">
                  <TrendingUp className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-sm font-semibold text-white">Monthly</p>
                  <p className="text-xs text-gray-400">Can change with notice</p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-rose-300/50" aria-hidden />
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-orange-300/35 bg-orange-500/10 px-4 py-3 backdrop-blur-sm">
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
            <h2 id="pricing-full-heading" className={sectionTitleHome}>
              Compare plans in full
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-sans text-base text-gray-500 sm:text-lg">
              Scroll sideways on smaller screens. <span className="text-gray-400">★ Active</span> is what most
              people choose.
            </p>
          </div>

          <div className={`-mx-4 sm:mx-0 ${glassSky}`}>
            <div className="overflow-x-auto overscroll-x-contain px-4 pb-2 pt-2 sm:px-5 sm:pb-3 sm:pt-3">
              <table className="w-full min-w-[640px] border-separate border-spacing-0 sm:min-w-0">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className={`${TABLE_ROW_HEAD} rounded-tl-xl border-b border-white/[0.1] bg-white/[0.04] align-middle sm:rounded-tl-2xl`}
                    />
                    <th
                      scope="col"
                      className="border-b border-white/[0.1] bg-white/[0.04] px-3 py-5 text-center align-middle font-heading text-lg font-extrabold tracking-tight text-white sm:px-4 sm:text-xl"
                    >
                      Presence
                    </th>
                    <th
                      scope="col"
                      className="border-b border-white/[0.1] bg-white/[0.06] px-3 py-5 text-center align-middle font-heading text-lg font-extrabold tracking-tight text-white sm:px-4 sm:text-xl"
                    >
                      <span className="mr-1.5 inline-block text-orange-400" aria-hidden>
                        ★
                      </span>
                      <span className="text-orange-100">Active</span>
                    </th>
                    <th
                      scope="col"
                      className="rounded-tr-xl border-b border-white/[0.1] bg-white/[0.04] px-3 py-5 text-center align-middle font-heading text-lg font-extrabold tracking-tight text-white sm:rounded-tr-2xl sm:px-4 sm:text-xl"
                    >
                      Growth
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {detailRows.map((row) => (
                    <tr key={row.label} className="border-b border-white/[0.06]">
                      <th scope="row" className={`${TABLE_ROW_HEAD} bg-white/[0.03]`}>
                        {row.label}
                      </th>
                      {row.cells.map((cell, ci) => {
                        const isHero = ci === 1;
                        return (
                          <td key={ci} className={isHero ? `${TABLE_HERO} border-x border-orange-400/10` : `${TABLE_COL} bg-white/[0.02]`}>
                            <CellContent value={cell} hero={isHero} />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="border-t border-white/[0.1]">
                    <th
                      scope="row"
                      className={`${TABLE_ROW_HEAD} rounded-bl-xl bg-white/[0.04] py-5 font-medium text-gray-200 sm:rounded-bl-2xl`}
                    >
                      Next step
                    </th>
                    <td className={`${TABLE_COL} bg-white/[0.02] py-5`}>
                      <button
                        type="button"
                        onClick={() => onRequestPrototype?.()}
                        className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-2 py-2.5 text-sm font-semibold text-white transition-colors hover:border-cyan-400/35 sm:text-base"
                      >
                        Get started →
                      </button>
                    </td>
                    <td className={`${TABLE_HERO} border-x border-orange-400/10 py-5`}>
                      <button
                        type="button"
                        onClick={() => onRequestPrototype?.()}
                        className="w-full rounded-xl border border-orange-400/45 bg-orange-500/20 px-2 py-2.5 text-sm font-semibold text-orange-50 transition-colors hover:bg-orange-500/30 sm:text-base"
                      >
                        Get started →
                      </button>
                    </td>
                    <td className={`${TABLE_COL} rounded-br-xl bg-white/[0.02] py-5 sm:rounded-br-2xl`}>
                      <button
                        type="button"
                        onClick={() => onRequestPrototype?.()}
                        className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-2 py-2.5 text-sm font-semibold text-white transition-colors hover:border-cyan-400/35 sm:text-base"
                      >
                        Get started →
                      </button>
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
            <h2 id="pricing-addons-heading" className={sectionTitleHome}>
              Need something extra?
            </h2>
            <p className="mt-3 font-sans text-base leading-relaxed text-gray-500 sm:text-lg">
              Bolt on any time — no package games. Ask if you need something that isn&rsquo;t listed.
            </p>
          </div>
          <div className={`divide-y divide-white/[0.06] overflow-hidden ${glassSky}`}>
            {addOns.map((row) => (
              <div key={row.label} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <span className="text-base text-gray-300">{row.label}</span>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 sm:justify-end sm:text-right">
                  <span className="text-base font-medium tabular-nums text-white">{row.price}</span>
                  <span className="text-sm text-gray-500">{row.notes}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <footer className={`relative overflow-hidden border-cyan-400/25 px-5 py-10 text-center md:px-10 md:py-14 ${glassSky}`}>
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -left-20 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[64px]" />
            <div className="absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-[56px]" />
          </div>
          <div className="relative mx-auto max-w-lg">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-500/10 text-cyan-200">
              <KeyRound className="h-7 w-7" strokeWidth={1.5} aria-hidden />
            </div>
            <h2 className={`mb-4 ${sectionTitleHome}`}>Not ready to commit? See your site first.</h2>
            <div className={`space-y-3 ${bodyHome}`}>
              <p>
                For £49, we&rsquo;ll build you a working homepage prototype in 24 hours. If you go ahead, the £49 comes
                off your first month.
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
