import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/Hero';
import PrototypeOffer from '../components/PrototypeOffer';

export default function HomePage() {
  const { openPrototype } = useOutletContext<{ openPrototype: () => void }>();

  return (
    <>
      <Hero onRequestPrototype={openPrototype} />
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-[var(--section-py)] -mt-2">
        <div className="max-w-7xl mx-auto">
          <PrototypeOffer onRequestPrototype={openPrototype} />
        </div>
      </section>
    </>
  );
}
