import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, Phone, Instagram } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const { cartCount, setCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pressStartTimeRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  const startPress = (e: React.MouseEvent | React.TouchEvent) => {
    // If touch event, prevent default behavior to avoid scrolling or native context menu popups
    if (e.type === 'touchstart' && e.cancelable) {
      e.preventDefault();
    }
    
    // Clear any existing timers
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    setIsHolding(true);
    pressStartTimeRef.current = Date.now();
    longPressTimerRef.current = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('open-swanky-admin'));
      longPressTimerRef.current = null;
      setIsHolding(false);
    }, 5000); // 5 seconds hold
  };

  const cancelPress = (e: React.MouseEvent | React.TouchEvent) => {
    setIsHolding(false);
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
      
      // If it was a quick click, scroll to home
      const elapsed = Date.now() - pressStartTimeRef.current;
      if (elapsed < 500) {
        scrollToSection('home');
      }
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'The Collection', id: 'collection' },
    { name: 'Why Swanky', id: 'why-us' },
    { name: 'How to Order', id: 'how-to-order' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40">
        {/* Nationwide Delivery Sliding Ticker */}
        <div className="bg-brand-green text-brand-orange-light py-2 text-[10px] sm:text-xs tracking-widest uppercase font-black overflow-hidden h-8 flex items-center border-b border-brand-orange/20 select-none">
          <div className="animate-marquee">
            <span className="mx-4">✨ LAGOS • ABUJA • NATIONWIDE DELIVERY ✨</span>
            <span className="mx-4">💎 ELEGANCE & MODESTY PERSONIFIED 💎</span>
            <span className="mx-4">📞 ORDER ON WHATSAPP FOR PREMIUM CUSTOMIZATION 📞</span>
            <span className="mx-4">👑 LUXURY ABAYAS, JALABIYAS & PREMIUM LACES 👑</span>
            {/* Duplicated for seamless infinite loop */}
            <span className="mx-4">✨ LAGOS • ABUJA • NATIONWIDE DELIVERY ✨</span>
            <span className="mx-4">💎 ELEGANCE & MODESTY PERSONIFIED 💎</span>
            <span className="mx-4">📞 ORDER ON WHATSAPP FOR PREMIUM CUSTOMIZATION 📞</span>
            <span className="mx-4">👑 LUXURY ABAYAS, JALABIYAS & PREMIUM LACES 👑</span>
          </div>
        </div>

        <header
          id="app-header"
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
              : 'bg-transparent py-5 text-white'
          }`}
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onMouseDown={startPress}
              onMouseUp={cancelPress}
              onMouseLeave={cancelPress}
              onTouchStart={startPress}
              onTouchEnd={cancelPress}
              onTouchCancel={cancelPress}
              onContextMenu={(e) => e.preventDefault()}
              className="flex items-center gap-3 focus:outline-none group text-left cursor-pointer select-none"
              id="header-logo"
              title="Hold for 5 seconds to open Admin mode"
            >
              <div className="relative flex items-center justify-center">
                {/* Visual Holding Ring */}
                {isHolding && (
                  <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90 pointer-events-none z-10" viewBox="0 0 100 100">
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="46"
                      stroke="#F7941D"
                      strokeWidth="5"
                      strokeLinecap="round"
                      fill="transparent"
                      initial={{ strokeDasharray: "289 289", strokeDashoffset: 289 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  </svg>
                )}
                <img
                  src="https://i.ibb.co/ymhXpFr5/IMG-20260623-WA0022-1.jpg"
                  alt="Leemah Logo"
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-brand-gold/30 object-cover shadow-md group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col items-start select-none">
                <span
                  className={`font-serif text-sm sm:text-lg font-black tracking-widest uppercase transition-colors duration-300 leading-none ${
                    isScrolled ? 'text-brand-green' : 'text-white'
                  }`}
                >
                  LEEMAH SWANKY
                </span>
                <span
                  className="text-[8px] sm:text-[10px] tracking-[0.4em] font-sans font-bold uppercase transition-colors duration-300 text-brand-orange mt-0.5"
                >
                  EMPIRE
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" id="desktop-nav">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`font-sans text-xs sm:text-sm font-medium tracking-wider uppercase transition-colors hover:text-brand-orange cursor-pointer focus:outline-none ${
                    isScrolled ? 'text-gray-700' : 'text-white/90'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3 sm:space-x-5" id="header-actions">
              {/* Instagram link */}
              <a
                href="https://instagram.com/leema_swanky_empire"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 hover:text-brand-orange flex items-center justify-center ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                aria-label="Instagram Profile"
              >
                <Instagram className="h-5 w-5" />
              </a>

              {/* TikTok link */}
              <a
                href="https://www.tiktok.com/@leemaswanky_empire?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 hover:text-brand-orange flex items-center justify-center ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                aria-label="TikTok Profile"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.33 6.33 0 0 0 10.14 5.06 6.29 6.29 0 0 0 2.9-5.28V8a8.31 8.31 0 0 0 3.55 1.45V6.69z" />
                </svg>
              </a>

              {/* Cart Toggle Button */}
              <button
                onClick={() => setCartOpen(true)}
                className={`relative p-2.5 rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95 focus:outline-none ${
                  isScrolled
                    ? 'bg-brand-green-light text-brand-green'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                id="cart-toggle-btn"
                aria-label="Open Cart"
              >
                <ShoppingBag className="h-5.5 w-5.5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-sm"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Sticky Call Button */}
              <a
                href="https://wa.me/2348168972534"
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm hover:shadow hover:scale-[1.02] active:scale-95 ${
                  isScrolled
                    ? 'bg-brand-green text-white hover:bg-brand-green-dark'
                    : 'bg-white text-brand-green hover:bg-gray-100'
                }`}
                id="contact-header-btn"
              >
                <Phone className="h-4 w-4" />
                Contact Us
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-md focus:outline-none ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
                id="mobile-menu-toggle"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 pt-20 pb-6 bg-white overflow-y-auto shadow-xl lg:hidden flex flex-col justify-between"
            id="mobile-navigation-menu"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="w-full text-left px-4 py-3 rounded-xl font-sans text-base font-semibold text-gray-800 hover:bg-brand-green-light hover:text-brand-green transition-all"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Mobile Contact & Details */}
            <div className="border-t border-gray-100 p-6 space-y-4 bg-gray-50">
              <a
                href="https://wa.me/2348168972534"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-green hover:bg-brand-green-dark text-white font-semibold rounded-xl text-center shadow transition-all uppercase tracking-wider text-xs"
              >
                <Phone className="h-4 w-4" />
                Order on WhatsApp
              </a>
              <div className="text-center text-xs text-gray-500 font-medium">
                Authentically You, Modestly Swanky
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
