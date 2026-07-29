import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const CART_KEY = "kithula_customer_id";

/**
 * Generates a standard UUID v4 on the browser side
 */
const generateUUID = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const CartServices = {
  /**
   * Retrieves existing customer_id from localStorage or generates and stores a new UUID
   */
  getOrCreateCustomerId() {
    let customerId = localStorage.getItem(CART_KEY);
    if (!customerId) {
      customerId = generateUUID();
      localStorage.setItem(CART_KEY, customerId);
    }
    return customerId;
  },

  /**
   * Fetches cart items using stored customer_id from localStorage
   */
  async getCartItems() {
    const customerId = localStorage.getItem(CART_KEY);

    if (!customerId) {
      return { data: [], total: 0 };
    }

    try {
      const response = await axios.get(`${BASE_URL}/get-all-cart-items/${customerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to fetch cart items");
      throw error;
    }
  },

  /**
   * Adds an item to the cart using the frontend generated UUID from localStorage
   */
  async addToCart(productId, quantity = 1) {
    try {
      const customerId = this.getOrCreateCustomerId();

      const response = await axios.post(`${BASE_URL}/add-to-cart`, {
        customer_id: customerId,
        product_id: productId,
        quantity,
      });

      toast.success("Item added to cart!");
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to add item to cart";
      toast.error(errorMessage);
      throw error;
    }
  },
  async removeFromCart(cart_item_id) {
    try {
      const response = await axios.delete(`${BASE_URL}/remove-from-cart/${cart_item_id}`);
      toast.success("Item removed from cart!");
      return response.data;
    } catch (error) {
      console.error("Error removing from cart:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to remove item from cart";
      toast.error(errorMessage);
      throw error;
    }
  },

  clearCartSession() {
    localStorage.removeItem(CART_KEY);
  },
};

export default CartServices;