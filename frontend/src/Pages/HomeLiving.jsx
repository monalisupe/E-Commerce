import React from 'react';
import { Link } from 'react-router-dom';
import ProductListing from './ProductListing';

const HOME_QUICK_LINKS = [
  { label: 'Bedsheet Sets', query: 'Bed' },
  { label: 'Velvet Cushions', query: 'Cushions' },
  { label: 'Ambient Lamps', query: 'Lamps' },
  { label: 'Decor Accents', query: 'Decor' }
];

const HomeLiving = () => {
  return (
    <div>
      {/* Category Hero Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-amber-900/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800">
              Living Spaces & Decor
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-2.5">
              THE COZY SANCTUARY
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-2">
              Transform your sanctuary with 300TC Egyptian cotton bedsheets, tactile velvet cushions, and calming warm light fixtures.
            </p>
            {/* Quick Pills */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              {HOME_QUICK_LINKS.map((pill) => (
                <Link
                  key={pill.label}
                  to={`/home-living?sub=${encodeURIComponent(pill.query)}`}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition backdrop-blur-xs"
                >
                  {pill.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center md:text-right bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Home Fest Sale</div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-1">UP TO 65% OFF</div>
            <div className="text-[11px] text-stone-300 mt-1">D'Decor, Nestasia & Urban Space</div>
          </div>
        </div>
      </div>

      {/* Embedded Product Listing */}
      <ProductListing initialCategory="home-living" pageTitle="Home Furnishings & Living Decor" />
    </div>
  );
};

export default HomeLiving;
