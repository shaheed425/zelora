import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, Instagram, Facebook, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-[#FAF8F5] pt-20 pb-12 border-t border-[#2D2D2D] mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#2D2D2D]">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 pr-6">
          <Link to="/" className="inline-block mb-6">
            <span className="font-editorial text-4xl tracking-tight font-bold text-white">
              ZELORA
            </span>
            <span className="block text-[9px] font-sans tracking-mega uppercase text-sand-500 font-semibold mt-1">
              Luxury Furniture Showroom
            </span>
          </Link>
          <p className="text-sm text-[#A0A0A0] leading-relaxed max-w-sm mb-8 font-light">
            Architecturally conceived furniture crafted with durable teak, premium upholstery, and timeless Scandinavian-Indian aesthetics. Built to belong in your home.
          </p>

          <div className="space-y-3 text-xs text-[#CCCCCC]">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-sand-500 flex-shrink-0" />
              <span>Calicut, Kerala, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-sand-500 flex-shrink-0" />
              <span>+91 9744080502 / +91 8086018820</span>
            </div>
          </div>
        </div>

        {/* Quick Collections */}
        <div>
          <h4 className="font-editorial text-xl font-medium tracking-wide mb-6 text-white border-b border-sand-500/30 pb-2 inline-block">
            Collections
          </h4>
          <ul className="space-y-3 text-xs text-[#A0A0A0] uppercase tracking-wider font-medium">
            <li><Link to="/category/sofas" className="hover:text-sand-400 transition-colors">Living & Sofas</Link></li>
            <li><Link to="/category/bedroom-sets" className="hover:text-sand-400 transition-colors">Bedroom Suite</Link></li>
            <li><Link to="/category/dining-sets" className="hover:text-sand-400 transition-colors">Dining & Tables</Link></li>
            <li><Link to="/category/wardrobes" className="hover:text-sand-400 transition-colors">Wardrobes & Storage</Link></li>
            <li><Link to="/category/office-tables" className="hover:text-sand-400 transition-colors">Executive Workspace</Link></li>
            <li><Link to="/new-arrivals" className="hover:text-sand-400 transition-colors">New Season</Link></li>
          </ul>
        </div>

        {/* Company & Support */}
        <div>
          <h4 className="font-editorial text-xl font-medium tracking-wide mb-6 text-white border-b border-sand-500/30 pb-2 inline-block">
            Navigation
          </h4>
          <ul className="space-y-3 text-xs text-[#A0A0A0] uppercase tracking-wider font-medium">
            <li><Link to="/about" className="hover:text-sand-400 transition-colors">About ZELORA</Link></li>
            <li><Link to="/store-locations" className="hover:text-sand-400 transition-colors">Store Locations</Link></li>
            <li><Link to="/contact" className="hover:text-sand-400 transition-colors">Wholesale Enquiry</Link></li>
            <li><Link to="/blog" className="hover:text-sand-400 transition-colors">Editorial Journal</Link></li>
            <li><Link to="/faqs" className="hover:text-sand-400 transition-colors">FAQs & Care</Link></li>
            <li><Link to="/admin" className="hover:text-sand-400 transition-colors">Business Portal</Link></li>
          </ul>
        </div>

        {/* Newsletter & Guarantee */}
        <div>
          <h4 className="font-editorial text-xl font-medium tracking-wide mb-6 text-white border-b border-sand-500/30 pb-2 inline-block">
            Newsletter
          </h4>
          <p className="text-xs text-[#A0A0A0] leading-relaxed mb-4">
            Receive exclusive previews of seasonal luxury releases and interior design edits.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="relative mb-6">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-[#1A1A1A] border border-[#333] text-xs text-white px-4 py-3 pr-10 rounded focus:outline-none focus:border-sand-500 transition-colors placeholder-[#666]"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sand-500 hover:text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center gap-2 text-xs text-sand-400">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>5-Year Manufacturer Warranty Included</span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#666666]">
        <p>© 2026 ZELORA Studio. All rights reserved. Inspired by Kerala craftsmanship.</p>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Warranty Statement</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
