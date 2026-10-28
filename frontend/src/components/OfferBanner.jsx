import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, ShieldCheck, RefreshCw, Truck, Award, ArrowRight } from 'lucide-react';
import { PROMO_OFFERS, TRUST_FEATURES } from '../data/banners';
import { useCart } from '../context/CartContext';

const OfferBanner = () => {
  const { applyCoupon } = useCart();

  const handleApplyCoupon = (e, code) => {
    e.preventDefault();
    e.stopPropagation();
    applyCoupon(code);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Promotional Cards Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PROMO_OFFERS.map((promo) => (
          <Link
            key={promo.id}
            to="/products?sort=discount-high"
            className="group relative overflow-hidden rounded-xl p-5 border border-pink-100 bg-gradient-to-br from-white via-pink-50/30 to-amber-50/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block text-[10px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 mb-2">
                  {promo.badge}
                </span>
                <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-pink-600 transition-colors">
                  {promo.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">
                  {promo.subtitle}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-pink-100/80 text-pink-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Tag size={20} />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded border border-dashed border-pink-300 text-pink-600">
                {promo.code}
              </span>
              <button
                type="button"
                onClick={(e) => handleApplyCoupon(e, promo.code)}
                className="text-xs font-bold text-gray-700 hover:text-pink-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                <span>Apply</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Trust Guarantee Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-white rounded-xl border border-gray-200/80 shadow-xs">
        {TRUST_FEATURES.map((item, index) => {
          let IconComponent = ShieldCheck;
          if (item.icon === 'RefreshCw') IconComponent = RefreshCw;
          if (item.icon === 'Truck') IconComponent = Truck;
          if (item.icon === 'Award') IconComponent = Award;

          return (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                <IconComponent size={20} strokeWidth={2.2} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OfferBanner;
