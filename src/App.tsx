/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

export default function App() {
  return (
    <Layout>
      <Hero />
      <HowItWorks />
      <Pricing />
      <Footer />
    </Layout>
  );
}
