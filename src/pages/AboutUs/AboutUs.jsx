import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaAward, 
  FaLeaf, 
  FaHistory, 
  FaHeart, 
  FaCheckCircle, 
  FaArrowRight,
  FaTrophy
} from "react-icons/fa";

// Key Products Overview
const PRODUCTS_OVERVIEW = [
  {
    id: 1,
    title: "Pure Kithul Treacle",
    desc: "100% natural golden nectar tapped directly from wild central highland palms.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Artisanal Kithul Jaggery",
    desc: "Unrefined solid sweet blocks crafted through slow traditional open-pan boiling.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Kithul-Infused Chocolates",
    desc: "Rich cocoa paired with natural palm sugar for a guilt-free gourmet indulgence.",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Curd & Dessert Toppings",
    desc: "Traditional companion syrups refined to elevate Sri Lankan dairy & desserts.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800",
  },
];

// Timeline Journey Data
const JOURNEY_TIMELINE = [
  {
    year: "2021",
    title: "The Seeds Were Planted",
    desc: "Kithula was founded with a mission to preserve traditional Sri Lankan palm tapping methods and bring unadulterated organic sweeteners to modern homes.",
  },
  {
    year: "2023",
    title: "Highland Tappers Network",
    desc: "Expanded direct partnerships with over 50 rural village tappers in Matale and central forests, guaranteeing fair wages and ethical harvesting.",
  },
  {
    year: "2024",
    title: "Product Innovation",
    desc: "Introduced Kithul-infused gourmet chocolates and eco-friendly glass packaging, reaching organic stores across Sri Lanka.",
  },
  {
    year: "2025 - Present",
    title: "National Recognition & Export Quality",
    desc: "Awarded national accolades for organic excellence and sustainability, now expanding footprint to sweet lovers worldwide.",
  },
];

// Detailed Achievements & Awards with Alternating Image Layout
const DETAILED_ACHIEVEMENTS = [
  {
    id: 1,
    badge: "2024 Award Winner",
    title: "Best Organic Food Producer Award",
    issuer: "Sri Lanka Agro Innovation Excellence Awards",
    desc: "Recognized as the leading organic sweetener brand in Sri Lanka for maintaining strict 100% pure sap harvesting standards without synthetic additives, artificial sugars, or chemical preservatives.",
    image: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    badge: "Certified Excellence",
    title: "100% Pure Highland Sap Certification",
    issuer: "Highland Sustainable Farmers Guild",
    desc: "Certified for establishing an ethical, eco-conscious supply chain directly empowering over 50 traditional forest tapping families across the central highlands of Sri Lanka.",
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    badge: "Gold Standard",
    title: "National Quality & Safety Gold Medal",
    issuer: "Sri Lanka Food & Beverage Association",
    desc: "Awarded for exceptional hygienic open-pan boiling techniques, sustainable eco-packaging standards, and continuous commitment to preserving Sri Lanka's heritage taste.",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800",
  },
];

