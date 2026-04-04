import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useId } from 'react';
import { X } from 'lucide-react';

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL ?? 'hello@builtbetter.co.uk';

type PrototypeModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function PrototypeModal({ open, onClose }: PrototypeModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-[var(--color-navy)]/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-lg rounded-[2rem] border border-white/20 bg-[rgba(10,17,40,0.88)] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl md:p-8"
            style={{
              boxShadow:
                '0 25px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 60px rgba(56,189,248,0.12)',
            }}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  £49 prototype
                </p>
                <h2 id={titleId} className="mt-2 font-heading text-2xl font-extrabold text-white md:text-3xl">
                  Try a prototype
                </h2>
                <div className="mt-3 text-sm text-gray-400 space-y-3 leading-relaxed">
                  <p>Tell us a bit about you and what you need.</p>
                  <p>We&apos;ll get back within one business day.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-full border border-white/15 bg-white/5 p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              className="relative mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const payload = {
                  name: String(fd.get('name') ?? ''),
                  email: String(fd.get('email') ?? ''),
                  company: String(fd.get('company') ?? ''),
                  project: String(fd.get('project') ?? ''),
                };
                const subject = encodeURIComponent('Prototype request — Built Better');
                const body = encodeURIComponent(
                  `Name: ${payload.name}\nEmail: ${payload.email}\nCompany (optional): ${payload.company}\n\nWhat they want:\n${payload.project}`
                );
                window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
                onClose();
              }}
            >
              <div>
                <label htmlFor="proto-name" className="block text-xs font-medium uppercase tracking-wider text-gray-500">
                  Name
                </label>
                <input
                  id="proto-name"
                  name="name"
                  required
                  autoComplete="name"
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="Alex Smith"
                />
              </div>
              <div>
                <label htmlFor="proto-email" className="block text-xs font-medium uppercase tracking-wider text-gray-500">
                  Email
                </label>
                <input
                  id="proto-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="you@business.co.uk"
                />
              </div>
              <div>
                <label htmlFor="proto-company" className="block text-xs font-medium uppercase tracking-wider text-gray-500">
                  Company <span className="font-normal normal-case text-gray-500/80">(optional)</span>
                </label>
                <input
                  id="proto-company"
                  name="company"
                  autoComplete="organization"
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="Your business name"
                />
              </div>
              <div>
                <label htmlFor="proto-project" className="block text-xs font-medium uppercase tracking-wider text-gray-500">
                  What do you want?
                </label>
                <textarea
                  id="proto-project"
                  name="project"
                  required
                  rows={4}
                  className="mt-2 w-full resize-y rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="e.g. A simple site for my café, booking form, and Google Maps…"
                />
              </div>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/5"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary rounded-full px-8 py-3 text-sm font-semibold">
                  Send request
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
