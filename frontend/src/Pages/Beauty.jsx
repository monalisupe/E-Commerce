import React from 'react';
import { Link } from 'react-router-dom';
import ProductListing from './ProductListing';

const BEAUTY_QUICK_LINKS = [
  { label: 'Matte Lipsticks', query: 'Lipstick' },
  { label: 'K-Beauty & Skincare', query: 'Skincare' },
  { label: 'Luxury Fragrances', query: 'Fragrances' },
  { label: 'Makeup Kits', query: 'Makeup' }
];

const Beauty = () => {
  return (
    <div>
      {/* Category Hero Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-emerald-950 to-teal-950 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-teal-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[11px] font-black uppercase tracking-widest text-teal-300 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-700">
              Beauty, Skincare & Scents
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-2.5">
              PURE GLOW & INDULGENCE
            </h1>
            <p className="text-xs sm:text-sm text-teal-200 mt-2">
              Drench your skin in hydration with cult K-beauty serums, discover high-impact lipsticks, and find your signature scent.
            </p>
            {/* Quick Pills */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              {BEAUTY_QUICK_LINKS.map((pill) => (
                <Link
                  key={pill.label}
                  to={`/beauty?sub=${encodeURIComponent(pill.query)}`}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition backdrop-blur-xs"
                >
                  {pill.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center md:text-right bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-xs font-bold text-teal-300 uppercase tracking-wider">Beauty Drop</div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1">MIN 35% OFF</div>
            <div className="text-[11px] text-gray-300 mt-1">M.A.C, COSRX, Versace & Clinique</div>
          </div>
        </div>
      </div>

      {/* Embedded Product Listing */}
      <ProductListing initialCategory="beauty" pageTitle="Beauty, Cosmetics & Fragrances" />
    </div>
  );
};

export default Beauty;
