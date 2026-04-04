/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Footer from './components/Footer';
import PrototypeModal from './components/PrototypeModal';
import HomePage from './pages/HomePage';
import WhatWeDoPage from './pages/WhatWeDoPage';
import PricingPage from './pages/PricingPage';
import WhatsAppPage from './pages/WhatsAppPage';
import FaqPage from './pages/FaqPage';
import TermsPage from './pages/TermsPage';
import WorkPage from './pages/WorkPage';

function LayoutWrapper() {
  const [prototypeOpen, setPrototypeOpen] = useState(false);
  const openPrototype = () => setPrototypeOpen(true);

  return (
    <>
      <Layout onRequestPrototype={openPrototype}>
        <Outlet context={{ openPrototype }} />
        <Footer onRequestPrototype={openPrototype} />
      </Layout>
      <PrototypeModal open={prototypeOpen} onClose={() => setPrototypeOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutWrapper />}>
          <Route index element={<HomePage />} />
          <Route path="what-we-do" element={<WhatWeDoPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="whatsapp" element={<WhatsAppPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="work" element={<WorkPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
