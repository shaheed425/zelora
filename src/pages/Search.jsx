import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/productService';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length > 1) {
        setLoading(true);
        try {
          const data = await fetchProducts({ search: searchTerm, limit: 16 });
          setProducts(data.products || []);
        } catch (err) {
          console.error('Search query failed:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setProducts([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 min-h-[70vh]">
      {/* Search Input Bar */}
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <span className="text-[10px] uppercase tracking-mega text-sand-600 font-bold block mb-3">
          Instant Catalogue Search
        </span>
        
        <div className="relative">
          <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-sand-500" />
          <input
            type="text"
            autoFocus
            placeholder="Search sofas, beds, dining tables, wardrobes, solid wood..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#E8DEC4] text-lg text-charcoal pl-16 pr-12 py-5 rounded-xl shadow-lg focus:outline-none focus:border-sand-600 transition-all placeholder:text-[#AAAAAA] placeholder:font-light"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-charcoal hover:text-sand-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-center gap-3 mt-4 text-xs text-[#76726E]">
          <span className="font-semibold text-charcoal uppercase tracking-wider text-[10px]">Popular:</span>
          <button onClick={() => setSearchTerm('sofa')} className="hover:text-sand-600 underline">Sofas</button>
          <span>•</span>
          <button onClick={() => setSearchTerm('bed')} className="hover:text-sand-600 underline">Beds</button>
          <span>•</span>
          <button onClick={() => setSearchTerm('dining')} className="hover:text-sand-600 underline">Dining</button>
          <span>•</span>
          <button onClick={() => setSearchTerm('wardrobe')} className="hover:text-sand-600 underline">Wardrobes</button>
        </div>
      </div>

      {/* Results Section */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-portrait bg-sand-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : searchTerm.trim().length > 1 && products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-[#F2ECE4]">
          <h3 className="font-editorial text-3xl font-light text-charcoal mb-2">No Matching Furniture Found</h3>
          <p className="text-xs text-[#76726E]">Try checking for typos or searching for general categories like "table" or "chair".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
