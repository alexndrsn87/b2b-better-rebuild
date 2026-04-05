import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/Hero';

export default function HomePage() {
  const { openPrototype } = useOutletContext<{ openPrototype: () => void }>();

  return <Hero onRequestPrototype={openPrototype} />;
}
