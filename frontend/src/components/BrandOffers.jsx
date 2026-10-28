import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { TOP_BRANDS, BRAND_SPOTLIGHTS } from '../data/brands';

const BrandOffers = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="brand-offers-section">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-pink-600 text-xs font-black tracking-widest uppercase mb-1">
            <Sparkles size={14} />
            <span>Medal Worthy Brands</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            GRAND BRANDS IN FOCUS
          </h2>
        </div>
        <Link
          to="/products"
          className="text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1 group"
        >
          <span>View All Brands</span>
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 mb-8">
        {TOP_BRANDS.map((brand) => (
          <Link
            key={brand.id}
            to={brand.link}
            className="group relative bg-white border border-gray-200/80 rounded-xl overflow-hidden p-3 text-center shadow-xs hover:shadow-md hover:border-pink-300 transition-all duration-200 flex flex-col items-center justify-between"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-gray-50 border border-gray-100 p-1 mb-2.5 group-hover:scale-105 transition-transform">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
              />
            </div>
            <div className="w-full">
              <h4 className="text-xs font-black tracking-wider text-gray-900 truncate">
                {brand.name}
              </h4>
              <span className="block mt-1 text-[11px] font-extrabold text-pink-600 truncate">
                {brand.discount}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Brand Spotlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {BRAND_SPOTLIGHTS.map((spotlight) => (
          <Link
            key={spotlight.id}
            to={spotlight.link}
            className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <img
              src={spotlight.image}
              alt={spotlight.brand}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-900/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-black tracking-widest uppercase bg-pink-600 px-2 py-0.5 rounded text-white inline-block mb-1">
                {spotlight.offer}
              </span>
              <h4 className="text-lg font-black tracking-wide leading-tight">
                {spotlight.brand}
              </h4>
              <p className="text-xs text-gray-300 font-medium line-clamp-1 mt-0.5">
                {spotlight.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BrandOffers;
