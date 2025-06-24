import { Link } from "react-router-dom";
export default function AboutUs() {
  return (
    <section className="py-16 px-4 md:px-16 bg-black font-serif">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 ease-out animate-fade-in">
        {/* Bagian kiri: Gambar */}
        <div className="w-full md:w-1/2 h-[250px] md:h-auto relative">
          <img
            src="/img/aboutus.jpg"
            alt="DimensiHairStudio - Salon dan Barbershop Profesional"
            className="w-full h-full object-cover"
            loading="lazy"
            aria-label="Gambar DimensiHairStudio"
          />
        </div>

        {/* Bagian kanan: Konten */}
        <div className="w-full md:w-1/2 p-6 md:p-10">
          <p className="text-emerald-400 font-semibold uppercase mb-3 tracking-wide">
            Tentang Kami
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Transformasi Gaya <span className="text-emerald-400">dimulai di sini</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg mb-6">
            Di <strong>DimensiHairStudio</strong>, kami tidak hanya memotong rambut—kami menciptakan pengalaman. Dengan tim profesional, layanan personal, dan suasana eksklusif, kami siap membantu Anda tampil lebih percaya diri dan bergaya.
          </p>
          

          <Link
            to="/layanan"
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-md"
          >
            ✂️ Booking Sekarang
          </Link>

        </div>
      </div>
    </section>
  );
}
