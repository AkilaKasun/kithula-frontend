import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaShoppingCart, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CartServices from '../../services/cart.service'; // Adjust path as needed

export default function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);

  if (!product) return null;

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevents triggering parent link navigations

    if (product.is_active === false) {
      toast.error("This product is currently out of stock.");
      return;
    }

    try {
      setIsAdding(true);

      // Call API directly using CartServices
      await CartServices.addToCart(product.product_id || product.id, 1);

      // Dispatch a custom browser event so Navbar knows to fetch updated count immediately
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (error) {
      console.error("Failed to add item to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Section: Image & Content */}
      <div>
        {/* Image Container with Fallback */}
        <div className="relative h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              console.error(`Image load failed for: ${product.image_url}`);
              e.target.onerror = null; 
              e.target.src = "https://placehold.co/600x400?text=Image+Not+Found";
            }}
          />
        </div>

        {/* Card Body */}
        <div className="p-5">
          <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider font-semibold">
            {product.category || "Organic"}
          </p>
          <h3 className="text-lg font-serif text-[var(--color-text)] mt-1 mb-2 font-bold line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Bottom Section: Price & Action Buttons */}
      <div className="p-5 pt-0">
        <div className="mb-4 pt-3 border-t border-[var(--color-border)] flex items-baseline justify-between">
          <span className="text-xs text-[var(--color-text-secondary)] uppercase font-medium">
            Price
          </span>
          <p className="text-lg font-bold text-[var(--color-primary)]">
            LKR {Number(product.price || 0).toLocaleString()}.00
          </p>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* View Product Button */}
          <Link
            to={`/products/${product.product_id}`}
            className="w-full py-2.5 px-3 bg-[var(--color-background)] hover:bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] text-xs uppercase tracking-wider font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm text-center"
          >
            <FaEye size={13} className="text-[var(--color-accent)]" />
            <span>View</span>
          </Link>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full py-2.5 px-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-xs uppercase tracking-wider font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-60"
          >
            {isAdding ? (
              <FaSpinner size={13} className="animate-spin" />
            ) : (
              <FaShoppingCart size={13} />
            )}
            <span>{isAdding ? "Adding..." : "Add"}</span>
          </button>
        </div>
      </div>

    </div>
  );
}