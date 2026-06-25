import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-35 flex flex-col items-end gap-2" id="floating-whatsapp-container">
      {/* Dynamic Slide-in Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="bg-brand-cream-dark/95 backdrop-blur-md text-gray-900 border border-brand-gold/30 shadow-2xl px-4 py-3 rounded-2xl max-w-xs text-xs font-bold relative flex items-center gap-3 pr-8"
          >
            {/* Close tooltip btn */}
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-1.5 right-1.5 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
              aria-label="Close tooltip"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            {/* Glowing active indicator */}
            <span className="flex h-2.5 w-2.5 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>

            <p className="font-sans leading-relaxed">
              Assalamu Alaikum! 👋 Need sizing help or custom colors? Chat with us now!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button with Gold Tint and Pulsing Rings */}
      <motion.a
        href="https://wa.me/2348168972534"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative h-14 w-14 rounded-full bg-brand-green text-white flex items-center justify-center shadow-2xl hover:bg-brand-green-dark border-2 border-brand-gold cursor-pointer focus:outline-none select-none transition-colors duration-300"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing Outer Gold Rings */}
        <span className="absolute -inset-2 rounded-full border-2 border-brand-gold/40 animate-pulse -z-10" />
        <span className="absolute -inset-4 rounded-full border border-brand-gold/20 animate-pulse -z-10 delay-300" />

        <MessageSquare className="h-6 w-6 fill-current text-brand-orange" />
      </motion.a>
    </div>
  );
};
