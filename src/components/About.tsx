import React from 'react';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-brand-cream overflow-hidden relative border-t border-brand-gold/15">
      {/* Subtle brand graphic elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-brand-green/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-20 items-center">
          
          {/* Visual Side */}
          <div className="lg:col-span-5 relative" id="about-visuals">
            {/* Main Image */}
            <div className="relative z-10 rounded-2xl overflow-hidden aspect-3/4 shadow-2xl border border-gray-100 bg-white">
              <img
                src="https://i.ibb.co/997xjwXz/IMG-20260623-WA0023-1.jpg"
                alt="Modest Elegance Collection"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              {/* Overlay with brand signature */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-serif italic text-lg text-brand-orange">Est. 2021</p>
                <h4 className="font-sans font-bold tracking-widest text-xs uppercase text-gray-200">
                  Leemah Swanky Empire
                </h4>
              </div>
            </div>

            {/* Decorative Offset Border */}
            <div className="absolute -bottom-6 -left-6 w-full h-full rounded-2xl border-2 border-brand-green/30 -z-10 translate-x-2 translate-y-2 hidden sm:block" />

            {/* Tiny stats callout */}
            <div className="absolute -top-4 -right-4 bg-brand-orange text-white p-4 rounded-xl shadow-lg flex items-center gap-3 z-20">
              <Sparkles className="h-5 w-5 text-brand-orange-light animate-spin-slow" />
              <div>
                <p className="font-serif text-lg font-bold">100%</p>
                <p className="font-sans text-[9px] font-semibold tracking-wider uppercase text-white/90">
                  Premium Quality
                </p>
              </div>
            </div>
          </div>

          {/* Text Content Side */}
          <div className="lg:col-span-7 flex flex-col justify-center" id="about-text-content">
            {/* Header */}
            <div className="mb-8">
              <span className="text-xs sm:text-sm font-semibold font-sans tracking-widest uppercase text-brand-orange">
                OUR HERITAGE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-gray-900 tracking-tight mt-2 mb-4">
                Redefining Elegant <br />
                Modest Fashion
              </h2>
              <div className="h-1 w-20 bg-brand-green" />
            </div>

            {/* Core Message */}
            <div className="space-y-6 text-gray-700 leading-relaxed font-sans text-sm sm:text-base">
              <p className="font-medium text-gray-950 text-base sm:text-lg italic border-l-4 border-brand-orange pl-4">
                "Your trusted destination for elegant modest fashion... help you express your style with confidence, grace, and modesty."
              </p>
              <p>
                At Leemah Swanky Empire, we believe that dressing modestly is not just a style choice, but a lifestyle of dignity, sophistication, and self-expression. We meticulously design and curate every piece in our collection—from flowing abayas with artisanal beadwork to royal, tailored jalabiyas—to match the dynamic life of the modern woman and man.
              </p>
              <p>
                Whether you’re stepping into an event, travelling, or choosing everyday staples, our promise is to deliver unparalleled fabric standards, gorgeous craftsmanship, and a swanky aesthetic that stays true to your values.
              </p>
            </div>

            {/* Core Values Mini-grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8" id="about-values">
              <div className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-brand-green-light/30 transition-all">
                <div className="p-2 bg-brand-green-light rounded-lg text-brand-green">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-gray-900">Premium Materials</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Handpicked silk, rich crepe, and fine French cords.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-brand-orange-light/30 transition-all">
                <div className="p-2 bg-brand-orange-light rounded-lg text-brand-orange">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-gray-900">Made With Care</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Tailored with high respect to modest details and fits.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
