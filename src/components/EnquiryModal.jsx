import React, { useState } from 'react';
import { X, CheckCircle, Send, PhoneCall } from 'lucide-react';
import { submitEnquiry } from '../services/enquiryService';

const EnquiryModal = ({ isOpen, onClose, product = null }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone) {
      setError('Please provide your name and phone number');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      await submitEnquiry({
        customerName: formData.customerName,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        product: product ? product._id : null,
        productName: product ? product.name : 'General Showroom Enquiry',
        source: 'website_modal',
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] max-w-lg w-full rounded-xl shadow-2xl border border-[#E8DEC4] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-charcoal hover:text-sand-600 rounded-full hover:bg-sand-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-10 text-center flex flex-col items-center">
            <CheckCircle className="w-16 h-16 text-emerald-600 mb-4" />
            <h3 className="font-editorial text-3xl font-light text-charcoal mb-2">
              Enquiry Received
            </h3>
            <p className="text-xs text-[#76726E] leading-relaxed max-w-sm mb-6">
              Thank you for reaching out to ZELORA. Our senior design consultant will contact you via phone or WhatsApp shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded"
            >
              Back to Showroom
            </button>
          </div>
        ) : (
          <div className="p-8">
            <div className="mb-6 border-b border-[#E8DEC4] pb-4">
              <span className="text-[10px] uppercase tracking-mega text-sand-600 font-bold block mb-1">
                Direct Showroom Consultation
              </span>
              <h3 className="font-editorial text-3xl font-light text-charcoal">
                {product ? `Enquire about ${product.name}` : 'Custom Furniture Enquiry'}
              </h3>
              {product && (
                <p className="text-xs text-sand-700 font-medium mt-1">
                  SKU: {product.sku || 'N/A'} • {product.category?.name || 'Luxury Line'}
                </p>
              )}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Nair"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full bg-white border border-[#E8DEC4] text-xs text-charcoal px-4 py-2.5 rounded focus:outline-none focus:border-sand-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-[#E8DEC4] text-xs text-charcoal px-4 py-2.5 rounded focus:outline-none focus:border-sand-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#E8DEC4] text-xs text-charcoal px-4 py-2.5 rounded focus:outline-none focus:border-sand-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal mb-1">
                  Customization Details or Questions
                </label>
                <textarea
                  rows={3}
                  placeholder="Specify custom fabric choices, dimensions, or wholesale inquiry requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-[#E8DEC4] text-xs text-charcoal px-4 py-2.5 rounded focus:outline-none focus:border-sand-500 transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-sand-700">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Instant Call Back Available</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Sending...' : 'Send Enquiry'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;
