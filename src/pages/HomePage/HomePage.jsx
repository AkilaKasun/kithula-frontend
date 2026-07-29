import React, { useEffect, useState } from "react";
import ProductServices from "../../services/product.service";
import bannerImg from "../../assets/Banner_image.jpg";
import ProductCard from "../../components/products/ProductCard";

// Category Data for Kithula Products
const POPULAR_CATEGORIES = [
  {
    id: "kithul-chocolate",
    name: "Kithul Chocolate",
    desc: "Rich, velvety cocoa infused with natural Kithul sweetness.",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "yogurt",
    name: "Yogurt",
    desc: "Creamy traditional curd & yogurt topped with golden Kithul syrup.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "biscuits",
    name: "Biscuits",
    desc: "Crisp baked treats made with authentic Kithul jaggery.",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800",
  },
];

// Product Slider Data (Between Categories and Products)
const SLIDER_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=1600",
    title: "100% Organic Treacle",
    subtitle: "Pure golden goodness tapped directly from wild palms.",
  },
  {
    url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=1600",
    title: "Artisanal Kithul Jaggery",
    subtitle: "Solidified sweet delight crafted through traditional boiling methods.",
  },
  {
    url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=1600",
    title: "Infused Gourmet Treats",
    subtitle: "Elevate your desserts with Sri Lanka's finest natural sweetener.",
  },
];

// Customer Feedbacks Data
const CUSTOMER_FEEDBACKS = [
  {
    id: 1,
    name: "Nimali Perera",
    role: "Verified Buyer",
    rating: 5,
    comment:
      "The authenticity of Kithula's treacle is unmatched. It reminds me of the traditional Kithul we used to get directly from the village tappers!",
  },
  {
    id: 2,
    name: "Kasun Jayawardena",
    role: "Chef & Food Specialist",
    rating: 5,
    comment:
      "We use Kithula jaggery and syrup across our dessert menus. Pure quality, no artificial sugar, and rich natural aroma every single time.",
  },
  {
    id: 3,
    name: "Dilini Fernando",
    role: "Regular Customer",
    rating: 5,
    comment:
      "Fast delivery and exceptional packaging. The Kithul-infused chocolates and curd toppings have become a household favorite!",
  },
];

