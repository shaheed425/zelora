import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Grid, Search, Heart, ShoppingBag, ShieldAlert, X, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { fetchProducts } from '../services/productService';
import Logo from './Logo';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const searchInputRef = useRef(null);
  const { setIsCartOpen, totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      if (isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSearchOpen]);

  // Auto-focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Live Instant Search API Call (Instant response upon single letter typing)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetchProducts({ search: searchQuery.trim(), limit: 6 });
        setSearchResults(res.products || []);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navItems = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Shop', path: '/shop', icon: Grid },
    { label: 'Search', path: null, icon: Search, onClick: () => setIsSearchOpen(true) },
    { label: 'Saved', path: '/wishlist', icon: Heart, badge: wishlist.length },
    { label: 'Cart', path: null, icon: ShoppingBag, badge: totalItems, onClick: () => setIsCartOpen(true) },
  ];

  return (
    <>
      {/* Main Top Navbar (Transparent over Home hero; Sticky with clean layout flow on all non-home pages) */}
      <nav
        className={`z-40 transition-all duration-500 ${
          isHome
            ? `absolute top-0 left-0 right-0 ${
                scrolled
                  ? 'bg-[#1A1A1A] py-4 text-white shadow-md'
                  : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5 text-white'
              }`
            : 'sticky top-0 bg-[#1A1A1A] py-4 text-white shadow-md border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Luxury Logo with Gold Emblem */}
          <Logo light={true} />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-9">
            <Link
              to="/"
              className={`text-xs uppercase tracking-widest font-medium transition-colors relative py-1 ${
                location.pathname === '/' ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
              }`}
            >
              <span>HOME</span>
              {location.pathname === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-sand-400"></span>
              )}
            </Link>

            <Link
              to="/shop"
              className={`text-xs uppercase tracking-widest font-medium transition-colors relative py-1 ${
                location.pathname === '/shop' ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
              }`}
            >
              <span>SHOP</span>
              {location.pathname === '/shop' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-sand-400"></span>
              )}
            </Link>

            <Link
              to="/categories"
              className={`text-xs uppercase tracking-widest font-medium transition-colors relative py-1 ${
                location.pathname === '/categories' ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
              }`}
            >
              <span>CATEGORIES</span>
              {location.pathname === '/categories' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-sand-400"></span>
              )}
            </Link>

            <Link
              to="/featured"
              className={`text-xs uppercase tracking-widest font-medium transition-colors relative py-1 ${
                location.pathname === '/featured' ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
              }`}
            >
              <span>COLLECTIONS</span>
              {location.pathname === '/featured' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-sand-400"></span>
              )}
            </Link>

            <Link
              to="/about"
              className={`text-xs uppercase tracking-widest font-medium transition-colors relative py-1 ${
                location.pathname === '/about' ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
              }`}
            >
              <span>ABOUT</span>
              {location.pathname === '/about' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-sand-400"></span>
              )}
            </Link>

            <Link
              to="/contact"
              className={`text-xs uppercase tracking-widest font-medium transition-colors relative py-1 ${
                location.pathname === '/contact' ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
              }`}
            >
              <span>CONTACT</span>
              {location.pathname === '/contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-sand-400"></span>
              )}
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-5 text-white">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-sand-400 transition-colors p-1"
              title="Search"
            >
              <Search className="w-4 h-4 stroke-[1.75]" />
            </button>

            <Link to="/wishlist" className="relative hover:text-sand-400 transition-colors p-1" title="Wishlist">
              <Heart className="w-4 h-4 stroke-[1.75]" />
              <span className="absolute -top-1.5 -right-1.5 bg-sand-500 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-sand-400 transition-colors p-1"
              title="Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              <span className="absolute -top-1.5 -right-1.5 bg-sand-500 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sleek Compact Floating Search Bar directly under Navbar (No full screen dimming) */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed top-20 sm:top-24 left-0 right-0 z-50 flex justify-center px-4 pointer-events-auto">
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -15, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="w-full max-w-lg bg-[#1A1A1A]/95 border border-white/25 backdrop-blur-2xl rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(197,168,128,0.25)] p-3.5 sm:p-4 text-white relative overflow-hidden"
            >
              {/* Top Edge Gold Glow Sheen Line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880]/80 to-transparent"></div>

              {/* Search Form with ZELORA Brand Emblem Icon */}
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                  <div className="w-4 h-4 rounded bg-[#D4B890]/20 p-0.5 border border-[#D4B890]/50 flex items-center justify-center">
                    <img src="/favicon.svg" alt="ZELORA Logo" className="w-full h-full object-contain" />
                  </div>
                  <Search className="w-3.5 h-3.5 text-[#C5A880]" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ZELORA handcrafted furniture..."
                  className="w-full bg-black/60 border border-white/20 rounded-xl pl-14 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-[#C5A880] transition-colors"
                />
                {isLoading ? (
                  <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 animate-spin" />
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                    title="Close Search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              {/* Popular Quick Filter Tags */}
              {!searchQuery && (
                <div className="flex flex-wrap items-center gap-1.5 pt-3">
                  <span className="text-[9px] uppercase tracking-widest text-white/50 font-mono mr-1">QUICK:</span>
                  {['Sofa', 'Dining Table', 'Bed', 'Chair', 'Storage'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="text-[10px] bg-white/10 hover:bg-[#C5A880] text-white hover:text-black px-2.5 py-0.5 rounded-full border border-white/10 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}

              {/* Live Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="space-y-2 max-h-[380px] overflow-y-auto custom-scrollbar pt-3 mt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-white/50 font-mono mb-1.5 px-1">
                    <span>SUGGESTED PIECES ({searchResults.length})</span>
                    <span>INSTANT SEARCH</span>
                  </div>
                  {searchResults.map((product) => {
                    const imgUrl =
                      product.featuredImage ||
                      (product.images && product.images[0]?.url) ||
                      (typeof product.images?.[0] === 'string' ? product.images[0] : null) ||
                      'https://mediumturquoise-hedgehog-393181.hostingersite.com/public/images/product/2025-06-10-1749562225-AFRA.jpg';

                    return (
                      <div
                        key={product._id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate(`/product/${product.slug}`);
                        }}
                        className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors group"
                      >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-charcoal flex-shrink-0 border border-white/15 shadow-md">
                          <img
                            src={imgUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = 'https://mediumturquoise-hedgehog-393181.hostingersite.com/public/images/product/2025-06-10-1749562225-AFRA.jpg';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-[#C5A880] transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-[10px] text-white/60 truncate mt-0.5">
                            {product.category?.name || 'Luxury Furniture'}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-xs sm:text-sm font-bold text-[#C5A880]">
                            ₹{product.price ? product.price.toLocaleString('en-IN') : 'Contact'}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all mt-1 ml-auto" />
                        </div>
                      </div>
                    );
                  })}

                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
                    }}
                    className="w-full text-center py-2.5 mt-2 bg-white/10 hover:bg-[#C5A880] hover:text-black rounded-xl text-xs uppercase font-semibold tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <span>View All Results for "{searchQuery}"</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {searchQuery && !isLoading && searchResults.length === 0 && (
                <div className="py-4 text-center text-white/60 text-xs font-light">
                  No luxury pieces found for "<span className="text-white font-medium">{searchQuery}</span>".
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Glassmorphism Swipe iPhone-Style Bottom Dock (Mobile / Tablet) */}
      <div className="fixed bottom-4 left-4 right-4 z-50 lg:hidden flex justify-center pointer-events-auto">
        <motion.div
          drag="x"
          dragConstraints={{ left: -16, right: 16 }}
          dragElastic={0.15}
          whileTap={{ scale: 0.98 }}
          className="relative bg-black/50 backdrop-blur-2xl text-white border border-white/25 shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(197,168,128,0.2)] rounded-full px-4 py-2 flex items-center justify-between w-full max-w-[350px] overflow-hidden"
        >
          {/* Top Edge Gloss Highlight for Authentic Frosted Glass */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path ? location.pathname === item.path : false;

            const content = (
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={`relative z-10 flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition-colors ${
                  isActive ? 'text-[#C5A880] font-bold' : 'text-white/70 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDockTab"
                    className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full border border-white/20 -z-10 shadow-[0_0_12px_rgba(197,168,128,0.3)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <div className="relative">
                  <Icon className="w-4 h-4 stroke-[1.8]" />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#C5A880] text-black text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[8px] uppercase tracking-wider">{item.label}</span>
              </motion.div>
            );

            if (item.path) {
              return (
                <Link key={item.label} to={item.path}>
                  {content}
                </Link>
              );
            }

            return (
              <button key={item.label} onClick={item.onClick} type="button">
                {content}
              </button>
            );
          })}
        </motion.div>
      </div>
    </>
  );
};

export default Navbar;
