import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Products } from './components/Products';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowToOrder } from './components/HowToOrder';
import { Cart } from './components/Cart';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SplashScreen } from './components/SplashScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <CartProvider>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" onEnter={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col font-sans bg-brand-cream text-gray-900 antialiased overflow-x-hidden selection:bg-brand-orange/20 selection:text-brand-orange" id="app-root-container">
        {/* Sticky Luxury Header */}
        <Header />

        {/* Dynamic Interactive Page Content */}
        <main className="flex-grow">
          {/* Welcome and Tagline Hero Area */}
          <Hero />

          {/* About Us Narrative */}
          <About />

          {/* Interactive Catalog and Details Modal */}
          <Products />

          {/* Three Pillars Core Promise */}
          <WhyChooseUs />

          {/* Detailed 4-Step ordering instructions */}
          <HowToOrder />
        </main>

        {/* Contact and Info Footer */}
        <Footer />

        {/* Global Cart Slide-Out Drawer */}
        <Cart />

        {/* Bottom Floating WhatsApp Launcher */}
        <FloatingWhatsApp />

        {/* Hidden Pre-Admin Content Management System overlay */}
        <AdminDashboard />
      </div>
    </CartProvider>
  );
}