// Sample gallery data for Kithula Grand
const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1000",
    title: "Traditional Tapping",
    desc: "Harvested directly from forest palms in Sri Lanka",
  },
  {
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000",
    title: "Pure Craftsmanship",
    desc: "Slow-boiled without added artificial preservatives or sugar",
  },
  {
    url: "https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&q=80&w=1000",
    title: "Kithula Grand Estate",
    desc: "Experience natural sweetness refined over generations",
  },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductServices.getAllProducts();
        setProducts(data || []);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Auto-slide effect for product showcase carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-sans">
      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col justify-between p-6 sm:p-12 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${bannerImg})`,
          }}
        />

        <div className="relative z-10 flex justify-between items-center max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-wider uppercase font-serif text-[var(--color-accent)]">
              KITHULA
            </span>
          </div>
          <button className="hidden sm:inline-block bg-white/10 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-full hover:bg-white hover:text-[var(--color-text)] transition-all duration-300 font-medium">
            Explore Collection →
          </button>
        </div>

        {/* Hero Left Aligned Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-sm tracking-wide">
            <span className="text-[var(--color-accent)]">★★★★★</span>
            <span className="text-white/90 font-medium">100% PURE & ORGANIC</span>
          </div>

          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-serif font-light tracking-tight leading-[1.05]">
            Taste The Pure <br />
            <span className="italic font-serif text-[var(--color-accent)]">
              Golden Nectar.
            </span>
          </h1>

          <p className="max-w-xl text-lg sm:text-2xl text-white/90 font-light leading-relaxed">
            Sourced directly from the lush central highlands of Sri Lanka.
            Traditional, unrefined, and crafted with timeless passion.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl text-base">
              Shop Natural Products
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white rounded-full font-medium transition-all text-base">
              Discover Kithula Grand
            </button>
          </div>
        </div>

        <div className="relative z-10 text-left max-w-7xl mx-auto w-full pb-4 text-xs tracking-widest uppercase text-white/60">
          Scroll To Explore
        </div>
      </section>

      {/* POPULAR CATEGORIES SECTION */}
      <section className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <div className="text-left max-w-3xl mb-14 space-y-3">
          <span className="text-[var(--color-secondary)] font-medium text-sm sm:text-base tracking-widest uppercase">
            Browse By Category
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif text-[var(--color-text)] font-semibold">
            Popular Categories
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base sm:text-lg">
            Discover our special range of handcrafted treats enriched with pure Kithul.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {POPULAR_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group relative h-96 rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-[var(--color-border)] cursor-pointer transition-all duration-500"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-8 flex flex-col justify-end text-left">
                <h3 className="text-3xl font-serif text-white font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-white/80 mt-2 font-light leading-relaxed">
                  {cat.desc}
                </p>
                <div className="mt-4 text-xs uppercase tracking-wider font-semibold text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore Category →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT IMAGE SLIDER */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="relative h-[450px] sm:h-[520px] w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--color-border)]">
          {SLIDER_IMAGES.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent p-8 sm:p-20 flex flex-col justify-center max-w-3xl text-white text-left">
                <span className="text-[var(--color-accent)] font-medium text-xs sm:text-sm tracking-widest uppercase mb-3">
                  Featured Craft
                </span>
                <h3 className="text-4xl sm:text-6xl font-serif leading-tight">
                  {slide.title}
                </h3>
                <p className="mt-4 text-base sm:text-xl text-white/80 font-light leading-relaxed">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}

          {/* Slider Navigation Dots */}
          <div className="absolute bottom-6 right-6 z-20 flex gap-2">
            {SLIDER_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "w-8 bg-[var(--color-accent)]"
                    : "w-2.5 bg-white/50 hover:bg-white"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[var(--color-border)] pb-8 text-left">
          <div>
            <span className="text-[var(--color-secondary)] font-medium text-sm sm:text-base tracking-widest uppercase">
              Selected Harvest
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif text-[var(--color-text)] font-semibold mt-2">
              Featured Products
            </h2>
          </div>
          <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-md mt-4 md:mt-0">
            Hand-crafted in small batches to preserve original taste, aroma, and rich nutrients.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="animate-pulse bg-[var(--color-surface)] h-96 rounded-2xl border border-[var(--color-border)]"
              ></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-left py-12 text-[var(--color-text-secondary)] text-base">
            No products available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* CUSTOMER FEEDBACKS SECTION */}
      <section className="py-24 px-6 bg-[var(--color-surface)] border-t border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-left max-w-3xl mb-16 space-y-3">
            <span className="text-[var(--color-secondary)] font-medium text-sm sm:text-base tracking-widest uppercase">
              Customer Love
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif text-[var(--color-text)] font-semibold">
              What Our Clients Say
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base sm:text-lg">
              Read honest stories and feedback from pure Kithul enthusiasts across Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CUSTOMER_FEEDBACKS.map((review) => (
              <div
                key={review.id}
                className="bg-[var(--color-background)] p-8 rounded-2xl border border-[var(--color-border)] shadow-sm flex flex-col justify-between space-y-4 text-left"
              >
                <div className="space-y-3">
                  <div className="text-[var(--color-accent)] text-xl">
                    {"★".repeat(review.rating)}
                  </div>
                  <p className="text-base text-[var(--color-text-secondary)] italic leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--color-border)]">
                  <h4 className="font-serif font-semibold text-lg text-[var(--color-text)]">
                    {review.name}
                  </h4>
                  <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider font-medium mt-0.5">
                    {review.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KITHULA GRAND SECTION */}
      <section className="bg-[var(--color-primary)] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-left max-w-3xl mb-16 space-y-4">
            <span className="text-[var(--color-accent)] tracking-widest text-sm sm:text-base uppercase font-medium">
              The Experience
            </span>
            <h2 className="text-5xl sm:text-7xl font-serif font-semibold leading-tight">
              Kithula Grand
            </h2>
            <p className="text-white/80 font-light text-base sm:text-lg leading-relaxed">
              Explore the heritage, tradition, and sustainable forest tapping methods that make our sap uniquely rich and flavorful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GALLERY_IMAGES.map((img, index) => (
              <div
                key={index}
                className="relative group h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end text-left">
                  <h3 className="text-2xl font-serif text-[var(--color-accent)] font-semibold">
                    {img.title}
                  </h3>
                  <p className="text-sm text-white/80 mt-1.5 font-light leading-relaxed">
                    {img.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}