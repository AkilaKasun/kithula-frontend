import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../../assets/kithula_logo.jpg";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

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

  const isActive = (path) => location.pathname === path;

  // Static styling for internal pages vs dynamic transparent/scrolled overlay on Home page
  const navBackgroundClass = isHomePage
    ? isScrolled
      ? "fixed top-0 left-0 bg-[var(--color-surface)] shadow-md py-3 border-b border-[var(--color-border)] text-[var(--color-text)]"
      : "fixed top-0 left-0 bg-black/20 backdrop-blur-md border-b border-white/10 py-5 text-white"
    : "sticky top-0 left-0 bg-[var(--color-surface)] shadow-sm py-4 border-b border-[var(--color-border)] text-[var(--color-text)]";

  const brandHeadingClass = isHomePage && !isScrolled ? "text-white" : "text-[var(--color-primary)]";
  const brandSubtextClass = isHomePage && !isScrolled ? "text-white/80" : "text-[var(--color-text-secondary)]";
  const navTextClass = isHomePage && !isScrolled ? "text-white/90" : "text-[var(--color-text)]";
  const phoneTextClass = isHomePage && !isScrolled ? "text-white" : "text-[var(--color-primary)]";

  return (
    <nav className={`w-full z-50 transition-all duration-300 ${navBackgroundClass}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <img
              src={logo}
              alt="Kithula Logo"
              className="h-12 w-12 rounded-full object-cover border-2 border-[var(--color-accent)] shadow-sm"
            />
            <div>
              <h1 className={`text-2xl font-bold font-serif tracking-wider transition-colors ${brandHeadingClass}`}>
                KITHULA
              </h1>
              <p className={`text-[10px] tracking-wide uppercase transition-colors ${brandSubtextClass}`}>
                Pure Sri Lankan Kithul
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className={`hidden md:flex items-center gap-8 font-medium text-sm tracking-wide transition-colors ${navTextClass}`}>
            <li>
              <Link 
                to="/" 
                className={`hover:text-[var(--color-accent)] transition duration-300 ${isActive('/') ? 'text-[var(--color-accent)] font-semibold' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about-us" 
                className={`hover:text-[var(--color-accent)] transition duration-300 ${isActive('/about-us') ? 'text-[var(--color-accent)] font-semibold' : ''}`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className={`hover:text-[var(--color-accent)] transition duration-300 ${isActive('/products') ? 'text-[var(--color-accent)] font-semibold' : ''}`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link 
                to="/gallery" 
                className={`hover:text-[var(--color-accent)] transition duration-300 ${isActive('/gallery') ? 'text-[var(--color-accent)] font-semibold' : ''}`}
              >
                Gallery
              </Link>
            </li>
          </ul>

          {/* Right Action Icons */}
          <div className="flex items-center gap-5">
            {/* Phone (Desktop) */}
            <a
              href="tel:0774567890"
              className={`hidden lg:flex items-center gap-2 font-medium text-sm transition-colors ${phoneTextClass}`}
            >
              <FaPhoneAlt className="text-[var(--color-accent)]" />
              <span>077 456 7890</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              className={`relative p-3 rounded-full transition-all duration-300 ${
                isHomePage && !isScrolled
                  ? "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-[var(--color-text)]"
                  : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]"
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
              className={`md:hidden p-2 rounded-lg text-2xl transition-colors ${navTextClass}`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--color-surface)] border-t border-[var(--color-border)] shadow-xl mt-3 px-6 py-6 transition-all animate-fadeIn text-[var(--color-text)]">
          <ul className="flex flex-col gap-4 font-medium">
            <li>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block cursor-pointer hover:text-[var(--color-primary)] py-1 border-b border-[var(--color-border)]"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block cursor-pointer hover:text-[var(--color-primary)] py-1 border-b border-[var(--color-border)]"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="block cursor-pointer hover:text-[var(--color-primary)] py-1 border-b border-[var(--color-border)]"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="block cursor-pointer hover:text-[var(--color-primary)] py-1 border-b border-[var(--color-border)]"
              >
                Gallery
              </Link>
            </li>
          </ul>

          <a
            href="tel:0774567890"
            className="flex items-center gap-2 mt-6 pt-4 border-t border-[var(--color-border)] text-[var(--color-primary)] font-semibold text-sm"
          >
            <FaPhoneAlt />
            <span>077 456 7890</span>
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;