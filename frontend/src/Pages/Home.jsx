import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, ArrowRight, Zap, Trophy } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import OfferBanner from '../components/OfferBanner';
import BrandOffers from '../components/BrandOffers';
import CategorySection from '../components/CategorySection';
import ProductGrid from '../components/ProductGrid';
import { getTrendingProducts, getBestSellers, getDealsOfTheDay } from '../services/productApi';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  // Countdown timer for Deals of the Day
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadHomeData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [trendData, bestData, dealsData] = await Promise.all([
        getTrendingProducts(8),
        getBestSellers(8),
        getDealsOfTheDay(8)
      ]);
      setTrending(trendData);
      setBestSellers(bestData);
      setDeals(dealsData);
    } catch (err) {
      console.error('Failed to load home page products:', err);
      setError('Could not load products. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  // Filter trending items by active tab
  const filteredTrending = activeTab === 'all'
    ? trending
    : trending.filter((p) => p.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Offer Banners & Trust Indicators */}
      <OfferBanner />

      {/* 3. Shop By Category */}
      <CategorySection />

      {/* 4. Deals of the Day (Countdown + Heavy Discounts) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="deals-of-the-day-section">
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 rounded-2xl p-6 sm:p-8 text-white shadow-lg mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-black bg-white/20 backdrop-blur-md uppercase tracking-wider mb-2">
                <Flame size={14} className="text-yellow-300" />
                <span>Lightning Deals</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                DEALS OF THE DAY
              </h2>
              <p className="text-sm text-pink-100 mt-1">
                Highest discounts handpicked across fashion, footwear, beauty & home.
              </p>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 self-start md:self-auto">
              <Clock size={20} className="text-yellow-300 animate-pulse" />
              <div className="flex items-center gap-1 font-mono text-lg sm:text-xl font-bold">
                <span className="bg-white/20 px-2 py-0.5 rounded">{String(timeLeft.hours).padStart(2, '0')}h</span>
                <span>:</span>
                <span className="bg-white/20 px-2 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                <span>:</span>
                <span className="bg-white/20 px-2 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Product Grid */}
        <ProductGrid
          products={deals.slice(0, 4)}
          loading={loading}
          error={error}
          onRetry={loadHomeData}
        />
      </section>

      {/* 5. Brand Offers & Spotlights */}
      <BrandOffers />

      {/* 6. Trending Now (with Filter Tabs) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="trending-section">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-pink-600 text-xs font-black tracking-widest uppercase mb-1">
              <Zap size={15} />
              <span>Hot Right Now</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              TRENDING STYLES
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'All Styles' },
              { id: 'men', label: 'Men' },
              { id: 'women', label: 'Women' },
              { id: 'beauty', label: 'Beauty' },
              { id: 'home-living', label: 'Home' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all shrink-0 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <ProductGrid
          products={filteredTrending.slice(0, 8)}
          loading={loading}
          error={error}
          onRetry={loadHomeData}
        />
      </section>

      {/* 7. Mid-Page Gen Z / Streetwear Promo Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative rounded-2xl overflow-hidden shadow-md bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-900 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left z-10">
            <span className="inline-block px-3 py-1 bg-yellow-400 text-gray-950 font-black text-xs uppercase tracking-widest rounded-full mb-3">
              GEN Z DROP
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
              OVERSIZED TEES, BAGGY JEANS & CHUNKY RETRO KICKS
            </h3>
            <p className="text-sm text-purple-200 mt-2">
              Unisex streetwear engineered for aesthetic comfort. Starting from ₹499.
            </p>
          </div>
          <Link
            to="/products?category=gen-z"
            className="z-10 px-8 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-black text-sm rounded-lg shadow-lg transform hover:scale-105 transition"
          >
            EXPLORE THE DROP
          </Link>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-500 via-transparent to-transparent" />
        </div>
      </section>

      {/* 8. Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="bestsellers-section">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-pink-600 text-xs font-black tracking-widest uppercase mb-1">
              <Trophy size={15} />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              BESTSELLERS
            </h2>
          </div>
          <Link
            to="/products?sort=rating-high"
            className="text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1 group"
          >
            <span>View All Bestsellers</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductGrid
          products={bestSellers.slice(0, 8)}
          loading={loading}
          error={error}
          onRetry={loadHomeData}
        />
      </section>
    </div>
  );
};

export default Home;
