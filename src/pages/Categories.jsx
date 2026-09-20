import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Layers,
  Award,
  ShieldCheck,
  Package,
  Wrench,
  Home as HomeIcon,
  Truck,
  Armchair,
  Bed,
  Utensils,
  Archive,
  BookOpen,
  Briefcase,
  Trees,
} from 'lucide-react';

const Categories = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      num: '01',
      title: 'BEDROOM',
      image: '/images/category_hero_bedroom.png',
      headline: 'Furniture',
      highlight: 'for Every Space',
      subtitle: 'Explore our complete range of handcrafted furniture, designed for modern Indian homes.',
    },
    {
      id: 2,
      num: '02',
      title: 'LIVING',
      image: '/images/image.png',
      headline: 'Curated Seating',
      highlight: 'for Modern Living',
      subtitle: 'Premium handcrafted sofas, armchairs, and living room collections for timeless comfort.',
    },
    {
      id: 3,
      num: '03',
      title: 'DINING',
      image: '/images/slide2.png',
      headline: 'Dining Spaces',
      highlight: 'Built for Togetherness',
      subtitle: 'Solid wood dining tables, luxury seating, and entertaining essentials.',
    },
    {
      id: 4,
      num: '04',
      title: 'OFFICE',
      image: '/images/slide3.png',
      headline: 'Ergonomic Workspaces',
      highlight: 'Crafted for Focus',
      subtitle: 'Design-forward study desks, executive office chairs, and functional storage.',
    },
  ];

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  // 1. Filter Pills Array
  const filterPills = [
    { label: 'All', icon: Armchair, count: '20+' },
    { label: 'Living', icon: Armchair },
    { label: 'Bedroom', icon: Bed },
    { label: 'Dining', icon: Utensils },
    { label: 'Storage', icon: Archive },
    { label: 'Study', icon: BookOpen },
    { label: 'Office', icon: Briefcase },
    { label: 'Outdoor', icon: Trees },
  ];

  // 2. Featured Main Divisions (6 Cards with distinct photorealistic images)
  const mainDivisions = [
    {
      id: 'living-room',
      badge: 'LIVING ROOM',
      title: 'Sofas & Seating',
      image: '/images/image.png',
      slug: 'living-room',
    },
    {
      id: 'bedroom',
      badge: 'BEDROOM',
      title: 'Beds & Bedroom Sets',
      image: '/images/category_hero_bedroom.png',
      slug: 'bedroom-sets',
    },
    {
      id: 'dining',
      badge: 'DINING',
      title: 'Dining Sets',
      image: '/images/slide2.png',
      slug: 'dining-sets',
    },
    {
      id: 'storage',
      badge: 'STORAGE',
      title: 'Wardrobes & Storage',
      image: '/images/slide3.png',
      slug: 'storage',
    },
    {
      id: 'workspace',
      badge: 'WORKSPACE',
      title: 'Study & Office',
      image: '/images/hero_bg.png',
      slug: 'office-furniture',
    },
    {
      id: 'more',
      badge: 'MORE',
      title: 'Additional Collections',
      image: '/images/slide2.png',
      slug: 'collections',
    },
  ];

  // 3. Small Pill Categories (8 Items)
  const completeRange = [
    { name: 'Sofas', image: '/images/image.png', slug: 'sofas' },
    { name: 'Beds', image: '/images/category_hero_bedroom.png', slug: 'beds' },
    { name: 'Dining Sets', image: '/images/slide2.png', slug: 'dining-sets' },
    { name: 'Chairs', image: '/images/image.png', slug: 'chairs' },
    { name: 'Tables', image: '/images/slide3.png', slug: 'tables' },
    { name: 'Storage', image: '/images/slide3.png', slug: 'storage' },
    { name: 'Shoe Cabinets', image: '/images/slide2.png', slug: 'shoe-cabinets' },
    { name: 'TV Units', image: '/images/hero_bg.png', slug: 'tv-units' },
  ];

  // Dynamic Filtering Logic based on activeFilter state
  const filteredDivisions = mainDivisions.filter((division) => {
    if (activeFilter === 'All') return true;
    const filterLower = activeFilter.toLowerCase();
    const badgeLower = division.badge.toLowerCase();
    const titleLower = division.title.toLowerCase();
    return (
      badgeLower.includes(filterLower) ||
      titleLower.includes(filterLower) ||
      (filterLower === 'study' && (badgeLower.includes('workspace') || titleLower.includes('study'))) ||
      (filterLower === 'office' && (badgeLower.includes('workspace') || titleLower.includes('office')))
    );
  });

  const filteredRange = completeRange.filter((item) => {
    if (activeFilter === 'All') return true;
    const filterLower = activeFilter.toLowerCase();
    const nameLower = item.name.toLowerCase();
    return (
      nameLower.includes(filterLower) ||
      (filterLower === 'living' && (nameLower.includes('sofa') || nameLower.includes('chair') || nameLower.includes('tv'))) ||
      (filterLower === 'bedroom' && nameLower.includes('bed')) ||
      (filterLower === 'dining' && nameLower.includes('dining')) ||
      (filterLower === 'storage' && (nameLower.includes('storage') || nameLower.includes('shoe'))) ||
      (filterLower === 'study' && nameLower.includes('table')) ||
      (filterLower === 'office' && nameLower.includes('table'))
    );
  });

  return (
    <div className="w-full bg-[#F5F2ED] min-h-screen text-charcoal font-sans pt-0 pb-16">
      
      {/* 1. HERO BANNER (Compact, Elegant Hero with Low-positioned Photorealistic Background) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-6 sm:pt-8 pb-6">
        <div className="relative w-full min-h-[360px] sm:min-h-[420px] md:min-h-[460px] rounded-3xl overflow-hidden bg-charcoal shadow-2xl border border-[#DCD3BE] flex items-center">
          
          {/* High-res Photorealistic Background Image (Positioned lower with object-[center_35%]) */}
          <img
            src={heroSlides[activeSlide].image}
            alt={heroSlides[activeSlide].title}
            className="absolute inset-0 w-full h-full object-cover object-[center_35%] filter brightness-[0.88] contrast-[1.03] transition-all duration-700"
          />

          {/* Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 z-10"></div>

          {/* Top Right Motto & Carousel Controls inside Hero Card */}
          <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 flex items-center gap-5">
            
            {/* Top Motto */}
            <div className="hidden sm:block text-[8px] uppercase tracking-[0.25em] text-white/70 font-mono text-right leading-relaxed drop-shadow-md">
              CRAFTED<br />
              SPACES<br />
              HAPPIER<br />
              PEOPLE
            </div>

            {/* Slider Arrows & Counter (01 / 04) */}
            <div className="flex items-center gap-2.5 bg-black/35 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-lg">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/30 bg-black/30 text-white hover:bg-white/20 flex items-center justify-center transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>

              <span className="text-white font-mono text-xs font-bold px-1 select-none">
                {heroSlides[activeSlide].num} <span className="text-white/60 font-normal">/ 04</span>
              </span>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next Slide"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#D4B890] text-black hover:bg-[#C2A57A] flex items-center justify-center transition-all shadow-md cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Left Content (Streamlined & Clean without bulky overlay badges) */}
          <div className="relative z-20 px-6 sm:px-10 md:px-14 py-8 max-w-xl text-white">
            
            {/* Tagline with Rule */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[#D4B890] font-mono drop-shadow-md">
                OUR CATEGORIES
              </span>
              <div className="w-10 sm:w-14 h-[1px] bg-[#D4B890]/70"></div>
            </div>

            {/* Main Headline */}
            <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-light text-white leading-[1.08] tracking-tight mb-3 drop-shadow-lg">
              {heroSlides[activeSlide].headline} <br />
              <span className="italic font-serif text-[#D4B890]">{heroSlides[activeSlide].highlight}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/90 text-xs sm:text-sm font-light max-w-sm leading-relaxed mb-5 sm:mb-6 drop-shadow-md">
              {heroSlides[activeSlide].subtitle}
            </p>

            {/* Action Button */}
            <div>
              <Link
                to="/shop"
                className="bg-[#D4B890] hover:bg-[#C2A57A] text-[#2A2621] px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 shadow-xl transition-all group"
              >
                <span>EXPLORE CATEGORIES</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

          {/* Bottom Bar Overlay (Room Tabs & Handwritten Script) */}
          <div className="absolute bottom-5 left-6 right-6 sm:left-10 sm:right-10 z-20 flex flex-wrap items-end justify-between gap-4 border-t border-white/15 pt-3 text-white">
            
            {/* Bottom Left Room Tabs */}
            <div className="flex items-center gap-5 sm:gap-7 text-xs font-mono">
              {heroSlides.map((slide, idx) => {
                const isActive = activeSlide === idx;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`flex items-center gap-2 transition-all cursor-pointer ${
                      isActive ? 'text-white font-bold tracking-wider' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <span className={`text-xs ${isActive ? 'text-[#D4B890] text-sm font-bold' : ''}`}>
                      {slide.num}
                    </span>
                    {isActive && <div className="w-5 h-[1.5px] bg-[#D4B890]"></div>}
                    <span className="uppercase text-xs">{slide.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Right Handwritten Script */}
            <div className="flex items-center gap-2 text-white/90 font-serif italic text-base sm:text-lg font-light tracking-wide drop-shadow-md">
              <div className="w-6 sm:w-10 h-[1px] bg-white/40"></div>
              <span>More than Furniture</span>
            </div>

          </div>

        </div>
      </section>

      {/* 2. ROOM TYPES FILTER BAR (CIRCULAR ICONS) */}
      <section className="bg-[#FAF8F5] border-b border-[#E5DEC9] py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto custom-scrollbar w-full md:w-auto pb-2 md:pb-0">
            {filterPills.map((pill) => {
              const Icon = pill.icon;
              const isActive = activeFilter === pill.label;

              return (
                <button
                  key={pill.label}
                  onClick={() => setActiveFilter(pill.label)}
                  className="flex flex-col items-center gap-2 flex-shrink-0 group"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                      isActive
                        ? 'bg-[#B59871] text-white shadow-md scale-105'
                        : 'bg-[#E8E1D3] text-[#55504A] hover:bg-[#D8CEBA] hover:text-charcoal'
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[1.6]" />
                  </div>
                  <span
                    className={`text-[11px] font-medium tracking-wide ${
                      isActive ? 'text-charcoal font-bold' : 'text-[#77716B] group-hover:text-charcoal'
                    }`}
                  >
                    {pill.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4 text-right border-l border-[#DCD3BE] pl-8 py-1">
            <div className="text-[9px] uppercase tracking-[0.25em] text-[#888179] font-mono leading-relaxed">
              DIFFERENT<br />
              SPACES<br />
              A BETTER<br />
              TOMORROW
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED MAIN DIVISIONS (6 CARDS GRID) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B59871] font-bold block mb-1">
              FEATURED CATEGORIES
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-light text-charcoal">
              Explore Our Main Divisions
            </h2>
          </div>

          <div className="flex items-center gap-8">
            <p className="text-xs text-[#77716B] max-w-sm font-light leading-relaxed hidden md:block">
              From elegant living room setups to functional storage solutions, find furniture crafted for every corner of your home.
            </p>

            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full border border-[#DCD3BE] bg-white text-charcoal hover:bg-[#B59871] hover:text-white flex items-center justify-center transition-all shadow-sm">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-[#B59871] text-white hover:bg-[#9B7F5B] flex items-center justify-center transition-all shadow-md">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 6 Cards Grid (2 rows of 3 columns, dynamically filtered) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredDivisions.map((division) => (
            <Link
              key={division.id}
              to={`/category/${division.slug}`}
              className="group relative h-[220px] sm:h-[280px] md:h-[320px] rounded-xl overflow-hidden bg-charcoal shadow-md border border-[#E5DEC9] hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={division.image}
                alt={division.title}
                className="w-full h-full object-cover filter brightness-[1.05] contrast-[1.02] group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = '/images/image.png';
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 text-white">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4B890] font-mono font-semibold block mb-1">
                    {division.badge}
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-light text-white tracking-tight group-hover:text-[#D4B890] transition-colors">
                    {division.title}
                  </h3>
                </div>

                <div className="flex justify-end">
                  <div className="w-10 h-10 rounded-full border border-white/30 bg-black/30 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#B59871] group-hover:border-[#B59871] group-hover:text-white transition-all shadow-lg">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. BROWSE ALL CATEGORIES SECTION ("Complete Furniture Range") */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B59871] font-bold block mb-1">
              BROWSE ALL CATEGORIES
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-light text-charcoal">
              Complete Furniture Range
            </h2>
          </div>

          <Link
            to="/shop"
            className="text-xs uppercase tracking-widest text-[#B59871] font-semibold hover:text-charcoal transition-colors flex items-center gap-1.5"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Small Square Pill Cards in Grid (dynamically filtered) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {filteredRange.map((item) => (
            <Link
              key={item.name}
              to={`/category/${item.slug}`}
              className="group flex flex-col bg-[#EFECE6] border border-[#E2DAD0] rounded-xl overflow-hidden hover:shadow-md hover:border-[#B59871]/50 transition-all duration-300"
            >
              <div className="aspect-square w-full bg-white overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover filter brightness-[1.05] contrast-[1.02] group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/images/image.png';
                  }}
                />
              </div>
              <div className="p-2.5 text-center bg-[#F7F5F0]">
                <span className="text-xs font-medium text-[#4A453F] group-hover:text-charcoal transition-colors block truncate">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. MIDDLE EDITORIAL BANNER ("Spaces that Inspire Living") */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden shadow-xl border border-[#E5DEC9]">
          
          {/* Left 60%: High-res armchair image */}
          <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px]">
            <img
              src="/images/image.png"
              alt="Spaces that Inspire Living"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://mediumturquoise-hedgehog-393181.hostingersite.com/public/images/product/2025-06-10-1749562225-AFRA.jpg';
              }}
            />
          </div>

          {/* Right 40%: Warm sand background card */}
          <div className="lg:col-span-5 bg-[#D5C4AC] p-8 sm:p-12 flex flex-col justify-center text-charcoal">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#6B5A46] font-bold block mb-2 font-mono">
              CRAFTED FOR A BEAUTIFUL TOMORROW
            </span>

            <h3 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-light text-charcoal leading-tight mb-6">
              Spaces that <br />
              Inspire Living
            </h3>

            <div>
              <Link
                to="/featured"
                className="inline-flex items-center gap-3 bg-[#B59871] hover:bg-[#9B7F5B] text-white px-7 py-3.5 rounded text-xs font-semibold uppercase tracking-widest transition-all shadow-md group"
              >
                <span>EXPLORE COLLECTIONS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 6. BRAND VALUE PILLARS BAR */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-[#E5DEC9] mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          <div className="flex items-center gap-4 p-3 bg-white/60 rounded-xl border border-[#EBE5D8] shadow-sm">
            <div className="w-11 h-11 rounded-lg bg-[#EFE9DD] text-[#8C7456] flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 stroke-[1.6]" />
            </div>
            <div>
              <h5 className="font-semibold text-xs sm:text-sm text-charcoal">Premium Materials</h5>
              <p className="text-[10px] text-[#77716B]">Built to last</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-white/60 rounded-xl border border-[#EBE5D8] shadow-sm">
            <div className="w-11 h-11 rounded-lg bg-[#EFE9DD] text-[#8C7456] flex items-center justify-center flex-shrink-0">
              <Wrench className="w-5 h-5 stroke-[1.6]" />
            </div>
            <div>
              <h5 className="font-semibold text-xs sm:text-sm text-charcoal">Expert Craftsmanship</h5>
              <p className="text-[10px] text-[#77716B]">Detail in every piece</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-white/60 rounded-xl border border-[#EBE5D8] shadow-sm">
            <div className="w-11 h-11 rounded-lg bg-[#EFE9DD] text-[#8C7456] flex items-center justify-center flex-shrink-0">
              <HomeIcon className="w-5 h-5 stroke-[1.6]" />
            </div>
            <div>
              <h5 className="font-semibold text-xs sm:text-sm text-charcoal">10+ Years of Trust</h5>
              <p className="text-[10px] text-[#77716B]">Across South India</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 bg-white/60 rounded-xl border border-[#EBE5D8] shadow-sm">
            <div className="w-11 h-11 rounded-lg bg-[#EFE9DD] text-[#8C7456] flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 stroke-[1.6]" />
            </div>
            <div>
              <h5 className="font-semibold text-xs sm:text-sm text-charcoal">Direct Delivery</h5>
              <p className="text-[10px] text-[#77716B]">Safe & Reliable</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Categories;


