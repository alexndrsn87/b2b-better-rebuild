import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { TextReveal } from './TextReveal';

const lines = [
  'New phone number? WhatsApp us.',
  'New prices? WhatsApp us.',
  'New photos from a job you’re proud of? WhatsApp us.',
  'in no time!!',
  'No tickets. No dashboards. No “please allow 5–7 business days.” Just a message to a real person who will sort it.',
];

export default function WhatsAppHomeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(40);
  const smoothX = useSpring(mouseX, { stiffness: 48, damping: 38 });
  const smoothY = useSpring(mouseY, { stiffness: 48, damping: 38 });
  const spotlight = useMotionTemplate`radial-gradient(640px circle at ${smoothX}% ${smoothY}%, rgba(52, 211, 153, 0.12) 0%, rgba(56, 189, 248, 0.06) 40%, transparent 58%)`;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden border-t border-white/[0.06] bg-[var(--color-navy)] px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-12 lg:px-8"
      onPointerMove={(e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
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
          animate={{ opacity: [0.22, 0.4, 0.22], scale: [1, 1.08, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-28 top-0 h-[min(100vw,440px)] w-[min(100vw,440px)] rounded-full bg-emerald-500/14 blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.18, 0.36, 0.18], y: [0, 28, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-teal-500/10 blur-[90px]"
        />
        <motion.div className="absolute inset-0 opacity-[0.9]" style={{ background: spotlight }} />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)`,
            backgroundSize: '44px 44px',
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_min(38%,420px)] lg:items-center lg:gap-14">
        <div>
          <motion.p
            className="mb-5 text-center font-heading text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-400/90 sm:mb-6 sm:text-left sm:text-xs"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
          >
            WhatsApp updates
          </motion.p>

          <h2 className="mb-10 text-center font-heading text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:mb-12 sm:text-left sm:text-4xl md:text-5xl lg:text-[2.75rem] lg:leading-tight">
            <TextReveal text="Update your website the same way you’d text a mate." />
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card border-emerald-500/15 p-7 shadow-[0_24px_70px_-24px_rgba(16,185,129,0.18)] sm:p-9 md:p-10"
          >
            <div className="space-y-4 font-sans text-base leading-relaxed text-gray-400 md:text-[1.05rem]">
              {lines.slice(0, 3).map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  className="text-gray-300"
                >
                  {line}
                </motion.p>
              ))}
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.45 }}
                className="border-l-2 border-emerald-400/50 py-1 pl-4 font-medium text-white"
              >
                {lines[3]}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.28, duration: 0.45 }}
                className="text-gray-400"
              >
                {lines[4]}
              </motion.p>
            </div>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <Link
                to="/whatsapp"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-center font-sans text-base font-bold tracking-tight text-white shadow-[0_14px_40px_-12px_rgba(16,185,129,0.4)] transition-[filter,transform,box-shadow] hover:brightness-110 hover:shadow-[0_18px_48px_-14px_rgba(16,185,129,0.5)] sm:w-auto sm:px-8 sm:text-lg"
              >
                <MessageCircle className="h-5 w-5 shrink-0 opacity-95" aria-hidden />
                Message us on WhatsApp
                <ArrowRight className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative rounded-[1.75rem] border border-white/12 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 shadow-[0_28px_80px_-28px_rgba(0,0,0,0.55)] sm:p-6">
            <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                <MessageCircle className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-white">Built Better</p>
                <p className="font-sans text-xs text-emerald-400/90">Usually replies in a few hours</p>
              </div>
            </div>
            <div className="space-y-3 font-sans text-sm">
              <motion.div
                className="ml-auto max-w-[92%] rounded-2xl rounded-tr-md bg-emerald-600/35 px-3.5 py-2.5 text-left text-gray-100 ring-1 ring-emerald-400/25"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.35 }}
              >
                Hey — new number for the shop: 01234 567890. Can you swap it on the site?
              </motion.div>
              <motion.div
                className="max-w-[88%] rounded-2xl rounded-tl-md bg-white/[0.08] px-3.5 py-2.5 text-gray-300 ring-1 ring-white/10"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.35 }}
              >
                of course — just updated! Should be on the site now.
              </motion.div>
              <motion.div
                className="ml-auto max-w-[70%] rounded-2xl rounded-tr-md bg-emerald-600/25 px-3.5 py-2.5 text-gray-200 ring-1 ring-emerald-400/20"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.35 }}
              >
                Legend, thank you
              </motion.div>
            </div>
            <p className="mt-5 text-center font-sans text-[11px] tracking-wide text-gray-500">
              Example conversation — your updates, same channel.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
