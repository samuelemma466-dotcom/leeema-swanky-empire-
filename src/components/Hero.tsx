import React from 'react';
import { ShoppingBag, MessageSquare, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const scrollToCollection = () => {
    const element = document.getElementById('collection');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-cream text-gray-900 pt-16"
    >
      {/* Cinematic Parallax Background with Ken Burns Soft Zoom */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1920"
          alt="Luxury Modest Boutique"
          className="w-full h-full object-cover object-top opacity-60 scale-105 animate-kenburns"
          referrerPolicy="no-referrer"
        />
        {/* Soft, warm luxury overlays for high-brightness airy feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cream via-brand-cream/85 to-transparent mix-blend-normal" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-cream via-transparent to-white/30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange-light/40 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Floating Decorative Gold Grid or lines */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-20 border-x border-brand-gold/10 max-w-7xl mx-auto" />

      {/* Content Container with Left-Aligned Editorial Column */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full flex items-center">
        <div className="max-w-3xl text-left">
          {/* Saturated gold-badge label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange-dark text-xs font-semibold tracking-wider uppercase mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
            The Digital Luxury Showroom
          </motion.div>

          {/* Master Headline (Vogue-Style Playfair Display) */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-8xl font-bold font-serif tracking-tight leading-none mb-6 text-gray-950"
          >
            Bespoke Modesty. <br />
            <span className="text-brand-green relative inline-block">
              Swanky
              <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-brand-orange rounded-full scale-x-75 origin-left" />
            </span> <span className="font-serif italic font-light text-brand-orange">Elegance.</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl sm:text-3xl font-serif italic text-gray-800 tracking-wide mb-6"
          >
            "Authentically You, Modestly Swanky."
          </motion.p>

          {/* Subtext description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base text-gray-700 font-sans leading-relaxed mb-12 max-w-xl font-medium"
          >
            Step into our bright boutique. From premium custom silk Abayas and handpicked Grade A thrifts to majestic laces and signature fragrances, experience modest styling crafted for royalty.
          </motion.p>

          {/* Call to Actions (CTAs) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button
              onClick={scrollToCollection}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-green hover:bg-brand-green-dark text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl shadow-brand-green/10 hover:shadow-brand-green/20 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="h-5 w-5" />
              Explore Showroom
            </button>

            <a
              href="https://wa.me/2348168972534"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-white hover:bg-brand-orange-light border border-brand-orange/30 text-brand-orange-dark font-sans text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-sm hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <MessageSquare className="h-5 w-5 text-brand-orange" />
              WhatsApp Rep
            </a>
          </motion.div>
        </div>
      </div>

      {/* Parallax Floating Stat Label on the side for layout density */}
      <div className="absolute right-12 bottom-24 hidden xl:block z-10 bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-brand-gold/15 max-w-xs shadow-xl animate-bounce [animation-duration:6s]">
        <p className="font-serif italic text-sm text-brand-orange-dark">Boutique Guarantee</p>
        <p className="font-sans font-semibold text-xs text-gray-800 mt-1">
          Nationwide dispatches directly from our Lagos & Abuja hubs.
        </p>
      </div>

      {/* Cinematic scroll down arrow */}
      <button
        onClick={scrollToCollection}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-gray-500 hover:text-brand-green text-xs tracking-[0.2em] uppercase font-bold transition-all cursor-pointer focus:outline-none"
      >
        <span>Showroom</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  );
};

