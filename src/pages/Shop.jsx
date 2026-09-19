import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/productService';
import { fetchCategories } from '../services/categoryService';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  // Filters state
  const selectedCategory = searchParams.get('category') || '';
  const selectedSort = searchParams.get('sortBy') || 'createdAt';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const searchQuery = searchParams.get('search') || '';

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const catRes = await fetchCategories();
        setCategories(catRes.data || []);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const query = {
          page: currentPage,
          limit: 12,
          category: selectedCategory,
          sortBy: selectedSort,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          search: searchQuery || undefined,
        };
        const data = await fetchProducts(query);
        setProducts(data.products || []);
        setPagination(data.pagination || { page: 1, totalPages: 1, total: 0 });
      } catch (err) {
        console.error('Failed to load shop products:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [selectedCategory, selectedSort, minPrice, maxPrice, currentPage, searchQuery]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1'); // reset page on filter change
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* Page Header */}
      <div className="mb-10 text-center md:text-left border-b border-[#E8DEC4] pb-8">
        <span className="text-[10px] uppercase tracking-mega text-sand-600 font-bold block mb-1">
          Catalog Overview
        </span>
        <h1 className="font-editorial text-4xl md:text-6xl font-light text-charcoal">
          Furniture Shop
        </h1>
        <p className="text-xs text-[#76726E] mt-2 max-w-xl">
          Showing {pagination.total} handcrafted furniture pieces available for custom setup across India.
        </p>
      </div>

      {/* Top Filter & Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 rounded-lg border border-[#F2ECE4]">
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="lg:hidden flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-charcoal"
        >
          <SlidersHorizontal className="w-4 h-4 text-sand-600" />
          <span>Filters</span>
        </button>

        {/* Category Pills (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 overflow-x-auto py-1">
          <button
            onClick={() => updateFilter('category', '')}
            className={`px-3.5 py-1.5 rounded text-xs tracking-wider uppercase font-semibold transition-colors ${
              !selectedCategory
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-[#FAF8F5] text-charcoal hover:bg-sand-100'
            }`}
          >
            All Products
          </button>
          {categories.slice(0, 7).map((cat) => (
            <button
              key={cat._id}
              onClick={() => updateFilter('category', cat.slug)}
              className={`px-3.5 py-1.5 rounded text-xs tracking-wider uppercase font-semibold transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-sand-600 text-white'
                  : 'bg-[#FAF8F5] text-charcoal hover:bg-sand-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-xs text-[#76726E] uppercase tracking-wider font-medium hidden sm:inline">Sort By:</span>
          <select
            value={selectedSort}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="bg-[#FAF8F5] border border-[#E8DEC4] text-xs text-charcoal px-3 py-2 rounded font-medium focus:outline-none focus:border-sand-500 cursor-pointer"
          >
            <option value="createdAt">Newest Additions</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
            <option value="name_asc">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Main Grid & Mobile Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-8 bg-white p-6 rounded-lg border border-[#F2ECE4] h-fit`}>
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-[#F2ECE4] pb-2">
              <h3 className="font-editorial text-xl font-medium text-charcoal">Categories</h3>
              {(selectedCategory || minPrice || maxPrice || searchQuery) && (
                <button
                  onClick={clearAllFilters}
                  className="text-[10px] uppercase text-sand-600 font-semibold hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-2">
              <button
                onClick={() => updateFilter('category', '')}
                className={`w-full text-left text-xs py-1.5 px-2 rounded flex justify-between ${
                  !selectedCategory ? 'font-bold text-sand-700 bg-sand-50' : 'text-[#555] hover:text-charcoal'
                }`}
              >
                <span>All Furniture</span>
                <span>({pagination.total})</span>
              </button>

              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => updateFilter('category', cat.slug)}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded flex justify-between ${
                    selectedCategory === cat.slug ? 'font-bold text-sand-700 bg-sand-50' : 'text-[#555] hover:text-charcoal'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span>({cat.productCount || 0})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-editorial text-xl font-medium text-charcoal mb-4 border-b border-[#F2ECE4] pb-2">
              Price Range (₹)
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => updateFilter('minPrice', e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E8DEC4] text-xs px-3 py-2 rounded focus:outline-none"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => updateFilter('maxPrice', e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#E8DEC4] text-xs px-3 py-2 rounded focus:outline-none"
              />
            </div>
          </div>

        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-portrait bg-sand-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white p-12 rounded-lg border border-[#F2ECE4] text-center">
              <h3 className="font-editorial text-2xl font-light text-charcoal mb-2">No Products Found</h3>
              <p className="text-xs text-[#76726E] mb-6">Try adjusting your filters or search terms.</p>
              <button
                onClick={clearAllFilters}
                className="btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-12 pt-8 border-t border-[#E8DEC4]">
                  <button
                    disabled={!pagination.hasPrevPage}
                    onClick={() => updateFilter('page', (currentPage - 1).toString())}
                    className="p-2 border border-[#E8DEC4] rounded text-charcoal disabled:opacity-30 hover:bg-sand-100"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs uppercase tracking-widest font-semibold text-charcoal px-4">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>

                  <button
                    disabled={!pagination.hasNextPage}
                    onClick={() => updateFilter('page', (currentPage + 1).toString())}
                    className="p-2 border border-[#E8DEC4] rounded text-charcoal disabled:opacity-30 hover:bg-sand-100"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Shop;
