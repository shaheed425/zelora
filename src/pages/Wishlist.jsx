import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12 text-center md:text-left border-b border-[#E8DEC4] pb-8">
        <span className="text-[10px] uppercase tracking-mega text-sand-600 font-bold block mb-1">
          Saved Curation
        </span>
        <h1 className="font-editorial text-4xl md:text-6xl font-light text-charcoal">
          Your Wishlist
        </h1>
        <p className="text-xs text-[#76726E] mt-2">
          {wishlist.length} item{wishlist.length === 1 ? '' : 's'} saved for your home design project.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white p-16 rounded-xl border border-[#F2ECE4] text-center max-w-lg mx-auto my-12">
          <Heart className="w-16 h-16 text-sand-300 mx-auto mb-4 stroke-1" />
          <h3 className="font-editorial text-3xl font-light text-charcoal mb-2">Your Wishlist is Empty</h3>
          <p className="text-xs text-[#76726E] mb-8 leading-relaxed">
            Click the heart icon on any furniture piece to save it to your personalized showroom wishlist.
          </p>
          <Link to="/shop" className="btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded">
            <span>Explore Furniture</span>
            <ArrowRight className="w-4 h-4 arrow-icon" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
