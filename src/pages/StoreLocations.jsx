import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

const stores = [
  {
    city: 'Calicut Flagship Studio',
    address: 'Calicut, Kerala, India',
    phone: '+91 9744080502 / +91 8086018820',
    hours: 'Mon - Sat: 9:00 AM - 8:00 PM',
    type: 'Luxury Furniture Flagship Gallery',
  },
];

const StoreLocations = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12 border-b border-[#E8DEC4] pb-8 text-center md:text-left">
        <span className="text-[10px] uppercase tracking-mega text-sand-600 font-bold block mb-1">
          Showroom Network
        </span>
        <h1 className="font-editorial text-4xl md:text-6xl font-light text-charcoal">
          Store Locations
        </h1>
        <p className="text-xs text-[#76726E] mt-2 max-w-xl">
          Visit our flagship factory showroom in Payyanur or experience ZELORA furniture collections at authorized galleries across Kerala & Karnataka.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stores.map((store, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-xl border border-[#F2ECE4] shadow-sm hover:border-sand-400 transition-all"
          >
            <span className="text-[10px] uppercase tracking-widest text-sand-600 font-bold bg-sand-50 px-2.5 py-1 rounded inline-block mb-3">
              {store.type}
            </span>
            <h3 className="font-editorial text-3xl font-medium text-charcoal mb-4">
              {store.city}
            </h3>

            <div className="space-y-3 text-xs text-[#555555] mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sand-600 flex-shrink-0 mt-0.5" />
                <span>{store.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sand-600 flex-shrink-0" />
                <span>{store.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-sand-600 flex-shrink-0" />
                <span>{store.hours}</span>
              </div>
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial bg-[#FAF8F5] border border-[#E8DEC4] text-charcoal hover:bg-sand-100 rounded w-full flex justify-center py-2.5"
            >
              <Navigation className="w-4 h-4 text-sand-600" />
              <span>Get Directions</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreLocations;
