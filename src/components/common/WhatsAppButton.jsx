import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  // WhatsApp Number formatted for wa.me API link (Sri Lanka country code +94)
  const phoneNumber = "94774567890";
  const defaultMessage = encodeURIComponent("Hello! I would like to inquire about Kithula products.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp Icon */}
      <FaWhatsapp size={28} />

      {/* Tooltip on Hover */}
      <span className="absolute right-16 bg-black/80 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
        Chat with Us
      </span>
    </a>
  );
}