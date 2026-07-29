import React, { createContext, useContext, useState, useEffect } from "react";
import CartServices from "../services/cart.service"; // Adjust path if needed

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  // Fetch cart data from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await CartServices.getCartItems();
      if (response && response.data) {
        setCart(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart and RE-FETCH immediately
  const addToCart = async (productId, quantity = 1) => {
    try {
      await CartServices.addToCart(productId, quantity);
      
      // CRITICAL: Fetch fresh cart state immediately so Navbar & components re-render!
      await fetchCart(); 
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      throw error;
    }
  };

  // Remove item from cart and RE-FETCH immediately
  const removeFromCart = async (cartItemId) => {
    try {
      await CartServices.removeFromCart(cartItemId);
      await fetchCart();
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, loading, fetchCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};