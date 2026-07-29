import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTiktok,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../../../assets/kithula_logo.jpg"; // Adjust import path if needed

export default function Footer() {
  return (
    <footer className="bg-[var(--color-surface)] text-[var(--color-text)] border-t border-[var(--color-border)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* COLUMN 1: Brand Logo, Description & Social Links */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Kithula Logo"
              className="h-14 w-14 rounded-full object-cover border-2 border-[var(--color-accent)] shadow-sm"
            />
            <div>
              <h2 className="text-2xl font-bold font-serif tracking-wider text-[var(--color-primary)]">
                KITHULA
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)] tracking-wide uppercase">
                Pure Sri Lankan Kithul
              </p>
            </div>
          </div>

          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            Bringing you 100% natural, pure, and traditional Sri Lankan Kithul treacle and jaggery directly from authentic forest tappers.
          </p>

          {/* Social Media Links */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[var(--color-background)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white rounded-full border border-[var(--color-border)] transition-all duration-300"
              aria-label="Facebook"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[var(--color-background)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white rounded-full border border-[var(--color-border)] transition-all duration-300"
              aria-label="TikTok"
            >
              <FaTiktok size={16} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[var(--color-background)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white rounded-full border border-[var(--color-border)] transition-all duration-300"
              aria-label="Instagram"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://wa.me/94774567890"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[var(--color-background)] text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-full border border-[var(--color-border)] transition-all duration-300"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={16} />
            </a>
          </div>
        </div>

        {/* COLUMN 2: Quick Links */}
        <div>
          <h3 className="text-lg font-serif font-semibold text-[var(--color-primary)] mb-4 border-b border-[var(--color-border)] pb-2 inline-block">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm font-medium">
            <li>
              <Link to="/" className="hover:text-[var(--color-accent)] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-[var(--color-accent)] transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-[var(--color-accent)] transition-colors">
                Products
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-[var(--color-accent)] transition-colors">
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* COLUMN 3: Contact Information */}
        <div className="space-y-3">
          <h3 className="text-lg font-serif font-semibold text-[var(--color-primary)] mb-4 border-b border-[var(--color-border)] pb-2 inline-block">
            Contact Us
          </h3>
          <p className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
            <FaPhoneAlt className="text-[var(--color-accent)] flex-shrink-0" />
            <a href="tel:0774567890" className="hover:text-[var(--color-primary)] transition-colors">
              077 456 7890
            </a>
          </p>
          <p className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
            <FaEnvelope className="text-[var(--color-accent)] flex-shrink-0" />
            <a href="mailto:info@kithula.com" className="hover:text-[var(--color-primary)] transition-colors">
              info@kithula.com
            </a>
          </p>
          <p className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
            <FaMapMarkerAlt className="text-[var(--color-accent)] mt-1 flex-shrink-0" />
            <span>IDNC Kithula Hotel, Sri Lanka</span>
          </p>
        </div>

        {/* COLUMN 4: Google Map Embed */}
        <div className="space-y-3">
          <h3 className="text-lg font-serif font-semibold text-[var(--color-primary)] mb-4 border-b border-[var(--color-border)] pb-2 inline-block">
            Find Us
          </h3>
          <div className="w-full h-44 rounded-xl overflow-hidden border border-[var(--color-border)] shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.7427073653535!2d80.69970707584295!3d7.493634211128295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae35b567b20d7eb%3A0x8acc43d9e83d3351!2zSUROQyBLaXRodWxhIEhvdGVsIC0g4Laa4LeS4Lat4LeU4La9IOC2heC3gOC2seC3iuC3hOC2vQ!5e0!3m2!1sen!2slk!4v1785283940681!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Kithula Location Map"
            ></iframe>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Strip */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-center text-xs text-[var(--color-text-secondary)]">
        <p>© {new Date().getFullYear()} Kithula. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Handcrafted with natural purity.</p>
      </div>
    </footer>
  );
}