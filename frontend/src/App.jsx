import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './Pages/Home';
import Men from './Pages/Men';
import Women from './Pages/Women';
import Kids from './Pages/Kids';
import HomeLiving from './Pages/HomeLiving';
import Beauty from './Pages/Beauty';
import ProductListing from './Pages/ProductListing';
import ProductDetails from './Pages/ProductDetails';
import Wishlist from './Pages/Wishlist';
import Cart from './Pages/Cart';
import Profile from './Pages/Profile';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

// 404 Fallback component
function NotFound() {
  return (
    <div className="min-h-[65vh] flex items-center justify-center py-16 px-4 bg-gray-50/50">
      <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-xs border border-gray-200">
        <h1 className="text-6xl font-black text-pink-600 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-xs text-gray-500 mb-6">
          We couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-gray-50/50 text-gray-800 antialiased selection:bg-pink-500 selection:text-white">
            {/* Main Sticky Navigation */}
            <Navbar />

            {/* Application Page Routes */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/men" element={<Men />} />
                <Route path="/women" element={<Women />} />
                <Route path="/kids" element={<Kids />} />
                <Route path="/home-living" element={<HomeLiving />} />
                <Route path="/beauty" element={<Beauty />} />
                <Route path="/products" element={<ProductListing />} />
                <Route path="/search" element={<ProductListing />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
