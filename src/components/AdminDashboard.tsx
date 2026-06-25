import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, RotateCcw, AlertCircle, Sparkles, Check, Image as ImageIcon, EyeOff } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { motion, AnimatePresence } from 'motion/react';

export const AdminDashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Current catalog loaded from localStorage (or defaults if empty)
  const [catalog, setCatalog] = useState<Product[]>(() => {
    const saved = localStorage.getItem('leemah_swanky_catalog');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Product[];
        const hasOldAbaya = parsed.some(p => p.id === 'abaya-swanky-silk' && p.image.includes('unsplash.com'));
        const hasOldJalabiya = parsed.some(p => p.id === 'jalabiya-emirati-gold' || p.id === 'jalabiya-queen-moroccan') || !parsed.some(p => p.id === 'jalabiya-elite-moroccan-b8G');
        const hasOldLace = !parsed.some(p => p.id === 'lace-royal-majestic-whg') || parsed.some(p => p.id === 'lace-luxury-french');
        const hasOldAtampa = parsed.some(p => p.id === 'atampa-exclusive-ankara');
        const hasOldNecklace = !parsed.some(p => p.id === 'necklace-sovereign-beaded');
        if (hasOldAbaya || hasOldJalabiya || hasOldLace || hasOldAtampa || hasOldNecklace) {
          localStorage.setItem('leemah_swanky_catalog', JSON.stringify(PRODUCTS));
          return PRODUCTS;
        }
        return parsed;
      } catch (e) {
        console.error('Error parsing catalog', e);
      }
    }
    return PRODUCTS;
  });

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Luxury & Thrift Abayas');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [optionsInput, setOptionsInput] = useState('');
  const [isThrift, setIsThrift] = useState(false);
  
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Custom Authentication Input States
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Custom Confirmation Dialog States
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Handle trigger from hidden events - Simply opens the modal wrapper
  useEffect(() => {
    const handleOpenAdmin = () => {
      setIsOpen(true);
    };

    window.addEventListener('open-swanky-admin', handleOpenAdmin);
    return () => window.removeEventListener('open-swanky-admin', handleOpenAdmin);
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'swanky2024') {
      setIsAuthenticated(true);
      setPasswordInput('');
      setAuthError('');
    } else {
      setAuthError('Access Denied: Incorrect password.');
    }
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setIsOpen(false);
  };

  // Sync catalog helper
  const saveCatalog = (newCatalog: Product[]) => {
    localStorage.setItem('leemah_swanky_catalog', JSON.stringify(newCatalog));
    setCatalog(newCatalog);
    // Notify catalog subscribers (like the Products showroom component)
    window.dispatchEvent(new CustomEvent('swanky-products-updated'));
  };

  // Ensure catalog is populated in localStorage on first admin access
  useEffect(() => {
    if (!localStorage.getItem('leemah_swanky_catalog')) {
      localStorage.setItem('leemah_swanky_catalog', JSON.stringify(PRODUCTS));
    }
  }, []);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess(false);

    if (!name.trim()) {
      setFormError('Product name is required.');
      return;
    }
    if (!imageUrl.trim()) {
      setFormError('Please provide a product image URL.');
      return;
    }

    const newProduct: Product = {
      id: 'custom-' + Date.now(),
      name: name.trim(),
      category,
      price: 0,
      description: description.trim() || 'No description provided.',
      image: imageUrl.trim(),
      features: featuresInput
        ? featuresInput.split(',').map((f) => f.trim()).filter(Boolean)
        : ['Premium tailored fit', 'Authentic high-end material', 'Comfortable & modest layout'],
      optionsLabel: category === 'Men & Women Jalabiyas' ? 'Size (Height)' : 'Size',
      options: optionsInput
        ? optionsInput.split(',').map((o) => o.trim()).filter(Boolean)
        : ['Standard (S-M)', 'Plus Size (L-XXL)'],
      inStock: true,
      isThrift: isThrift,
    };

    const updatedCatalog = [newProduct, ...catalog];
    saveCatalog(updatedCatalog);

    // Reset Form
    setName('');
    setImageUrl('');
    setDescription('');
    setFeaturesInput('');
    setOptionsInput('');
    setIsThrift(false);

    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 3000);
  };

  const handleDeleteProduct = (productId: string) => {
    setProductToDelete(productId);
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      const updatedCatalog = catalog.filter((p) => p.id !== productToDelete);
      saveCatalog(updatedCatalog);
      setProductToDelete(null);
    }
  };

  const handleToggleStock = (productId: string) => {
    const updatedCatalog = catalog.map((p) =>
      p.id === productId ? { ...p, inStock: !p.inStock } : p
    );
    saveCatalog(updatedCatalog);
  };

  const handleResetCatalog = () => {
    setShowResetConfirm(true);
  };

  const confirmResetCatalog = () => {
    localStorage.setItem('leemah_swanky_catalog', JSON.stringify(PRODUCTS));
    saveCatalog(PRODUCTS);
    setShowResetConfirm(false);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    sessionStorage.removeItem('swanky_admin_auth');
    setIsAuthenticated(false);
    setIsOpen(false);
    setShowLogoutConfirm(false);
  };

  // Helper categories for form, excluding 'All'
  const formCategories = CATEGORIES.filter((c) => c !== 'All');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(val);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-gray-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          id="admin-dashboard-container"
        >
          {!isAuthenticated ? (
            /* Custom Security Lock Screen */
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-brand-gold/30 rounded-3xl p-6 sm:p-10 shadow-2xl w-full max-w-md relative text-center space-y-6"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col items-center gap-2">
                <div className="h-14 w-14 rounded-full bg-brand-green/10 flex items-center justify-center border border-brand-green/20">
                  <Sparkles className="h-7 w-7 text-brand-green animate-pulse" />
                </div>
                <h3 className="font-serif text-2xl font-black tracking-widest text-gray-900 uppercase">
                  SWANKY COMMAND
                </h3>
                <p className="text-[10px] text-brand-orange font-bold tracking-widest uppercase">
                  CMS SECURITY CLEARANCE
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-600 block">
                    Enter Administrator Password
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setAuthError('');
                    }}
                    placeholder="••••••••"
                    className="w-full text-center tracking-widest text-lg px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green bg-brand-cream/10 font-bold"
                    autoFocus
                    required
                  />
                </div>

                {authError && (
                  <p className="text-xs font-bold text-red-600 text-center">
                    ❌ {authError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-green hover:bg-brand-green-dark text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-md shadow-brand-green/10 cursor-pointer flex items-center justify-center gap-2 font-sans"
                >
                  Authenticate
                </button>
              </form>
            </motion.div>
          ) : (
            /* Dashboard Window */
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-brand-cream border border-brand-gold/30 rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gray-950 text-white px-6 py-4 flex items-center justify-between border-b border-brand-gold/20">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-brand-orange animate-pulse" />
                  <div>
                    <h3 className="font-serif text-lg tracking-widest font-black uppercase">
                      LEEMAH SWANKY EMPIRE
                    </h3>
                    <p className="text-[10px] text-brand-orange tracking-widest uppercase font-bold">
                      Luxury CMS Suite
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={handleResetCatalog}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    title="Reset showroom to defaults"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset Catalog
                  </button>

                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 rounded-lg border border-brand-orange/30 bg-brand-orange/10 text-brand-orange-dark hover:bg-brand-orange-light/20 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>

                  <button
                    onClick={handleClose}
                    className="p-1.5 rounded-full hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close Admin Suite"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Main Workspace */}
              <div className="flex-1 overflow-y-auto p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Column 1: Add New Product Form (5 cols) */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-brand-gold/15 shadow-sm space-y-6">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Plus className="h-5 w-5 text-brand-green" />
                      Publish New Item
                    </h4>
                    <p className="text-xs text-gray-500 font-medium mt-1">
                      Fill the specifications below to deploy an item live on the digital showroom storefront immediately.
                    </p>
                  </div>

                  {formError && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 p-3.5 rounded-xl">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {formSuccess && (
                    <div className="flex items-center gap-2 text-xs font-bold text-brand-green bg-brand-orange-light/40 border border-brand-green/30 p-3.5 rounded-xl animate-bounce">
                      <Check className="h-4 w-4 shrink-0" />
                      <span>Item dispatched and published successfully!</span>
                    </div>
                  )}

                  <form onSubmit={handleAddProduct} className="space-y-4 font-sans text-sm">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Majestic Dubai Emerald Abaya"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/10 focus:border-brand-green bg-brand-cream/10"
                        required
                      />
                    </div>

                    {/* Category Suite */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
                        Category Suite *
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/10 focus:border-brand-green bg-white font-medium"
                      >
                        {formCategories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Image URL */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block flex items-center justify-between">
                        <span>Product Image URL *</span>
                        <span className="text-[10px] text-brand-orange lowercase font-semibold">Paste direct image links</span>
                      </label>
                      <div className="relative">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="url"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="https://images.unsplash.com/... or imgbb direct link"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/10 focus:border-brand-green bg-brand-cream/10 text-xs"
                          required
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
                        Boutique Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Intricate silk lace accents, majestic detailing perfect for special gatherings..."
                        rows={3}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/10 focus:border-brand-green bg-brand-cream/10"
                      />
                    </div>

                    {/* Custom Specs (Comma separated) */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
                        Key Highlights (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={featuresInput}
                        onChange={(e) => setFeaturesInput(e.target.value)}
                        placeholder="e.g. 100% Dubai Silk, Inward lace trim, Breathable"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/10 focus:border-brand-green bg-brand-cream/10"
                      />
                    </div>

                    {/* Sizes (Comma separated) */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
                        Boutique Sizes / Variants (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={optionsInput}
                        onChange={(e) => setOptionsInput(e.target.value)}
                        placeholder="e.g. 54 (S), 56 (M), 58 (L)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/10 focus:border-brand-green bg-brand-cream/10"
                      />
                    </div>

                    {/* Thrift toggle */}
                    <div className="flex items-center gap-2.5 py-1">
                      <input
                        type="checkbox"
                        id="isThriftCheckbox"
                        checked={isThrift}
                        onChange={(e) => setIsThrift(e.target.checked)}
                        className="h-4.5 w-4.5 rounded border-gray-300 text-brand-green focus:ring-brand-green cursor-pointer"
                      />
                      <label
                        htmlFor="isThriftCheckbox"
                        className="text-xs font-semibold text-gray-700 cursor-pointer select-none"
                      >
                        Classify as <span className="text-brand-orange-dark font-bold">Thrift Grade A</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-brand-green hover:bg-brand-green-dark text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-md shadow-brand-green/10 hover:shadow-brand-green/20 hover:scale-[1.01] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Plus className="h-5 w-5" />
                      Publish Product
                    </button>
                  </form>
                </div>

                {/* Column 2: Catalog Management (7 cols) */}
                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-brand-gold/15 shadow-sm flex flex-col h-[65vh] lg:h-auto">
                  <div className="mb-4">
                    <h4 className="font-serif text-xl font-bold text-gray-900">
                      Boutique Catalog ({catalog.length} Products)
                    </h4>
                    <p className="text-xs text-gray-500 font-medium mt-1">
                      Modify active inventory, toggle stock visibility, or delete old stock.
                    </p>
                  </div>

                  {/* Search Bar within Admin Panel */}
                  <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 scrollbar-thin">
                    {catalog.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-4 p-3 bg-brand-cream/10 rounded-xl border border-gray-100 hover:border-brand-orange/20 transition-all flex-col sm:flex-row text-center sm:text-left"
                      >
                        {/* Image Thumbnail */}
                        <div className="h-16 w-16 rounded-lg bg-brand-cream-dark overflow-hidden shrink-0 shadow-sm border border-brand-gold/10">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover object-top"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Info details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-brand-orange">
                              {product.category}
                            </span>
                            {product.isThrift && (
                              <span className="bg-brand-orange/10 text-brand-orange-dark border border-brand-orange/30 text-[8px] font-extrabold px-1.5 py-0.5 rounded">
                                Thrift Grade A
                              </span>
                            )}
                            {!product.inStock && (
                              <span className="bg-red-500/10 text-red-600 border border-red-500/30 text-[8px] font-extrabold px-1.5 py-0.5 rounded">
                                Out of Stock
                              </span>
                            )}
                          </div>
                          <h5 className="font-serif font-bold text-sm text-gray-950 truncate mt-1">
                            {product.name}
                          </h5>
                          <p className="text-xs text-brand-green font-bold mt-0.5">
                            {formatCurrency(product.price)}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0 justify-center">
                          {/* Toggle Stock */}
                          <button
                            onClick={() => handleToggleStock(product.id)}
                            className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                              product.inStock
                                ? 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                : 'border-red-200 bg-red-50 text-red-500 hover:bg-red-100/60'
                            }`}
                            title={product.inStock ? 'Mark as Out of Stock' : 'Mark in Stock'}
                          >
                            {product.inStock ? 'In Stock' : 'No Stock'}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2.5 rounded-xl border border-red-100 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom info footer */}
              <div className="bg-gray-100 px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-500 font-semibold tracking-wider uppercase border-t border-brand-gold/10">
                <span>🚀 Secure Local Session Persistence Engaged</span>
                <span className="mt-1 sm:mt-0 text-brand-orange-dark">🔑 Default Pass: swanky2024</span>
              </div>
            </motion.div>
          )}

          {/* Custom Delete Confirmation Modal */}
          {productToDelete && (
            <div className="fixed inset-0 z-[60] bg-gray-950/60 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xl w-full max-w-sm text-center space-y-4"
              >
                <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center mx-auto border border-red-100">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-gray-900">Delete Product?</h4>
                  <p className="text-xs text-gray-500 mt-1">Are you sure you want to delete this product from the showroom catalog? This action cannot be undone.</p>
                </div>
                <div className="flex items-center gap-3 justify-center pt-2">
                  <button
                    onClick={() => setProductToDelete(null)}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteProduct}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Custom Reset Confirmation Modal */}
          {showResetConfirm && (
            <div className="fixed inset-0 z-[60] bg-gray-950/60 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xl w-full max-w-sm text-center space-y-4"
              >
                <div className="h-12 w-12 rounded-full bg-brand-orange/10 flex items-center justify-center mx-auto border border-brand-orange/20">
                  <RotateCcw className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-gray-900">Reset Catalog?</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    This will restore all default boutique items and wipe out any custom products you added. Continue?
                  </p>
                </div>
                <div className="flex items-center gap-3 justify-center pt-2">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmResetCatalog}
                    className="px-4 py-2 rounded-lg bg-brand-orange text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-orange-dark transition-colors cursor-pointer"
                  >
                    Reset Now
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Custom Logout Confirmation Modal */}
          {showLogoutConfirm && (
            <div className="fixed inset-0 z-[60] bg-gray-950/60 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xl w-full max-w-sm text-center space-y-4"
              >
                <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto border border-gray-200">
                  <EyeOff className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-gray-900">Sign Out?</h4>
                  <p className="text-xs text-gray-500 mt-1">Are you sure you want to log out of the Swanky CMS Dashboard?</p>
                </div>
                <div className="flex items-center gap-3 justify-center pt-2">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmLogout}
                    className="px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
