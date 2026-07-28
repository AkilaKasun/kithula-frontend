import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../../assets/kithula_logo.jpg";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[var(--color-surface)] shadow-md py-3 border-b border-[var(--color-border)]"
          : "bg-black/20 backdrop-blur-md border-b border-white/10 py-5 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src={logo}
              alt="Kithula Logo"
              className="h-12 w-12 rounded-full object-cover border-2 border-[var(--color-accent)] shadow-sm"
            />
            <div>
              <h1
                className={`text-2xl font-bold font-serif tracking-wider transition-colors ${
                  isScrolled ? "text-[var(--color-primary)]" : "text-white"
                }`}
              >
                KITHULA
              </h1>
              <p
                className={`text-[10px] tracking-wide uppercase transition-colors ${
                  isScrolled ? "text-[var(--color-text-secondary)]" : "text-white/80"
                }`}
              >
                Pure Sri Lankan Kithul
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <ul
            className={`hidden md:flex items-center gap-8 font-medium text-sm tracking-wide transition-colors ${
              isScrolled ? "text-[var(--color-text)]" : "text-white/90"
            }`}
          >
            <li className="cursor-pointer hover:text-[var(--color-accent)] transition duration-300">
              Home
            </li>
            <li className="cursor-pointer hover:text-[var(--color-accent)] transition duration-300">
              About Us
            </li>
            <li className="cursor-pointer hover:text-[var(--color-accent)] transition duration-300">
              Products
            </li>
            <li className="cursor-pointer hover:text-[var(--color-accent)] transition duration-300">
              Gallery
            </li>
          </ul>

          {/* Right Action Icons */}
          <div className="flex items-center gap-5">
            {/* Phone (Desktop) */}
            <div
              className={`hidden lg:flex items-center gap-2 font-medium text-sm transition-colors ${
                isScrolled ? "text-[var(--color-primary)]" : "text-white"
              }`}
            >
              <FaPhoneAlt className="text-[var(--color-accent)]" />
              <span>077 456 7890</span>
            </div>

            {/* Shopping Cart Button */}
            <button
              className={`relative p-3 rounded-full transition-all duration-300 ${
                isScrolled
                  ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
                  : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-[var(--color-text)]"
              }`}
            >
              <FaShoppingCart size={18} />

              {/* Cart Badge */}
              <span className="absolute -top-1 -right-1 bg-[var(--color-secondary)] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                0
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg text-2xl transition-colors ${
                isScrolled ? "text-[var(--color-text)]" : "text-white"
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE RESPONSIVE SLIDE-DOWN MENU                         */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-xl mt-3 px-6 py-6 transition-all animate-fadeIn text-[var(--color-text)]">
          <ul className="flex flex-col gap-4 font-medium">
            <li
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-pointer hover:text-[var(--color-primary)] py-1 border-b border-[var(--color-border)]"
            >
              Home
            </li>
            <li
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-pointer hover:text-[var(--color-primary)] py-1 border-b border-[var(--color-border)]"
            >
              About Us
            </li>
            <li
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-pointer hover:text-[var(--color-primary)] py-1 border-b border-[var(--color-border)]"
            >
              Products
            </li>
            <li
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-pointer hover:text-[var(--color-primary)] py-1 border-b border-[var(--color-border)]"
            >
              Gallery
            </li>
          </ul>

          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[var(--color-border)] text-[var(--color-primary)] font-semibold text-sm">
            <FaPhoneAlt />
            <span>077 456 7890</span>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;