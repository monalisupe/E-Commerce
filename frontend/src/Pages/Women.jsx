import React from 'react';
import { Link } from 'react-router-dom';
import ProductListing from './ProductListing';

const WOMEN_QUICK_LINKS = [
  { label: 'Kurtas & Suits', query: 'Kurtas' },
  { label: 'Western Dresses', query: 'Dresses' },
  { label: 'Tops & Tees', query: 'Tops' },
  { label: 'Handbags', query: 'Handbags' },
  { label: 'Jewellery', query: 'Jewellery' },
];

const Women = () => {
  return (
    <div>
      {/* Category Hero Banner */}
      <div className="bg-gradient-to-r from-pink-900 via-rose-900 to-amber-950 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-rose-800/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[11px] font-black uppercase tracking-widest text-pink-300 bg-pink-950/80 px-3 py-1 rounded-full border border-pink-700">
              Women's Runway Collection
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-2.5">
              CHIC, ETHNIC & GLAMOUR
            </h1>
            <p className="text-xs sm:text-sm text-pink-100 mt-2">
              From majestic festive Anarkalis to effortlessly elegant cocktail dresses, explore styles curated to celebrate you.
            </p>
            {/* Quick Pills */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              {WOMEN_QUICK_LINKS.map((pill) => (
                <Link
                  key={pill.label}
                  to={`/women?sub=${encodeURIComponent(pill.query)}`}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition backdrop-blur-xs"
                >
                  {pill.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center md:text-right bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-xs font-bold text-pink-200 uppercase tracking-wider">Festival Special</div>
            <div className="text-3xl sm:text-4xl font-black text-amber-300 mt-1">UP TO 80% OFF</div>
            <div className="text-[11px] text-gray-200 mt-1">Featuring Biba, Zara, Mango & H&M</div>
          </div>
        </div>
      </div>

      {/* Embedded Product Listing */}
      <ProductListing initialCategory="women" pageTitle="Women's Ethnic & Western Wear" />
    </div>
  );
};

export default Women;
