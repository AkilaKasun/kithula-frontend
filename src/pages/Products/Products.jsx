import React, { useEffect, useState, useMemo } from "react";
import ProductServices from "../../services/product.service";
import ProductCard from "../../components/products/ProductCard";
import { FaSearch, FaFilter, FaSortAmountDown, FaMoneyBillWave, FaUndo } from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Sort States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [maxPriceFilter, setMaxPriceFilter] = useState(10000);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductServices.getAllProducts();
        setProducts(data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Dynamically extract unique categories from products list
  const categories = useMemo(() => {
    const unique = new Set(
      products
        .map((p) => p.category || p.category_name)
        .filter(Boolean)
    );
    return ["all", ...Array.from(unique)];
  }, [products]);

  // Compute filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const categoryMatch =
          selectedCategory === "all" ||
          (product.category || product.category_name)?.toLowerCase() ===
            selectedCategory.toLowerCase();

        const searchMatch =
          product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase());

        const priceMatch = Number(product.price || 0) <= maxPriceFilter;

        return categoryMatch && searchMatch && priceMatch;
      })
      .sort((a, b) => {
        const priceA = Number(a.price || 0);
        const priceB = Number(b.price || 0);

        if (sortBy === "price-low-high") return priceA - priceB;
        if (sortBy === "price-high-low") return priceB - priceA;
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, searchQuery, selectedCategory, sortBy, maxPriceFilter]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("default");
    setMaxPriceFilter(10000);
  };

  const isFilterActive =
    selectedCategory !== "all" ||
    sortBy !== "default" ||
    searchQuery !== "" ||
    maxPriceFilter < 10000;

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-sans pb-16">
      
      {/* 100% FULL WIDTH HERO BANNER WITH TOP CENTER SEARCH */}
      <div className="relative w-full bg-black text-white shadow-lg min-h-[420px] flex items-center justify-center mb-12">
        {/* Background Image with Dark Overlay */}
        <img
          src="/images/hero-banner.jpg"
          alt="Kithula Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        
        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 py-16 max-w-4xl space-y-6 w-full">
          <span className="text-[var(--color-secondary)] font-semibold text-xs sm:text-sm tracking-widest uppercase bg-black/40 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md inline-block">
            Pure Sri Lankan Craftsmanship
          </span>
          
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide">
            Our Organic Collection
          </h1>
          
          <p className="text-gray-200 text-sm sm:text-base max-w-xl mx-auto font-light">
            Explore authentic Kithul syrup, jaggery, traditional sweets, and artisanal chocolates.
          </p>

          {/* TOP CENTER SEARCH BAR */}
          <div className="pt-2 max-w-2xl mx-auto w-full">
            <div className="relative flex items-center shadow-2xl rounded-full">
              <FaSearch className="absolute left-5 text-gray-400 text-lg z-10" />
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-13 pr-12 py-4 rounded-full bg-white/95 text-gray-900 placeholder-gray-500 text-sm sm:text-base border-2 border-white/40 focus:outline-none focus:ring-4 focus:ring-[var(--color-accent)]/50 focus:bg-white transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-gray-400 hover:text-gray-700 bg-gray-200/80 hover:bg-gray-300 rounded-full w-7 h-7 flex items-center justify-center text-xs transition-colors"
                  aria-label="Clear Search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Product Names Quick Tags */}
          <div className="pt-2 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {products.length > 0 ? (
              products.slice(0, 6).map((p) => (
                <button
                  key={p.product_id || p.name}
                  onClick={() => setSearchQuery(p.name)}
                  className="text-xs bg-white/15 hover:bg-white/30 backdrop-blur-md text-white/90 font-medium px-3.5 py-1 rounded-full border border-white/25 transition-all cursor-pointer"
                >
                  {p.name}
                </button>
              ))
            ) : (
              <>
                <span className="text-xs bg-white/15 backdrop-blur-md text-white/90 px-3.5 py-1 rounded-full border border-white/25">
                  Kithul Treacle
                </span>
                <span className="text-xs bg-white/15 backdrop-blur-md text-white/90 px-3.5 py-1 rounded-full border border-white/25">
                  Kithul Jaggery
                </span>
                <span className="text-xs bg-white/15 backdrop-blur-md text-white/90 px-3.5 py-1 rounded-full border border-white/25">
                  Kithul Chocolates
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* PAGE CONTENT CONTAINER */}
      <div className="max-w-[88%] 2xl:max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* ENHANCED ATTRACTIVE FILTER CONTROL PANEL */}
        <div className="bg-[var(--color-surface)] rounded-3xl p-6 sm:p-8 border border-[var(--color-border)] shadow-sm mb-10 space-y-6">
          
          {/* CATEGORY SELECTOR PILLS */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)]">
              <FaFilter className="text-[var(--color-accent)]" />
              <span>Browse Categories</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all capitalize cursor-pointer ${
                      isSelected
                        ? "bg-[var(--color-primary)] text-white shadow-md scale-105"
                        : "bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-white"
                    }`}
                  >
                    {cat === "all" ? "All Products" : cat.replace("-", " ")}
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-[var(--color-border)] opacity-60" />

          {/* SECONDARY CONTROLS: SORT & PRICE SLIDER */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
            
            {/* Sort Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)] flex items-center gap-2">
                <FaSortAmountDown className="text-[var(--color-accent)]" />
                <span>Sort By</span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] text-sm font-medium text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] cursor-pointer"
              >
                <option value="default">Featured / Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-asc">Alphabetical (A-Z)</option>
              </select>
            </div>

            {/* Price Filter Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs uppercase tracking-wider font-bold text-[var(--color-text-secondary)]">
                <span className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-[var(--color-accent)]" />
                  <span>Max Price</span>
                </span>
                <span className="text-sm font-bold text-[var(--color-primary)]">
                  LKR {maxPriceFilter.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="accent-[var(--color-accent)] cursor-pointer w-full h-2 rounded-lg bg-[var(--color-border)]"
              />
            </div>

            {/* Clear/Reset Action Button */}
            <div className="flex items-end justify-start lg:justify-end h-full">
              {isFilterActive && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] border border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  <FaUndo size={11} />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RESULTS COUNT & SUMMARY */}
        <div className="mb-6 flex justify-between items-center text-xs tracking-wider uppercase font-semibold text-[var(--color-text-secondary)]">
          <span>Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}</span>
          {searchQuery && (
            <span className="normal-case text-sm font-normal text-[var(--color-text-secondary)]">
              Results for "<strong className="text-[var(--color-text)]">{searchQuery}</strong>"
            </span>
          )}
        </div>

        {/* 4-COLUMN PRODUCTS GRID */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="animate-pulse bg-[var(--color-surface)] h-96 rounded-2xl border border-[var(--color-border)]"
              ></div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[var(--color-surface)] rounded-3xl border border-[var(--color-border)] space-y-4 shadow-sm">
            <p className="text-xl font-serif text-[var(--color-text)]">
              No products match your current search or filters.
            </p>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
              Try searching for broader keywords, adjusting the price slider, or choosing a different category.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[var(--color-primary)] text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity cursor-pointer shadow-md inline-flex items-center gap-2"
            >
              <FaUndo size={11} /> Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}