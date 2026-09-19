import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Luxury ZELORA Logo Component
 */
const Logo = ({ light = true, size = 'normal', className = '' }) => {
  const iconSize = size === 'small' ? 'w-7 h-7' : size === 'large' ? 'w-11 h-11' : 'w-9 h-9';
  const titleSize = size === 'small' ? 'text-xl' : size === 'large' ? 'text-3xl sm:text-4xl' : 'text-2xl md:text-3xl';
  const subtitleSize = size === 'small' ? 'text-[6px]' : size === 'large' ? 'text-[8px]' : 'text-[7px]';

  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Gold Monogram Shield Emblem */}
      <div className={`${iconSize} rounded-xl bg-gradient-to-br from-[#2A2621] to-[#121110] p-1 border border-[#D4B890]/50 shadow-md group-hover:border-[#D4B890] transition-all flex items-center justify-center flex-shrink-0`}>
        <img
          src="/favicon.svg"
          alt="ZELORA Logo"
          className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Brand Text Header */}
      <div className="flex flex-col justify-center">
        <span className={`font-editorial ${titleSize} tracking-tight font-bold leading-none ${light ? 'text-white' : 'text-charcoal'} group-hover:text-[#D4B890] transition-colors`}>
          ZELORA
        </span>
        <span className={`font-serif tracking-mega uppercase font-light mt-0.5 ${subtitleSize} ${light ? 'text-[#D4B890]' : 'text-[#886633]'}`}>
          Live Beautifully
        </span>
      </div>
    </Link>
  );
};

export default Logo;
