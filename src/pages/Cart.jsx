import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 text-center">
        <h1 className="font-editorial text-5xl font-light text-charcoal mb-4">Your Selection Cart is Empty</h1>
        <p className="text-xs text-[#76726E] max-w-md mx-auto mb-8">
          Browse our luxury furniture collections and add items to begin your consultation or direct checkout.
        </p>
        <Link to="/shop" className="btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded">
          <span>Browse Furniture Shop</span>
          <ArrowRight className="w-4 h-4 arrow-icon" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12 border-b border-[#E8DEC4] pb-8 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-mega text-sand-600 font-bold block mb-1">
            Order Curation
          </span>
          <h1 className="font-editorial text-4xl md:text-6xl font-light text-charcoal">
            Shopping Cart
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-[#999999] hover:text-red-600 uppercase tracking-widest font-semibold transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-lg border border-[#F2ECE4] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.featuredImage || item.images?.[0]?.url || 'https://mediumturquoise-hedgehog-393181.hostingersite.com/public/images/product/2025-06-10-1749562225-AFRA.jpg'}
                  alt={item.name}
                  className="w-24 h-28 object-cover rounded bg-sand-50"
                  onError={(e) => {
                    e.target.src = 'https://mediumturquoise-hedgehog-393181.hostingersite.com/public/images/product/2025-06-10-1749562225-AFRA.jpg';
                  }}
                />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-sand-600 font-bold block">
                    {item.category?.name || 'Furniture'}
                  </span>
                  <Link to={`/product/${item.slug}`}>
                    <h4 className="font-editorial text-2xl font-medium text-charcoal hover:text-sand-600 transition-colors">
                      {item.name}
                    </h4>
                  </Link>
                  <p className="text-xs text-[#76726E] mt-1 font-mono">SKU: {item.sku || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-8 border-t sm:border-t-0 border-[#F2ECE4] pt-4 sm:pt-0">
                {/* Quantity */}
                <div className="flex items-center border border-[#E8DEC4] rounded bg-[#FAF8F5]">
                  <button
                    onClick={() => updateQuantity(item._id, -1)}
                    className="px-3 py-1 text-charcoal hover:bg-sand-200 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-4 text-xs font-semibold text-charcoal">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, 1)}
                    className="px-3 py-1 text-charcoal hover:bg-sand-200 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-right min-w-[100px]">
                  <span className="text-lg font-bold text-charcoal block">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                  <span className="text-[10px] text-[#999999] block font-light">
                    ({formatCurrency(item.price)} each)
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-[#999999] hover:text-red-600 transition-colors p-2"
                  title="Remove"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-4 bg-white p-8 rounded-lg border border-[#F2ECE4] shadow-sm space-y-6">
          <h3 className="font-editorial text-2xl font-medium text-charcoal border-b border-[#F2ECE4] pb-4">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs text-charcoal">
            <div className="flex justify-between">
              <span className="text-[#76726E]">Subtotal</span>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#76726E]">Professional Assembly & Installation</span>
              <span className="font-semibold text-emerald-700">Included FREE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#76726E]">Insured Ground Freight</span>
              <span className="font-semibold text-emerald-700">Calculated at Checkout</span>
            </div>
            <div className="border-t border-[#F2ECE4] pt-4 flex justify-between text-base font-bold">
              <span>Estimated Total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded flex items-center justify-center gap-2 py-4"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 arrow-icon" />
          </button>

          <div className="space-y-2 pt-4 text-[11px] text-[#76726E] border-t border-[#F2ECE4]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sand-600" />
              <span>5-Year Structural Teak Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-sand-600" />
              <span>Direct Showroom Shipping across India</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
