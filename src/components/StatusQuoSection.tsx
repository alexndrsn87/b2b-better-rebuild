import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Search } from 'lucide-react';
import { TextReveal } from './TextReveal';

const bodyBlocks = [
  <>
    It&apos;s not dramatic. It&apos;s just maths.
  </>,
  <>
    Someone in your town Googles &quot;plumber near me&quot; or &quot;best beautician in your town&quot;. They find
    three results. Two have proper websites. One has nothing, or a site that looks like it was built when people still
    had BlackBerries.
  </>,
];

function LocalSearchSketch() {
  return (
    <div className="glass-card h-full border-white/15 p-7 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.5)] sm:p-9 md:p-10">
      <div
        className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-[50px]"
        aria-hidden
      />
      <div className="relative mb-4 flex items-center gap-3 rounded-xl border border-white/20 bg-white/[0.12] px-3 py-2.5">
        <Search className="h-4 w-4 shrink-0 text-gray-400" strokeWidth={2} aria-hidden />
        <span className="min-w-0 flex-1 truncate font-sans text-[13px] text-gray-200">plumber near me</span>
        <span className="shrink-0 font-heading text-sm font-bold tracking-tight" aria-hidden>
          <span className="text-blue-400">G</span>
          <span className="text-red-400">o</span>
          <span className="text-yellow-400">o</span>
          <span className="text-blue-400">g</span>
          <span className="text-green-400">l</span>
          <span className="text-red-400">e</span>
        </span>
      </div>
      <ul className="relative space-y-2.5" aria-hidden>
        {[
          {
            title: 'Pro Plumbing Co.',
            rating: '★★★★★',
            reviews: '4.9 (47 reviews)',
            sub: 'Plumber · Open now · proPlumbing.co.uk',
            strong: true,
          },
          {
            title: 'Town Heating Ltd',
            rating: '★★★★☆',
            reviews: '4.6 (23 reviews)',
            sub: 'Plumber · Service areas listed · townheating.co.uk',
            strong: true,
          },
          {
            title: '???',
            rating: '',
            reviews: 'No reviews',
            sub: 'Plumber · No website · Old Facebook page',
            strong: false,
          },
        ].map((row, i) => (
          <motion.li
            key={row.title}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 + i * 0.08, duration: 0.4 }}
            className={`flex items-start gap-3 rounded-xl px-3 py-2.5 ${
              row.strong
                ? 'border-l-2 border-emerald-400/30 bg-emerald-500/[0.08] ring-1 ring-emerald-400/15'
                : 'border-l-2 border-rose-400/35 bg-white/[0.03] opacity-40 ring-1 ring-rose-400/20'
            }`}
          >
            <span
              className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                row.strong ? 'bg-emerald-400' : 'bg-gray-500'
              }`}
            />
            <div className="min-w-0">
              <p className="font-heading text-sm font-semibold tracking-tight text-white">{row.title}</p>
              <div className="mt-0.5 flex items-center gap-2 text-xs">
                {row.rating ? <span className="text-amber-300">{row.rating}</span> : null}
                <span className="text-gray-500">{row.reviews}</span>
                {!row.strong ? (
                  <span className="rounded-full border border-rose-400/40 bg-rose-500/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rose-300">
                    No website
                  </span>
                ) : null}
              </div>
              <p className="mt-1 font-sans text-xs text-gray-500">{row.sub}</p>
            </div>
          </motion.li>
        ))}
      </ul>
      <p className="relative mt-4 text-center font-sans text-[11px] leading-snug text-gray-600">
        Two look legit. One doesn&apos;t show up the same way — guess who gets skipped.
      </p>
    </div>
  );
}

export default function StatusQuoSection() {
  return (
    <section className="relative z-10 overflow-hidden border-t border-white/[0.06] bg-[var(--color-navy)] px-4 pb-14 pt-[var(--section-py)] sm:px-6 sm:pb-16 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ opacity: [0.2, 0.38, 0.2], scale: [1, 1.06, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-orange-500/10 blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.15, 0.32, 0.15], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 -right-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-[90px]"
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.p
          className="mb-5 text-center font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400/85 sm:text-xs"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.45 }}
        >
          Straight talk
        </motion.p>

        <h2 className="mx-auto mb-12 max-w-4xl text-center font-heading text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:mb-14 sm:text-4xl md:text-[2.65rem] md:leading-tight">
          <TextReveal text="Every week without a proper website, you're losing work to someone who has one." />
        </h2>

        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
          <motion.div
            className="glass-card h-full border-white/15 p-7 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.5)] sm:p-9 md:p-10 lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, delay: 0.06 }}
          >
            <div className="space-y-5 font-sans text-base leading-relaxed text-gray-400 md:text-lg">
              {bodyBlocks.map((block, i) => (
                <p key={i}>{block}</p>
              ))}

              <motion.p
                className="relative py-1 font-heading text-lg font-semibold leading-snug text-white md:text-xl"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12, duration: 0.4 }}
              >
                You already know which one doesn&apos;t get the call.
              </motion.p>

              <p>
                Most local businesses have been meaning to sort their website for years. It always gets pushed back
                because it seems complicated, expensive, and slow to deliver.
              </p>
              <p className="font-heading text-lg font-semibold leading-snug text-white md:text-xl">
                None of those things are true anymore. We fixed all three!
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-5 lg:pt-1">
            <LocalSearchSketch />
          </div>
        </div>

      </div>
    </section>
  );
}
