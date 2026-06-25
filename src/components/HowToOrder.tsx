import React, { useState } from 'react';
import { ShoppingBag, FileText, Send, Heart, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const HowToOrder: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Curate Your Look',
      icon: <ShoppingBag className="h-6 w-6" />,
      description: 'Explore the "Empire Collection" on this page. Choose your preferred custom options (like sizes, colors, or scents) and add them to your order card.',
      mockElement: (
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4 max-w-sm mx-auto">
          <div className="h-16 w-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=100"
              alt="Swanky Silk Abaya"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-serif font-bold text-sm text-gray-900 truncate">The Swanky Silk Abaya</p>
            <p className="text-xs text-brand-orange font-bold uppercase tracking-widest mt-0.5">Size: 56 (L)</p>
            <p className="text-xs text-brand-green font-bold mt-1">₦45,000</p>
          </div>
          <div className="bg-brand-green text-white p-1.5 rounded-lg text-xs font-bold">
            Added!
          </div>
        </div>
      ),
    },
    {
      number: '02',
      title: 'Input Shipping Details',
      icon: <FileText className="h-6 w-6" />,
      description: 'Open your shopping cart drawer. Fill out your billing and delivery details (Name, Active Phone Number, Delivery Address, and customized Courier option).',
      mockElement: (
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 max-w-sm mx-auto space-y-3 text-left">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cart Shipping Details</p>
          <div className="space-y-1.5">
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            <div className="h-8 w-full bg-gray-50 rounded-lg border border-gray-100" />
          </div>
          <div className="space-y-1.5">
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
            <div className="h-8 w-full bg-gray-50 rounded-lg border border-gray-100" />
          </div>
        </div>
      ),
    },
    {
      number: '03',
      title: 'Generate WhatsApp Message',
      icon: <Send className="h-6 w-6" />,
      description: 'Our system automatically bundles all items, selected attributes, delivery choice, and your shipping coordinates into a custom structured text message.',
      mockElement: (
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl max-w-sm mx-auto text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 p-1.5 bg-emerald-500 text-white rounded-bl-xl text-[8px] font-bold uppercase tracking-wider">
            WhatsApp Template
          </div>
          <p className="font-sans text-[11px] leading-relaxed text-emerald-950 font-medium">
            Assalamu Alaikum Leemah Swanky Empire! 🌟<br />
            I would like to order:<br />
            • 1x The Swanky Silk Abaya (Size: 56) @ ₦45,000<br />
            Total: ₦45,000<br />
            Name: Halima Ibrahim<br />
            Delivery: Standard (Abuja)
          </p>
        </div>
      ),
    },
    {
      number: '04',
      title: 'Confirm & Sit Back',
      icon: <Heart className="h-6 w-6" />,
      description: 'You will be redirected straight to our official WhatsApp chat. Simply press "Send" to complete. Our sales representative will finalize payments and book delivery!',
      mockElement: (
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 max-w-sm mx-auto text-center space-y-3">
          <div className="h-10 w-10 bg-brand-green text-white rounded-full flex items-center justify-center mx-auto shadow-md">
            <Check className="h-5 w-5" />
          </div>
          <h4 className="font-serif font-bold text-sm text-gray-900">Order Confirmed!</h4>
          <p className="text-xs text-gray-500 font-sans leading-relaxed">
            Your dispatch parcel is locked for Nationwide delivery. Tracking details will be shared on chat.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section id="how-to-order" className="py-24 sm:py-32 bg-brand-cream-dark/20 border-t border-brand-gold/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs sm:text-sm font-semibold font-sans tracking-widest uppercase text-brand-orange">
            STEP-BY-STEP
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-gray-900 mt-2 mb-4">
            How to Order Your Swanky Look
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-sans max-w-2xl mx-auto">
            We use a direct-to-WhatsApp ordering framework to provide personalized sizing checks and secure, personal attention to your orders. No complicated account sign-ups needed.
          </p>
          <div className="h-1 w-16 bg-brand-green mx-auto mt-6" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-20 items-center">
          
          {/* Steps selector column (7 cols) */}
          <div className="lg:col-span-7 space-y-4" id="order-steps-selector">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex gap-4 sm:gap-6 focus:outline-none cursor-pointer ${
                  activeStep === index
                    ? 'bg-white border-brand-green/20 shadow-xl scale-[1.01]'
                    : 'bg-transparent border-transparent hover:bg-gray-200/50'
                }`}
                id={`order-step-btn-${index}`}
              >
                {/* Number tag */}
                <div
                  className={`font-serif text-2xl font-black transition-colors ${
                    activeStep === index ? 'text-brand-orange' : 'text-gray-400'
                  }`}
                >
                  {step.number}
                </div>

                {/* Body details */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span
                      className={`p-2 rounded-xl border transition-colors ${
                        activeStep === index
                          ? 'bg-brand-green text-white border-brand-green'
                          : 'bg-white text-gray-600 border-gray-100'
                      }`}
                    >
                      {step.icon}
                    </span>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-gray-900">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description collapsible */}
                  <AnimatePresence initial={false}>
                    {activeStep === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs sm:text-sm text-gray-600 font-sans mt-4 leading-relaxed">
                          {step.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center">
                  <ChevronRight
                    className={`h-5 w-5 transition-transform ${
                      activeStep === index ? 'text-brand-green rotate-90' : 'text-gray-400'
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Graphical Mockup area (5 cols) */}
          <div className="lg:col-span-5 relative" id="order-mockup-graphics">
            {/* Elegant Device Card Mock */}
            <div className="bg-gradient-to-br from-brand-green to-brand-green-dark p-6 rounded-4xl shadow-2xl relative overflow-hidden min-h-[380px] flex flex-col justify-between text-white max-w-sm mx-auto">
              <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-40 h-40 bg-brand-orange/20 rounded-full" />
              
              {/* Header inside device */}
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-brand-orange">
                    Interactive Preview
                  </h4>
                  <p className="font-sans text-[10px] text-gray-200">Empire Mobile Wallet</p>
                </div>
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              </div>

              {/* Dynamic Content Frame */}
              <div className="my-8 flex-1 flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    {steps[activeStep].mockElement}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Device Home Indicator */}
              <div className="text-center font-sans text-[9px] text-white/50 tracking-widest uppercase border-t border-white/10 pt-4 flex justify-between items-center">
                <span>Leemah Swanky Empire</span>
                <span>08168972534</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
