import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { submitEnquiry } from '../services/enquiryService';
import { WhatsAppIcon } from '../components/WhatsAppFloat';

const Contact = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone) {
      setError('Please fill in your name and phone number');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      await submitEnquiry({
        ...formData,
        source: 'contact_page',
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12 border-b border-[#E8DEC4] pb-8 text-center md:text-left">
        <span className="text-[10px] uppercase tracking-mega text-sand-600 font-bold block mb-1">
          Get In Touch
        </span>
        <h1 className="font-editorial text-4xl md:text-6xl font-light text-charcoal">
          Contact & Wholesale Enquiry
        </h1>
        <p className="text-xs text-[#76726E] mt-2 max-w-xl">
          Connect with our corporate sales division, showroom team, or request a wholesale catalogue.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Info (5 Columns) */}
        <div className="lg:col-span-5 space-y-8 bg-charcoal text-white p-8 rounded-xl shadow-xl">
          <div>
            <span className="text-[10px] uppercase tracking-mega text-sand-400 font-semibold block mb-2">
              Corporate Headquarters
            </span>
            <h3 className="font-editorial text-3xl font-light text-white mb-6">
              ZELORA Manufacturing Facility
            </h3>
          </div>

          <div className="space-y-6 text-xs text-[#CCCCCC]">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-sand-400 flex-shrink-0 mt-1" />
              <div>
                <strong className="text-white block font-medium mb-1">Main Office & Gallery</strong>
                <span>Calicut, Kerala, India</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-sand-400 flex-shrink-0 mt-1" />
              <div>
                <strong className="text-white block font-medium mb-1">Direct Consultation Hotline</strong>
                <span>+91 9744080502 / +91 8086018820</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-sand-400 flex-shrink-0 mt-1" />
              <div>
                <strong className="text-white block font-medium mb-1">Showroom Hours</strong>
                <span>Monday – Saturday: 9:00 AM – 7:30 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 Columns) */}
        <div className="lg:col-span-7 bg-white p-8 rounded-xl border border-[#F2ECE4] shadow-sm">
          {submitted ? (
            <div className="py-16 text-center">
              <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
              <h3 className="font-editorial text-3xl text-charcoal mb-2">Message Received</h3>
              <p className="text-xs text-[#76726E] max-w-sm mx-auto mb-6">
                Our customer relationship team will reach out to you within 2 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="font-editorial text-3xl font-light text-charcoal border-b border-[#F2ECE4] pb-4">
                Send Us a Message
              </h3>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Kumar"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DEC4] text-xs px-4 py-3 rounded focus:outline-none focus:border-sand-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 97785 41486"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E8DEC4] text-xs px-4 py-3 rounded focus:outline-none focus:border-sand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E8DEC4] text-xs px-4 py-3 rounded focus:outline-none focus:border-sand-500"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal mb-1">
                  Message or Wholesale Query
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your home floor plan, hotel project, or wholesale dealership requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#E8DEC4] text-xs px-4 py-3 rounded focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-editorial bg-[#1A1A1A] text-white hover:bg-sand-600 rounded flex items-center justify-center gap-2 py-4 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting...' : 'Submit Message'}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Contact;
