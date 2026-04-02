import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { TextReveal } from '../components/TextReveal';

const sections = [
  {
    title: '1. Who we are',
    body:
      'Built Better (“we”, “us”) provides website design, build, hosting-related services, and ongoing support for clients as described in your proposal or order. These Terms apply when you use our services or website.',
  },
  {
    title: '2. Services',
    body:
      'The scope of work, fees, and timelines are set out in your written quote, proposal, or checkout. Anything not included there may require a separate agreement or fee. We aim to deliver work professionally and on time, and we’ll communicate if something affects delivery.',
  },
  {
    title: '3. Your responsibilities',
    body:
      'You agree to provide accurate information, timely feedback, and materials (text, images, logos) you have the right to use. You’re responsible for compliance with laws that apply to your business and your site content.',
  },
  {
    title: '4. Fees and payment',
    body:
      'Setup and recurring fees are as quoted. Unless otherwise agreed, invoices are due on the dates stated. Late payment may affect service continuity. The £49 prototype, where offered, follows the terms described at purchase.',
  },
  {
    title: '5. Intellectual property',
    body:
      'On full payment for the applicable deliverables, you receive the rights agreed in your project documentation to use the custom work for your business. Third-party assets (stock, fonts, plugins) remain subject to their licences. We may showcase non-confidential work in our portfolio unless you opt out in writing.',
  },
  {
    title: '6. Hosting and third parties',
    body:
      'Where we arrange hosting or integrate third-party tools, their terms and uptime also apply. We’re not responsible for outages or changes made by those providers beyond what we can reasonably control.',
  },
  {
    title: '7. Limitation of liability',
    body:
      'To the fullest extent permitted by UK law, we’re not liable for indirect or consequential loss, or loss of profits, arising from our services. Our total liability relating to a project is generally limited to the fees you paid us for that project in the twelve months before the claim, except where liability cannot be limited by law.',
  },
  {
    title: '8. Term and cancellation',
    body:
      'Ongoing plans continue until ended according to your agreement. Either party may terminate for material breach if the other doesn’t fix the issue within a reasonable cure period where applicable. We’ll explain what happens to your site and data on exit.',
  },
  {
    title: '9. Changes to these terms',
    body:
      'We may update these Terms from time to time. Material changes will be indicated on this page with an updated date. Continued use of our services after changes means you accept the updated Terms where permitted.',
  },
  {
    title: '10. Contact',
    body:
      'Questions about these Terms? Reach out via the contact options on this site (including WhatsApp where available).',
  },
];

export default function TermsPage() {
  return (
    <section className="relative z-10 py-[var(--section-py)] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-500/8 blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.p className="mb-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors font-sans"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </motion.p>

        <div className="mb-10">
          <p className="text-[11px] sm:text-xs tracking-[0.28em] uppercase font-heading text-blue-400/90 mb-4">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white leading-tight">
            <TextReveal text="Terms of Service" />
          </h1>
          <p className="text-sm text-gray-500 font-sans">
            Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-8 md:p-10 space-y-10"
        >
          <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed">
            These Terms of Service govern your use of services provided by Built Better. They are a general template for
            a small business site—not bespoke legal advice. You should have them reviewed by a solicitor if your
            situation is complex or high-risk.
          </p>
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-heading font-bold text-lg md:text-xl text-white mb-3">{s.title}</h2>
              <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed">{s.body}</p>
            </div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-gray-500 text-sm font-sans">
          <Link to="/faq" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            FAQ
          </Link>
          {' · '}
          <Link to="/whatsapp" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            WhatsApp
          </Link>
        </p>
      </div>
    </section>
  );
}
