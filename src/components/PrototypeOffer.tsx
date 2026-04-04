import React from 'react';
import { motion } from 'motion/react';
import { Check, LayoutTemplate } from 'lucide-react';
import TiltCard from './TiltCard';

type PrototypeOfferProps = {
  onRequestPrototype?: () => void;
};

export default function PrototypeOffer({ onRequestPrototype }: PrototypeOfferProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 'some' }}
      className="max-w-4xl mx-auto"
    >
      <TiltCard className="p-8 md:p-10 border-blue-500/30 overflow-hidden" glowColor="rgba(59, 130, 246, 0.2)">
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1.5 text-sm font-semibold rounded-bl-lg rounded-tr-[1.5rem]">
          Try Before You Buy
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-4 md:mt-0">
          <div className="flex-1 text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold mb-3 text-white flex items-center gap-3 flex-wrap">
              <LayoutTemplate className="w-6 h-6 text-blue-400 shrink-0" />
              The £49 Prototype
            </h2>
            <p className="text-3xl font-bold text-white mb-4">
              £49 <span className="text-base text-gray-400 font-normal">/ 24-hour turnaround</span>
            </p>
            <div className="text-gray-300 mb-8 leading-relaxed space-y-4">
              <p>We build a custom interactive homepage blueprint in 24 hours.</p>
              <p>Link expires in 7 days.</p>
            </div>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                Custom Design (No Templates)
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                Interactive Preview
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                £49 deducted from setup fee if you proceed
              </li>
            </ul>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onRequestPrototype?.()}
              className="btn-primary btn-shimmer w-full md:w-auto text-lg py-3 px-8"
            >
              Get the £49 prototype
            </button>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
