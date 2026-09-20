import React from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-charcoal/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E8DEC4] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-sand-600" />
            <h3 className="font-editorial text-2xl font-semibold text-charcoal">Your Selection</h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-charcoal hover:text-sand-600 rounded-full hover:bg-sand-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <ShoppingBag className="w-16 h-16 text-sand-300 mb-4 stroke-1" />
              <h4 className="font-editorial text-2xl font-light text-charcoal mb-2">Your Cart is Empty</h4>
              <p className="text-xs text-[#76726E] max-w-xs mb-8">
                Explore our handcrafted furniture collections and curate your ideal interior.
              </p>
              <Link
                to="/shop"
                onClick={() => setIsCartOpen(false)}
                className="btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded"
              >
                <span>Browse Shop</span>
                <ArrowRight className="w-4 h-4 arrow-icon" />
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 p-4 bg-white rounded-lg border border-[#F2ECE4] shadow-sm relative group"
              >
                <img
                  src={item.featuredImage || item.images?.[0]?.url || 'https://mediumturquoise-hedgehog-393181.hostingersite.com/public/images/product/2025-06-10-1749562225-AFRA.jpg'}
                  alt={item.name}
                  className="w-20 h-24 object-cover object-center rounded bg-sand-50"
                  onError={(e) => {
                    e.target.src = 'https://mediumturquoise-hedgehog-393181.hostingersite.com/public/images/product/2025-06-10-1749562225-AFRA.jpg';
                  }}
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="font-editorial text-lg font-medium text-charcoal line-clamp-1">
                      {item.name}
                    </h5>
                    {item.selectedColor && (
                      <p className="text-[11px] text-[#76726E] font-medium mt-0.5">
                        Finish: <span className="text-charcoal font-semibold">{item.selectedColor}</span>
                      </p>
                    )}
                    <p className="text-xs text-sand-600 font-semibold mt-0.5">
                      {formatCurrency(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-[#E8DEC4] rounded bg-[#FAF8F5]">
                      <button
                        onClick={() => updateQuantity(item._id, -1)}
                        className="px-2 py-1 text-charcoal hover:bg-sand-200 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, 1)}
                        className="px-2 py-1 text-charcoal hover:bg-sand-200 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-[#999] hover:text-red-600 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Subtotal */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#E8DEC4] bg-white space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-charcoal uppercase tracking-widest font-medium">Subtotal</span>
              <span className="font-bold text-lg text-charcoal">{formatCurrency(subtotal)}</span>
            </div>
            <p className="text-[11px] text-[#76726E] italic">
              Free installation & standard ground delivery calculated at checkout.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                to="/cart"
                onClick={() => setIsCartOpen(false)}
                className="py-3 px-4 bg-[#FAF8F5] border border-[#E8DEC4] text-charcoal hover:bg-sand-100 text-center text-xs font-semibold tracking-wider uppercase rounded transition-colors"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="py-3 px-4 bg-[#1A1A1A] text-white hover:bg-sand-600 text-center text-xs font-semibold tracking-wider uppercase rounded transition-colors flex items-center justify-center gap-1"
              >
                Checkout →
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartDrawer;
