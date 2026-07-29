import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductServices from "../../services/product.service";
import { 
  FaShoppingCart, 
  FaMinus, 
  FaPlus, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaTimesCircle,
  FaShieldAlt,
  FaTruck
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const params = useParams();
 
  const productId = params.id || params.product_id || params.productId;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) {
        console.error("No product ID found in URL parameters:", params);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching product details for ID:", productId);
        const data = await ProductServices.getProductById(productId);
        
        if (data && data.image_url) {
          data.image_url = encodeURI(data.image_url);
        }
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    const maxStock = product?.stock || 99;
    if (quantity < maxStock) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.info(`Maximum available stock reached (${maxStock}).`);
    }
  };

  const handleAddToCart = () => {
    if (!product?.is_active) {
      toast.error("This product is currently out of stock.");
      return;
    }
    toast.success(`Added ${quantity} x "${product.name}" to cart!`);
  };

  const calculateTotal = () => {
    if (!product?.price) return 0;
    return Number(product.price) * quantity;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] py-16 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-center">
        <div className="animate-pulse space-y-8 w-full max-w-5xl">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="h-96 bg-gray-200 rounded-3xl"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] py-20 px-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-[var(--color-text)] mb-4">
          Product Not Found
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          The requested product details could not be loaded or may no longer exist.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          <FaArrowLeft /> Back to Products
        </Link>
      </div>
    );
  }

  const isAvailable = Boolean(product.is_active);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-sans py-12 px-4 sm:px-8">
      <div className="max-w-[88%] 2xl:max-w-7xl mx-auto space-y-8">
        
        {/* Back Navigation Button */}
        <div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <FaArrowLeft /> Back to Products
          </Link>
        </div>

        {/* Product Details Card */}
        <div className="bg-[var(--color-surface)] rounded-3xl p-6 sm:p-10 border border-[var(--color-border)] shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          {/* Left: Product Image */}
          <div className="relative rounded-2xl overflow-hidden bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center min-h-[380px] max-h-[500px]">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/500?text=Product+Image";
                }}
              />
            ) : (
              <span className="text-gray-400 text-sm">No Image Available</span>
            )}

            {/* Category Tag Overlay */}
            {product.category && (
              <span className="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                {product.category}
              </span>
            )}
          </div>

          {/* Right: Product Info & Actions */}
          <div className="space-y-6">
            
            {/* Title & Availability Badge */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                {isAvailable ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    <FaCheckCircle className="text-emerald-500" /> In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                    <FaTimesCircle className="text-rose-500" /> Out of Stock
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--color-text)] tracking-wide">
                {product.name}
              </h1>
            </div>

            {/* Price Tag */}
            <div className="flex items-baseline gap-3 border-b border-[var(--color-border)] pb-4">
              <span className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)]">
                LKR {Number(product.price || 0).toLocaleString()}
              </span>
              <span className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider font-semibold">
                Per Unit
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)] mb-2">
                Description
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] bg-[var(--color-background)] p-4 rounded-xl border border-[var(--color-border)]">
                {product.description || "No product description provided."}
              </p>
            </div>

            {/* Quantity Selector & Live Total Price Calculation */}
            <div className="space-y-3 pt-2">
              <label className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)] block">
                Select Quantity
              </label>
              
              <div className="flex items-center gap-4">
                {/* Plus / Minus Control */}
                <div className="flex items-center border border-[var(--color-border)] rounded-full bg-[var(--color-background)] p-1 shadow-inner">
                  <button
                    onClick={handleDecrease}
                    disabled={!isAvailable || quantity <= 1}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs text-[var(--color-text)] hover:bg-[var(--color-surface)] disabled:opacity-40 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-[var(--color-text)]">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    disabled={!isAvailable || quantity >= (product.stock || 99)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs text-[var(--color-text)] hover:bg-[var(--color-surface)] disabled:opacity-40 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                  </button>
                </div>

                {/* Live Computed Total Display */}
                <div className="text-sm">
                  <span className="text-xs text-[var(--color-text-secondary)] block uppercase tracking-wider font-semibold">
                    Total Amount
                  </span>
                  <strong className="text-xl font-bold text-[var(--color-accent)]">
                    LKR {calculateTotal().toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className={`w-full py-3.5 px-6 rounded-full font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-3 shadow-md transition-all ${
                  isAvailable
                    ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] hover:scale-[1.01] cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                }`}
              >
                <FaShoppingCart size={15} />
                <span>{isAvailable ? "Add to Cart" : "Currently Unavailable"}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-[var(--color-accent)]" />
                <span>100% Pure & Authentic Kithul</span>
              </div>
              <div className="flex items-center gap-2">
                <FaTruck className="text-[var(--color-accent)]" />
                <span>Islandwide Delivery Available</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}