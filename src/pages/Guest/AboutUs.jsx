import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section className="py-16 px-4 sm:px-6 md:px-16 bg-black font-serif">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Konten */}
        <motion.div
          className="w-full md:w-1/2 p-6 sm:p-8 md:p-10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-emerald-400 font-semibold uppercase mb-3 tracking-wide text-sm sm:text-base">
            Tentang Kami
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Transformasi Gaya <span className="text-emerald-400">dimulai di sini</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6">
            Di <strong>DimensiHairStudio</strong>, kami tidak hanya memotong rambut—kami menciptakan pengalaman. Dengan tim profesional, layanan personal, dan suasana eksklusif, kami siap membantu Anda tampil lebih percaya diri dan bergaya.
          </p>

          <Link
            to="/layanan"
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-md text-sm sm:text-base"
          >
            ✂️ Booking Sekarang
          </Link>
        </motion.div>

        {/* Gambar */}
        <motion.div
          className="w-full md:w-1/2 h-[220px] sm:h-[300px] md:h-auto aspect-[16/9] md:aspect-auto relative"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img
            src="/img/aboutus.jpg"
            alt="DimensiHairStudio - Salon dan Barbershop Profesional"
            className="w-full h-full object-cover"
            loading="lazy"
            aria-label="Gambar DimensiHairStudio"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
