import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const ProductServices = {
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all-products`);
      const rawData = response.data?.data || [];

      // Encode image URLs to handle spaces and special characters
      return rawData.map((product) => ({
        ...product,
        image_url: product.image_url ? encodeURI(product.image_url) : null,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to fetch products";
        
      toast.error(errorMessage);
      throw error;
    }
  },
  getProductById: async (product_id) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${product_id}`);
      const product = response.data?.data;
      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to fetch product";
      toast.error(errorMessage);
      throw error;
    }
  }
};

export default ProductServices;