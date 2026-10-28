import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, X, ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80';

const Wishlist = () => {
  const { wishlist, wishlistCount, removeFromWishlist, moveToBag } = useWishlist();
  const navigate = useNavigate();
  const [sizeModalItem, setSizeModalItem] = useState(null);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleMoveToBag = (product) => {
    if (product.sizes && product.sizes.length > 1) {
      setSizeModalItem(product);
    } else {
      moveToBag(product, product.sizes?.[0] || 'Standard');
    }
  };

  const handleConfirmSizeMove = (size) => {
    if (sizeModalItem) {
      moveToBag(sizeModalItem, size);
      setSizeModalItem(null);
    }
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-gray-50/50">
        <div className="text-center max-w-md bg-white p-8 sm:p-12 rounded-2xl shadow-xs border border-gray-200/80">
          <div className="w-20 h-20 mx-auto rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mb-5">
            <Heart size={36} strokeWidth={1.5} />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-2">
            YOUR WISHLIST IS EMPTY
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
            Explore our curated collections and save your favorite items here to purchase later.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md shadow-pink-600/30 transition duration-200"
          >
            <span>START SHOPPING</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            MY WISHLIST
          </h1>
          <p className="text-xs text-gray-500 font-semibold mt-1">
            {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Image */}
              <div
                onClick={() => handleCardClick(item.id)}
                className="relative aspect-[3/4] overflow-hidden bg-gray-50 cursor-pointer"
              >
                <img
                  src={item.image || DEFAULT_IMAGE}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Remove Cross Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(item.id);
                  }}
                  aria-label="Remove item"
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-rose-600 flex items-center justify-center shadow-sm transition"
                >
                  <X size={15} />
                </button>

                {/* Rating Badge */}
                {item.rating && (
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-gray-800 shadow-xs">
                    <span>{item.rating}</span>
                    <Star size={10} className="text-emerald-600 fill-emerald-600" />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3">
                <div onClick={() => handleCardClick(item.id)} className="cursor-pointer">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 truncate">
                    {item.brand}
                  </h4>
                  <p className="text-xs text-gray-500 truncate mt-0.5" title={item.title}>
                    {item.title}
                  </p>
                  <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-xs font-black text-gray-900">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-[10px] text-gray-400 line-through">
                        ₹{item.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    {item.discountPercentage > 0 && (
                      <span className="text-[10px] font-bold text-orange-600">
                        {item.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Move to Bag Button */}
                <div className="mt-3 pt-2.5 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => handleMoveToBag(item)}
                    className="w-full py-2 bg-pink-50 hover:bg-pink-600 text-pink-600 hover:text-white text-xs font-bold uppercase tracking-wider rounded-lg border border-pink-200 hover:border-pink-600 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag size={13} />
                    <span>MOVE TO BAG</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Size Selection Modal when moving to bag */}
        {sizeModalItem && (
          <div
            onClick={() => setSizeModalItem(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center"
            >
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 mb-1">
                Select Size to Move
              </h3>
              <p className="text-xs text-gray-500 mb-4 truncate">
                {sizeModalItem.title}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {(sizeModalItem.sizes || ['Standard']).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleConfirmSizeMove(size)}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-pink-600 hover:bg-pink-50 text-xs font-extrabold text-gray-800 transition"
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setSizeModalItem(null)}
                className="text-xs text-gray-400 hover:text-gray-600 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
