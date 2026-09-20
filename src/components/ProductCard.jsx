import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [hovered, setHovered] = useState(false);

  if (!product) return null;

  const inWishlist = isInWishlist(product._id);

  // Formatter for INR
  const formatCurrency = (amount) => {
    if (!amount) return '₹0';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const mainImage = product.featuredImage || (product.images && product.images[0]?.url) || 'https://mediumturquoise-hedgehog-393181.hostingersite.com/public/images/product/2025-06-10-1749562225-AFRA.jpg';
  const secondaryImage = (product.images && product.images[1]?.url) || mainImage;

  const displayPrice = product.salePrice > 0 ? product.salePrice : product.price;
  const originalPrice = product.salePrice > 0 ? product.price : null;

  return (
    <div
      className="group relative flex flex-col bg-white rounded-lg overflow-hidden border border-[#F2ECE4] hover:shadow-xl hover:border-sand-400/50 transition-all duration-500"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] sm:aspect-portrait w-full bg-[#F9F6F0] overflow-hidden">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={hovered && secondaryImage ? secondaryImage : mainImage}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://mediumturquoise-hedgehog-393181.hostingersite.com/public/images/product/2025-06-10-1749562225-AFRA.jpg';
            }}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNewArrival && (
            <span className="bg-[#1A1A1A] text-white text-[8px] sm:text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded">
              NEW
            </span>
          )}
          {product.isTrending && (
            <span className="bg-sand-600 text-white text-[8px] sm:text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded">
              TRENDING
            </span>
          )}
          {originalPrice && (
            <span className="bg-red-700 text-white text-[8px] sm:text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded">
              SALE
            </span>
          )}
        </div>

        {/* Wishlist Button Top Right */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2.5 rounded-full transition-all duration-300 z-10 ${
            inWishlist
              ? 'bg-red-50 text-red-600 shadow-md'
              : 'bg-white/80 backdrop-blur-md text-charcoal hover:bg-white hover:text-sand-600 shadow-sm'
          }`}
          title="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${inWishlist ? 'fill-current text-red-600' : ''}`} />
        </button>

        {/* Hover Quick Action Panel */}
        <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex gap-1 sm:gap-1.5 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={() => addToCart(product, 1)}
            className="flex-1 bg-[#1A1A1A] text-white hover:bg-sand-600 text-[10px] sm:text-xs tracking-wider uppercase font-semibold py-1.5 sm:py-2 px-2 rounded flex items-center justify-center gap-1 sm:gap-1.5 transition-colors shadow-lg whitespace-nowrap overflow-hidden"
          >
            <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
            <span className="truncate">Add to Cart</span>
          </button>
          
          <Link
            to={`/product/${product.slug}`}
            className="bg-white text-charcoal hover:text-sand-600 p-1.5 sm:p-2 rounded shadow-lg flex items-center justify-center transition-colors flex-shrink-0"
            title="Quick View"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 bg-white">
        <div>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-sand-600 font-bold block mb-0.5 sm:mb-1">
            {product.category?.name || product.subcategory || 'Crafted Furniture'}
          </span>
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-editorial text-xs sm:text-base font-medium text-charcoal hover:text-sand-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-2.5 sm:mt-3 flex items-center justify-between border-t border-[#F2ECE4] pt-2 sm:pt-2.5">
          <div className="flex items-baseline gap-1">
            <span className="text-xs sm:text-sm md:text-base font-bold text-charcoal">
              {formatCurrency(displayPrice)}
            </span>
            {originalPrice && (
              <span className="text-[9px] sm:text-xs text-[#999999] line-through font-light">
                {formatCurrency(originalPrice)}
              </span>
            )}
          </div>
          
          <button
            onClick={() => addToCart(product, 1)}
            className="sm:hidden bg-[#1A1A1A] text-white p-1.5 rounded hover:bg-sand-600 transition-colors flex items-center gap-1 text-[9px] uppercase font-semibold"
            title="Add to Cart"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Add</span>
          </button>
          <span className="hidden sm:inline-block text-[8px] sm:text-[10px] uppercase tracking-wider text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
            {product.stockStatus === 'in-stock' ? 'In Stock' : 'Pre-order'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
