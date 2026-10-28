import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, RefreshCw, Mail, Check, ArrowRight } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3500);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-16 text-gray-700">
      {/* Newsletter & Guarantee Banner */}
      <div className="bg-pink-50/60 border-b border-pink-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-black text-gray-900">
              JOIN THE SHOPSPHERE INSIDER CLUB
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Get secret coupon drops, weekly fashion edits, and early access to sales.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-2">
            <div className="relative flex-1">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-pink-500 shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm shrink-0 flex items-center gap-1.5 transition"
            >
              {subscribed ? (
                <>
                  <Check size={16} />
                  <span>Subscribed!</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Col 1: Online Shopping */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-4">
              Online Shopping
            </h4>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              <li><Link to="/men" className="hover:text-pink-600 transition">Men's Fashion</Link></li>
              <li><Link to="/women" className="hover:text-pink-600 transition">Women's Fashion</Link></li>
              <li><Link to="/kids" className="hover:text-pink-600 transition">Kids Wear</Link></li>
              <li><Link to="/home-living" className="hover:text-pink-600 transition">Home & Living</Link></li>
              <li><Link to="/beauty" className="hover:text-pink-600 transition">Beauty & Cosmetics</Link></li>
              <li><Link to="/products?category=gen-z" className="hover:text-pink-600 transition">Gen Z Trends</Link></li>
              <li><Link to="/wishlist" className="hover:text-pink-600 transition">My Wishlist</Link></li>
            </ul>
          </div>

          {/* Col 2: Customer Policies */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-4">
              Customer Policies
            </h4>
            <ul className="space-y-2 text-xs font-medium text-gray-600">
              <li><Link to="/profile" className="hover:text-pink-600 transition">Track Orders</Link></li>
              <li><Link to="/profile" className="hover:text-pink-600 transition">Returns & Exchanges</Link></li>
              <li><Link to="/profile" className="hover:text-pink-600 transition">Shipping Policy</Link></li>
              <li><Link to="/profile" className="hover:text-pink-600 transition">Terms of Use</Link></li>
              <li><Link to="/profile" className="hover:text-pink-600 transition">Privacy Policy</Link></li>
              <li><Link to="/profile" className="hover:text-pink-600 transition">Help & FAQs</Link></li>
            </ul>
          </div>

          {/* Col 3: Experience App */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-4">
              Experience App
            </h4>
            <p className="text-xs text-gray-500 mb-3">
              Shop faster with the mobile app for iOS and Android.
            </p>
            <div className="space-y-2">
              <div className="px-3 py-2 bg-gray-900 text-white rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition">
                <span className="text-base font-bold">▶</span>
                <div>
                  <div className="text-[9px] text-gray-400 uppercase leading-none">GET IT ON</div>
                  <div className="text-xs font-bold leading-none mt-0.5">Google Play</div>
                </div>
              </div>
              <div className="px-3 py-2 bg-gray-900 text-white rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition">
                <span className="text-base font-bold"></span>
                <div>
                  <div className="text-[9px] text-gray-400 uppercase leading-none">Download on the</div>
                  <div className="text-xs font-bold leading-none mt-0.5">App Store</div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4 & 5: Guarantees */}
          <div className="col-span-2 space-y-4 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={22} />
              </div>
              <div>
                <strong className="text-xs font-black text-gray-900 block">100% ORIGINAL guarantee</strong>
                <p className="text-xs text-gray-500 mt-0.5">
                  for all products at ShopSphere. Authentic brands direct from brand partners.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                <RefreshCw size={22} />
              </div>
              <div>
                <strong className="text-xs font-black text-gray-900 block">Return within 14 days</strong>
                <p className="text-xs text-gray-500 mt-0.5">
                  of receiving your order with free pickup right from your doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Searches Tags */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h5 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
            Popular Fashion Searches
          </h5>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Men's T-Shirts | Casual Shirts | Kurta Pajama | Sneakers | Sports Shoes | Watches | Smart Watches | Women Ethnic Wear | Kurtis | Sarees | Lehengas | Western Dresses | Tops & Tees | Handbags | Heels | Makeup Kits | Lipsticks | Sunscreens | Perfumes | Bedsheets | Cushions | Home Decor | Streetwear | Oversized Hoodies
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div>
            © {new Date().getFullYear()} ShopSphere. All rights reserved. Inspired by India's biggest fashion trends.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-pink-600 cursor-pointer">Privacy</span>
            <span>•</span>
            <span className="hover:text-pink-600 cursor-pointer">Terms</span>
            <span>•</span>
            <span className="hover:text-pink-600 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
