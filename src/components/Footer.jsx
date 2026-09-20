import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, Instagram, Facebook, ShieldCheck, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppFloat';

const Footer = () => {
  return (
    <footer className="bg-[#0D0D0D] text-[#FAF8F5] pt-10 pb-8 border-t border-[#262626] mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Section: Brand & Description & Socials */}
        <div className="mb-8 border-b border-[#262626] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <Link to="/" className="inline-block mb-2">
              <span className="font-editorial text-2xl sm:text-3xl tracking-tight font-bold text-white">
                ZELORA
              </span>
              <span className="block text-[8px] font-sans tracking-mega uppercase text-sand-500 font-semibold mt-0.5">
                Luxury Furniture Showroom
              </span>
            </Link>
            <p className="text-xs text-[#B0B0B0] leading-relaxed max-w-lg font-light">
              Crafting timeless luxury furniture with solid teak wood & modern Scandinavian aesthetics.
            </p>
          </div>

          {/* Social Icon Boxes */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-white/20 bg-[#161616] text-white/80 hover:text-white hover:border-sand-400 hover:bg-[#222] transition-all flex items-center justify-center shadow-sm"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-white/20 bg-[#161616] text-white/80 hover:text-white hover:border-sand-400 hover:bg-[#222] transition-all flex items-center justify-center shadow-sm"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/918137055827"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-[#25D366]/40 bg-[#161616] text-[#25D366] hover:bg-[#25D366] hover:text-black transition-all flex items-center justify-center shadow-sm"
              title="WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links Grid Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          
          {/* Column 1: QUICK LINKS */}
          <div>
            <h4 className="text-[11px] uppercase tracking-widest font-bold text-white mb-3 pb-1 border-b border-[#333] inline-block">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-xs text-[#B0B0B0]">
              <li>
                <Link to="/" className="flex items-center justify-between hover:text-sand-300 transition-colors group pr-2">
                  <span>Home</span>
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-sand-300 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/shop" className="flex items-center justify-between hover:text-sand-300 transition-colors group pr-2">
                  <span>Shop Catalog</span>
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-sand-300 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center justify-between hover:text-sand-300 transition-colors group pr-2">
                  <span>About Us</span>
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-sand-300 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/categories" className="flex items-center justify-between hover:text-sand-300 transition-colors group pr-2">
                  <span>Categories</span>
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-sand-300 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center justify-between hover:text-sand-300 transition-colors group pr-2">
                  <span>Contact Us</span>
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-sand-300 transition-colors" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: COLLECTIONS */}
          <div>
            <h4 className="text-[11px] uppercase tracking-widest font-bold text-white mb-3 pb-1 border-b border-[#333] inline-block">
              COLLECTIONS
            </h4>
            <ul className="space-y-2 text-xs text-[#B0B0B0]">
              <li>
                <Link to="/category/sofas" className="flex items-center justify-between hover:text-sand-300 transition-colors group pr-2">
                  <span>Living & Sofas</span>
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-sand-300 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/category/bedroom-sets" className="flex items-center justify-between hover:text-sand-300 transition-colors group pr-2">
                  <span>Bedroom Suite</span>
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-sand-300 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/category/dining-sets" className="flex items-center justify-between hover:text-sand-300 transition-colors group pr-2">
                  <span>Dining Sets</span>
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-sand-300 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/category/wardrobes" className="flex items-center justify-between hover:text-sand-300 transition-colors group pr-2">
                  <span>Wardrobes & Storage</span>
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-sand-300 transition-colors" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: CUSTOMER SUPPORT */}
          <div>
            <h4 className="text-[11px] uppercase tracking-widest font-bold text-white mb-3 pb-1 border-b border-[#333] inline-block">
              CUSTOMER SUPPORT
            </h4>
            <ul className="space-y-2 text-xs text-[#B0B0B0]">
              <li>
                <Link to="/store-locations" className="flex items-center justify-between hover:text-sand-300 transition-colors group pr-2">
                  <span>Store Locations</span>
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-sand-300 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="flex items-center justify-between hover:text-sand-300 transition-colors group pr-2">
                  <span>FAQs & Care</span>
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-sand-300 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/blog" className="flex items-center justify-between hover:text-sand-300 transition-colors group pr-2">
                  <span>Editorial Journal</span>
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-sand-300 transition-colors" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: GUARANTEE */}
          <div>
            <h4 className="text-[11px] uppercase tracking-widest font-bold text-white mb-3 pb-1 border-b border-[#333] inline-block">
              EXCELLENCE
            </h4>
            <p className="text-xs text-[#B0B0B0] leading-relaxed mb-3 font-light">
              5-Year Warranty on teak wood frames & upholstery.
            </p>
            <div className="flex items-center gap-2 text-xs text-sand-400 font-semibold bg-[#161616] p-2.5 rounded-lg border border-white/10">
              <ShieldCheck className="w-4 h-4 text-sand-300 flex-shrink-0" />
              <span>Certified Warranty</span>
            </div>
          </div>

        </div>

        {/* Featured Showroom Location Card Box */}
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-4 sm:p-5 mb-8 shadow-md">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-sand-300 flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest font-bold text-white/60 block">
                  SHOWROOM LOCATION
                </span>
                <h3 className="font-editorial text-lg sm:text-xl font-light text-white leading-tight">
                  ZELORA Furniture Showroom, Kannur & Calicut
                </h3>
              </div>
            </div>

            <a
              href="https://wa.me/918137055827?text=Hi%20ZELORA,%20I%20would%20like%20to%20visit%20the%20showroom."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all shadow-md whitespace-nowrap"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-black" />
              <span>Book Visit</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-[#262626] flex flex-col md:flex-row items-center justify-between text-[11px] text-[#777777]">
          <p className="text-center md:text-left">© 2026 ZELORA Studio. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 mt-2 md:mt-0">
            <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Warranty Statement</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
