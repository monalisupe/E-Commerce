import React from 'react';
import { Link } from 'react-router-dom';
import ProductListing from './ProductListing';

const MEN_QUICK_LINKS = [
  { label: 'Casual Shirts', query: 'Shirts' },
  { label: 'T-Shirts', query: 'T-Shirts' },
  { label: 'Sneakers & Shoes', query: 'Shoes' },
  { label: 'Watches', query: 'Watches' },
  { label: 'Jeans & Denims', query: 'Jeans' },
];

const Men = () => {
  return (
    <div>
      {/* Category Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-indigo-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[11px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800">
              Men's Fashion Studio
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-2.5">
              THE MODERN GENTLEMAN EDIT
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 mt-2">
              Elevate your wardrobe with premium shirts, rugged denims, classic chronographs, and court-ready sneakers.
            </p>
            {/* Quick Pills */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              {MEN_QUICK_LINKS.map((pill) => (
                <Link
                  key={pill.label}
                  to={`/men?sub=${encodeURIComponent(pill.query)}`}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition backdrop-blur-xs"
                >
                  {pill.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center md:text-right bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
            <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Special Discount</div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-1">40% - 70% OFF</div>
            <div className="text-[11px] text-gray-300 mt-1">On Top Brands: Nike, Levi's, Fossil & Roadster</div>
          </div>
        </div>
      </div>

      {/* Embedded Product Listing */}
      <ProductListing initialCategory="men" pageTitle="Men's Clothing & Accessories" />
    </div>
  );
};

export default Men;
