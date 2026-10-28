import React from 'react';
import ProductCard from './ProductCard';
import { ShoppingBag, RefreshCw, AlertCircle } from 'lucide-react';

const ProductGrid = ({
  products = [],
  loading = false,
  error = null,
  onRetry = null,
  emptyMessage = 'No products found matching your criteria.'
}) => {
  // Skeleton Loading Grid
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-xs animate-pulse flex flex-col"
          >
            <div className="aspect-[3/4] bg-gray-200" />
            <div className="p-3.5 space-y-2.5">
              <div className="h-3 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 pt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-2xl border border-gray-200/80 shadow-xs max-w-lg mx-auto my-8">
        <div className="w-14 h-14 mx-auto rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
          <AlertCircle size={28} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Failed to Load Products</h3>
        <p className="text-sm text-gray-500 mb-6">{error}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-lg shadow-sm inline-flex items-center gap-2 transition"
          >
            <RefreshCw size={14} />
            <span>Try Again</span>
          </button>
        )}
      </div>
    );
  }

  // Empty State
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-gray-300 max-w-lg mx-auto my-8">
        <div className="w-16 h-16 mx-auto rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mb-4">
          <ShoppingBag size={28} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">We couldn't find any matches</h3>
        <p className="text-sm text-gray-500 mb-4">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
