import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  Star,
  ShoppingBag,
  Truck,
  ChevronRight,
  Share2,
  Check,
  AlertCircle
} from 'lucide-react';
import { getProductById, getProductsByCategory } from '../services/productApi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductGrid from '../components/ProductGrid';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Fetch product and related items
  useEffect(() => {
    let isMounted = true;
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductById(id);
        if (isMounted) {
          setProduct(data);
          setSelectedImage(data.image || (data.images && data.images[0]) || DEFAULT_IMAGE);
          setSelectedSize(data.sizes && data.sizes.length > 0 ? data.sizes[0] : 'Standard');

          // Fetch similar products in category
          if (data.category) {
            const similar = await getProductsByCategory(data.category);
            setSimilarProducts(similar.filter((p) => String(p.id) !== String(id)).slice(0, 4));
          }
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        if (isMounted) setError('Product could not be found.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="aspect-[3/4] bg-gray-200 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-10 bg-gray-200 rounded w-1/2 pt-4" />
            <div className="h-24 bg-gray-200 rounded w-full pt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-sm text-gray-500 mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm rounded-lg shadow-sm"
        >
          Explore All Products
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize, quantity);
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode.trim())) {
      setDeliveryStatus({
        valid: true,
        date: 'Wednesday, within 2-3 business days',
        cod: true
      });
    } else {
      setDeliveryStatus({
        valid: false,
        message: 'Please enter a valid 6-digit PIN code'
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const imagesList = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="min-h-screen bg-white py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-1.5 text-xs text-gray-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-pink-600">Home</Link>
          <ChevronRight size={12} />
          <Link to={`/${product.category}`} className="capitalize hover:text-pink-600">
            {product.category.replace('-', ' ')}
          </Link>
          <ChevronRight size={12} />
          <span className="font-semibold text-gray-800 truncate max-w-xs sm:max-w-md">
            {product.title}
          </span>
        </nav>

        {/* Main Product Layout: Gallery (Left) & Info (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: Image Gallery (5 cols) */}
          <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails list */}
            {imagesList.length > 1 && (
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-h-[550px] no-scrollbar">
                {imagesList.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                      selectedImage === img
                        ? 'border-pink-600 shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="relative flex-1 aspect-[3/4] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-xs group">
              <img
                src={selectedImage}
                onError={() => setSelectedImage(DEFAULT_IMAGE)}
                alt={product.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Floating Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`absolute top-4 right-4 z-10 p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                  wishlisted
                    ? 'bg-pink-600 text-white hover:bg-pink-700 scale-105'
                    : 'bg-white/90 text-gray-700 hover:text-pink-600 hover:bg-white hover:scale-110'
                }`}
              >
                <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={2.2} />
              </button>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share product"
                className="absolute top-4 left-4 z-10 p-3 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-pink-600 backdrop-blur-md shadow-md transition"
              >
                {copiedLink ? <Check size={18} className="text-emerald-600" /> : <Share2 size={18} />}
              </button>
            </div>
          </div>

          {/* RIGHT: Product Information (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Brand */}
              <h1 className="text-xl sm:text-2xl font-black tracking-wide text-gray-900 uppercase">
                {product.brand}
              </h1>

              {/* Title */}
              <h2 className="text-base sm:text-lg text-gray-600 font-medium mt-1">
                {product.title}
              </h2>

              {/* Rating Block */}
              {product.rating && (
                <div className="flex items-center gap-3 mt-3">
                  <div className="inline-flex items-center gap-1 bg-white border border-gray-200 px-2.5 py-1 rounded-md text-xs font-black text-gray-800 shadow-xs">
                    <span>{product.rating}</span>
                    <Star size={13} className="text-emerald-600 fill-emerald-600" />
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500 font-semibold">{product.ratingCount || '1.2k'} Ratings</span>
                  </div>
                  <span className="text-xs text-pink-600 font-bold">100% Verified Reviews</span>
                </div>
              )}

              {/* Divider */}
              <div className="my-5 border-t border-gray-100" />

              {/* Price Block */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-black text-gray-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-base sm:text-lg text-gray-400 line-through">
                      MRP ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discountPercentage > 0 && (
                    <span className="text-base font-extrabold text-orange-600">
                      ({product.discountPercentage}% OFF)
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-emerald-600">
                  inclusive of all taxes
                </div>
              </div>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-black tracking-wider uppercase text-gray-900">
                      Select Size
                    </span>
                    <span className="text-xs font-bold text-pink-600 hover:underline cursor-pointer">
                      Size Chart
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setSelectedSize(size);
                          setSizeError(false);
                        }}
                        className={`min-w-11 h-11 px-3 rounded-full text-xs font-extrabold border-2 transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'border-pink-600 bg-pink-50 text-pink-600 shadow-sm scale-105'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {sizeError && (
                    <p className="text-xs text-rose-500 font-bold mt-1.5 animate-pulse">
                      Please select a size to proceed
                    </p>
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-xs font-black tracking-wider uppercase text-gray-900">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Bag & Wishlist */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  id="product-details-add-to-cart-btn"
                  className="flex-1 py-4 bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-pink-600/30 hover:shadow-pink-600/50 flex items-center justify-center gap-2 transition duration-200"
                >
                  <ShoppingBag size={18} />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  id="product-details-wishlist-btn"
                  className={`py-4 px-6 border-2 font-black text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition duration-200 ${
                    wishlisted
                      ? 'border-pink-600 bg-pink-50 text-pink-600'
                      : 'border-gray-300 hover:border-gray-400 text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
                  <span>{wishlisted ? 'WISHLISTED' : 'WISHLIST'}</span>
                </button>
              </div>

              {/* Delivery Options / Pincode Check */}
              <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-900 mb-2">
                  <Truck size={16} className="text-pink-600" />
                  <span>Delivery Options</span>
                </div>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit PIN code"
                    maxLength={6}
                    className="flex-1 px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-pink-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-lg transition"
                  >
                    Check
                  </button>
                </form>

                {deliveryStatus && (
                  <div className="mt-3 text-xs">
                    {deliveryStatus.valid ? (
                      <div className="space-y-1 text-emerald-700 font-semibold">
                        <div className="flex items-center gap-1.5">
                          <Check size={14} />
                          <span>Delivery by {deliveryStatus.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Check size={14} className="text-emerald-600" />
                          <span>Cash on Delivery available</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-rose-600 font-semibold">{deliveryStatus.message}</p>
                    )}
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-gray-200/60 space-y-1.5 text-[11px] text-gray-500">
                  <p>• 100% Original Products directly from verified suppliers</p>
                  <p>• Pay on delivery might be available for select postal codes</p>
                  <p>• Easy 14 days returns and exchanges for unworn items</p>
                </div>
              </div>

              {/* Description & Specifications */}
              <div className="mt-8 space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-gray-900">
                  Product Details
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-gray-400 block text-[11px]">Category</span>
                    <strong className="text-gray-800 capitalize">{product.category}</strong>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-gray-400 block text-[11px]">Sub Category</span>
                    <strong className="text-gray-800">{product.subCategory}</strong>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-gray-400 block text-[11px]">In Stock</span>
                    <strong className="text-emerald-600">{product.inStock ? 'Ready to Ship' : 'Backorder'}</strong>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-gray-400 block text-[11px]">Country of Origin</span>
                    <strong className="text-gray-800">India</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Recommendation */}
        {similarProducts.length > 0 && (
          <div className="mt-20 pt-10 border-t border-gray-200">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-6">
              SIMILAR STYLES YOU MAY LIKE
            </h3>
            <ProductGrid products={similarProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
