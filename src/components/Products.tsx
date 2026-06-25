import React, { useState, useMemo, useEffect } from 'react';
import { Search, Eye, ShoppingCart, Check, X, ArrowUpDown, ChevronRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const Products: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  // Local state for active dynamic products
  const [productsList, setProductsList] = useState<Product[]>(() => {
    const saved = localStorage.getItem('leemah_swanky_catalog');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Product[];
        const hasOldAbaya = parsed.some(p => p.id === 'abaya-swanky-silk' && p.image.includes('unsplash.com'));
        const hasOldJalabiya = parsed.some(p => p.id === 'jalabiya-emirati-gold' || p.id === 'jalabiya-queen-moroccan') || !parsed.some(p => p.id === 'jalabiya-elite-moroccan-b8G');
        const hasOldLace = !parsed.some(p => p.id === 'lace-royal-majestic-whg') || parsed.some(p => p.id === 'lace-luxury-french');
        const hasOldAtampa = parsed.some(p => p.id === 'atampa-exclusive-ankara');
        if (hasOldAbaya || hasOldJalabiya || hasOldLace || hasOldAtampa) {
          localStorage.setItem('leemah_swanky_catalog', JSON.stringify(PRODUCTS));
          return PRODUCTS;
        }
        return parsed;
      } catch (e) {
        console.error('Error loading custom catalog', e);
      }
    }
    return PRODUCTS;
  });

  // Listen to live catalog updates from Admin Command Center
  useEffect(() => {
    const handleCatalogUpdate = () => {
      const saved = localStorage.getItem('leemah_swanky_catalog');
      if (saved) {
        try {
          setProductsList(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      } else {
        setProductsList(PRODUCTS);
      }
    };
    window.addEventListener('swanky-products-updated', handleCatalogUpdate);
    return () => window.removeEventListener('swanky-products-updated', handleCatalogUpdate);
  }, []);
  
  // Quick View Modal state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [modalQuantity, setModalQuantity] = useState<number>(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  // processedProducts filters by search and sorts the items
  const processedProducts = useMemo(() => {
    let result = [...productsList];

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.features.some((f) => f.toLowerCase().includes(query))
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [productsList, searchQuery, sortBy]);

  // Group the processed products by category for rendering the vertical Folder Rows
  const groupedCategories = useMemo(() => {
    const categoriesList = CATEGORIES.filter((c) => c !== 'All');
    
    return categoriesList.map((category) => {
      const products = processedProducts.filter((p) => p.category === category);
      return {
        category,
        products,
      };
    }).filter((group) => {
      // If searching, only show folders with matching items. If not searching, show all.
      return searchQuery.trim() === '' || group.products.length > 0;
    });
  }, [processedProducts, searchQuery]);

  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setSelectedOption(product.options ? product.options[0] : '');
    setModalQuantity(1);
    setAddedFeedback(false);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  const handleModalAddToCart = () => {
    if (!quickViewProduct) return;
    
    // Add to cart multiple times if quantity > 1
    for (let i = 0; i < modalQuantity; i++) {
      addToCart(quickViewProduct, selectedOption || undefined);
    }

    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
      handleCloseQuickView();
    }, 1200);
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Smoothly scroll the page to the target Folder
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    
    if (category === 'All') {
      const el = document.getElementById('filters-toolbar');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      const elementId = `folder-${category.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <section id="collection" className="py-24 sm:py-32 bg-brand-cream border-t border-brand-gold/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-semibold font-sans tracking-widest uppercase text-brand-orange">
            THE CATALOG
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-gray-900 mt-2 mb-4">
            The Empire Collection
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-sans max-w-2xl mx-auto">
            Browse our carefully curated luxury modest garments, premium fabrics, sparkling accessories, and authentic fragrances. Hand-selected to elevate your modesty and style.
          </p>
          <div className="h-1 w-16 bg-brand-green mx-auto mt-6" />
        </div>

        {/* Toolbar: Search, Filters & Sorters */}
        <div className="bg-white/80 backdrop-blur-md p-5 sm:p-7 rounded-3xl shadow-xl shadow-brand-green/5 border border-brand-gold/15 mb-14 space-y-5" id="filters-toolbar">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-orange" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search abayas, laces, fragrances..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/10 focus:border-brand-green text-sm transition-all bg-white"
                id="search-input-field"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sorter */}
            <div className="flex items-center gap-3 self-end lg:self-auto" id="sort-controls">
              <ArrowUpDown className="h-4.5 w-4.5 text-brand-green" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-green/10"
                id="sort-select"
              >
                <option value="default">Default Showroom</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Categories Horizontal scroll mapped to luxury boutique suites */}
          <div className="border-t border-brand-gold/10 pt-5">
            <div className="flex items-center overflow-x-auto pb-2.5 scrollbar-none gap-2.5" id="category-scroller">
              {CATEGORIES.map((category) => {
                // Map raw database category strings into luxurious high-end names
                let suiteName = category;
                if (category === 'All') suiteName = ' ✨ All Collections';
                else if (category === 'Luxury & Thrift Abayas') suiteName = '👑 Abaya Suite';
                else if (category === 'Men & Women Jalabiyas') suiteName = '🕌 Jalabiya Lounge';
                else if (category === 'Atampa & Premium Laces') suiteName = '🧵 Lace Atelier';
                else if (category === 'Jewelries & Accessories') suiteName = '💎 Jewelry Salon';
                else if (category === 'Ladies Bags & Shoes') suiteName = '👜 Bags & Shoes Gallery';
                else if (category === 'Premium Veils & Fragrances') suiteName = '⚱️ Fragrance Vault';

                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 cursor-pointer focus:outline-none border ${
                      selectedCategory === category
                        ? 'bg-brand-green border-brand-green text-white shadow-lg shadow-brand-green/20 scale-[1.02]'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-brand-orange/40 hover:text-brand-orange-dark hover:bg-brand-orange-light/10'
                    }`}
                  >
                    {suiteName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Products Grouped in Folder Rows */}
        {processedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/60 backdrop-blur-md rounded-3xl border border-brand-gold/10 p-8 shadow-sm">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-serif font-bold text-gray-800">No products found</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto font-medium">
              We couldn't find any products in this salon matching your query. Check the spelling or try selecting a different suite.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-6 px-6 py-3 bg-brand-green text-white text-xs font-semibold rounded-xl uppercase tracking-widest hover:bg-brand-green-dark transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-16" id="product-folders-container">
            {groupedCategories.map(({ category, products }) => {
              const folderId = `folder-${category.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;
              return (
                <div
                  key={category}
                  id={folderId}
                  className="scroll-mt-32 border border-gray-200 bg-white/80 p-6 sm:p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-md"
                >
                  {/* Folder Tab Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-gold/10 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl text-brand-orange select-none">📂</span>
                      <div>
                        <h3 className="font-serif font-bold text-xl sm:text-2xl text-gray-900 tracking-tight leading-none">
                          {category}
                        </h3>
                        <p className="text-xs text-gray-500 font-sans mt-1.5 font-semibold uppercase tracking-wider">
                          Folder • {products.length} {products.length === 1 ? 'Item' : 'Items'} available
                        </p>
                      </div>
                    </div>
                    {products.length > 3 && (
                      <span className="text-[10px] sm:text-xs font-bold text-brand-green bg-brand-green/5 border border-brand-green/10 px-3 py-1.5 rounded-full uppercase tracking-widest animate-pulse select-none self-start sm:self-auto">
                        ← Scroll horizontally to explore →
                      </span>
                    )}
                  </div>

                  {/* Horizontal Scroll File Row */}
                  <div className="relative">
                    <div className="flex gap-6 overflow-x-auto pb-4 pt-1 px-1 scrollbar-thin scrollbar-thumb-brand-gold/20 scroll-smooth snap-x snap-mandatory">
                      {products.map((product, idx) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, x: 40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-10px' }}
                          transition={{ duration: 0.8, delay: idx * 0.05 }}
                          className="w-[210px] shrink-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-200/60 group transition-all duration-500 flex flex-col snap-start relative"
                          id={`product-card-${product.id}`}
                        >
                          {/* Image Area with luxury overlay and hover zoom */}
                          <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream-dark image-vignette">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                              referrerPolicy="no-referrer"
                            />

                            {/* Image overlay with Quick View button on hover */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-green-dark/30 to-brand-green-dark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <button
                                onClick={() => handleOpenQuickView(product)}
                                className="px-4 py-2.5 bg-white text-brand-green-dark rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all transform scale-95 group-hover:scale-100 duration-300 cursor-pointer shadow-md flex items-center gap-1.5"
                                title="Quick View"
                                aria-label="Quick View"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                Quick View
                              </button>
                            </div>

                            {/* Tags / Badges */}
                            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                              {product.isThrift && (
                                <span className="bg-brand-orange text-white text-[8px] font-black px-2 py-1 rounded shadow-md uppercase tracking-widest">
                                  Thrift
                                </span>
                              )}
                              {!product.inStock && (
                                <span className="bg-gray-800 text-white text-[8px] font-black px-2 py-1 rounded shadow-md uppercase tracking-widest">
                                  Sold Out
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Details Area */}
                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              {/* Product Title */}
                              <h4 className="font-serif font-bold text-sm text-gray-950 group-hover:text-brand-green transition-colors leading-tight mb-1 truncate" title={product.name}>
                                {product.name}
                              </h4>

                              {/* Sub-description snippet */}
                              <p className="text-[10px] text-gray-500 line-clamp-2 font-sans mb-3 leading-relaxed h-8 overflow-hidden">
                                {product.description}
                              </p>
                            </div>

                            {/* Inquire CTA */}
                            <div className="pt-3 border-t border-brand-gold/10">
                              <a
                                href={`https://wa.me/2348168972534?text=Hello%20Leemah%20Swanky%20Empire!%20I%20am%20interested%20in%20inquiring%20about%20"${encodeURIComponent(product.name)}".%20Can%20you%20please%20provide%20more%20details?`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2 bg-brand-green hover:bg-brand-green-dark text-white text-[10px] font-bold rounded-xl uppercase tracking-widest transition-all cursor-pointer shadow flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
                              >
                                <ShoppingCart className="h-3 w-3" />
                                Inquire via WhatsApp
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* QUICK VIEW & SELECTION MODAL */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6" id="quick-view-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseQuickView}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseQuickView}
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-all focus:outline-none z-20 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Image Side (5 cols) */}
              <div className="md:col-span-5 relative rounded-2xl overflow-hidden bg-gray-50 aspect-4/5 md:h-full image-vignette">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                {quickViewProduct.isThrift && (
                  <span className="absolute top-4 left-4 bg-brand-orange text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
                    Thrift Grade A
                  </span>
                )}
              </div>

              {/* Details Side (7 cols) */}
              <div className="md:col-span-7 flex flex-col justify-between h-full">
                <div>
                  {/* Category Label */}
                  <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest font-sans block mb-1">
                    {quickViewProduct.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950 mb-3 leading-tight">
                    {quickViewProduct.name}
                  </h3>

                  {/* Luxury Accent */}
                  <div className="text-xs sm:text-sm font-sans font-bold text-brand-orange uppercase tracking-widest mb-5">
                    ✨ Premium Showroom Design • Price on Inquiry
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-6 font-sans leading-relaxed">
                    {quickViewProduct.description}
                  </p>

                  {/* Bullet features */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-2.5">Key Highlights</h4>
                    <ul className="space-y-2 text-xs text-gray-700 font-medium">
                      {quickViewProduct.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-brand-green flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Options Selections */}
                  {quickViewProduct.options && quickViewProduct.optionsLabel && (
                    <div className="mb-6">
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
                        Select {quickViewProduct.optionsLabel}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {quickViewProduct.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => setSelectedOption(option)}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              selectedOption === option
                                ? 'bg-brand-green border-brand-green text-white shadow'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-900 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                        <button
                          onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                          className="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-gray-700 hover:bg-white active:scale-90 transition-all cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-sm font-bold text-gray-900">
                          {modalQuantity}
                        </span>
                        <button
                          onClick={() => setModalQuantity(modalQuantity + 1)}
                          className="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-gray-700 hover:bg-white active:scale-90 transition-all cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs text-gray-400 font-medium italic">
                        In stock, ready to pack
                      </span>
                    </div>
                  </div>
                </div>

                {/* Confirm Action Button */}
                <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
                  <button
                    onClick={handleModalAddToCart}
                    disabled={addedFeedback}
                    className={`flex-1 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer ${
                      addedFeedback
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'bg-brand-green hover:bg-brand-green-dark text-white shadow-lg hover:shadow-brand-green/20 hover:scale-[1.01] active:scale-95'
                    }`}
                  >
                    {addedFeedback ? (
                      <>
                        <Check className="h-5 w-5 animate-bounce" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5" />
                        Add to WhatsApp Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
