import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  Briefcase,
  ChevronDown,
  FileText,
  HeartCrack,
  KeyRound,
  LifeBuoy,
  MessageCircle,
  PenLine,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { TextReveal } from '../components/TextReveal';

type FaqItem = {
  q: string;
  /** Extra phrases for search (answers are often React nodes). */
  searchText: string;
  paragraphs: (string | React.ReactNode)[];
  Icon: LucideIcon;
  accent: string;
  accentBg: string;
};

const faqs: FaqItem[] = [
  {
    q: 'What if I hate the prototype?',
    searchText:
      'prototype hate dislike unhappy revisions friends £49 hard sell changes mind screen sharp',
    Icon: HeartCrack,
    accent: 'text-orange-300',
    accentBg: 'from-orange-500/25 to-amber-500/10',
    paragraphs: [
      <>
        Then you&rsquo;ve spent £49 and we&rsquo;ve spent a day building it. We&rsquo;ll make changes until you&rsquo;re
        happy — that&rsquo;s part of the process. But if after revisions it&rsquo;s genuinely not for you, we&rsquo;ll
        part as friends with no hard sell.
      </>,
      <>In our experience, seeing your business looking sharp on a screen tends to change minds fairly quickly.</>,
    ],
  },
  {
    q: 'Do I own my website?',
    searchText:
      'own ownership domain licence license subscription infrastructure buyout rent shop unit building files',
    Icon: KeyRound,
    accent: 'text-cyan-300',
    accentBg: 'from-cyan-500/25 to-sky-500/10',
    paragraphs: [
      <>
        Under our standard subscription, we own the infrastructure and you have a permanent licence to use the site.
        Think of it like renting a premium, well-maintained shop unit — you run your business from it, we look after the
        building.
      </>,
      <>
        If you&rsquo;d rather own everything outright, we offer a buyout option. See the{' '}
        <Link to="/pricing" className="font-medium text-cyan-400 underline decoration-cyan-400/40 underline-offset-2 hover:text-cyan-300">
          pricing page
        </Link>{' '}
        for details.
      </>,
      <>Either way, your domain is always registered in your name. It&rsquo;s yours.</>,
    ],
  },
  {
    q: 'What if Built Better goes out of business?',
    searchText:
      'close closing shutdown bankrupt handover backup files transfer notice stranded company business',
    Icon: LifeBuoy,
    accent: 'text-violet-300',
    accentBg: 'from-violet-500/25 to-fuchsia-500/10',
    paragraphs: [
      <>Fair question, and we respect you for asking it.</>,
      <>
        All client files are backed up and we maintain a full handover policy. If we ever had to close — which we have
        no plans to do — you would receive your files and domain transfer with 30 days&rsquo; notice.
      </>,
      <>You would never be stranded.</>,
    ],
  },
  {
    q: 'What does “unlimited updates” actually mean?',
    searchText:
      'unlimited updates whatsapp 48 hours phone number prices photos hours redesign boundary changes',
    Icon: MessageCircle,
    accent: 'text-emerald-300',
    accentBg: 'from-emerald-500/25 to-teal-500/10',
    paragraphs: [
      <>
        It means you WhatsApp us anything you want changed — new phone number, updated prices, new services, new photos,
        changed opening hours — and we do it within 48 hours.
      </>,
      <>It doesn&rsquo;t mean we&rsquo;ll redesign your site every week. But we&rsquo;ve never had anyone test that boundary.</>,
    ],
  },
  {
    q: 'What if I want to cancel?',
    searchText:
      'cancel cancellation leave notice 30 days files £99 guilt unhappy month monthly annual',
    Icon: ShieldCheck,
    accent: 'text-sky-300',
    accentBg: 'from-sky-500/25 to-blue-500/10',
    paragraphs: [
      <>
        Tell us with 30 days&rsquo; notice — a WhatsApp message is fine. Your site stays live for those 30 days.
        We&rsquo;ll give you your files for £99 if you want them.
      </>,
      <>No guilt trip. No attempts to change your mind. We&rsquo;d rather you leave happy than stay unhappy.</>,
    ],
  },
  {
    q: 'How do you write the copy for my site?',
    searchText:
      'copy writing content words review refine trades beauty food professional services different local',
    Icon: PenLine,
    accent: 'text-amber-300',
    accentBg: 'from-amber-500/25 to-orange-500/10',
    paragraphs: [
      <>
        We ask you about your business, your customers, and what makes you different from the person down the road. Then
        we write it. You review it. We refine it if needed.
      </>,
      <>
        We&rsquo;ve written copy for trades, health and beauty, food businesses, and professional services. We know how
        to make a local business sound like the obvious choice in their area.
      </>,
    ],
  },
  {
    q: 'Is there a contract?',
    searchText:
      'contract terms agreement monthly annual 12 months upfront plain english small print sign',
    Icon: FileText,
    accent: 'text-blue-300',
    accentBg: 'from-blue-500/25 to-indigo-500/10',
    paragraphs: [
      <>
        Monthly plans run month-to-month with 30 days&rsquo; notice to cancel. Annual plans are 12 months, paid upfront.
      </>,
      <>
        Both are written in plain English. No small print designed to trap you. We&rsquo;re happy to walk you through the
        terms before you sign anything.
      </>,
    ],
  },
  {
    q: 'Do you work with any type of business?',
    searchText:
      'uk local trades beauty health food retail professional ecommerce shop application fit honest',
    Icon: Briefcase,
    accent: 'text-fuchsia-300',
    accentBg: 'from-fuchsia-500/25 to-pink-500/10',
    paragraphs: [
      <>
        Mainly UK local businesses — trades, beauty, health, food, retail, professional services. We don&rsquo;t do
        e-commerce or complex web applications.
      </>,
      <>
        If you&rsquo;re a local business that wants a site that looks brilliant, loads fast, and brings in work,
        we&rsquo;re probably the right fit.
      </>,
      <>
        If you&rsquo;re not sure, just{' '}
        <Link to="/whatsapp" className="font-medium text-cyan-400 underline decoration-cyan-400/40 underline-offset-2 hover:text-cyan-300">
          WhatsApp us
        </Link>
        . We&rsquo;ll tell you honestly.
      </>,
    ],
  },
];

