import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass } from 'lucide-react';

interface SplashScreenProps {
  onEnter: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    // Call onEnter after curtain slide up animation completes
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%', filter: 'blur(10px)' }}
          transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-50 overflow-hidden bg-white flex flex-col items-center justify-center pointer-events-auto"
          id="cinematic-splash-screen"
        >
          {/* Subtle background luxury dots decoration */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#006837_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Main Content Card */}
          <div className="relative z-20 text-center px-6 max-w-3xl flex flex-col items-center">
            {/* Brand Logo with fade and scale animation */}
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.1 }}
              src="https://i.ibb.co/ymhXpFr5/IMG-20260623-WA0022-1.jpg"
              alt="Leemah Swanky Logo"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-brand-green/20 object-cover shadow-2xl mb-8"
              referrerPolicy="no-referrer"
            />

            {/* Subtle Luxury Sparkle Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-green/10 bg-brand-green/5 text-brand-green text-xs font-bold tracking-widest uppercase mb-8"
            >
              <Sparkles className="h-4 w-4 text-brand-orange animate-spin-slow" />
              Official Digital Showroom
            </motion.div>

            {/* Brand Name with Slow Dramatic Reveal */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="flex flex-col items-center mb-4"
            >
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black tracking-[0.4em] uppercase text-brand-green leading-tight">
                LEEMAH SWANKY
              </h1>
              <h2 className="font-sans text-sm sm:text-lg font-bold tracking-[0.6em] text-brand-orange uppercase -mt-1 pl-4">
                EMPIRE
              </h2>
            </motion.div>

            {/* Divider line that expands */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="h-[1.5px] bg-brand-orange my-4"
            />

            {/* Elegant Slogan */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.1 }}
              className="font-serif italic text-lg sm:text-2xl text-gray-700 tracking-wide mb-12 animate-pulse"
            >
              "Authentically You, Modestly Swanky."
            </motion.p>

            {/* Elegant action CTA with beautiful scale feedback */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              onClick={handleEnter}
              className="relative px-12 py-4 sm:py-5 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase bg-brand-green hover:bg-brand-green-dark text-white transition-all duration-300 shadow-xl hover:shadow-brand-green/15 hover:scale-[1.04] active:scale-95 cursor-pointer group flex items-center gap-3 overflow-hidden border border-brand-green/20"
              id="enter-showroom-button"
            >
              <Compass className="h-5 w-5 text-brand-orange group-hover:rotate-45 transition-transform duration-500" />
              Enter The Catalog
            </motion.button>
          </div>

          {/* Decorative Brand Details */}
          <div className="absolute bottom-8 text-center text-[10px] tracking-widest text-gray-400 uppercase font-semibold">
            Lagos • Abuja • Nationwide Delivery
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
