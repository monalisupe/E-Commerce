import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronRight, X } from 'lucide-react';
import { getAllProducts, searchProducts, getProductsByCategory } from '../services/productApi';
import ProductGrid from '../components/ProductGrid';
import CategoryFilter from '../components/CategoryFilter';
import { CATEGORY_FILTERS } from '../data/categories';

const ProductListing = ({ initialCategory = null, pageTitle = null }) => {
  const [searchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // URL state
  const categoryParam = initialCategory || searchParams.get('category') || '';
  const subParam = searchParams.get('sub') || '';
  const searchQuery = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || 'recommended';

  // Filter states
  const [selectedSubCategories, setSelectedSubCategories] = useState(() => (subParam ? [subParam] : []));
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedDiscount, setSelectedDiscount] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortOption, setSortOption] = useState(sortParam);

  // Sync subParam if changes in URL
  useEffect(() => {
    if (subParam && !selectedSubCategories.includes(subParam)) {
      setSelectedSubCategories([subParam]);
    }
  }, [subParam]);

  // Sync sortParam if changes in URL
  useEffect(() => {
    if (sortParam) {
      setSortOption(sortParam);
    }
  }, [sortParam]);

  // Fetch base products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let data = [];
      if (searchQuery) {
        data = await searchProducts(searchQuery);
      } else if (categoryParam) {
        data = await getProductsByCategory(categoryParam);
      } else {
        data = await getAllProducts();
      }
      setAllProducts(data);
    } catch (err) {
      console.error('Error fetching listing products:', err);
      setError('Unable to load products. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryParam, searchQuery]);

  // Available subcategories for the current category or loaded products
  const availableSubCategories = useMemo(() => {
    if (categoryParam && CATEGORY_FILTERS[categoryParam]) {
      return CATEGORY_FILTERS[categoryParam];
    }
    // Extract unique subcategories from allProducts
    const subs = new Set();
    allProducts.forEach((p) => {
      if (p.subCategory) subs.add(p.subCategory);
    });
    return Array.from(subs);
  }, [categoryParam, allProducts]);

  // Handle toggling a subcategory checkbox
  const handleToggleSubCategory = (sub) => {
    setSelectedSubCategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedSubCategories([]);
    setSelectedPriceRange('all');
    setSelectedDiscount(0);
    setSelectedRating(0);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // 1. Subcategory filter
      if (selectedSubCategories.length > 0) {
        const matchesSub = selectedSubCategories.some((sub) => {
          const s = sub.toLowerCase();
          const pSub = (product.subCategory || '').toLowerCase();
          const pTitle = product.title.toLowerCase();
          return pSub.includes(s) || pTitle.includes(s);
        });
        if (!matchesSub) return false;
      }

      // 2. Price filter
      const price = product.price;
      if (selectedPriceRange === 'under-1000' && price >= 1000) return false;
      if (selectedPriceRange === '1000-2500' && (price < 1000 || price > 2500)) return false;
      if (selectedPriceRange === '2500-5000' && (price < 2500 || price > 5000)) return false;
      if (selectedPriceRange === 'above-5000' && price <= 5000) return false;

      // 3. Discount filter
      if (selectedDiscount > 0 && (product.discountPercentage || 0) < selectedDiscount) {
        return false;
      }

      // 4. Rating filter
      if (selectedRating > 0 && (product.rating || 0) < selectedRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating-high') return (b.rating || 0) - (a.rating || 0);
      if (sortOption === 'discount-high') return (b.discountPercentage || 0) - (a.discountPercentage || 0);
      return 0; // recommended / default
    });
  }, [allProducts, selectedSubCategories, selectedPriceRange, selectedDiscount, selectedRating, sortOption]);

  // Compute readable heading
  const displayTitle = useMemo(() => {
    if (pageTitle) return pageTitle;
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    if (categoryParam) {
      const names = {
        men: "Men's Collection",
        women: "Women's Collection",
        kids: "Kids' Collection",
        'home-living': 'Home & Living Essentials',
        beauty: 'Beauty & Personal Care',
        'gen-z': 'Gen Z Trends & Streetwear'
      };
      return names[categoryParam] || 'Fashion Collection';
    }
    return 'All Products';
  }, [pageTitle, searchQuery, categoryParam]);

  return (
    <div className="min-h-screen bg-gray-50/50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-1.5 text-xs text-gray-500 mb-4">
          <Link to="/" className="hover:text-pink-600">Home</Link>
          <ChevronRight size={12} />
          {categoryParam ? (
            <>
              <Link to={`/${categoryParam}`} className="capitalize hover:text-pink-600">
                {categoryParam.replace('-', ' ')}
              </Link>
              <ChevronRight size={12} />
              <span className="font-semibold text-gray-800">Products</span>
            </>
          ) : (
            <span className="font-semibold text-gray-800">
              {searchQuery ? `Search: ${searchQuery}` : 'All Products'}
            </span>
          )}
        </nav>

        {/* Header Bar */}
        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {displayTitle}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Showing <strong>{filteredProducts.length}</strong> items
              {allProducts.length !== filteredProducts.length && ` (filtered from ${allProducts.length})`}
            </p>
          </div>

          {/* Controls: Mobile Filter Trigger & Sort dropdown */}
          <div className="flex items-center gap-3 self-stretch sm:self-auto">
            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold transition"
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
              {(selectedSubCategories.length > 0 || selectedPriceRange !== 'all') && (
                <span className="w-2 h-2 rounded-full bg-pink-600" />
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              <span className="text-xs text-gray-500 font-semibold hidden sm:inline">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-bold text-gray-800 focus:outline-none focus:border-pink-500 cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating-high">Customer Rating</option>
                <option value="discount-high">Better Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Pills */}
        {(selectedSubCategories.length > 0 || selectedPriceRange !== 'all' || selectedDiscount > 0 || selectedRating > 0) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-gray-400 font-semibold">Active:</span>
            {selectedSubCategories.map((sub) => (
              <span
                key={sub}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200 shadow-xs"
              >
                <span>{sub}</span>
                <button
                  type="button"
                  onClick={() => handleToggleSubCategory(sub)}
                  className="hover:text-pink-900"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            {selectedPriceRange !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200 shadow-xs">
                <span>Price: {selectedPriceRange}</span>
                <button
                  type="button"
                  onClick={() => setSelectedPriceRange('all')}
                  className="hover:text-pink-900"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedDiscount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200 shadow-xs">
                <span>{selectedDiscount}%+ OFF</span>
                <button
                  type="button"
                  onClick={() => setSelectedDiscount(0)}
                  className="hover:text-pink-900"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedRating > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200 shadow-xs">
                <span>{selectedRating}★ & above</span>
                <button
                  type="button"
                  onClick={() => setSelectedRating(0)}
                  className="hover:text-pink-900"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-bold text-gray-500 hover:text-pink-600 underline ml-2 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Content Layout: Sidebar + Product Grid */}
        <div className="flex gap-6 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-24">
            <CategoryFilter
              subCategories={availableSubCategories}
              selectedSubCategories={selectedSubCategories}
              onToggleSubCategory={handleToggleSubCategory}
              selectedPriceRange={selectedPriceRange}
              onChangePriceRange={setSelectedPriceRange}
              selectedDiscount={selectedDiscount}
              onChangeDiscount={setSelectedDiscount}
              selectedRating={selectedRating}
              onChangeRating={setSelectedRating}
              onResetFilters={handleResetFilters}
            />
          </aside>

          {/* Product Grid Area */}
          <main className="flex-1">
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              error={error}
              onRetry={fetchProducts}
              emptyMessage={
                searchQuery
                  ? `No products found matching "${searchQuery}". Try different keywords or reset filters.`
                  : 'No products found matching the selected filters. Try broadening your criteria.'
              }
            />
          </main>
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileFilterOpen(false)}
            />
            <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-fade-in">
              <CategoryFilter
                subCategories={availableSubCategories}
                selectedSubCategories={selectedSubCategories}
                onToggleSubCategory={handleToggleSubCategory}
                selectedPriceRange={selectedPriceRange}
                onChangePriceRange={setSelectedPriceRange}
                selectedDiscount={selectedDiscount}
                onChangeDiscount={setSelectedDiscount}
                selectedRating={selectedRating}
                onChangeRating={setSelectedRating}
                onResetFilters={handleResetFilters}
                isMobileDrawer={true}
                onCloseMobileDrawer={() => setMobileFilterOpen(false)}
              />
              <div className="p-4 bg-gray-50 border-t border-gray-200 mt-auto">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm"
                >
                  Apply Filters ({filteredProducts.length} items)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
