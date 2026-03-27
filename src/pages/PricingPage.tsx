import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Pricing from '../components/Pricing';

export default function PricingPage() {
  const { openPrototype } = useOutletContext<{ openPrototype: () => void }>();
  return <Pricing onRequestPrototype={openPrototype} />;
}
