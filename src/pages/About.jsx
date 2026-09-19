import React from 'react';
import { Award, ShieldCheck, Factory, Users, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section className="relative py-24 bg-charcoal text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
          <span className="text-[10px] uppercase tracking-mega text-sand-400 font-semibold block mb-3">
            Legacy Since 1995
          </span>
          <h1 className="font-editorial text-5xl md:text-7xl font-light text-white mb-6">
            Craftsmanship That Belongs
          </h1>
          <p className="text-xs md:text-sm text-[#CCCCCC] max-w-2xl mx-auto leading-relaxed font-light">
            ZELORA is South India’s premier furniture manufacturer, combining 2 lakh sqft of modern production capacity in Payyanur, Kannur with generational woodcraft artisans.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[10px] uppercase tracking-mega text-sand-600 font-bold block mb-2">
              Our Origin
            </span>
            <h2 className="font-editorial text-4xl md:text-5xl font-light text-charcoal mb-6">
              2 Lakh Sqft Production Excellence in Kannur
            </h2>
            <p className="text-xs text-[#555555] leading-relaxed mb-4 font-light">
              Founded in 1995, ZELORA began with a singular mission: to eliminate cheap veneer particle boards and elevate Indian living spaces through seasoned solid wood and architectural design.
            </p>
            <p className="text-xs text-[#555555] leading-relaxed font-light mb-8">
              Today, our state-of-the-art 2 lakh square feet manufacturing plant in Payyanur supplies over 300+ leading furniture galleries across Kerala, Karnataka, and Tamil Nadu. Every piece undergoes 7-stage kiln drying, anti-pest treatment, and precision hand-finishing.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#E8DEC4]">
              <div>
                <span className="font-editorial text-4xl font-bold text-sand-700 block">300+</span>
                <span className="text-[11px] uppercase tracking-wider text-[#76726E] font-medium">Showroom Partners</span>
              </div>
              <div>
                <span className="font-editorial text-4xl font-bold text-sand-700 block">30+ Years</span>
                <span className="text-[11px] uppercase tracking-wider text-[#76726E] font-medium">Woodcraft Heritage</span>
              </div>
            </div>
          </div>

          <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border border-[#F2ECE4]">
            <img
              src="https://mediumturquoise-hedgehog-393181.hostingersite.com/public/images/product/2025-06-10-1749562778-CLARO.jpg"
              alt="ZELORA Workshop Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Factory Pillars */}
      <section className="py-20 bg-[#F2ECE4]/50 border-y border-[#E8DEC4]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-lg border border-[#F2ECE4] text-center">
            <Factory className="w-10 h-10 text-sand-600 mx-auto mb-4 stroke-1.5" />
            <h3 className="font-editorial text-2xl font-medium text-charcoal mb-2">Sustainable Teak Timber</h3>
            <p className="text-xs text-[#76726E] leading-relaxed">
              100% legally sourced teak and hardwood timber subjected to precision kiln seasoning for climate durability.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#F2ECE4] text-center">
            <Users className="w-10 h-10 text-sand-600 mx-auto mb-4 stroke-1.5" />
            <h3 className="font-editorial text-2xl font-medium text-charcoal mb-2">Artisan Guild</h3>
            <p className="text-xs text-[#76726E] leading-relaxed">
              Over 200 master carpenters, upholsterers, and joinery specialists working in unison.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-[#F2ECE4] text-center">
            <Sparkles className="w-10 h-10 text-sand-600 mx-auto mb-4 stroke-1.5" />
            <h3 className="font-editorial text-2xl font-medium text-charcoal mb-2">Bespoke Customization</h3>
            <p className="text-xs text-[#76726E] leading-relaxed">
              Tailored dimensions, fabric choices, and custom wood stains to match architectural floor plans.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default About;
