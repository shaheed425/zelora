import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    number: '01',
    image: '/images/image.png',
    tagline: 'MODERN LIVING, TIMELESS CRAFT',
    headingMain: 'Spaces',
    headingSub: 'that feel',
    headingItalic: 'like home.',
    description:
      'Handcrafted luxury furniture designed for distinguished Indian homes. Merging architectural elegance, rich solid wood, and supreme ergonomic comfort to elevate your everyday living.',
  },
  {
    id: 2,
    number: '02',
    image: '/images/slide2.png',
    tagline: 'BESPOKE BEDROOM SUITE',
    headingMain: 'Sanctuary',
    headingSub: 'sculpted for',
    headingItalic: 'deep repose.',
    description:
      'Serene bedroom aesthetics crafted in solid natural teakwood and organic fabrics. A tranquil retreat of warmth, timeless beauty, and master artisanal joinery.',
  },
  {
    id: 3,
    number: '03',
    image: '/images/slide3.png',
    tagline: 'CONTEMPORARY DINING',
    headingMain: 'Gathering',
    headingSub: 'around pure',
    headingItalic: 'craftsmanship.',
    description:
      'Architectural dining tables paired with ergonomic seating. Designed to foster connection and elevate every family meal into a grand, memorable experience.',
  },
];

const HeroSection = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = SLIDES[currentSlideIndex];

  return (
    <section className="relative w-full h-screen min-h-[700px] max-h-[1000px] flex items-center overflow-hidden bg-charcoal">
      {/* Background Images with Fade Transition */}
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.tagline}
            className="w-full h-full object-cover object-center scale-[1.02] transition-transform duration-[7000ms] ease-out"
          />
        </div>
      ))}

      {/* Top Scrim Gradient overlay ensuring top Navbar links & icons are 100% crisp & visible across all slides */}
      <div className="absolute top-0 left-0 right-0 h-44 z-10 bg-gradient-to-b from-black/80 via-black/35 to-transparent pointer-events-none"></div>

      {/* Dynamic Left Scrim Overlay for maximum text legibility on brighter interior images (Slide 2 & 3) */}
      <div
        className={`absolute inset-0 z-10 transition-all duration-700 ${
          currentSlideIndex === 0
            ? 'bg-gradient-to-r from-black/60 via-black/30 to-transparent'
            : 'bg-gradient-to-r from-black/75 via-black/45 to-transparent'
        }`}
      ></div>

      {/* Bottom & General Ambient Vignette for Hero Footer Elements */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none"></div>

      {/* Top Right Vertical Motto (CRAFTED SPACES HAPPIER PEOPLE) */}
      <div className="absolute top-24 right-12 z-20 hidden lg:flex items-center gap-4 text-white/90">
        <div className="text-[10px] uppercase tracking-[0.25em] text-right leading-relaxed font-light font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          CRAFTED<br />
          SPACES<br />
          HAPPIER<br />
          PEOPLE
        </div>
        <div className="w-[1px] h-16 bg-white/40"></div>
      </div>

      {/* Left Vertical Counter (01, 02, 03 ONLY) */}
      <div className="absolute left-8 sm:left-10 top-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center gap-4">
        <div className="flex flex-col items-center gap-4 text-xs font-mono drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlideIndex;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'text-white font-bold text-sm tracking-wider scale-110'
                    : 'text-white/60 hover:text-white font-normal'
                }`}
                title={`Slide ${slide.number}`}
              >
                <span>{slide.number}</span>
                {isActive && (
                  <span className="w-2 h-0.5 bg-[#C5A880] inline-block rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
        <div className="w-[1px] h-20 bg-white/40"></div>
      </div>

      {/* Main Left-Aligned Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 sm:px-12 md:px-20 w-full pt-12">
        <div className="max-w-2xl text-left transition-all duration-700 ease-out">
          
          <p className="text-sand-300 text-xs md:text-xs uppercase tracking-mega font-semibold mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {currentSlide.tagline}
          </p>

          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-light tracking-tight leading-[1.05] mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            {currentSlide.headingMain} <br />
            {currentSlide.headingSub} <br />
            <span className="italic text-[#D4B890] font-normal">
              {currentSlide.headingItalic}
            </span>
          </h1>

          <p className="text-white text-xs sm:text-sm font-light leading-relaxed mb-8 max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {currentSlide.description}
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5">
            <Link
              to="/shop"
              className="bg-[#C5A880] text-white hover:bg-[#A3845B] px-8 py-3.5 rounded text-xs font-semibold uppercase tracking-widest transition-all shadow-[0_8px_20px_rgba(0,0,0,0.4)] flex items-center justify-center gap-3 group"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/new-arrivals"
              className="bg-black/40 backdrop-blur-md text-white border border-white/40 hover:bg-white/10 px-8 py-3.5 rounded text-xs font-semibold uppercase tracking-widest transition-all text-center shadow-lg"
            >
              <span>VIEW NEW ARRIVALS</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Left Scroll Indicator */}
      <div className="absolute bottom-10 left-8 sm:left-12 z-20 flex items-end gap-3 text-white/90">
        <div className="w-[1px] h-12 bg-white/40"></div>
        <div className="flex flex-col text-[9px] uppercase tracking-[0.25em] text-white/80 font-mono leading-tight">
          <span>SCROLL</span>
          <span>TO EXPLORE</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

