import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPaperPlane,
  FaAngleUp
} from 'react-icons/fa';

export default function FooterSedap() {
  const socialIconStyle = "h-9 w-9 bg-green-700 hover:bg-yellow-400 text-white flex items-center justify-center rounded-full transition duration-300 shadow-md";
  const contactIconStyle = "mr-3 mt-1 text-yellow-400";

  return (
    <footer className="bg-gradient-to-b from-red-700 to-red-900 text-white px-8 md:px-24 py-20 font-sans relative">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Column 1: Logo & Sosial Media */}
        <div>
          <h2 className="text-4xl font-bold mb-4">Sedap</h2>
          <p className="text-sm leading-relaxed mb-6">
            Website ini menampilkan makanan khas dari Indonesia yang pasti anda sukai!
          </p>
          <div className="flex space-x-3">
            <a href="#" className={socialIconStyle} aria-label="Whatsapp"><FaWhatsapp /></a>
            <a href="#" className={socialIconStyle} aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className={socialIconStyle} aria-label="TikTok"><FaTiktok /></a>
            <a href="#" className={socialIconStyle} aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" className={socialIconStyle} aria-label="Twitter"><FaTwitter /></a>
          </div>
        </div>

        {/* Column 2: Informasi */}
        <div>
          <h3 className="text-lg font-semibold uppercase mb-5">Informasi</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400 transition">Tentang Kami</a></li>
            <li><a href="https://www.waze.com/id/live-map/directions/id/sumatera-utara/jl.-asia-indah-jl.-komp.-asia-mega-mas-no.blok.cc-no.31?to=place.ChIJ7fXAfQcxMTARdzqwLKSn8wg" className="hover:text-yellow-400 transition">Peta Lokasi</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Jam Operasional</a></li>
          </ul>
        </div>

        {/* Column 3: Kontak & Layanan */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold uppercase mb-5">Kontak & Layanan</h3>
          <ul className="space-y-4 text-sm mb-4">
            <li className="flex items-start">
              <FaMapMarkerAlt className={contactIconStyle} size={16} />
              <span>Jl. Asia No.43<br />Medan, Indonesia 20222</span>
            </li>
            <li className="flex items-start">
              <FaPhoneAlt className={contactIconStyle} size={14} />
              <a href="tel:+6281234567890" className="hover:text-yellow-400 transition">+62 821 706 790</a>
            </li>
            <li className="flex items-start">
              <FaPaperPlane className={contactIconStyle} size={14} />
              <a href="mailto:sedapmedan@gmail.com" className="hover:text-yellow-400 transition">sedapmedan@gmail.com</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Garis pemisah */}
      <div className="mt-16 mb-6 border-t border-red-500"></div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-200">
        &copy; 2025 Sedap. All Rights Reserved.
      </div>

      {/* Tombol Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-yellow-400 hover:bg-yellow-500 text-green-900 h-10 w-10 rounded-full flex items-center justify-center shadow-lg transition z-50"
        aria-label="Scroll to top"
      >
        <FaAngleUp size={18} />
      </button>
    </footer>
  );
}
