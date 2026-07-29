import React from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-background,#fdfbf7)] text-[var(--color-text,#2c221e)] transition-all duration-500">
      {/* Glow Backdrop */}
      <div className="absolute h-72 w-72 rounded-full bg-[var(--color-accent,#e0a96d)]/20 blur-3xl animate-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Animated Droplet Logo / Icon */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full border-2 border-t-[var(--color-accent,#e0a96d)] border-r-transparent border-b-[var(--color-primary,#4a3228)] border-l-transparent animate-spin" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl animate-bounce">
              🍯
            </span>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-widest text-[var(--color-primary,#4a3228)] uppercase mb-2">
          KITHULA
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm uppercase tracking-widest text-[var(--color-text-secondary,#7c6d66)] font-semibold mb-6">
          Pure Sri Lankan Kithul
        </p>

        {/* Animated Loading Indicator Bar */}
        <div className="w-48 h-1 bg-[var(--color-border,#e5ded6)] rounded-full overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-[var(--color-secondary,#b85d19)] to-[var(--color-accent,#e0a96d)] rounded-full animate-loading-bar" />
        </div>

        <p className="mt-4 text-xs italic text-[var(--color-text-secondary,#7c6d66)]">
          Gathering pure golden nectar...
        </p>
      </div>
    </div>
  );
}