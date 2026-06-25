import React from 'react';
import { Mail, Phone, Instagram, MapPin, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-gray-950 text-white relative border-t border-brand-orange/20 overflow-hidden" id="app-footer">
      
      {/* Decorative vector background shapes */}
      <div className="absolute right-0 bottom-0 translate-x-20 translate-y-20 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl -z-0" />
      <div className="absolute left-0 top-0 -translate-x-20 -translate-y-20 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16">
          
          {/* Column 1: Brand & Bio (5 cols) */}
          <div className="md:col-span-5 space-y-6" id="footer-bio">
            <button
              onClick={handleScrollToTop}
              className="flex flex-col items-start focus:outline-none group text-left cursor-pointer"
            >
              <span className="font-serif text-2xl font-bold tracking-widest uppercase text-white group-hover:text-brand-orange transition-colors">
                LEEMAH SWANKY
              </span>
              <span className="text-[11px] tracking-widest font-sans font-semibold uppercase text-brand-orange -mt-1">
                EMPIRE
              </span>
            </button>
            
            <p className="text-sm text-gray-300 font-sans leading-relaxed">
              Express your unique personality through our custom premium modest fashion products. Your leading destination for elegant Abayas, Jalabiyas, luxury laces, ladies matching shoes, bags, and captivating fragrances.
            </p>

            <div className="flex items-center gap-3 text-xs font-serif italic text-brand-orange">
              <Sparkles className="h-4.5 w-4.5 animate-pulse text-brand-orange-light" />
              <span>"Authentically You, Modestly Swanky."</span>
            </div>
          </div>

          {/* Column 2: Quick Contacts (4 cols) */}
          <div className="md:col-span-4 space-y-6" id="footer-contacts">
            <h4 className="font-serif font-bold text-lg text-white border-b border-white/10 pb-2">
              Reach Our Desk
            </h4>
            
            <ul className="space-y-4 font-sans text-sm text-gray-300">
              <li>
                <a
                  href="https://wa.me/2348168972534"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-brand-orange transition-colors group cursor-pointer"
                >
                  <span className="p-2 bg-white/5 rounded-xl group-hover:bg-brand-orange-light/10 group-hover:text-brand-orange transition-all">
                    <Phone className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-500">WhatsApp / Call</span>
                    <span>08168972534</span>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="mailto:Halimatswanky@gmail.com"
                  className="flex items-center gap-3 hover:text-brand-orange transition-colors group cursor-pointer"
                >
                  <span className="p-2 bg-white/5 rounded-xl group-hover:bg-brand-orange-light/10 group-hover:text-brand-orange transition-all">
                    <Mail className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-500">Email Address</span>
                    <span className="break-all">Halimatswanky@gmail.com</span>
                  </div>
                </a>
              </li>

              <li className="flex items-center gap-3 text-gray-300">
                <span className="p-2 bg-white/5 rounded-xl">
                  <MapPin className="h-4.5 w-4.5 text-brand-orange" />
                </span>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-gray-500">Delivery Hub</span>
                  <span>Lagos & Abuja, Nigeria (Nationwide Dispatches)</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Social handles & Operations (3 cols) */}
          <div className="md:col-span-3 space-y-6" id="footer-socials">
            <h4 className="font-serif font-bold text-lg text-white border-b border-white/10 pb-2">
              Follow the Empire
            </h4>
            
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Stay updated with daily arrivals, flash sales, fabric checks, and modest styling guides.
            </p>

            <div className="flex gap-3">
              <a
                href="https://instagram.com/leema_swanky_empire"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-xl text-gray-300 hover:text-white hover:bg-brand-orange transition-all cursor-pointer shadow-sm hover:scale-105"
                title="Instagram"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@leemaswanky_empire?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-xl text-gray-300 hover:text-white hover:bg-brand-orange transition-all cursor-pointer shadow-sm hover:scale-105"
                title="TikTok"
                aria-label="TikTok"
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
            </div>

            <div className="pt-4 border-t border-white/5 text-[10px] text-gray-400 font-semibold tracking-wider uppercase">
              <span>⏰ Mon - Sat: 9:00 AM - 7:00 PM</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="border-t border-white/5 mt-16 sm:mt-20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-medium" id="footer-bottom">
          <p>© {currentYear} Leemah Swanky Empire. All Rights Reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Made with Grace & Modesty</span>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-swanky-admin'))}
              className="text-gray-500 hover:text-brand-orange transition-colors font-serif italic font-black text-xs leading-none focus:outline-none cursor-pointer select-none ml-1 opacity-30 hover:opacity-100"
              title="Signature Mode"
              aria-label="Admin Access"
            >
              S
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
