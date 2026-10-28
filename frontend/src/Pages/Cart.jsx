import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Heart,
  Tag,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Plus,
  Minus,
  Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Cart = () => {
  const {
    cart,
    cartCount,
    totalMRP,
    discountOnMRP,
    couponDiscount,
    shippingFee,
    totalAmount,
    appliedCoupon,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    clearCart
  } = useCart();

  const { addToWishlist } = useWishlist();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [pincode, setPincode] = useState('560001');
  const [isChangingPincode, setIsChangingPincode] = useState(false);
  const [newPincode, setNewPincode] = useState('');

  // Checkout modal state
  const [checkoutStep, setCheckoutStep] = useState(null); // 'address' | 'payment' | 'success'
  const [addressData, setAddressData] = useState({
    name: 'Priya Sharma',
    mobile: '9876543210',
    address: 'Flat 402, Green Glen Heights, Bellandur',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001'
  });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [placedOrderId, setPlacedOrderId] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const result = applyCoupon(couponCode);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponCode('');
    }
  };

  const handleMoveToWishlist = (item) => {
    addToWishlist({
      id: item.id,
      title: item.title,
      brand: item.brand,
      price: item.price,
      originalPrice: item.originalPrice,
      discountPercentage: item.discountPercentage,
      image: item.image,
      category: item.category
    });
    removeFromCart(item.cartItemId);
  };

  const handlePlaceOrder = () => {
    setCheckoutStep('address');
  };

  const handleConfirmAddress = (e) => {
    e.preventDefault();
    setCheckoutStep('payment');
  };

  const handleCompletePayment = () => {
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setPlacedOrderId(orderId);
    setCheckoutStep('success');
    clearCart();
  };

  if (cartCount === 0 && checkoutStep !== 'success') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-gray-50/50">
        <div className="text-center max-w-md bg-white p-8 sm:p-12 rounded-2xl shadow-xs border border-gray-200/80">
          <div className="w-20 h-20 mx-auto rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mb-5">
            <ShoppingBag size={36} strokeWidth={1.5} />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-2">
            YOUR SHOPPING BAG IS EMPTY
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
            There is nothing in your bag. Explore today's biggest fashion deals and add items.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/products"
              className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition"
            >
              SHOP PRODUCTS
            </Link>
            <Link
              to="/wishlist"
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase tracking-wider rounded-lg transition"
            >
              VIEW WISHLIST
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              SHOPPING BAG
            </h1>
            <p className="text-xs text-gray-500 font-semibold mt-1">
              {cartCount} {cartCount === 1 ? 'item' : 'items'} selected
            </p>
          </div>
        </div>

        {/* 2-Column Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Delivery Pincode Bar */}
            <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Truck size={16} />
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Deliver to:</span>
                  <span className="text-xs font-bold text-gray-900">
                    Priya Sharma, {pincode}
                  </span>
                </div>
              </div>

              {isChangingPincode ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newPincode}
                    onChange={(e) => setNewPincode(e.target.value)}
                    placeholder="New PIN"
                    maxLength={6}
                    className="w-24 px-2 py-1 text-xs border border-gray-300 rounded font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newPincode.trim().length === 6) setPincode(newPincode);
                      setIsChangingPincode(false);
                    }}
                    className="text-xs font-bold text-pink-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsChangingPincode(true)}
                  className="px-3 py-1.5 border border-pink-600 text-pink-600 hover:bg-pink-50 text-xs font-bold rounded-lg transition"
                >
                  CHANGE
                </button>
              )}
            </div>

            {/* Cart Items List */}
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs flex gap-4 transition"
                  id={`cart-item-${item.cartItemId}`}
                >
                  {/* Thumbnail */}
                  <Link
                    to={`/product/${item.id}`}
                    className="w-20 sm:w-24 aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shrink-0 hover:opacity-90 transition"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-wider text-gray-900">
                            {item.brand}
                          </h4>
                          <Link
                            to={`/product/${item.id}`}
                            className="text-xs text-gray-600 font-medium hover:text-pink-600 line-clamp-1 mt-0.5"
                          >
                            {item.title}
                          </Link>
                        </div>
                        {/* Remove Cross */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartItemId)}
                          aria-label="Remove item"
                          className="text-gray-400 hover:text-rose-600 p-1 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Size & Category Badge */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-bold rounded">
                          Size: {item.selectedSize}
                        </span>
                        <span className="text-[11px] text-emerald-600 font-semibold">
                          In Stock
                        </span>
                      </div>
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-black text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                        )}
                        {item.discountPercentage > 0 && (
                          <span className="text-[11px] font-extrabold text-orange-600">
                            {item.discountPercentage}% OFF
                          </span>
                        )}
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2.5 py-1 text-gray-600 hover:text-gray-900 font-bold"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-3 text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2.5 py-1 text-gray-600 hover:text-gray-900 font-bold"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Secondary Action: Move to Wishlist */}
                    <div className="mt-2 text-right">
                      <button
                        type="button"
                        onClick={() => handleMoveToWishlist(item)}
                        className="text-[11px] font-bold text-gray-500 hover:text-pink-600 inline-flex items-center gap-1 transition"
                      >
                        <Heart size={12} />
                        <span>Move to Wishlist</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Price Details & Checkout (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Apply Coupons Section */}
            <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-900 mb-3">
                <Tag size={16} className="text-pink-600" />
                <span>Apply Coupons</span>
              </div>

              {appliedCoupon ? (
                <div className="p-3 bg-pink-50 border border-pink-200 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-pink-700 block">
                      {appliedCoupon.code} Applied!
                    </span>
                    <span className="text-[11px] text-pink-600 font-semibold">
                      You saved ₹{couponDiscount} with this coupon.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter coupon code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs font-semibold uppercase placeholder-gray-400 focus:outline-none focus:border-pink-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold uppercase rounded-lg transition"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-xs text-rose-500 font-semibold">{couponError}</p>
                  )}

                  {/* Quick coupon chips */}
                  <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() => applyCoupon('WELCOME500')}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-pink-50 hover:text-pink-600 rounded font-semibold text-gray-700 border border-dashed border-gray-300 transition"
                    >
                      WELCOME500 (₹500 OFF)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyCoupon('FASHION20')}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-pink-50 hover:text-pink-600 rounded font-semibold text-gray-700 border border-dashed border-gray-300 transition"
                    >
                      FASHION20 (20% OFF)
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Price Breakdown Card */}
            <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 pb-2 border-b border-gray-100">
                PRICE DETAILS ({cartCount} {cartCount === 1 ? 'Item' : 'Items'})
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-700">
                  <span>Total MRP</span>
                  <span>₹{totalMRP.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount on MRP</span>
                  <span>-₹{discountOnMRP.toLocaleString('en-IN')}</span>
                </div>

                {appliedCoupon && couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span>Shipping Fee</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-semibold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                <span className="text-sm font-black text-gray-900">Total Amount</span>
                <span className="text-lg font-black text-gray-900">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                id="cart-place-order-btn"
                className="w-full mt-4 py-4 bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-pink-600/30 transition duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>PLACE ORDER</span>
                <ArrowRight size={16} />
              </button>

              <div className="pt-3 flex items-center justify-center gap-2 text-[11px] text-gray-400 font-medium text-center">
                <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                <span>Safe and Secure Payments. Easy 14-day returns.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL FLOW */}
      {checkoutStep && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Step 1: Address */}
            {checkoutStep === 'address' && (
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-1">
                  DELIVERY ADDRESS
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  Please review or update your shipping details.
                </p>

                <form onSubmit={handleConfirmAddress} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Name</label>
                      <input
                        type="text"
                        required
                        value={addressData.name}
                        onChange={(e) => setAddressData({ ...addressData, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Mobile No</label>
                      <input
                        type="tel"
                        required
                        value={addressData.mobile}
                        onChange={(e) => setAddressData({ ...addressData, mobile: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Address (House No, Building, Street)</label>
                    <input
                      type="text"
                      required
                      value={addressData.address}
                      onChange={(e) => setAddressData({ ...addressData, address: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={addressData.city}
                        onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={addressData.state}
                        onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Pincode</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={addressData.pincode}
                        onChange={(e) => setAddressData({ ...addressData, pincode: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(null)}
                      className="flex-1 py-3 border border-gray-300 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold uppercase rounded-lg shadow-sm"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Payment */}
            {checkoutStep === 'payment' && (
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-1">
                  PAYMENT METHOD
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  Total Payable: <strong>₹{totalAmount.toLocaleString('en-IN')}</strong>
                </p>

                <div className="space-y-3 mb-6">
                  <label className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                    paymentMethod === 'upi' ? 'border-pink-600 bg-pink-50/50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="w-4 h-4 text-pink-600"
                    />
                    <div>
                      <strong className="text-xs text-gray-900 block">UPI (Google Pay, PhonePe, Paytm)</strong>
                      <span className="text-[11px] text-gray-500">Fast & zero convenience fee</span>
                    </div>
                  </label>

                  <label className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                    paymentMethod === 'card' ? 'border-pink-600 bg-pink-50/50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="w-4 h-4 text-pink-600"
                    />
                    <div>
                      <strong className="text-xs text-gray-900 block">Credit / Debit Card</strong>
                      <span className="text-[11px] text-gray-500">Visa, Mastercard, RuPay & Amex</span>
                    </div>
                  </label>

                  <label className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition ${
                    paymentMethod === 'cod' ? 'border-pink-600 bg-pink-50/50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="w-4 h-4 text-pink-600"
                    />
                    <div>
                      <strong className="text-xs text-gray-900 block">Cash on Delivery (COD)</strong>
                      <span className="text-[11px] text-gray-500">Pay when your order arrives</span>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('address')}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleCompletePayment}
                    className="flex-1 py-3 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold uppercase rounded-lg shadow-sm"
                  >
                    Pay ₹{totalAmount.toLocaleString('en-IN')}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Success Confirmation */}
            {checkoutStep === 'success' && (
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle size={36} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-1">
                  ORDER PLACED SUCCESSFULLY!
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  Thank you, <strong>{addressData.name}</strong>. Your order is confirmed.
                </p>
                <div className="inline-block px-3 py-1 bg-gray-100 rounded text-xs font-mono font-bold text-gray-700 mb-6">
                  Order ID: {placedOrderId}
                </div>

                <p className="text-xs text-gray-600 bg-gray-50 p-4 rounded-xl mb-6 text-left">
                  We'll deliver your items to <strong>{addressData.address}, {addressData.city} - {addressData.pincode}</strong> within 2-3 business days.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutStep(null);
                      navigate('/profile');
                    }}
                    className="flex-1 py-3 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold uppercase rounded-lg shadow-sm"
                  >
                    View My Orders
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutStep(null);
                      navigate('/');
                    }}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold uppercase rounded-lg"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