export default function AboutUs() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-sans">
      
      {/* HERO / HEADER BANNER */}
      <section className="relative py-24 px-6 bg-[var(--color-surface)] border-b border-[var(--color-border)] text-center overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[var(--color-accent)] bg-[var(--color-background)] px-4 py-1.5 rounded-full border border-[var(--color-border)]">
            Est. 2021 • Pure Highland Craft
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[var(--color-text)] tracking-wide">
            Our Story & Heritage
          </h1>
          <p className="text-base sm:text-xl text-[var(--color-text-secondary)] font-light leading-relaxed max-w-2xl mx-auto">
            Bringing Sri Lanka’s ancient golden nectar from wild highland palms directly to your table with uncompromised purity.
          </p>
        </div>
      </section>

      {/* BRAND ORIGIN & VISION */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Image Stack */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-xl max-h-[480px]">
              <img
                src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1000"
                alt="Forest Palm Tapping"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Stat Floating Card */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-[var(--color-primary)] text-white p-6 rounded-2xl shadow-xl space-y-1">
              <span className="text-3xl font-serif font-bold text-[var(--color-accent)]">5+ Years</span>
              <p className="text-xs uppercase tracking-wider font-semibold">Of Pure Excellence</p>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="space-y-6 text-left">
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)]">
              Since 2021
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-semibold leading-tight text-[var(--color-text)]">
              Crafted With Tradition, Rooted In Nature
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]">
              Founded in **2021**, **Kithula** started with a clear dream: to protect Sri Lanka’s traditional Kithul tapping heritage while giving health-conscious families a 100% natural, chemical-free sweetener alternative.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]">
              We work directly with traditional village tappers in the lush central forests of Matale. By cutting out industrial processors, we preserve the authentic floral aroma, deep amber color, and rich minerals of fresh sap.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 bg-[var(--color-surface)] p-3.5 rounded-xl border border-[var(--color-border)]">
                <FaLeaf className="text-[var(--color-primary)]" size={20} />
                <span className="text-xs font-bold text-[var(--color-text)]">100% Pure Organic</span>
              </div>
              <div className="flex items-center gap-3 bg-[var(--color-surface)] p-3.5 rounded-xl border border-[var(--color-border)]">
                <FaHeart className="text-[var(--color-primary)]" size={20} />
                <span className="text-xs font-bold text-[var(--color-text)]">Fair Trade Sourced</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PRODUCT LINEUP DISPLAY */}
      <section className="py-16 px-6 bg-[var(--color-surface)] border-t border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)]">
              Pure Offerings
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--color-text)]">
              What We Produce
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
              Every jar and treat is prepared in small artisanal batches to deliver authentic taste.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS_OVERVIEW.map((item) => (
              <div
                key={item.id}
                className="bg-[var(--color-background)] rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2 text-left flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[var(--color-text)]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-primary)] text-white text-xs uppercase tracking-wider rounded-full font-semibold hover:bg-[var(--color-primary-dark)] transition-all shadow-md"
            >
              <span>Explore All Products</span>
              <FaArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* OUR JOURNEY / TIMELINE */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)]">
            Our Growth
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--color-text)]">
            Our Journey Since 2021
          </h2>
        </div>

        <div className="relative border-l-2 border-[var(--color-border)] ml-4 sm:ml-32 space-y-12 text-left">
          {JOURNEY_TIMELINE.map((milestone, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-12 group">
              {/* Year Marker Badge */}
              <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[var(--color-primary)] text-white border-4 border-[var(--color-background)] flex items-center justify-center text-xs font-bold shadow-md">
                ✓
              </div>

              {/* Year Label (Desktop) */}
              <span className="hidden sm:block absolute -left-28 top-1 text-sm font-bold text-[var(--color-primary)]">
                {milestone.year}
              </span>

              <div className="bg-[var(--color-surface)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm">
                <span className="sm:hidden text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] block mb-1">
                  {milestone.year}
                </span>
                <h3 className="text-xl font-serif font-bold text-[var(--color-text)]">
                  {milestone.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed mt-2">
                  {milestone.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ALTERNATING ACHIEVEMENTS & AWARDS SECTION */}
      <section className="py-20 px-6 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--color-secondary)]">
              Excellence & Trust
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--color-text)]">
              Recognized Achievements & Awards
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
              Honored nationally for maintaining strict organic standards and supporting traditional tappers.
            </p>
          </div>

          {/* Alternating Award Cards */}
          <div className="space-y-16">
            {DETAILED_ACHIEVEMENTS.map((award, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={award.id}
                  className={`flex flex-col lg:flex-row items-center gap-10 bg-[var(--color-background)] p-6 sm:p-10 rounded-3xl border border-[var(--color-border)] shadow-sm transition-all hover:shadow-md ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Side */}
                  <div className="w-full lg:w-1/2 h-72 sm:h-80 rounded-2xl overflow-hidden border border-[var(--color-border)] relative shrink-0">
                    <img
                      src={award.image}
                      alt={award.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[var(--color-primary)] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {award.badge}
                    </div>
                  </div>

                  {/* Description Side */}
                  <div className="w-full lg:w-1/2 space-y-4 text-left">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] shadow-sm">
                      <FaTrophy size={20} />
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)] block">
                      {award.issuer}
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-text)]">
                      {award.title}
                    </h3>

                    <p className="text-xs sm:text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {award.desc}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[var(--color-primary)]">
                      <FaCheckCircle className="text-[var(--color-accent)]" />
                      <span>Verified National Honor</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}