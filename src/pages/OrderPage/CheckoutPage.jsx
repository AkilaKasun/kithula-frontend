import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaLock, 
  FaCheckCircle, 
  FaShoppingBag, 
  FaMoneyBillWave, 
  FaCreditCard, 
  FaInfoCircle 
} from "react-icons/fa";
import { toast } from "react-toastify";
import OrderServices from "../../services/order.service"; // Adjust path as needed
import CartServices from "../../services/cart.service";   // Adjust path as needed

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Payment Method state (default: cash_on_delivery)
  const [selectedPayment, setSelectedPayment] = useState("cod");

  // Form State matching required backend structure
  const [formData, setFormData] = useState({
    customer_name: "",
    phone: "",
    email: "",
    address_line1: "",
    address_line2: "",
    district: "",
    postal_code: "",
    notes: "",
  });

  // Fetch cart summary on load
  useEffect(() => {
    const fetchCartSummary = async () => {
      try {
        const response = await CartServices.getCartItems();
        if (response && response.data) {
          setCartItems(response.data.items || []);
          setGrandTotal(response.data.grand_total || 0);
        }
      } catch (error) {
        console.error("Failed to load cart for checkout summary:", error);
      }
    };

    fetchCartSummary();
  }, []);

  // Form input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Order Handler
  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    // Retrieve customer_id from localStorage using CartServices utility key
    const customerId = localStorage.getItem("kithula_customer_id");

    if (!customerId) {
      toast.error("Customer session expired or invalid. Please try adding items to your cart again.");
      return;
    }

    // Construct full payload expected by backend
    const orderPayload = {
      customer_id: customerId,
      customer_name: formData.customer_name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      address_line1: formData.address_line1.trim(),
      address_line2: formData.address_line2.trim() || "",
      district: formData.district.trim(),
      postal_code: formData.postal_code.trim(),
      notes: formData.notes.trim() || "",
      payment_method: selectedPayment,
    };

    try {
      setLoading(true);
      const response = await OrderServices.createOrder(orderPayload);

      if (response && (response.status || response.code === 200)) {
        toast.success("Order placed successfully!");
        setOrderDetails(response.data || null);
        setIsOrderPlaced(true);
      }
    } catch (error) {
      console.error("Order creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (isOrderPlaced) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-sans py-16 px-4 sm:px-8 flex items-center justify-center">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 sm:p-12 max-w-2xl w-full text-center shadow-lg space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <FaCheckCircle size={48} />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] bg-[var(--color-background)] px-3 py-1 rounded-full border border-[var(--color-border)]">
              Order Confirmed
            </span>
            <h1 className="text-3xl font-serif font-bold text-[var(--color-text)] mt-3">
              Thank You for Your Order!
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-md mx-auto">
              Your order has been placed successfully. We've received your request and will process your organic Kithul products shortly.
            </p>
          </div>

          {/* Delivery Details Summary */}
          <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl p-5 text-left text-xs space-y-2">
            <h3 className="font-serif font-bold text-sm text-[var(--color-text)] mb-2 border-b border-[var(--color-border)] pb-2">
              Delivery Summary
            </h3>
            <p>
              <strong className="text-[var(--color-text)]">Recipient:</strong> {formData.customer_name}
            </p>
            <p>
              <strong className="text-[var(--color-text)]">Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong className="text-[var(--color-text)]">Payment Method:</strong>{" "}
              {selectedPayment === "cod" ? "Cash on Delivery" : "Online Payment"}
            </p>
            <p>
              <strong className="text-[var(--color-text)]">Address:</strong> {formData.address_line1}
              {formData.address_line2 ? `, ${formData.address_line2}` : ""}, {formData.district}, {formData.postal_code}
            </p>
          </div>

          {/* Continue Shopping Button */}
          <div className="pt-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs uppercase tracking-wider font-semibold rounded-full transition-all shadow-md hover:scale-[1.02]"
            >
              <FaShoppingBag size={14} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // CHECKOUT FORM VIEW
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-sans py-12 px-4 sm:px-8">
      <div className="max-w-[88%] 2xl:max-w-7xl mx-auto space-y-8">
        
        {/* Header & Navigation */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-5">
          <div>
            <Link
              to="/cart"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors mb-2"
            >
              <FaArrowLeft /> Back to Cart
            </Link>
            <h1 className="text-3xl font-serif font-bold text-[var(--color-text)] tracking-wide">
              Checkout
            </h1>
          </div>
        </div>

        {/* Layout Grid */}
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT SIDE: Shipping & Billing Form */}
          <div className="lg:col-span-2 bg-[var(--color-surface)] rounded-3xl p-6 sm:p-8 border border-[var(--color-border)] shadow-sm space-y-6">
            <h2 className="text-xl font-serif font-bold text-[var(--color-text)] border-b border-[var(--color-border)] pb-3">
              Shipping Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)]">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Nimal Perera"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] text-sm focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)]">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 0771234567"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] text-sm focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)]">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="user@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] text-sm focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              {/* Address Line 1 */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)]">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  name="address_line1"
                  value={formData.address_line1}
                  onChange={handleChange}
                  required
                  placeholder="House No, Street Name"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] text-sm focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              {/* Address Line 2 */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)]">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  name="address_line2"
                  value={formData.address_line2}
                  onChange={handleChange}
                  placeholder="Apartment, suite, unit, etc."
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] text-sm focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              {/* District */}
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)]">
                  District *
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Matale / Kandy"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] text-sm focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              {/* Postal Code */}
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)]">
                  Postal Code *
                </label>
                <input
                  type="text"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 21000"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] text-sm focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

              {/* Order Notes */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)]">
                  Special Delivery Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Special instructions for delivery..."
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] text-sm focus:outline-none focus:border-[var(--color-primary)]"
                ></textarea>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Summary & Place Order Action */}
          <div className="bg-[var(--color-surface)] rounded-3xl p-6 border border-[var(--color-border)] shadow-sm space-y-6 sticky top-24">
            <h2 className="text-lg font-serif font-bold text-[var(--color-text)] border-b border-[var(--color-border)] pb-3">
              Order Summary
            </h2>

            {/* Itemized Overview */}
            <div className="space-y-3 text-xs max-h-52 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.cart_item_id} className="flex justify-between items-center text-[var(--color-text-secondary)]">
                  <span className="truncate pr-2 max-w-[180px]">
                    {item.product_name} <span className="font-semibold">x{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-[var(--color-text)] shrink-0">
                    LKR {Number(item.subtotal).toLocaleString()}.00
                  </span>
                </div>
              ))}
            </div>

            {/* Grand Total */}
            <div className="border-t border-[var(--color-border)] pt-4 flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)]">
                Grand Total
              </span>
              <strong className="text-2xl font-bold text-[var(--color-primary)]">
                LKR {Number(grandTotal).toLocaleString()}.00
              </strong>
            </div>

            {/* PAYMENT METHOD SELECTION */}
            <div className="border-t border-[var(--color-border)] pt-4 space-y-3">
              <span className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)] block">
                Select Payment Method
              </span>

              <div className="grid grid-cols-2 gap-3">
                
                {/* 1. Cash On Delivery (Selected by Default) */}
                <button
                  type="button"
                  onClick={() => setSelectedPayment("cod")}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer relative ${
                    selectedPayment === "cod"
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-sm"
                      : "border-[var(--color-border)] bg-[var(--color-background)] hover:border-[var(--color-text-secondary)]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <FaMoneyBillWave className={selectedPayment === "cod" ? "text-[var(--color-primary)]" : "text-[var(--color-text-secondary)]"} size={18} />
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedPayment === "cod" ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "border-[var(--color-border)]"
                    }`}>
                      {selectedPayment === "cod" && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[var(--color-text)] leading-tight">
                    Cash on Delivery
                  </span>
                </button>

                {/* 2. Online Payment (Disabled) */}
                <div
                  className="p-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] opacity-50 cursor-not-allowed text-left flex flex-col justify-between relative"
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <FaCreditCard className="text-[var(--color-text-secondary)]" size={18} />
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                      Soon
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[var(--color-text-secondary)] leading-tight">
                    Card Payment
                  </span>
                </div>

              </div>

              {/* COD Handling Note */}
              <p className="text-[11px] text-[var(--color-text-secondary)] flex items-start gap-1.5 pt-1">
                <FaInfoCircle size={12} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                <span>Note: A small Cash on Delivery (COD) handling fee may apply upon delivery.</span>
              </p>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs uppercase tracking-wider font-semibold rounded-full transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
            >
              <FaCheckCircle size={14} />
              <span>{loading ? "Placing Order..." : "Confirm & Place Order"}</span>
            </button>

            <p className="text-[11px] text-center text-[var(--color-text-secondary)] flex items-center justify-center gap-1">
              <FaLock size={10} /> Secure checkout process
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}