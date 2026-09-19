import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/productService';
import { fetchCategoryBySlug } from '../services/categoryService';

const CategoryProducts = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryData = async () => {
      setLoading(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          fetchCategoryBySlug(slug),
          fetchProducts({ category: slug, limit: 24 }),
        ]);

        setCategory(catRes.data || null);
        setProducts(prodRes.products || []);
      } catch (err) {
        console.error(`Failed to load products for category ${slug}:`, err);
      } finally {
        setLoading(false);
      }
    };
    loadCategoryData();
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* Category Header Banner */}
      <div className="relative mb-12 rounded-xl overflow-hidden bg-charcoal text-white p-8 md:p-16">
        {category?.image && (
          <img
            src={category.image}
            alt={category?.name}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] contrast-[1.05]"
          />
        )}
        <div className="relative z-10 max-w-2xl">
          <span className="text-[10px] uppercase tracking-mega text-sand-300 font-semibold block mb-2">
            Collection Division
          </span>
          <h1 className="font-editorial text-4xl md:text-6xl font-light text-white mb-4">
            {category?.name || slug.replace('-', ' ').toUpperCase()}
          </h1>
          <p className="text-xs md:text-sm text-[#CCCCCC] font-light leading-relaxed">
            {category?.description || 'Explore our luxury furniture collection handcrafted with teak wood and premium upholstery.'}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-portrait bg-sand-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white p-12 rounded-lg border border-[#F2ECE4] text-center">
          <h3 className="font-editorial text-2xl font-light text-charcoal mb-2">No Products in this Category</h3>
          <p className="text-xs text-[#76726E] mb-6">Explore our full shop collection or check other categories.</p>
          <Link to="/shop" className="btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded">
            View All Products
          </Link>
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

export default CategoryProducts;
