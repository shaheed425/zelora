import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category, index }) => {
  if (!category) return null;

  // Distinct photorealistic fallback images for each category card
  const categoryFallbacks = [
    '/images/image.webp',                 // 01 LIVING ROOM (Sofas & Seating)
    '/images/category_hero_bedroom.webp', // 02 BEDROOM (Beds & Bedroom Sets)
    '/images/slide2.webp',                // 03 DINING (Dining Sets)
    '/images/slide3.webp',                // 04 STORAGE (Wardrobes & Storage)
  ];

  const getCategoryImage = () => {
    if (category.image && !category.image.includes('LISTA') && !category.image.includes('ALEXA') && !category.image.includes('hostingersite')) {
      return category.image;
    }
    const idx = index !== undefined ? index % categoryFallbacks.length : 0;
    return categoryFallbacks[idx];
  };

  const imageUrl = getCategoryImage();

  // Badge & title mapping for top 4 flagship categories
  const badges = ['LIVING ROOM', 'BEDROOM', 'DINING', 'STORAGE'];
  const titles = ['Sofas & Seating', 'Beds & Bedroom Sets', 'Dining Sets', 'Wardrobes & Storage'];

  const categoryBadge = category.badge || (index !== undefined && badges[index]) || category.name?.toUpperCase() || 'COLLECTION';
  const categoryTitle = (index !== undefined && titles[index]) || category.name;
  const numberFormatted = index !== undefined ? `0${index + 1}` : '01';

  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative block aspect-[4/5] rounded-2xl overflow-hidden bg-charcoal shadow-xl border border-[#E5DEC9] hover:border-[#C5A880] transition-all duration-500"
    >
      {/* Category Image */}
      <img
        src={imageUrl}
        alt={categoryTitle}
        className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        onError={(e) => {
          const idx = index !== undefined ? index % categoryFallbacks.length : 0;
          e.target.src = categoryFallbacks[idx];
        }}
      />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>

      {/* Number Counter Top-Left (01 ───) */}
      <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 z-10 flex items-center gap-2 text-white/80 font-mono text-xs sm:text-sm drop-shadow-md">
        <span>{numberFormatted}</span>
        <div className="w-5 sm:w-8 h-[1px] bg-white/40"></div>
      </div>

      {/* Content Overlay Bottom */}
      <div className="absolute inset-0 p-3.5 sm:p-6 flex flex-col justify-end z-10 text-white">
        <div className="flex items-end justify-between">
          <div className="flex-1 min-w-0 pr-2">
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-[#D4B890] font-semibold block mb-1 font-mono">
              {categoryBadge}
            </span>
            <h3 className="font-editorial text-base sm:text-2xl md:text-3xl font-light text-white tracking-tight leading-tight group-hover:text-sand-200 transition-colors line-clamp-1 mb-1.5 sm:mb-3">
              {categoryTitle}
            </h3>
            
            <div className="flex items-center gap-2 text-[8px] sm:text-xs text-white/80 font-light font-sans">
              <div className="w-3 sm:w-6 h-[1px] bg-white/50"></div>
              <span className="group-hover:text-[#C5A880] transition-colors">Explore Collection</span>
            </div>
          </div>

          {/* Bottom Right Circular Arrow Button */}
          <div className="w-7 h-7 sm:w-11 sm:h-11 rounded-full border border-white/30 bg-black/30 backdrop-blur-md text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#C5A880] group-hover:border-[#C5A880] group-hover:text-black transition-all shadow-lg">
            <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
