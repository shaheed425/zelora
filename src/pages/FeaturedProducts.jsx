import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/productService';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await fetchProducts({ isFeatured: true, limit: 20 });
        setProducts(data.products || []);
      } catch (err) {
        console.error('Failed to load featured products:', err);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12 text-center md:text-left border-b border-[#E8DEC4] pb-8">
        <span className="text-[10px] uppercase tracking-mega text-sand-600 font-bold block mb-1">
          Masterpiece Suite
        </span>
        <h1 className="font-editorial text-4xl md:text-6xl font-light text-charcoal">
          Featured Collection
        </h1>
        <p className="text-xs text-[#76726E] mt-2 max-w-xl">
          Highlighting ZELORA's finest craftsmanship and signature statement pieces created for contemporary luxury residences.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-portrait bg-sand-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
