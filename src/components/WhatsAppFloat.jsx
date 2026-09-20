import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Sparkles } from 'lucide-react';

export const WhatsAppIcon = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.118.552 4.107 1.517 5.834L0 24l6.345-1.492A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.848 0-3.579-.49-5.075-1.344l-.364-.208-3.768.886.898-3.668-.231-.375A9.945 9.945 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
  </svg>
);

const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phone = '918137055827';
  const displayPhone = '+91 81370 55827';
  const defaultMessage = encodeURIComponent(
    'Hi ZELORA Luxury Furniture! I would like to inquire about your handcrafted collections and custom interior design consultation.'
  );

  const whatsappUrl = `https://wa.me/${phone}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto flex flex-col items-end gap-3 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            className="w-80 bg-[#1A1A1A] text-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(37,211,102,0.2)] border border-white/15 overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] p-4 text-white relative">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/10 p-0.5 border border-white/40 flex items-center justify-center overflow-hidden">
                    <img src="/favicon.svg" alt="ZELORA Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full"></span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wide flex items-center gap-1.5">
                    ZELORA Assistant
                    <Sparkles className="w-3.5 h-3.5 text-sand-300" />
                  </h4>
                  <p className="text-[10px] text-white/80 font-mono">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3.5 right-3.5 text-white/70 hover:text-white p-1 rounded-full hover:bg-black/20 transition-colors"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3 bg-[#111111]/95">
              <div className="bg-[#1C2522] border border-[#25D366]/30 p-3 rounded-xl text-xs leading-relaxed text-[#E0E0E0] relative">
                <div className="font-semibold text-[#25D366] mb-1 flex items-center justify-between text-[11px] uppercase tracking-wider">
                  <span>Welcome to ZELORA</span>
                  <span className="text-[9px] font-mono text-white/40">{displayPhone}</span>
                </div>
                Hello! Looking for teak furniture designs, custom dimensions, or order assistance? Chat directly with our Kerala design studio team on WhatsApp.
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 shadow-lg transition-all duration-300 transform hover:scale-[1.02] text-xs uppercase tracking-wider"
              >
                <WhatsAppIcon className="w-5 h-5 text-black" />
                <span>Start WhatsApp Chat</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Circular Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative group bg-[#25D366] hover:bg-[#20ba5a] text-white p-2.5 rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.35)] transition-all duration-300 flex items-center justify-center border-2 border-white/20"
        title="Chat with ZELORA on WhatsApp (+91 81370 55827)"
      >
        {/* Pulsing Ripple effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none"></span>

        {isOpen ? (
          <X className="w-5 h-5 text-black stroke-[2.5]" />
        ) : (
          <WhatsAppIcon className="w-5 h-5 text-black" />
        )}

        {/* Hover Tooltip when collapsed */}
        {!isOpen && (
          <span className="absolute right-12 bg-charcoal text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10">
            WhatsApp Direct Chat (+91 81370 55827)
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default WhatsAppFloat;
