import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { User, Heart, ShoppingBag, Menu, X, ChevronRight, Sparkles, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { NAV_CATEGORIES } from '../data/categories';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <>
      {/* Top Promotional Bar */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white text-xs py-1.5 px-4 font-semibold text-center tracking-wide flex items-center justify-center gap-2">
        <Sparkles size={14} className="animate-spin text-yellow-200" />
        <span>GRAND FASHION FESTIVAL: FLAT ₹500 OFF + FREE SHIPPING ON FIRST ORDER | CODE: <strong>WELCOME500</strong></span>
        <Tag size={13} className="hidden sm:inline" />
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-4">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-pink-600 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Brand Logo (Myntra vibe) */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-400 flex items-center justify-center shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19L4 5L10 14L12 9L14 14L20 5L20 19" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tighter text-gray-900 group-hover:text-pink-600 transition-colors">
                  Shop<span className="text-pink-600">Sphere</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold -mt-1 hidden sm:block">
                  Fashion & Trends
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Categories */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-4 h-full">
              {NAV_CATEGORIES.map((cat) => (
                <NavLink
                  key={cat.id}
                  to={cat.path}
                  className={({ isActive }) =>
                    `relative px-3.5 h-18 flex items-center text-[13px] font-bold tracking-wider transition-colors duration-150 border-b-4 ${
                      isActive
                        ? 'text-pink-600 border-pink-600'
                        : 'text-gray-700 border-transparent hover:text-pink-600 hover:border-pink-600'
                    }`
                  }
                >
                  <span>{cat.name}</span>
                  {cat.badge && (
                    <span className="absolute top-3.5 right-0.5 bg-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-xs">
                      {cat.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg mx-2">
              <SearchBar />
            </div>

            {/* Action Items: Profile, Wishlist, Bag */}
            <div className="flex items-center space-x-1 sm:space-x-4 shrink-0">
              {/* Mobile Search Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="p-2 text-gray-700 hover:text-pink-600 md:hidden"
                aria-label="Open search bar"
              >
                <SearchBar className="sr-only" />
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Profile Link */}
              <Link
                to="/profile"
                className="flex flex-col items-center justify-center p-2 text-gray-700 hover:text-pink-600 transition group"
                id="navbar-profile-btn"
              >
                <User size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold tracking-tight mt-0.5 hidden sm:block">Profile</span>
              </Link>

              {/* Wishlist Link with Badge */}
              <Link
                to="/wishlist"
                className="relative flex flex-col items-center justify-center p-2 text-gray-700 hover:text-pink-600 transition group"
                id="navbar-wishlist-btn"
              >
                <Heart size={20} className="group-hover:scale-110 transition-transform" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 sm:right-2 bg-pink-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
                <span className="text-[11px] font-bold tracking-tight mt-0.5 hidden sm:block">Wishlist</span>
              </Link>

              {/* Bag / Cart Link with Badge */}
              <Link
                to="/cart"
                className="relative flex flex-col items-center justify-center p-2 text-gray-700 hover:text-pink-600 transition group"
                id="navbar-bag-btn"
              >
                <ShoppingBag size={20} className="group-hover:scale-110 transition-transform text-gray-800 group-hover:text-pink-600" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 sm:right-2 bg-pink-600 text-white text-[10px] font-extrabold rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
                <span className="text-[11px] font-bold tracking-tight mt-0.5 hidden sm:block">Bag</span>
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar Expansion */}
          {mobileSearchOpen && (
            <div className="py-3 px-1 border-t border-gray-100 md:hidden animate-fade-in">
              <SearchBar onSearchComplete={() => setMobileSearchOpen(false)} />
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-fade-in">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center text-white font-black text-sm">
                    S
                  </div>
                  <span className="font-bold text-gray-900 text-lg">Menu</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-gray-800"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="overflow-y-auto py-2 flex-1">
                <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Categories
                </div>
                {NAV_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={cat.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-pink-50 hover:text-pink-600 border-b border-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span>{cat.name}</span>
                      {cat.badge && (
                        <span className="bg-pink-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                          {cat.badge}
                        </span>
                      )}
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                ))}

                <div className="px-4 pt-6 pb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Quick Actions
                </div>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  <User size={18} className="text-gray-500" />
                  <span>My Profile & Orders</span>
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <Heart size={18} className="text-gray-500" />
                    <span>My Wishlist</span>
                  </div>
                  {wishlistCount > 0 && (
                    <span className="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-0.5 rounded-full">
                      {wishlistCount} items
                    </span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={18} className="text-gray-500" />
                    <span>Shopping Bag</span>
                  </div>
                  {cartCount > 0 && (
                    <span className="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-0.5 rounded-full">
                      {cartCount} items
                    </span>
                  )}
                </Link>
              </div>

              {/* Drawer Footer Banner */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="text-xs text-gray-500">100% Original Products | Free Delivery</div>
                <div className="text-[11px] text-gray-400 mt-1">ShopSphere Online Shopping</div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
