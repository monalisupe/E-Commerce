import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('shopsphere_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('shopsphere_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('shopsphere_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('shopsphere_coupon');
      }
    } catch (e) {
      console.error('Error saving coupon to localStorage', e);
    }
  }, [appliedCoupon]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, 3000);
  };

  const addToCart = (product, selectedSize = null, quantity = 1) => {
    const size = selectedSize || product.sizes?.[0] || 'Standard';
    const cartItemId = `${product.id}-${size}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            id: product.id,
            title: product.title,
            brand: product.brand,
            price: product.price,
            originalPrice: product.originalPrice,
            discountPercentage: product.discountPercentage,
            image: product.image,
            category: product.category,
            selectedSize: size,
            quantity: Math.max(1, quantity)
          }
        ];
      }
    });

    showToast(`Added "${product.title.slice(0, 26)}..." to Bag!`);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from shopping bag', 'info');
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, message: 'Please enter a coupon code' };
    }

    if (cleanCode === 'WELCOME500') {
      if (subtotal < 1499) {
        return { success: false, message: 'WELCOME500 requires minimum order value of ₹1499' };
      }
      setAppliedCoupon({ code: 'WELCOME500', discount: 500, type: 'flat' });
      showToast('Coupon WELCOME500 applied! Saved ₹500');
      return { success: true, message: 'Coupon applied successfully!' };
    }

    if (cleanCode === 'FASHION20') {
      const discountVal = Math.round(subtotal * 0.2);
      setAppliedCoupon({ code: 'FASHION20', discount: discountVal, type: 'percent', percent: 20 });
      showToast('Coupon FASHION20 applied! Saved 20%');
      return { success: true, message: 'Coupon applied successfully!' };
    }

    if (cleanCode === 'SAVE100' || cleanCode === 'GENZ20') {
      setAppliedCoupon({ code: cleanCode, discount: 150, type: 'flat' });
      showToast(`Coupon ${cleanCode} applied! Saved ₹150`);
      return { success: true, message: 'Coupon applied successfully!' };
    }

    return { success: false, message: 'Invalid coupon code. Try WELCOME500 or FASHION20' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Calculations
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalMRP = cart.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountOnMRP = totalMRP - subtotal;

  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'flat') {
      couponDiscount = Math.min(appliedCoupon.discount, subtotal);
    } else if (appliedCoupon.type === 'percent') {
      couponDiscount = Math.round(subtotal * (appliedCoupon.percent / 100));
    }
  }

  const shippingFee = subtotal >= 799 || cart.length === 0 ? 0 : 99;
  const totalAmount = Math.max(0, subtotal - couponDiscount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: totalItems,
        totalItems,
        totalMRP,
        subtotal,
        discountOnMRP,
        couponDiscount,
        shippingFee,
        totalAmount,
        appliedCoupon,
        toast,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        showToast
      }}
    >
      {children}
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-lg shadow-2xl border-l-4 border-pink-500 animate-fade-in text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-3 text-gray-400 hover:text-white"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      )}
    </CartContext.Provider>
  );
};
