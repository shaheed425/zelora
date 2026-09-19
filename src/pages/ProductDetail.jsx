import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, MessageSquare, ShieldCheck, Truck, Wrench, Check, ArrowRight } from 'lucide-react';
import { fetchProductBySlug, fetchProducts } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import EnquiryModal from '../components/EnquiryModal';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const res = await fetchProductBySlug(slug);
        const prodData = res.data;
        setProduct(prodData);

        const mainImg = prodData?.featuredImage || prodData?.images?.[0]?.url || '';
        setActiveImage(mainImg);

        // Fetch related products in same category
        if (prodData?.category) {
          const relRes = await fetchProducts({ category: prodData.category._id, limit: 4 });
          setRelatedProducts(relRes.products?.filter(p => p._id !== prodData._id) || []);
        }
      } catch (err) {
        console.error('Failed to load product detail:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 animate-pulse space-y-8">
        <div className="h-8 bg-sand-100 rounded w-1/3"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-sand-100 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-10 bg-sand-100 rounded w-3/4"></div>
            <div className="h-6 bg-sand-100 rounded w-1/4"></div>
            <div className="h-32 bg-sand-100 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 text-center">
        <h2 className="font-editorial text-4xl text-charcoal mb-4">Product Not Found</h2>
        <p className="text-xs text-[#76726E] mb-8">The requested furniture item could not be located in our catalogue.</p>
        <Link to="/shop" className="btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded">
          Return to Shop
        </Link>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    if (!amount) return '₹0';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const inWishlist = isInWishlist(product._id);
  const displayPrice = product.salePrice > 0 ? product.salePrice : product.price;
  const originalPrice = product.salePrice > 0 ? product.price : null;
  const galleryImages = product.images && product.images.length > 0 ? product.images : [{ url: activeImage }];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#76726E] mb-8 uppercase tracking-widest font-medium">
        <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-charcoal transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-sand-700 font-semibold">{product.category?.name || 'Item'}</span>
        <span>/</span>
        <span className="text-charcoal truncate">{product.name}</span>
      </div>

      {/* Product Detail Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        
        {/* LEFT: Image Gallery (7 Columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-square bg-[#FAF8F5] rounded-xl overflow-hidden border border-[#F2ECE4] relative shadow-md">
            <img
              src={activeImage || 'https://mediumturquoise-hedgehog-393181.hostingersite.com/public/images/product/2025-06-10-1749562225-AFRA.jpg'}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500"
              onError={(e) => {
                e.target.src = 'https://mediumturquoise-hedgehog-393181.hostingersite.com/public/images/product/2025-06-10-1749562225-AFRA.jpg';
              }}
            />

            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 z-10 ${
                inWishlist ? 'bg-red-50 text-red-600 shadow-md' : 'bg-white/80 text-charcoal hover:bg-white shadow-sm'
              }`}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current text-red-600' : ''}`} />
            </button>
          </div>

          {/* Thumbnails Row */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {galleryImages.map((imgObj, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgObj.url)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                    activeImage === imgObj.url ? 'border-sand-600 shadow-sm scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgObj.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Specs & Actions (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-[10px] uppercase tracking-mega text-sand-600 font-bold block mb-1">
              {product.category?.name || 'ZELORA Studio'}
            </span>
            <h1 className="font-editorial text-4xl md:text-5xl font-light text-charcoal leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-[#888888] font-mono mt-1">SKU: {product.sku || `ZEL-${product._id?.substring(0, 6)}`}</p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-4 border-y border-[#E8DEC4] py-4">
            <span className="text-3xl font-bold text-charcoal">
              {formatCurrency(displayPrice)}
            </span>
            {originalPrice && (
              <span className="text-base text-[#999999] line-through font-light">
                {formatCurrency(originalPrice)}
              </span>
            )}
            {originalPrice && (
              <span className="bg-red-50 text-red-700 text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                Save {Math.round(((originalPrice - displayPrice) / originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-[#555555] leading-relaxed font-light">
            {product.description || product.shortDescription}
          </p>

          {/* Dimensions, Materials & Stock */}
          <div className="space-y-2.5 text-xs border-b border-[#E8DEC4] pb-4">
            {(product.dimensions || product.height || product.width || product.depth) && (
              <div className="flex items-center gap-2 text-charcoal">
                <span className="font-semibold text-sand-700 uppercase tracking-wider text-[11px]">Size / Dimensions:</span>
                <span className="font-mono text-charcoal font-semibold bg-[#F5F2ED] px-2.5 py-1 rounded border border-[#E8DEC4]">
                  {product.dimensions || `${product.width ? `W: ${product.width}` : ''} ${product.depth ? `D: ${product.depth}` : ''} ${product.height ? `H: ${product.height}` : ''}`}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 text-charcoal">
              <span className="font-semibold text-sand-700 uppercase tracking-wider text-[11px]">Materials:</span>
              <span>{product.materials || 'Solid Teak Wood & High-Density Cushioning'}</span>
            </div>
            <div className="flex items-center gap-2 text-charcoal">
              <span className="font-semibold text-sand-700 uppercase tracking-wider text-[11px]">Availability:</span>
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <Check className="w-4 h-4 text-emerald-600" />
                {product.stockStatus === 'in-stock' ? 'In Stock (Ready for Setup)' : 'Built to Order (7-10 Days)'}
              </span>
            </div>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal">Quantity:</span>
              <div className="flex items-center border border-[#E8DEC4] rounded bg-[#FAF8F5]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-charcoal hover:bg-sand-200 transition-colors"
                >
                  -
                </button>
                <span className="px-4 text-xs font-semibold text-charcoal">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-charcoal hover:bg-sand-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => addToCart(product, quantity)}
                className="btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded flex items-center justify-center gap-2 py-4"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="btn-editorial bg-[#FAF8F5] border border-sand-600 text-sand-800 hover:bg-sand-100 rounded flex items-center justify-center gap-2 py-4"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire / Custom</span>
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-6 text-[11px] text-[#666666] border-t border-[#E8DEC4]">
            <div className="flex flex-col items-center text-center p-2">
              <ShieldCheck className="w-5 h-5 text-sand-600 mb-1" />
              <span>5-Year Warranty</span>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <Truck className="w-5 h-5 text-sand-600 mb-1" />
              <span>Direct Transport</span>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <Wrench className="w-5 h-5 text-sand-600 mb-1" />
              <span>Free Installation</span>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-[#E8DEC4] pt-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-editorial text-3xl font-light text-charcoal">
              You May Also Appreciate
            </h3>
            <Link to="/shop" className="text-xs uppercase tracking-widest text-sand-700 font-semibold hover:underline">
              View Collection
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProd) => (
              <ProductCard key={relProd._id} product={relProd} />
            ))}
          </div>
        </div>
      )}

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        product={product}
      />
    </div>
  );
};

export default ProductDetail;
