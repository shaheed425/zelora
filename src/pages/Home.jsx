import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ShieldCheck, Truck, Wrench, Award, Star, Quote, Leaf, Grid } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { fetchCategories } from '../services/categoryService';
import { fetchProducts } from '../services/productService';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBedroomIndex, setActiveBedroomIndex] = useState(0);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [catData, newProdData, trendProdData] = await Promise.all([
          fetchCategories(),
          fetchProducts({ isNewArrival: true, limit: 8 }),
          fetchProducts({ isTrending: true, limit: 6 }),
        ]);

        setCategories(catData.data || []);
        setNewArrivals(newProdData.products || []);
        setTrendingProducts(trendProdData.products || []);
      } catch (err) {
        console.error('Failed to load home page data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Brand Value Pillars */}
      <section className="py-16 bg-[#FAF8F5] border-b border-[#E8DEC4]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-sand-100 text-sand-700 flex items-center justify-center mb-4">
              <Award className="w-6 h-6 stroke-1.5" />
            </div>
            <h4 className="font-editorial text-xl font-medium text-charcoal mb-1">300+ Showroom Outlets</h4>
            <p className="text-xs text-[#76726E] max-w-xs leading-relaxed">
              Available at leading luxury furniture galleries across South India.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-sand-100 text-sand-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 stroke-1.5" />
            </div>
            <h4 className="font-editorial text-xl font-medium text-charcoal mb-1">5-Year Structural Warranty</h4>
            <p className="text-xs text-[#76726E] max-w-xs leading-relaxed">
              Crafted with seasoned teak and kiln-dried timber built to endure.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-sand-100 text-sand-700 flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 stroke-1.5" />
            </div>
            <h4 className="font-editorial text-xl font-medium text-charcoal mb-1">Direct Delivery</h4>
            <p className="text-xs text-[#76726E] max-w-xs leading-relaxed">
              Insured ground transit to every address across Kerala & Karnataka.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-sand-100 text-sand-700 flex items-center justify-center mb-4">
              <Wrench className="w-6 h-6 stroke-1.5" />
            </div>
            <h4 className="font-editorial text-xl font-medium text-charcoal mb-1">Free Professional Setup</h4>
            <p className="text-xs text-[#76726E] max-w-xs leading-relaxed">
              Expert assembly by ZELORA master carpenters at no extra charge.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Popular Categories Section */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-bold block font-mono">
                CURATED SPACES
              </span>
              <div className="w-10 sm:w-16 h-[1px] bg-[#C5A880]/60"></div>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-charcoal">
              Popular Categories
            </h2>
            <p className="text-xs sm:text-sm text-[#77716B] font-light mt-2 max-w-md">
              Explore our most loved furniture collections, thoughtfully designed for modern living.
            </p>
          </div>

          <Link
            to="/categories"
            className="group text-xs uppercase tracking-widest text-charcoal font-semibold hover:text-[#C5A880] transition-colors flex items-center gap-2 pb-1 border-b border-charcoal/40 hover:border-[#C5A880]"
          >
            <span>EXPLORE ALL CATEGORIES</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#C5A880]" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {categories.slice(0, 4).map((cat, idx) => (
            <CategoryCard key={cat._id} category={cat} index={idx} />
          ))}
        </div>
      </section>

      {/* 4. Editorial Highlight (Featured Bedroom Suite - Exact Replica of Reference Screenshot) */}
      <section className="py-20 md:py-28 bg-[#F6F4EE] border-y border-[#E5DEC9] my-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Layered Image, Dark Olive Floating Card, 3 Thumbnails & Controls) */}
          <div className="lg:col-span-7 relative">
            
            {/* Background Accent Lines & Vertical Tagline */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-3 rotate-[-90deg] origin-center z-10">
              <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-[#A8A29A]">
                BEDROOM COLLECTION
              </span>
              <div className="w-12 h-[1px] bg-[#C5A880]/60"></div>
            </div>

            {/* Layered Decorative Backdrop Frames */}
            <div className="absolute -top-4 -left-4 w-32 h-full bg-white/60 rounded-2xl -z-10 border border-[#EBE5D8] hidden sm:block"></div>
            <div className="absolute -bottom-4 -right-4 w-1/2 h-40 bg-[#EDE7DB] rounded-2xl -z-10 hidden sm:block"></div>

            {/* Main Featured Image Container */}
            <div className="relative aspect-[16/10] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-[#DCD3BE] bg-charcoal">
              <img
                src={
                  [
                    '/images/category_hero_bedroom.png',
                    '/images/slide2.png',
                    'https://mediumturquoise-hedgehog-393181.hostingersite.com/public/images/product/2025-06-11-1749616838-ALEXA.jpg',
                  ][activeBedroomIndex || 0]
                }
                alt="The Modern Luxe Bedroom Suite"
                className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.03] transition-all duration-700"
              />

              {/* Floating Dark Olive Card Bottom-Left */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#3F4736] text-white p-5 sm:p-6 rounded-xl max-w-[220px] sm:max-w-[260px] shadow-2xl border border-white/10 z-20">
                <h4 className="font-editorial text-lg sm:text-2xl font-light text-white leading-tight mb-2">
                  Spaces that <br />
                  feel like you.
                </h4>
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-mono text-[#D4B890]">
                  <div className="w-4 h-[1px] bg-[#D4B890]"></div>
                  <span>ZELORA 2026</span>
                </div>
              </div>
            </div>

            {/* Bottom Controls Bar (3 Thumbnails + Arrows + Counter) */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              
              {/* 3 Thumbnail Images */}
              <div className="flex items-center gap-3">
                {[
                  '/images/category_hero_bedroom.png',
                  '/images/slide2.png',
                  'https://mediumturquoise-hedgehog-393181.hostingersite.com/public/images/product/2025-06-11-1749616838-ALEXA.jpg',
                ].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveBedroomIndex(idx)}
                    className={`w-14 sm:w-16 h-10 sm:h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      (activeBedroomIndex || 0) === idx
                        ? 'border-[#947455] scale-105 shadow-md'
                        : 'border-[#DCD3BE] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Bedroom ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Slider Arrows & Counter */}
              <div className="flex items-center gap-3 text-xs font-mono text-[#77716B]">
                <button
                  onClick={() =>
                    setActiveBedroomIndex((prev) => (prev > 0 ? prev - 1 : 2))
                  }
                  className="w-8 h-8 rounded-full border border-[#DCD3BE] bg-white hover:bg-[#947455] hover:text-white flex items-center justify-center transition-all shadow-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                <span className="font-bold text-charcoal">
                  0{(activeBedroomIndex || 0) + 1} / 03
                </span>

                <button
                  onClick={() =>
                    setActiveBedroomIndex((prev) => (prev < 2 ? prev + 1 : 0))
                  }
                  className="w-8 h-8 rounded-full bg-[#3F4736] text-white hover:bg-[#947455] flex items-center justify-center transition-all shadow-md"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* Right Column (Editorial Highlight Header, Description, 3 Feature Badges, Button) */}
          <div className="lg:col-span-5">
            
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#947455] font-bold block font-mono">
                EDITORIAL HIGHLIGHT
              </span>
              <div className="w-12 h-[1px] bg-[#947455]/60"></div>
            </div>

            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-[1.08] mb-6">
              The Modern Luxe <br />
              <span className="italic font-serif text-[#A87E56]">Bedroom Collection</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#666059] leading-relaxed mb-8 font-light">
              Crafted with kiln-dried solid hardwood framing, plush upholstered headboards, and integrated ambient storage. Designed to elevate quiet retreat spaces with timeless elegance.
            </p>

            {/* 3 Feature Badges (Premium Materials, Functional Design, Built to Last) */}
            <div className="grid grid-cols-3 gap-3 mb-8 border-y border-[#E5DEC9] py-5">
              
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#EFE9DD] text-[#947455] flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-4 h-4 stroke-[1.6]" />
                </div>
                <div>
                  <span className="font-semibold text-xs text-charcoal block leading-tight">Premium</span>
                  <span className="text-[9px] text-[#77716B]">Materials</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#EFE9DD] text-[#947455] flex items-center justify-center flex-shrink-0">
                  <Grid className="w-4 h-4 stroke-[1.6]" />
                </div>
                <div>
                  <span className="font-semibold text-xs text-charcoal block leading-tight">Functional</span>
                  <span className="text-[9px] text-[#77716B]">Design</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#EFE9DD] text-[#947455] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 stroke-[1.6]" />
                </div>
                <div>
                  <span className="font-semibold text-xs text-charcoal block leading-tight">Built to</span>
                  <span className="text-[9px] text-[#77716B]">Last</span>
                </div>
              </div>

            </div>

            {/* Action Button */}
            <div className="mb-10">
              <Link
                to="/category/bedroom-sets"
                className="inline-flex items-center gap-3 bg-[#947455] hover:bg-[#7D6145] text-white px-8 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all shadow-xl group"
              >
                <span>DISCOVER BEDROOM SUITE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Bottom Watermark Counter & Motto */}
            <div className="flex items-center justify-between border-t border-[#E5DEC9] pt-4 text-xs font-mono text-[#A8A29A]">
              <span className="font-editorial text-3xl italic text-[#D8CFBF] font-light">
                01 <span className="text-sm font-sans font-normal text-[#B8AF9F]">/ 03</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#888179] font-mono text-right">
                TIMELESS FURNITURE <br />
                FOR A BETTER TOMORROW
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* 5. New Arrivals Horizontal Product Rail */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-mega text-sand-600 font-bold block mb-1">
              Fresh Off The Bench
            </span>
            <h2 className="font-editorial text-4xl md:text-5xl font-light text-charcoal">
              New Arrivals
            </h2>
          </div>

          <Link
            to="/new-arrivals"
            className="text-xs uppercase tracking-widest text-sand-700 font-semibold hover:text-charcoal transition-colors flex items-center gap-2 mt-4 md:mt-0"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Trending Section (Split Editorial Layout) */}
      <section className="py-20 bg-[#F2ECE4]/60 border-y border-[#E8DEC4]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-mega text-sand-600 font-bold block mb-1">
              Most Requested
            </span>
            <h2 className="font-editorial text-4xl md:text-5xl font-light text-charcoal">
              Trending Furniture Designs
            </h2>
            <p className="text-xs text-[#76726E] mt-3">
              Chosen by interior designers and homeowners across Kannur, Kochi & Bangalore.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingProducts.slice(0, 3).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 7. Customer Reviews & Testimonials */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-mega text-sand-600 font-bold block mb-1">
            Client Voices
          </span>
          <h2 className="font-editorial text-4xl font-light text-charcoal">
            Refinement Confirmed
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-lg border border-[#F2ECE4] shadow-sm relative">
            <Quote className="w-8 h-8 text-sand-300 mb-4 stroke-1" />
            <div className="flex gap-1 text-sand-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-charcoal leading-relaxed mb-6 italic">
              "The Afra sofa completely transformed our living room in Payyanur. Exceptional solid wood build quality and immaculate stitching."
            </p>
            <div>
              <h5 className="font-editorial text-lg font-semibold text-charcoal">Rohan & Maya V.</h5>
              <span className="text-[10px] text-sand-600 uppercase tracking-widest font-mono">Kannur, Kerala</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#F2ECE4] shadow-sm relative">
            <Quote className="w-8 h-8 text-sand-300 mb-4 stroke-1" />
            <div className="flex gap-1 text-sand-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-charcoal leading-relaxed mb-6 italic">
              "Ordered a custom dining set for our home in Bangalore. Delivered on time and assembled by polite professionals. 5 stars."
            </p>
            <div>
              <h5 className="font-editorial text-lg font-semibold text-charcoal">Dr. Siddharth Menon</h5>
              <span className="text-[10px] text-sand-600 uppercase tracking-widest font-mono">Bangalore, Karnataka</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#F2ECE4] shadow-sm relative">
            <Quote className="w-8 h-8 text-sand-300 mb-4 stroke-1" />
            <div className="flex gap-1 text-sand-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-charcoal leading-relaxed mb-6 italic">
              "The wardrobe collection was custom-fitted for our master bedroom. Excellent finish and heavy solid hardware."
            </p>
            <div>
              <h5 className="font-editorial text-lg font-semibold text-charcoal">Aiswarya K.</h5>
              <span className="text-[10px] text-sand-600 uppercase tracking-widest font-mono">Kozhikode, Kerala</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;
