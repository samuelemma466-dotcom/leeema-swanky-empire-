import React from 'react';
import { ShieldCheck, Sparkles, Truck, Award } from 'lucide-react';
import { motion } from 'motion/react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: <Award className="h-7 w-7" />,
      title: 'Unrivaled Quality',
      color: 'bg-brand-green-light text-brand-green border-brand-green/10',
      description: 'From deluxe Dubai Crepe and Egyptian cottons to handpicked Grade A thrifts, we never compromise on textiles or custom craftsmanship.',
    },
    {
      icon: <Sparkles className="h-7 w-7" />,
      title: 'Sensible Affordability',
      color: 'bg-brand-orange-light text-brand-orange border-brand-orange/10',
      description: 'Luxury modest fashion doesn’t need to break the bank. Enjoy high-end looks, custom cuts, and robust durability at honest pricing tiers.',
    },
    {
      icon: <Truck className="h-7 w-7" />,
      title: 'Nationwide Delivery',
      color: 'bg-brand-green-light text-brand-green border-brand-green/10',
      description: 'Wherever you reside in Nigeria, your gorgeous orders are packed with maximum safety protocols and dispatched straight to your doorstep.',
    },
  ];

  return (
    <section id="why-us" className="py-24 sm:py-32 bg-brand-cream-dark/30 relative border-t border-brand-gold/15">
      {/* Sliding Nationwide Delivery Marquee Banner */}
      <div className="absolute top-0 left-0 right-0 bg-brand-green/95 text-white py-3.5 overflow-hidden z-10 border-b border-brand-gold/30">
        <div className="flex whitespace-nowrap min-w-full">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            }}
            className="flex items-center gap-12 font-sans text-xs font-semibold tracking-[0.2em] uppercase"
          >
            <span>⚡ Elegant Nationwide Delivery • Lagos • Abuja • Port Harcourt • Kaduna • Kano • Ibadan • Enugu • Benin • Calabar</span>
            <span>⚡ Elegant Nationwide Delivery • Lagos • Abuja • Port Harcourt • Kaduna • Kano • Ibadan • Enugu • Benin • Calabar</span>
            <span>⚡ Elegant Nationwide Delivery • Lagos • Abuja • Port Harcourt • Kaduna • Kano • Ibadan • Enugu • Benin • Calabar</span>
            <span>⚡ Elegant Nationwide Delivery • Lagos • Abuja • Port Harcourt • Kaduna • Kano • Ibadan • Enugu • Benin • Calabar</span>
          </motion.div>
        </div>
      </div>

      {/* Decorative ambient gradients */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-brand-green/5 rounded-full blur-3xl -z-10" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16sm:mb-20">
          <span className="text-xs sm:text-sm font-semibold font-sans tracking-widest uppercase text-brand-orange">
            OUR CORE PROMISE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-gray-900 mt-2 mb-4">
            Why Choose the Swanky Empire?
          </h2>
          <div className="h-1 w-16 bg-brand-green mx-auto mt-6" />
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10" id="promises-grid">
          {points.map((point, index) => (
            <div
              key={index}
              className="bg-white border border-brand-gold/10 p-8 rounded-3xl hover:shadow-2xl hover:shadow-brand-orange/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center group"
              id={`promise-card-${index}`}
            >
              {/* Icon Frame */}
              <div className={`p-4 rounded-2xl border mb-6 transition-transform duration-300 group-hover:scale-110 ${point.color}`}>
                {point.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif font-bold text-xl text-gray-950 mb-3 group-hover:text-brand-green transition-colors">
                {point.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 font-sans leading-relaxed font-medium">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Small Bottom Tagline Card */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-10 rounded-3xl bg-brand-green text-white relative overflow-hidden shadow-xl" id="about-empire-banner">
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-96 h-96 bg-brand-green-dark/30 rounded-full -z-0" />
          <div className="absolute left-0 top-0 -translate-x-12 -translate-y-12 w-60 h-60 bg-brand-orange/20 rounded-full -z-0" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <h4 className="font-serif text-2xl sm:text-3xl font-bold mb-3">Ready to find your perfect style match?</h4>
              <p className="font-sans text-sm text-gray-100 leading-relaxed">
                Browse our collection, select your custom options, and instantly send your orders directly to our representatives. Let's help you look Modestly Swanky today!
              </p>
            </div>
            <a
              href="https://wa.me/2348168972534"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-brand-orange hover:bg-brand-orange-dark text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all duration-300 whitespace-nowrap hover:scale-105 active:scale-95 cursor-pointer"
            >
              Connect on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
