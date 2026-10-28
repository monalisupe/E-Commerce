import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [imageSrc, setImageSrc] = useState(product?.image || DEFAULT_IMAGE);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Standard');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const wishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(product);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (product.sizes && product.sizes.length > 1) {
      setShowSizeModal(true);
    } else {
      addToCart(product, selectedSize, 1);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }
  };

  const handleConfirmSize = (e, size) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedSize(size);
    addToCart(product, size, 1);
    setShowSizeModal(false);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-xl overflow-hidden border border-gray-200/70 hover:border-pink-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
        <img
          src={imageSrc}
          onError={() => setImageSrc(DEFAULT_IMAGE)}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Wishlist Button (Top-Right) */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
            wishlisted
              ? 'bg-pink-600 text-white hover:bg-pink-700 scale-105'
              : 'bg-white/80 text-gray-600 hover:text-pink-600 hover:bg-white hover:scale-110'
          }`}
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={2.2} />
        </button>

        {/* Rating Badge (Bottom-Left of Image) */}
        {product.rating && (
          <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-extrabold text-gray-800 shadow-xs border border-gray-100">
            <span>{product.rating}</span>
            <Star size={11} className="text-emerald-600 fill-emerald-600" />
            <span className="text-gray-400 font-normal">|</span>
            <span className="text-gray-500 font-medium">{product.ratingCount || '1.1k'}</span>
          </div>
        )}

        {/* Quick Add Overlay on hover (Desktop) */}
        <div className="absolute inset-x-2 bottom-2 z-20 hidden group-hover:flex transition-all animate-fade-in">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-2 bg-white/95 hover:bg-pink-600 text-gray-800 hover:text-white text-xs font-bold rounded-lg shadow-md border border-gray-200 transition-colors flex items-center justify-center gap-1.5 backdrop-blur-sm"
          >
            {isAdded ? (
              <>
                <Check size={14} className="text-emerald-500" />
                <span>ADDED!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>ADD TO BAG</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="p-3.5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Brand */}
          <h3 className="text-xs font-black tracking-wider text-gray-900 uppercase truncate">
            {product.brand}
          </h3>

          {/* Title */}
          <p className="text-xs text-gray-500 font-medium truncate mt-0.5 leading-snug" title={product.title}>
            {product.title}
          </p>
        </div>

        {/* Price & Discount */}
        <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-baseline gap-2 flex-wrap">
          <span className="text-sm font-extrabold text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="text-[11px] font-extrabold text-orange-600">
              ({product.discountPercentage}% OFF)
            </span>
          )}
        </div>

        {/* Mobile Quick Add Button */}
        <div className="mt-3 md:hidden">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-1.5 text-xs font-bold rounded bg-pink-50 text-pink-600 hover:bg-pink-100 active:bg-pink-200 flex items-center justify-center gap-1"
          >
            <ShoppingBag size={12} />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Quick Size Select Modal Popup */}
      {showSizeModal && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowSizeModal(false);
          }}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs z-30 flex items-center justify-center p-3 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-4 w-full max-w-xs shadow-2xl text-center"
          >
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Select Size
            </h4>
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {(product.sizes || ['Standard']).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => handleConfirmSize(e, size)}
                  className="w-9 h-9 text-xs font-bold rounded-full border border-gray-300 hover:border-pink-600 hover:bg-pink-50 hover:text-pink-600 transition"
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowSizeModal(false)}
              className="text-[11px] text-gray-400 hover:text-gray-600 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
