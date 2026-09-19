import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Does ZELORA provide free delivery and assembly in Kerala & Karnataka?',
    a: 'Yes. All orders are transported directly via insured ground freight and assembled on-site by our expert team of carpenters at zero additional cost.',
  },
  {
    q: 'What warranty is included with ZELORA furniture?',
    a: 'Every piece comes with a standard 5-Year Structural Warranty covering timber seasoning, frame integrity, and joinery against warping or manufacturing defects.',
  },
  {
    q: 'Can I customize dimensions, fabric colors, or wood stains?',
    a: 'Absolutely. We offer full bespoke customization for living room sofas, dining tables, beds, and wardrobes. Click "Enquire / Custom" on any product page or visit our Payyanur factory showroom.',
  },
  {
    q: 'What is the delivery timeline for custom furniture?',
    a: 'In-stock items are dispatched within 24-48 hours. Custom upholstered or tailored wood pieces take between 7 to 12 business days.',
  },
  {
    q: 'How do I care for solid teak wood furniture?',
    a: 'Clean regularly with a soft dry microfiber cloth. Avoid placing hot items directly on polished surfaces without coasters. Apply natural beeswax once every 12 months to maintain deep wood luster.',
  },
];

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12 text-center border-b border-[#E8DEC4] pb-8">
        <span className="text-[10px] uppercase tracking-mega text-sand-600 font-bold block mb-1">
          Client Care
        </span>
        <h1 className="font-editorial text-4xl md:text-6xl font-light text-charcoal">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-[#76726E] mt-2">
          Everything you need to know about ordering, warranties, delivery, and timber care.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg border border-[#F2ECE4] overflow-hidden shadow-sm"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
              className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
            >
              <h3 className="font-editorial text-2xl font-medium text-charcoal">
                {faq.q}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-sand-600 transition-transform duration-300 ${
                  openIdx === idx ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openIdx === idx && (
              <div className="px-6 pb-6 text-xs text-[#555555] leading-relaxed font-light border-t border-[#FAF8F5] pt-4">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
