import { X, RotateCcw, Filter } from 'lucide-react';

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-1000', label: 'Under ₹1,000', min: 0, max: 1000 },
  { id: '1000-2500', label: '₹1,000 to ₹2,500', min: 1000, max: 2500 },
  { id: '2500-5000', label: '₹2,500 to ₹5,000', min: 2500, max: 5000 },
  { id: 'above-5000', label: 'Above ₹5,000', min: 5000, max: Infinity }
];

const DISCOUNT_RANGES = [
  { id: 0, label: 'All Discounts' },
  { id: 30, label: '30% and above' },
  { id: 40, label: '40% and above' },
  { id: 50, label: '50% and above' },
  { id: 60, label: '60% and above' }
];

const RATING_RANGES = [
  { id: 0, label: 'All Ratings' },
  { id: 4.0, label: '4.0★ and above' },
  { id: 4.5, label: '4.5★ and above' }
];

const CategoryFilter = ({
  subCategories = [],
  selectedSubCategories = [],
  onToggleSubCategory,
  selectedPriceRange = 'all',
  onChangePriceRange,
  selectedDiscount = 0,
  onChangeDiscount,
  selectedRating = 0,
  onChangeRating,
  onResetFilters,
  isMobileDrawer = false,
  onCloseMobileDrawer = null
}) => {
  const hasActiveFilters =
    selectedSubCategories.length > 0 ||
    selectedPriceRange !== 'all' ||
    selectedDiscount > 0 ||
    selectedRating > 0;

  return (
    <div className={`bg-white rounded-xl ${isMobileDrawer ? 'p-5' : 'p-4 border border-gray-200/80 shadow-xs'}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-pink-600" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-900">
            Filters
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1 transition"
            >
              <RotateCcw size={12} />
              <span>CLEAR ALL</span>
            </button>
          )}
          {isMobileDrawer && onCloseMobileDrawer && (
            <button
              type="button"
              onClick={onCloseMobileDrawer}
              className="p-1 text-gray-400 hover:text-gray-700 ml-2"
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {/* Categories / Subcategories */}
        {subCategories.length > 0 && (
          <div className="py-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
              Subcategories
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {subCategories.map((sub) => {
                const checked = selectedSubCategories.includes(sub);
                return (
                  <label
                    key={sub}
                    className="flex items-center text-xs text-gray-700 hover:text-gray-900 cursor-pointer select-none group"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleSubCategory(sub)}
                      className="w-4 h-4 rounded text-pink-600 border-gray-300 focus:ring-pink-500 cursor-pointer"
                    />
                    <span className="ml-2.5 font-medium group-hover:text-pink-600 transition-colors">
                      {sub}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Price Ranges */}
        <div className="py-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
            Price Range
          </h4>
          <div className="space-y-2">
            {PRICE_RANGES.map((range) => (
              <label
                key={range.id}
                className="flex items-center text-xs text-gray-700 hover:text-gray-900 cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="priceRange"
                  value={range.id}
                  checked={selectedPriceRange === range.id}
                  onChange={() => onChangePriceRange(range.id)}
                  className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500 cursor-pointer"
                />
                <span className="ml-2.5 font-medium">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Discount */}
        <div className="py-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
            Discount
          </h4>
          <div className="space-y-2">
            {DISCOUNT_RANGES.map((disc) => (
              <label
                key={disc.id}
                className="flex items-center text-xs text-gray-700 hover:text-gray-900 cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="discountRange"
                  value={disc.id}
                  checked={selectedDiscount === disc.id}
                  onChange={() => onChangeDiscount(disc.id)}
                  className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500 cursor-pointer"
                />
                <span className="ml-2.5 font-medium">{disc.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Customer Rating */}
        <div className="py-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
            Customer Rating
          </h4>
          <div className="space-y-2">
            {RATING_RANGES.map((rate) => (
              <label
                key={rate.id}
                className="flex items-center text-xs text-gray-700 hover:text-gray-900 cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="ratingRange"
                  value={rate.id}
                  checked={selectedRating === rate.id}
                  onChange={() => onChangeRating(rate.id)}
                  className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500 cursor-pointer"
                />
                <span className="ml-2.5 font-medium flex items-center gap-1">
                  {rate.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
