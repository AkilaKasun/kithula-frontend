import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const OrderServices = {
  async createOrder(orderData) {
    try {
      const response = await axios.post(`${BASE_URL}/create-order`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to create order";
      toast.error(errorMessage);
      throw error;
    }
  },
}; 

export default OrderServices; 