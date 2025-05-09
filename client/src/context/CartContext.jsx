import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart', { credentials: 'include' });
      const data = await res.json();
      if (res.ok && data.success) setCart(data.cart);
    } catch (err) {
      console.error('Failed to fetch cart:', err.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCart(data.cart); // Update cart state with latest data
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Add to cart failed:', err.message);
      return { success: false, message: err.message };
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

const removeFromCart = async (productId) => {
  try {
    const res = await fetch(`/api/cart/${productId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const data = await res.json();
    if (res.ok && data.success) {
      setCart(data.cart); // Update global cart after removal
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  } catch (err) {
    console.error('Remove from cart failed:', err.message);
    return { success: false, message: err.message };
  }
};

export function useCart() {
  return useContext(CartContext);
}
