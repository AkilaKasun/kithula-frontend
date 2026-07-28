import React from 'react';

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="group bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image Container with Fallback */}
      <div className="relative h-72 overflow-hidden bg-gray-100 flex items-center justify-center">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            console.error(`S3 image load blocked/failed for: ${product.image_url}`);
            e.target.onerror = null; 
            e.target.src = "https://placehold.co/600x400?text=Image+Access+Blocked";
          }}
        />
        {/* <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[var(--color-text)] text-xs px-3 py-1 rounded-full font-semibold">
          ★ 5.0
        </span> */}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <p className="text-xs text-[var(--color-text-secondary)] uppercase tracking-wider">
            {product.category || "Organic"}
          </p>
          <h3 className="text-xl font-serif text-[var(--color-text)] mt-1 mb-2 font-medium">
            {product.name}
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
          <div>
            <span className="text-xs text-[var(--color-text-secondary)]">Price</span>
            <p className="text-lg font-bold text-[var(--color-primary)]">
              LKR {Number(product.price).toLocaleString()}.00
            </p>
          </div>
          <button className="px-5 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm rounded-xl font-medium transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}