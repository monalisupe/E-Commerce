import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SHOP_BY_CATEGORIES } from '../data/categories';

const CategorySection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="shop-by-category-section">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-pink-600 text-xs font-black tracking-widest uppercase mb-1">
            <Sparkles size={14} />
            <span>Curated Collections</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            SHOP BY CATEGORY
          </h2>
        </div>
        <Link
          to="/products"
          className="text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1 group"
        >
          <span>Explore All</span>
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {SHOP_BY_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={cat.link}
            className="group relative rounded-2xl overflow-hidden bg-white shadow-xs hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
          >
            {/* Image Container with 4:5 aspect ratio */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Tag Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-white/90 text-gray-900 backdrop-blur-xs shadow-xs">
                  {cat.tag}
                </span>
              </div>

              {/* Bottom Overlay Text */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h4 className="text-sm sm:text-base font-extrabold leading-tight drop-shadow-sm group-hover:text-pink-300 transition-colors">
                  {cat.title}
                </h4>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs font-black text-amber-300 tracking-wide">
                    {cat.discount}
                  </span>
                  <span className="text-[11px] font-bold text-white/80 group-hover:text-white flex items-center gap-0.5">
                    Shop <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
