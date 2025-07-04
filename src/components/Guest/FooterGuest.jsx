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
  const socialIconStyle = "h-10 w-10 bg-neutral-800 hover:bg-yellow-500 text-white flex items-center justify-center rounded-full transition duration-300 shadow-md text-lg";
  const contactIconStyle = "mr-4 mt-1 text-yellow-500";

  return (
    <footer className="bg-gradient-to-b from-black via-neutral-900 to-neutral-950 text-white px-4 sm:px-6 md:px-10 lg:px-32 py-20 font-sans relative">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Logo & Sosial */}
        <div className="text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-wide font-serif">
            Dimensi HairStudio
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
            Website ini menampilkan layanan barber terbaik dengan gaya modern dan profesional.
          </p>
          <div className="flex justify-center sm:justify-start space-x-3">
            <a href="#" className={socialIconStyle}><FaWhatsapp /></a>
            <a href="#" className={socialIconStyle}><FaInstagram /></a>
            <a href="#" className={socialIconStyle}><FaTiktok /></a>
            <a href="#" className={socialIconStyle}><FaFacebookF /></a>
            <a href="#" className={socialIconStyle}><FaTwitter /></a>
          </div>
        </div>

        {/* Informasi */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold uppercase mb-5 font-serif">Informasi</h3>
          <ul className="space-y-4 text-sm sm:text-base text-gray-300">
            <li><a href="#" className="hover:text-yellow-500 transition">Tentang Kami</a></li>
            <li><a href="https://www.waze.com/id/live-map/directions/id/sumatera-utara/jl.-asia-indah-jl.-komp.-asia-mega-mas-no.blok.cc-no.31?to=place.ChIJ7fXAfQcxMTARdzqwLKSn8wg" className="hover:text-yellow-500 transition">Peta Lokasi</a></li>
            <li><a href="#" className="hover:text-yellow-500 transition">Jam Operasional</a></li>
          </ul>
        </div>

        {/* Kontak & Layanan */}
        <div className="lg:col-span-2 text-center sm:text-left">
          <h3 className="text-xl font-bold uppercase mb-5 font-serif">Kontak & Layanan</h3>
          <ul className="space-y-5 text-sm sm:text-base text-gray-300">
            <li className="flex flex-col sm:flex-row sm:items-start sm:gap-3 justify-center sm:justify-start">
              <FaMapMarkerAlt className={contactIconStyle} />
              <span>Jl. Asia No.43<br />Medan, Indonesia 20222</span>
            </li>
            <li className="flex flex-col sm:flex-row sm:items-start sm:gap-3 justify-center sm:justify-start">
              <FaPhoneAlt className={contactIconStyle} />
              <a href="tel:+62821706790" className="hover:text-yellow-500 transition">+62 821 706 790</a>
            </li>
            <li className="flex flex-col sm:flex-row sm:items-start sm:gap-3 justify-center sm:justify-start">
              <FaPaperPlane className={contactIconStyle} />
              <a href="mailto:dimensihairmedan@gmail.com" className="hover:text-yellow-500 transition">dimensihairmedan@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Garis pembatas */}
      <div className="mt-16 border-t border-neutral-700"></div>

      {/* Copyright */}
      <div className="text-center text-xs sm:text-sm mt-6 text-gray-500">
        &copy; 2025 Dimensi HairStudio. All Rights Reserved.
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-yellow-500 hover:bg-yellow-600 text-black h-12 w-12 rounded-full flex items-center justify-center shadow-lg transition z-50"
        aria-label="Scroll to top"
      >
        <FaAngleUp size={22} />
      </button>
    </footer>
  );
}
