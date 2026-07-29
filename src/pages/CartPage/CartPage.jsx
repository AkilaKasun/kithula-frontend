import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaShoppingBag, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import CartServices from "../../services/cart.service"; // Adjust path to your services folder

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch cart data on component mount
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await CartServices.getCartItems();
      
      // Response structure: response.data contains { cart_id, customer_id, items, grand_total }
      if (response && response.data) {
        setCart(response.data);
      } else {
        setCart(null);
      }
    } catch (error) {
      console.error("Failed to load cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Delete Cart Item Handler
  const handleDeleteItem = async (cartItemId, productName) => {
    try {
      // Calls API to remove item (or update state)
      // await CartServices.removeFromCart(cartItemId);
      
      // Optimistic state update or re-fetch
      setCart((prevCart) => {
        if (!prevCart) return null;
        const updatedItems = prevCart.items.filter(
          (item) => item.cart_item_id !== cartItemId
        );
        const newGrandTotal = updatedItems.reduce(
          (sum, item) => sum + Number(item.subtotal),
          0
        );
        return {
          ...prevCart,
          items: updatedItems,
          grand_total: newGrandTotal,
        };
      });

      toast.success(`Removed "${productName}" from cart`);
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error("Could not remove item from cart");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] py-16 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-center">
        <div className="animate-pulse space-y-6 w-full max-w-5xl">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-28 bg-gray-200 rounded-2xl"></div>
              <div className="h-28 bg-gray-200 rounded-2xl"></div>
            </div>
            <div className="h-64 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  const items = cart?.items || [];
  const grandTotal = cart?.grand_total || 0;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] py-20 px-4 text-center flex flex-col items-center justify-center">
        <div className="bg-[var(--color-surface)] p-6 rounded-full border border-[var(--color-border)] mb-4 text-[var(--color-accent)]">
          <FaShoppingBag size={40} />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[var(--color-text)] mb-2">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-[var(--color-text-secondary)] text-sm mb-6 max-w-md">
          Looks like you haven't added any organic Kithul products to your cart yet.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider rounded-full font-semibold hover:bg-[var(--color-primary-dark)] transition-all shadow-md"
        >
          <FaArrowLeft /> Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-sans py-12 px-4 sm:px-8">
      <div className="max-w-[88%] 2xl:max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-5">
          <h1 className="text-3xl font-serif font-bold text-[var(--color-text)] tracking-wide">
            Your Shopping Cart
          </h1>
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] bg-[var(--color-surface)] px-3 py-1.5 rounded-full border border-[var(--color-border)]">
            {items.length} {items.length === 1 ? "Item" : "Items"}
          </span>
        </div>

        {/* Layout Grid: Left (Items List) | Right (Summary & Checkout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT SIDE: Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.cart_item_id}
                className="bg-[var(--color-surface)] rounded-2xl p-4 sm:p-5 border border-[var(--color-border)] shadow-sm flex items-center justify-between gap-4 transition-all hover:shadow-md"
              >
                {/* Product Thumbnail & Basic Info */}
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={encodeURI(item.image_url)}
                    alt={item.product_name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] shrink-0"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/150?text=Product";
                    }}
                  />
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[var(--color-text)] truncate">
                      {item.product_name}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                      Unit Price: <span className="font-semibold text-[var(--color-text)]">LKR {Number(item.unit_price).toLocaleString()}.00</span>
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                      Quantity: <span className="font-semibold text-[var(--color-text)]">{item.quantity}</span>
                    </p>
                  </div>
                </div>

                {/* Subtotal & Delete Action */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-text-secondary)] block">
                      Subtotal
                    </span>
                    <strong className="text-sm sm:text-base font-bold text-[var(--color-primary)]">
                      LKR {Number(item.subtotal).toLocaleString()}.00
                    </strong>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteItem(item.cart_item_id, item.product_name)}
                    className="p-2.5 text-rose-500 hover:text-white hover:bg-rose-500 bg-rose-50 border border-rose-200 rounded-xl transition-all cursor-pointer"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <FaTrash size={13} />
                  </button>
                </div>
              </div>
            ))}

            {/* Navigation back to shop */}
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
              >
                <FaArrowLeft /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: Order Summary & Checkout */}
          <div className="bg-[var(--color-surface)] rounded-3xl p-6 border border-[var(--color-border)] shadow-sm space-y-6 sticky top-24">
            <h2 className="text-lg font-serif font-bold text-[var(--color-text)] border-b border-[var(--color-border)] pb-3">
              Order Summary
            </h2>

            {/* Breakdown List */}
            <div className="space-y-3 text-xs">
              {items.map((item) => (
                <div
                  key={item.cart_item_id}
                  className="flex justify-between items-center text-[var(--color-text-secondary)]"
                >
                  <span className="truncate pr-2 max-w-[180px]">
                    {item.product_name} <span className="font-semibold">x{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-[var(--color-text)] shrink-0">
                    LKR {Number(item.subtotal).toLocaleString()}.00
                  </span>
                </div>
              ))}
            </div>

            {/* Grand Total Bar */}
            <div className="border-t border-[var(--color-border)] pt-4 flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)]">
                Grand Total
              </span>
              <strong className="text-2xl font-bold text-[var(--color-primary)]">
                LKR {Number(grandTotal).toLocaleString()}.00
              </strong>
            </div>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              className="w-full py-3.5 px-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs uppercase tracking-wider font-semibold rounded-full transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.01]"
            >
              <span>Proceed to Checkout</span>
              <FaArrowRight size={12} />
            </Link>

            {/* Payment & Security note */}
            <p className="text-[11px] text-center text-[var(--color-text-secondary)]">
              🔒 Safe & Secure Checkout Guaranteed
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}