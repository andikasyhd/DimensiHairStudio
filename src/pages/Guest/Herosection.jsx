import { motion } from "framer-motion";

export default function Herosection() {
  return (
    <section className="bg-gradient-to-b from-gray-900 via-black to-black text-white py-16 px-4 sm:px-6 md:px-20 font-serif">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Konten kiri */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
            Temukan <span className="text-emerald-400">Gaya Baru</span> Anda{" "}
            <br className="hidden md:block" />
            di <span className="text-emerald-400">DimensiHairStudio</span>
          </h1>
          <p className="mb-6 text-base sm:text-lg text-gray-300 max-w-md mx-auto md:mx-0">
            Kami hadir untuk memberikan transformasi terbaik untuk rambut Anda—perpaduan antara seni, kenyamanan, dan keahlian profesional.
          </p>
        </motion.div>

        {/* Gambar kanan */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img
            src="/img/makanan.jpg"
            alt="DimensiHairStudio Interior"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-xl shadow-2xl object-cover border border-gray-700"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