function matchesQuery(item: FaqItem, q: string): boolean {
  if (!q.trim()) return true;
  const s = q.toLowerCase();
  return `${item.q} ${item.searchText}`.toLowerCase().includes(s);
}

export default function FaqPage() {
  const rootRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });
  const [query, setQuery] = useState('');

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(35);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 40 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 40 });
  const spotlight = useMotionTemplate`radial-gradient(820px circle at ${smoothX}% ${smoothY}%, rgba(56, 189, 248, 0.1) 0%, rgba(168, 85, 247, 0.08) 42%, transparent 58%)`;

  const filtered = useMemo(() => faqs.map((item, i) => ({ item, i })).filter(({ item }) => matchesQuery(item, query)), [query]);

  const toggle = (i: number) => setOpen((o) => ({ ...o, [i]: !o[i] }));

  const expandAll = () => {
    const next: Record<number, boolean> = {};
    filtered.forEach(({ i }) => {
      next[i] = true;
    });
    setOpen(next);
  };

  const collapseAll = () => setOpen({});

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
          animate={{ opacity: [0.22, 0.42, 0.22], scale: [1, 1.07, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-28 top-[5%] h-[min(100vw,440px)] w-[min(100vw,440px)] rounded-full bg-cyan-500/12 blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.38, 0.2], y: [0, 26, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-[8%] right-0 h-96 w-96 rounded-full bg-violet-500/11 blur-[92px]"
        />
        <motion.div className="absolute inset-0 opacity-[0.9]" style={{ background: spotlight }} />
        <div
          className="absolute inset-0 opacity-[0.034]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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

        <header className="mb-10 text-center md:mb-14">
          <h1 className="mb-6 font-heading text-[1.85rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3rem]">
            <TextReveal text="The questions people actually ask us." />
          </h1>
          <motion.p
            className="mx-auto max-w-xl font-sans text-base leading-relaxed text-gray-400 md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
          >
            Honest answers, plain English — like a mate who actually knows websites, not a corporate PDF.
          </motion.p>
        </header>

        {/* Search + bulk actions */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative flex flex-1 items-center">
            <Search className="pointer-events-none absolute left-4 h-4 w-4 text-gray-500" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="w-full rounded-2xl border border-white/12 bg-white/[0.06] py-3.5 pl-11 pr-10 font-sans text-sm text-white placeholder:text-gray-500 outline-none ring-cyan-400/0 transition-[box-shadow,border-color] focus:border-cyan-400/35 focus:ring-2 focus:ring-cyan-400/20 md:text-base"
              autoComplete="off"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 rounded-lg p-1 text-gray-500 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </label>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={expandAll}
              className="rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 font-sans text-xs font-semibold text-white transition-colors hover:border-cyan-400/30 hover:bg-white/[0.08] sm:text-sm"
            >
              Expand all
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="rounded-full border border-white/10 px-4 py-2 font-sans text-xs font-medium text-gray-400 transition-colors hover:border-white/20 hover:text-white sm:text-sm"
            >
              Collapse all
            </button>
          </div>
        </div>

        {/* Decorative strip — “objections → calm” */}
        <motion.div
          className="mb-10 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 md:gap-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {['Worry', 'Question', 'Straight answer', 'Breath out'].map((label, i) => (
            <React.Fragment key={label}>
              {i > 0 && (
                <span className="hidden h-px w-8 bg-gradient-to-r from-transparent via-white/25 to-transparent sm:block" />
              )}
              <span className="flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-300/90">
                  {i + 1}
                </span>
                {label}
              </span>
            </React.Fragment>
          ))}
        </motion.div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-16 text-center">
            <Sparkles className="mx-auto mb-4 h-10 w-10 text-gray-600" aria-hidden />
            <p className="font-sans text-gray-400">No matches for &ldquo;{query}&rdquo;. Try another word — or</p>
            <button
              type="button"
              onClick={() => setQuery('')}
              className="mt-3 font-medium text-cyan-400 hover:text-cyan-300"
            >
              clear search
            </button>
          </div>
        ) : (
          <ul className="space-y-4 md:space-y-5">
            {filtered.map(({ item, i }) => {
              const isOpen = !!open[i];
              return (
                <motion.li
                  key={item.q}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className={`overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-300 ${
                    isOpen
                      ? 'border-cyan-400/25 bg-white/[0.06] shadow-[0_24px_70px_-28px_rgba(34,211,238,0.12)]'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/16'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="flex w-full items-start gap-4 p-5 text-left md:gap-5 md:p-6"
                    aria-expanded={isOpen}
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${item.accentBg} md:h-14 md:w-14`}
                    >
                      <item.Icon className={`h-6 w-6 ${item.accent} md:h-7 md:w-7`} strokeWidth={1.5} aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <span className="mb-1 block font-mono text-[10px] font-medium uppercase tracking-widest text-gray-600">
                        Question {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-heading text-base font-bold leading-snug text-white md:text-lg">{item.q}</span>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-1 shrink-0 rounded-full border border-white/10 bg-white/[0.06] p-2"
                    >
                      <ChevronDown className="h-5 w-5 text-cyan-400" aria-hidden />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.33, 1, 0.68, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/10 px-5 pb-6 pt-4 md:px-6 md:pb-7">
                          <div className="ml-0 flex gap-4 md:ml-[4.5rem] md:gap-5">
                            <div className="hidden w-px shrink-0 bg-gradient-to-b from-cyan-400/40 via-white/10 to-transparent md:block" />
                            <div className="space-y-4 font-sans text-sm leading-relaxed text-gray-400 md:text-base">
                              {item.paragraphs.map((para, pi) => (
                                <p key={pi}>{para}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        )}

        <motion.div
          className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.08] to-cyan-500/[0.05] p-8 text-center md:flex-row md:justify-between md:p-10 md:text-left"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-500/15">
              <MessageCircle className="h-7 w-7 text-emerald-300" strokeWidth={1.5} aria-hidden />
            </div>
            <div>
              <p className="font-heading text-lg font-bold text-white md:text-xl">Still wondering?</p>
              <p className="mt-1 font-sans text-sm text-gray-400 md:text-base">No forms. Just a conversation.</p>
            </div>
          </div>
          <Link
            to="/whatsapp"
            className="inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-8 py-3.5 font-sans text-sm font-bold text-white shadow-[0_12px_40px_-12px_rgba(16,185,129,0.45)] transition-[transform,filter] hover:brightness-110 md:w-auto md:text-base"
          >
            WhatsApp us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
