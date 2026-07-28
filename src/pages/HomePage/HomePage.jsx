import React, { useEffect, useState } from "react";
import ProductServices from "../../services/product.service";
import bannerImg from "../../assets/Banner_image.png";
import ProductCard from "../../components/products/ProductCard"; 

// Sample gallery data for Kithula Grand
const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1000',
    title: 'Traditional Tapping',
    desc: 'Harvested directly from forest palms in Sri Lanka',
  },
  {
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000',
    title: 'Pure Craftsmanship',
    desc: 'Slow-boiled without added artificial preservatives or sugar',
  },
  {
    url: 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&q=80&w=1000',
    title: 'Kithula Grand Estate',
    desc: 'Experience natural sweetness refined over generations',
  },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-sans">
      
      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col justify-between p-6 sm:p-12 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${bannerImg})`
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

        <div className="relative z-10 max-w-4xl mx-auto text-center my-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-sm tracking-wide">
            <span className="text-[var(--color-accent)]">★★★★★</span>
            <span className="text-white/90 font-medium">100% PURE & ORGANIC</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-light tracking-tight leading-[1.1]">
            Taste The Pure <br />
            <span className="italic font-serif text-[var(--color-accent)]">Golden Nectar.</span>
          </h1>

          <p className="max-w-xl mx-auto text-lg sm:text-xl text-white/80 font-light leading-relaxed">
            Sourced directly from the lush central highlands of Sri Lanka. 
            Traditional, unrefined, and crafted with timeless passion.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl">
              Shop Natural Products
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white rounded-full font-medium transition-all">
              Discover Kithula Grand
            </button>
          </div>
        </div>

        <div className="relative z-10 text-center pb-4 text-xs tracking-widest uppercase text-white/60">
          Scroll To Explore
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[var(--color-border)] pb-8">
          <div>
            <span className="text-[var(--color-secondary)] font-medium text-sm tracking-widest uppercase">
              Selected Harvest
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif text-[var(--color-text)] mt-2">
              Featured Products
            </h2>
          </div>
          <p className="text-[var(--color-text-secondary)] max-w-md mt-4 md:mt-0">
            Hand-crafted in small batches to preserve original taste, aroma, and rich nutrients.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse bg-[var(--color-surface)] h-96 rounded-2xl border border-[var(--color-border)]"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-text-secondary)]">
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

      {/* KITHULA GRAND SECTION */}
      <section className="bg-[var(--color-primary)] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[var(--color-accent)] tracking-widest text-sm uppercase font-medium">
              The Experience
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif leading-tight">
              Kithula Grand
            </h2>
            <p className="text-white/80 font-light">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-serif text-[var(--color-accent)]">
                    {img.title}
                  </h3>
                  <p className="text-sm text-white/80 mt-1 font-light">
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