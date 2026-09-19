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
      <div className="relative aspect-portrait w-full bg-[#F9F6F0] overflow-hidden">
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
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNewArrival && (
            <span className="bg-[#1A1A1A] text-white text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded">
              NEW
            </span>
          )}
          {product.isTrending && (
            <span className="bg-sand-600 text-white text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded">
              TRENDING
            </span>
          )}
          {originalPrice && (
            <span className="bg-red-700 text-white text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded">
              SALE
            </span>
          )}
        </div>

        {/* Wishlist Button Top Right */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 z-10 ${
            inWishlist
              ? 'bg-red-50 text-red-600 shadow-md'
              : 'bg-white/80 backdrop-blur-md text-charcoal hover:bg-white hover:text-sand-600 shadow-sm'
          }`}
          title="Wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current text-red-600' : ''}`} />
        </button>

        {/* Hover Quick Action Panel */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 transform translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={() => addToCart(product, 1)}
            className="flex-1 bg-[#1A1A1A] text-white hover:bg-sand-600 text-xs tracking-wider uppercase font-semibold py-2.5 px-3 rounded flex items-center justify-center gap-2 transition-colors shadow-lg"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
          
          <Link
            to={`/product/${product.slug}`}
            className="bg-white text-charcoal hover:text-sand-600 p-2.5 rounded shadow-lg flex items-center justify-center transition-colors"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col justify-between flex-1 bg-white">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-sand-600 font-bold block mb-1">
            {product.category?.name || product.subcategory || 'Crafted Furniture'}
          </span>
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-editorial text-xl font-medium text-charcoal hover:text-sand-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#F2ECE4] pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-charcoal">
              {formatCurrency(displayPrice)}
            </span>
            {originalPrice && (
              <span className="text-xs text-[#999999] line-through font-light">
                {formatCurrency(originalPrice)}
              </span>
            )}
          </div>
          
          <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
            {product.stockStatus === 'in-stock' ? 'In Stock' : 'Pre-order'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
