/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import PrototypeModal from './components/PrototypeModal';

export default function App() {
  const [prototypeOpen, setPrototypeOpen] = useState(false);
  const openPrototype = () => setPrototypeOpen(true);

  return (
    <>
      <Layout onRequestPrototype={openPrototype}>
        <Hero onRequestPrototype={openPrototype} />
        <HowItWorks />
        <Pricing onRequestPrototype={openPrototype} />
        <Footer onRequestPrototype={openPrototype} />
      </Layout>
      <PrototypeModal open={prototypeOpen} onClose={() => setPrototypeOpen(false)} />
    </>
  );
}
