import React from 'react';
import { Link } from 'react-router-dom';
import ProductListing from './ProductListing';

const KIDS_QUICK_LINKS = [
  { label: 'Boys Sets', query: 'Clothing' },
  { label: 'Party Frocks', query: 'Dresses' },
  { label: 'Kids Footwear', query: 'Footwear' },
  { label: 'Casual T-Shirts', query: 'T-Shirts' }
];

const Kids = () => {
  return (
    <div>
      {/* Category Hero Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-orange-700/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-200 bg-amber-900/70 px-3 py-1 rounded-full border border-amber-400/40">
              Kids Carnival
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-2.5">
              ADORABLE, PLAYFUL & COMFY
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 mt-2">
              Super-soft fabrics, colorful party sets, and durable footwear made for non-stop adventures.
            </p>
            {/* Quick Pills */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              {KIDS_QUICK_LINKS.map((pill) => (
                <Link
                  key={pill.label}
                  to={`/kids?sub=${encodeURIComponent(pill.query)}`}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 hover:bg-white/30 border border-white/30 text-white transition backdrop-blur-xs"
                >
                  {pill.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center md:text-right bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-xs font-bold text-yellow-200 uppercase tracking-wider">Starting Price</div>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">₹399 ONWARDS</div>
            <div className="text-[11px] text-amber-100 mt-1">100% Skin-Friendly Combed Cotton</div>
          </div>
        </div>
      </div>

      {/* Embedded Product Listing */}
      <ProductListing initialCategory="kids" pageTitle="Kids' Clothing & Footwear" />
    </div>
  );
};

export default Kids;
