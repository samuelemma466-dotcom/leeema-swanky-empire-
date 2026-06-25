import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, X, Trash2, ArrowRight, ClipboardCheck, AlertCircle } from 'lucide-react';
import { CustomerDetails } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const Cart: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart();

  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
    deliveryType: 'standard',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});

  const deliveryLabels = {
    standard: 'Lagos Standard Delivery',
    express: 'Abuja & Northern Region Shuttle',
    nationwide: 'Other States Nationwide',
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const validate = () => {
    const tempErrors: Partial<CustomerDetails> = {};
    if (!customer.name.trim()) tempErrors.name = 'Full Name is required';
    if (!customer.phone.trim()) tempErrors.phone = 'Active phone number is required';
    if (!customer.address.trim()) tempErrors.address = 'Delivery address is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleCheckout = () => {
    if (!validate()) {
      // Scroll to form inside cart drawer
      const form = document.getElementById('checkout-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Compile WhatsApp message
    let message = `Assalamu Alaikum Leemah Swanky Empire! 🌟\n\n`;
    message += `I would like to inquire about these items from your Swanky Catalog:\n`;
    message += `-------------------------------------------\n`;

    cartItems.forEach((item, index) => {
      const selectedOpt = item.selectedOption ? ` (${item.selectedOption})` : '';
      message += `${index + 1}. ${item.product.name}${selectedOpt}\n`;
      message += `   Qty: ${item.quantity}\n\n`;
    });

    message += `-------------------------------------------\n`;
    message += `Delivery Region: ${deliveryLabels[customer.deliveryType]}\n\n`;

    message += `👤 CUSTOMER DETAILS:\n`;
    message += `• Name: ${customer.name}\n`;
    message += `• Phone: ${customer.phone}\n`;
    message += `• Address: ${customer.address}\n`;

    if (customer.notes?.trim()) {
      message += `• Custom Note / Sizing Specs: ${customer.notes}\n`;
    }

    message += `\nThank you! Looking forward to your payment instructions. ✨`;

    // Encode URL
    const whatsappUrl = `https://wa.me/2348168972534?text=${encodeURIComponent(message)}`;
    
    // Redirect
    window.open(whatsappUrl, '_blank', 'noreferrer');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="shopping-cart-drawer">
          <div className="absolute inset-0 overflow-hidden">
            
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            />

            {/* Sliding Panel */}
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full"
              >
                
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                  <div className="flex items-center gap-2.5 text-brand-green">
                    <ShoppingBag className="h-5.5 w-5.5" />
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-950">
                      Your Swanky Bag
                    </h3>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all cursor-pointer focus:outline-none"
                    aria-label="Close cart"
                  >
                    <X className="h-5.5 w-5.5" />
                  </button>
                </div>

                {/* Items and Checkout details */}
                {cartItems.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/50">
                    <ShoppingBag className="h-14 w-14 text-gray-300 mb-4 animate-bounce" />
                    <h4 className="font-serif font-bold text-lg text-gray-800">Your bag is empty</h4>
                    <p className="text-xs text-gray-500 font-sans max-w-xs mx-auto mt-1 leading-relaxed">
                      Select custom fits, exquisite laces, or rich fragrances from the Empire Collection to fill your bag.
                    </p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="mt-6 px-6 py-3 bg-brand-green text-white text-xs font-bold rounded-xl uppercase tracking-wider hover:bg-brand-green-dark transition-all"
                    >
                      Browse the Catalog
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                    
                    {/* Cart Items List */}
                    <div className="p-6 space-y-5">
                      {cartItems.map((item, index) => (
                        <div
                          key={`${item.product.id}-${item.selectedOption || index}`}
                          className="flex items-start gap-4"
                          id={`cart-item-${item.product.id}`}
                        >
                          {/* Image */}
                          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover object-top"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Body details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif font-bold text-sm sm:text-base text-gray-950 truncate">
                              {item.product.name}
                            </h4>
                            {item.selectedOption && (
                              <p className="text-[10px] font-bold font-sans text-brand-orange uppercase tracking-wider mt-0.5">
                                Option: {item.selectedOption}
                              </p>
                            )}
                            <p className="text-[10px] text-brand-orange font-bold uppercase tracking-wider mt-1">
                              Price on Inquiry
                            </p>

                            {/* Quantity buttons */}
                            <div className="flex items-center gap-2 mt-3">
                              <div className="flex items-center border border-gray-100 rounded-lg bg-gray-50 p-0.5">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.quantity - 1, item.selectedOption)
                                  }
                                  className="h-6 w-6 rounded-md flex items-center justify-center font-bold text-gray-600 hover:bg-white active:scale-90 transition-all cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="w-8 text-center text-xs font-bold text-gray-900">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.quantity + 1, item.selectedOption)
                                  }
                                  className="h-6 w-6 rounded-md flex items-center justify-center font-bold text-gray-600 hover:bg-white active:scale-90 transition-all cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Trash button */}
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedOption)}
                            className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address & Verification Form */}
                    <div className="p-6 bg-gray-50/50 space-y-4" id="checkout-form">
                      <div className="flex items-center gap-2 text-brand-orange">
                        <ClipboardCheck className="h-4.5 w-4.5" />
                        <h4 className="font-serif font-bold text-xs sm:text-sm uppercase tracking-wider text-gray-900">
                          Delivery Coordinates
                        </h4>
                      </div>

                      {/* Name */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                          Your Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={customer.name}
                          onChange={(e) => {
                            setCustomer({ ...customer, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: undefined });
                          }}
                          placeholder="e.g. Amina Mohammed"
                          className={`w-full px-3 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-xs transition-all ${
                            errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.name && (
                          <p className="text-[10px] font-semibold text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                          WhatsApp / Contact Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={customer.phone}
                          onChange={(e) => {
                            setCustomer({ ...customer, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: undefined });
                          }}
                          placeholder="e.g. 08168972534"
                          className={`w-full px-3 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-xs transition-all ${
                            errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-[10px] font-semibold text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                          Complete Delivery Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={2}
                          value={customer.address}
                          onChange={(e) => {
                            setCustomer({ ...customer, address: e.target.value });
                            if (errors.address) setErrors({ ...errors, address: undefined });
                          }}
                          placeholder="e.g. Block C4, Garki Shopping Complex, Abuja"
                          className={`w-full px-3 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-xs transition-all resize-none ${
                            errors.address ? 'border-red-500 focus:border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.address && (
                          <p className="text-[10px] font-semibold text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.address}
                          </p>
                        )}
                      </div>

                      {/* Delivery Zone Sorter */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                          Shipping Destination
                        </label>
                        <select
                          value={customer.deliveryType}
                          onChange={(e: any) =>
                            setCustomer({ ...customer, deliveryType: e.target.value })
                          }
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-xs font-semibold"
                        >
                          <option value="standard">Lagos Metro</option>
                          <option value="nationwide">Other States Nationwide</option>
                          <option value="express">Abuja & Northern Region Shuttle</option>
                        </select>
                      </div>

                      {/* Customized note */}
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                          Custom Note / Sizing Specs (Optional)
                        </label>
                        <textarea
                          rows={2}
                          value={customer.notes}
                          onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                          placeholder="Provide custom heights (e.g. 56 or 58 inch length), chest sizes, or particular fragrance notes..."
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-green/20 text-xs resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer calculation totals */}
                {cartItems.length > 0 && (
                  <div className="border-t border-gray-100 p-6 bg-white space-y-4">
                    <div className="space-y-2 text-sm text-gray-600 font-sans font-semibold">
                      <div className="flex justify-between">
                        <span>Items Selected</span>
                        <span className="text-gray-900 font-bold">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pricing</span>
                        <span className="text-brand-orange font-bold">Contact via WhatsApp</span>
                      </div>
                      <div className="flex justify-between text-base font-serif font-black text-gray-950 pt-2 border-t border-gray-100">
                        <span>Delivery Destination</span>
                        <span className="text-brand-green font-bold text-xs">
                          {deliveryLabels[customer.deliveryType]}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={clearCart}
                        className="px-4 py-3 border border-gray-200 hover:bg-gray-100 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all text-gray-500 cursor-pointer"
                        title="Clear all"
                      >
                        Reset
                      </button>

                      <button
                        onClick={handleCheckout}
                        className="flex-1 py-3.5 bg-brand-green hover:bg-brand-green-dark text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-brand-green/20 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 cursor-pointer"
                      >
                        Inquire on WhatsApp
                        <ArrowRight className="h-4.5 w-4.5" />
                      </button>
                    </div>

                    <p className="text-[10px] text-gray-400 text-center font-medium italic">
                      Checking out will compile your items and details into WhatsApp chat.
                    </p>
                  </div>
                )}

              </motion.div>
            </div>

          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
