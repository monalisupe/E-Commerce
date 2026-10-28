import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  Tag,
  Heart,
  ShoppingBag,
  Award,
  ChevronRight,
  Plus,
  Check,
  Trash2,
  Sparkles
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const INITIAL_ORDERS = [
  {
    id: 'ORD-894120',
    date: '24 Oct 2026',
    status: 'Delivered',
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    total: 2448,
    items: [
      {
        title: 'Men Slim Fit Checked Casual Shirt',
        brand: 'ROADSTER',
        size: 'M',
        price: 799,
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80'
      },
      {
        title: 'Retro Matte Liquid Lipstick - Ruby Woo',
        brand: 'M.A.C',
        size: '3.1ml',
        price: 1750,
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'ORD-762901',
    date: '18 Oct 2026',
    status: 'In Transit',
    statusColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    total: 4495,
    items: [
      {
        title: 'Air Max Impact 4 Basketball Shoes',
        brand: 'NIKE',
        size: '9',
        price: 4495,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80'
      }
    ]
  }
];

const INITIAL_ADDRESSES = [
  {
    id: 'addr-1',
    name: 'Priya Sharma',
    type: 'HOME',
    address: 'Flat 402, Green Glen Heights, Outer Ring Road, Bellandur',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    mobile: '9876543210',
    isDefault: true
  },
  {
    id: 'addr-2',
    name: 'Priya Sharma (Work)',
    type: 'OFFICE',
    address: 'Tower B, 7th Floor, Bagmane Tech Park, CV Raman Nagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560093',
    mobile: '9876543210',
    isDefault: false
  }
];

const Profile = () => {
  const { wishlistCount } = useWishlist();
  const { cartCount, showToast } = useCart();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'details' | 'coupons'

  // Profile Details State
  const [profile, setProfile] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    mobile: '+91 98765 43210',
    gender: 'Female',
    birthday: '1996-08-14'
  });

  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: '',
    type: 'HOME',
    address: '',
    city: '',
    state: '',
    pincode: '',
    mobile: ''
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showToast('Profile information updated successfully!');
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    const created = {
      ...newAddr,
      id: `addr-${Date.now()}`,
      isDefault: addresses.length === 0
    };
    setAddresses([...addresses, created]);
    setShowAddAddressModal(false);
    setNewAddr({ name: '', type: 'HOME', address: '', city: '', state: '', pincode: '', mobile: '' });
    showToast('New address added!');
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((a) => a.id !== id));
    showToast('Address removed', 'info');
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
    showToast('Default delivery address updated!');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Card Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 p-1 flex items-center justify-center text-white font-black text-2xl shadow-md">
                <span className="w-full h-full rounded-full bg-white text-pink-600 flex items-center justify-center">
                  PS
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-gray-900">
                    {profile.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                    <Award size={12} className="text-amber-600" />
                    <span>Insider VIP</span>
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{profile.email} • {profile.mobile}</p>
                <div className="mt-2 flex items-center gap-3 text-xs font-semibold text-gray-600">
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Sparkles size={13} />
                    <span>540 SuperCoins Available</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stat Buttons */}
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <Link
                to="/wishlist"
                className="px-4 py-2 bg-gray-50 hover:bg-pink-50 border border-gray-200 hover:border-pink-300 rounded-xl flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-pink-600 transition"
              >
                <Heart size={15} />
                <span>Wishlist ({wishlistCount})</span>
              </Link>
              <Link
                to="/cart"
                className="px-4 py-2 bg-gray-50 hover:bg-pink-50 border border-gray-200 hover:border-pink-300 rounded-xl flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-pink-600 transition"
              >
                <ShoppingBag size={15} />
                <span>Bag ({cartCount})</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Tabs & Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Tab Navigation Navigation Sidebar (3 cols) */}
          <aside className="lg:col-span-3 bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
            <nav className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`w-full px-5 py-4 flex items-center justify-between text-left transition ${
                  activeTab === 'orders'
                    ? 'bg-pink-50 text-pink-600 border-l-4 border-pink-600'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package size={17} />
                  <span>Orders & Returns</span>
                </div>
                <ChevronRight size={14} className="text-gray-400" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('addresses')}
                className={`w-full px-5 py-4 flex items-center justify-between text-left transition ${
                  activeTab === 'addresses'
                    ? 'bg-pink-50 text-pink-600 border-l-4 border-pink-600'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin size={17} />
                  <span>Saved Addresses</span>
                </div>
                <ChevronRight size={14} className="text-gray-400" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`w-full px-5 py-4 flex items-center justify-between text-left transition ${
                  activeTab === 'details'
                    ? 'bg-pink-50 text-pink-600 border-l-4 border-pink-600'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User size={17} />
                  <span>Profile Information</span>
                </div>
                <ChevronRight size={14} className="text-gray-400" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('coupons')}
                className={`w-full px-5 py-4 flex items-center justify-between text-left transition ${
                  activeTab === 'coupons'
                    ? 'bg-pink-50 text-pink-600 border-l-4 border-pink-600'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Tag size={17} />
                  <span>My Coupons & Rewards</span>
                </div>
                <ChevronRight size={14} className="text-gray-400" />
              </button>
            </nav>
          </aside>

          {/* RIGHT: Tab Panels (9 cols) */}
          <main className="lg:col-span-9 bg-white rounded-xl border border-gray-200/80 shadow-xs p-6 sm:p-8">
            {/* 1. ORDERS TAB */}
            {activeTab === 'orders' && (
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                  <div>
                    <h2 className="text-lg font-black text-gray-900">
                      PAST ORDERS & DELIVERIES
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Track active packages or download invoice for delivered items.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {INITIAL_ORDERS.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-xl overflow-hidden shadow-xs"
                    >
                      {/* Order Header */}
                      <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="space-y-0.5">
                          <span className="font-mono font-bold text-gray-900">{order.id}</span>
                          <span className="text-gray-400 block text-[11px]">Placed on {order.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${order.statusColor}`}>
                            {order.status}
                          </span>
                          <span className="font-black text-gray-900">
                            ₹{order.total.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="p-4 divide-y divide-gray-100">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-14 h-18 object-cover rounded-lg bg-gray-100 shrink-0"
                              />
                              <div>
                                <h4 className="text-xs font-black uppercase tracking-wider text-gray-900">
                                  {item.brand}
                                </h4>
                                <p className="text-xs text-gray-600 line-clamp-1 mt-0.5 font-medium">
                                  {item.title}
                                </p>
                                <span className="text-[11px] text-gray-400 block mt-1">
                                  Size: {item.size} • Qty: 1
                                </span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-bold text-gray-900">
                                ₹{item.price.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer Controls */}
                      <div className="p-3 bg-gray-50/70 border-t border-gray-100 flex items-center justify-end gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => showToast(`Tracking details sent for ${order.id}`)}
                          className="px-3 py-1.5 font-bold text-gray-700 hover:text-pink-600 border border-gray-300 rounded-lg bg-white"
                        >
                          Track Package
                        </button>
                        <Link
                          to="/products"
                          className="px-3 py-1.5 font-bold text-pink-600 hover:text-white hover:bg-pink-600 border border-pink-300 rounded-lg bg-white transition"
                        >
                          Buy Again
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                  <div>
                    <h2 className="text-lg font-black text-gray-900">
                      SAVED ADDRESSES
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Manage delivery destinations for rapid checkout.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddAddressModal(true)}
                    className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5"
                  >
                    <Plus size={14} />
                    <span>ADD NEW ADDRESS</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-4 rounded-xl border flex flex-col justify-between transition ${
                        addr.isDefault
                          ? 'border-pink-500 bg-pink-50/20 shadow-xs'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-gray-100 text-gray-700">
                            {addr.type}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                              <Check size={13} />
                              <span>Default Address</span>
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-gray-900">{addr.name}</h4>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{addr.address}</p>
                        <p className="text-xs text-gray-600">{addr.city}, {addr.state} - <strong>{addr.pincode}</strong></p>
                        <p className="text-xs text-gray-500 mt-2">Mobile: {addr.mobile}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold">
                        {!addr.isDefault && (
                          <button
                            type="button"
                            onClick={() => handleSetDefaultAddress(addr.id)}
                            className="text-pink-600 hover:underline"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="text-rose-500 hover:text-rose-700 ml-auto flex items-center gap-1"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. PROFILE DETAILS TAB */}
            {activeTab === 'details' && (
              <div>
                <div className="pb-4 mb-6 border-b border-gray-100">
                  <h2 className="text-lg font-black text-gray-900">
                    PERSONAL INFORMATION
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Update your contact info and personal preferences.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="max-w-xl space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 text-xs font-semibold border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        required
                        className="w-full px-3.5 py-2.5 text-xs font-semibold border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Mobile Number</label>
                      <input
                        type="text"
                        value={profile.mobile}
                        onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                        required
                        className="w-full px-3.5 py-2.5 text-xs font-semibold border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Gender</label>
                      <select
                        value={profile.gender}
                        onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs font-semibold border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={profile.birthday}
                        onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs font-semibold border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition"
                    >
                      SAVE CHANGES
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 4. COUPONS TAB */}
            {activeTab === 'coupons' && (
              <div>
                <div className="pb-4 mb-6 border-b border-gray-100">
                  <h2 className="text-lg font-black text-gray-900">
                    AVAILABLE COUPONS & REWARDS
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Apply these codes in your cart to enjoy instant savings.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      code: 'WELCOME500',
                      title: 'FLAT ₹500 OFF',
                      desc: 'Valid on first order above ₹1499 across all fashion categories.',
                      expires: '31 Dec 2026'
                    },
                    {
                      code: 'FASHION20',
                      title: 'EXTRA 20% OFF',
                      desc: 'Applicable on Nike, Levi’s, Biba, Zara and Roadster styles.',
                      expires: '15 Nov 2026'
                    },
                    {
                      code: 'GENZ20',
                      title: 'FLAT ₹150 OFF',
                      desc: 'Special discount on oversized tees, streetwear, and denim cargo pants.',
                      expires: '30 Nov 2026'
                    }
                  ].map((coupon) => (
                    <div
                      key={coupon.code}
                      className="p-4 rounded-xl border border-dashed border-pink-300 bg-pink-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm font-extrabold bg-white px-2.5 py-0.5 rounded border border-pink-400 text-pink-600">
                            {coupon.code}
                          </span>
                          <span className="text-xs font-bold text-gray-900">{coupon.title}</span>
                        </div>
                        <p className="text-xs text-gray-600">{coupon.desc}</p>
                        <span className="text-[10px] text-gray-400 mt-1 block">Expires on {coupon.expires}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(coupon.code);
                          showToast(`Coupon ${coupon.code} copied!`);
                        }}
                        className="px-4 py-2 bg-white hover:bg-pink-600 hover:text-white text-pink-600 border border-pink-300 text-xs font-bold rounded-lg transition shrink-0"
                      >
                        Copy Code
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Add Address Modal */}
        {showAddAddressModal && (
          <div
            onClick={() => setShowAddAddressModal(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
            >
              <h3 className="text-base font-black text-gray-900 mb-1">ADD DELIVERY ADDRESS</h3>
              <p className="text-xs text-gray-500 mb-4">Enter exact details for prompt delivery.</p>

              <form onSubmit={handleAddAddress} className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={newAddr.name}
                  onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg font-semibold"
                />
                <input
                  type="text"
                  placeholder="Street / Flat Address"
                  required
                  value={newAddr.address}
                  onChange={(e) => setNewAddr({ ...newAddr, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg font-semibold"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg font-semibold"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    required
                    value={newAddr.state}
                    onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg font-semibold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="6-Digit PIN"
                    maxLength={6}
                    required
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg font-semibold"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile No"
                    required
                    value={newAddr.mobile}
                    onChange={(e) => setNewAddr({ ...newAddr, mobile: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg font-semibold"
                  />
                </div>
                <div className="flex gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddAddressModal(false)}
                    className="flex-1 py-2 text-xs font-bold text-gray-600 border border-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 rounded-lg"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
