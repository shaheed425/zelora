import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'The Art of Kiln-Dried Teak: Why Seasoned Timber Matters for Kerala Homes',
    date: 'September 14, 2026',
    author: 'Chief Wood Technologist',
    category: 'Craftsmanship',
    image: 'https://mediumturquoise-hedgehog-393181.hostingersite.com/public/images/product/2025-06-10-1749562225-AFRA.jpg',
    excerpt: 'High humidity in coastal climates causes substandard particle boards to warp. Discover how 7-stage kiln drying ensures structural longevity for generations.',
  },
  {
    id: 2,
    title: 'Designing Living Spaces with Minimalist Scandinavian Upholstery',
    date: 'August 28, 2026',
    author: 'ZELORA Design Studio',
    category: 'Interior Trends',
    image: 'https://mediumturquoise-hedgehog-393181.hostingersite.com/public/images/product/2025-06-10-1749562778-CLARO.jpg',
    excerpt: 'How neutral ivory palettes, tactile bouclé, and low-slung sofa silhouettes create open architectural breathing room in modern apartments.',
  },
  {
    id: 3,
    title: 'Bespoke Bedroom Architecture: Integrating Storage Without Sacrificing Elegance',
    date: 'August 10, 2026',
    author: 'Interior Journal',
    category: 'Bedroom Suite',
    image: 'https://mediumturquoise-hedgehog-393181.hostingersite.com/public/images/product/2025-06-11-1749616838-ALEXA.jpg',
    excerpt: 'Smart hydraulic lift mechanisms and soft-close drawers combined with hand-stitched velvet headboards.',
  },
];

const Blog = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12 border-b border-[#E8DEC4] pb-8 text-center md:text-left">
        <span className="text-[10px] uppercase tracking-mega text-sand-600 font-bold block mb-1">
          Editorial Journal
        </span>
        <h1 className="font-editorial text-4xl md:text-6xl font-light text-charcoal">
          From Our Design Desk
        </h1>
        <p className="text-xs text-[#76726E] mt-2 max-w-xl">
          Essays on timber craft, interior architecture, living room layouts, and sustainable luxury furniture design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((art) => (
          <article
            key={art.id}
            className="bg-white rounded-xl overflow-hidden border border-[#F2ECE4] shadow-sm group hover:border-sand-400 transition-all flex flex-col"
          >
            <div className="aspect-[16/10] overflow-hidden bg-sand-100 relative">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-3 left-3 bg-[#1A1A1A] text-white text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded">
                {art.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-[10px] text-[#888888] mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {art.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> {art.author}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl font-light text-charcoal group-hover:text-sand-600 transition-colors leading-snug mb-3">
                  {art.title}
                </h3>

                <p className="text-xs text-[#666666] leading-relaxed font-light mb-6">
                  {art.excerpt}
                </p>
              </div>

              <button className="text-xs font-semibold uppercase tracking-widest text-sand-700 hover:text-charcoal transition-colors flex items-center gap-2">
                <span>Read Full Essay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
