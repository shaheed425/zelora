import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';

const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: 'Kerala',
    postalCode: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [error, setError] = useState('');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.street || !formData.city) {
      setError('Please fill in all required shipping fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderPayload = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        products: cart.map(item => ({
          product: item._id,
          name: item.name,
          image: item.featuredImage || item.images?.[0]?.url || '',
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal,
        discount: 0,
        total: subtotal,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode || '670307',
          country: 'India',
        },
        notes: formData.notes,
      };

      const res = await createOrder(orderPayload);
      setCompletedOrder(res.data);
      clearCart();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="bg-white p-12 rounded-xl border border-[#F2ECE4] shadow-xl">
          <CheckCircle className="w-20 h-20 text-emerald-600 mx-auto mb-6" />
          <span className="text-xs uppercase tracking-mega text-sand-600 font-bold block mb-2">
            Order Confirmation
          </span>
          <h1 className="font-editorial text-5xl font-light text-charcoal mb-4">
            Thank You for Your Order!
          </h1>
          <p className="text-sm text-sand-800 font-semibold mb-6">
            Order Reference: <span className="font-mono text-charcoal">{completedOrder.orderNumber}</span>
          </p>
          <p className="text-xs text-[#76726E] leading-relaxed max-w-md mx-auto mb-8">
            We have received your furniture order. Our logistics supervisor will call you on <strong className="text-charcoal">{completedOrder.customer.phone}</strong> to confirm delivery dates and installation setup.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <h2 className="font-editorial text-4xl text-charcoal mb-4">No Items to Checkout</h2>
        <p className="text-xs text-[#76726E] mb-6">Your cart is currently empty.</p>
        <button onClick={() => navigate('/shop')} className="btn-editorial bg-[#1A1A1A] text-white rounded">
          Browse Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12 border-b border-[#E8DEC4] pb-8">
        <span className="text-[10px] uppercase tracking-mega text-sand-600 font-bold block mb-1">
          Finalize Selection
        </span>
        <h1 className="font-editorial text-4xl md:text-6xl font-light text-charcoal">
          Checkout & Dispatch
        </h1>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Customer Information (7 Columns) */}
        <div className="lg:col-span-7 space-y-8 bg-white p-8 rounded-xl border border-[#F2ECE4] shadow-sm">
          <div>
            <h3 className="font-editorial text-2xl font-medium text-charcoal border-b border-[#F2ECE4] pb-3 mb-6">
              1. Contact Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Nair"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E8DEC4] text-xs px-4 py-3 rounded focus:outline-none focus:border-sand-500"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal mb-1">
                  Phone Number (For Delivery Confirmation) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E8DEC4] text-xs px-4 py-3 rounded focus:outline-none focus:border-sand-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E8DEC4] text-xs px-4 py-3 rounded focus:outline-none focus:border-sand-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-editorial text-2xl font-medium text-charcoal border-b border-[#F2ECE4] pb-3 mb-6">
              2. Shipping Address & Assembly Site
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal mb-1">
                  Street Address & House/Apartment No. *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. House No. 42, Green Valley Villa, Main Road"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E8DEC4] text-xs px-4 py-3 rounded focus:outline-none focus:border-sand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Payyanur"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DEC4] text-xs px-4 py-3 rounded focus:outline-none focus:border-sand-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DEC4] text-xs px-4 py-3 rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    placeholder="670307"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DEC4] text-xs px-4 py-3 rounded focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal mb-1">
                  Delivery Notes or Assembly Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="Floor number, elevator availability, preferred delivery timing..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E8DEC4] text-xs px-4 py-3 rounded focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Review Sidebar (5 Columns) */}
        <div className="lg:col-span-5 bg-white p-8 rounded-xl border border-[#F2ECE4] shadow-sm space-y-6">
          <h3 className="font-editorial text-2xl font-medium text-charcoal border-b border-[#F2ECE4] pb-4">
            Items Being Ordered
          </h3>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center justify-between text-xs border-b border-[#FAF8F5] pb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.featuredImage || item.images?.[0]?.url || ''}
                    alt={item.name}
                    className="w-12 h-14 object-cover rounded bg-sand-50"
                  />
                  <div>
                    <h5 className="font-editorial text-base font-semibold text-charcoal">{item.name}</h5>
                    <span className="text-[11px] text-[#76726E]">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-charcoal">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#F2ECE4] pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-[#76726E]">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#76726E]">
              <span>Installation & Setup</span>
              <span className="text-emerald-700 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between text-base font-bold text-charcoal pt-2 border-t border-[#F2ECE4]">
              <span>Total Payable</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded flex items-center justify-center gap-2 py-4 disabled:opacity-50"
          >
            <span>{loading ? 'Processing Order...' : 'Confirm Order & Request Assembly'}</span>
            <ArrowRight className="w-4 h-4 arrow-icon" />
          </button>

          <div className="text-[11px] text-[#76726E] space-y-2 pt-2 border-t border-[#F2ECE4]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sand-600" />
              <span>5-Year Teak Hardwood Structural Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-sand-600" />
              <span>Dedicated ZELORA Assembly Logistics Team</span>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default Checkout;
