import jobs from "../../JSON/produkunggulan.json";
import { motion } from "framer-motion";

export default function Produk() {
  const utama = jobs[0];
  const lainnya = jobs.slice(1, 4);

  return (
    <section className="px-6 md:px-12 py-20 bg-black font-serif">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center md:text-left mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Layanan <span className="text-emerald-400">Unggulan</span>
          </h2>
          <p className="text-gray-300 mt-2">
            Rangkaian layanan terbaik untuk tampilan rambut yang menawan di DimensiHairStudio.
          </p>
        </motion.div>

        {/* Konten */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kartu besar */}
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src={utama.gambar}
              alt={utama.nama}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <p className="text-sm opacity-80 mb-1">{utama.lokasi || "DimensiHairStudio"}</p>
              <h3 className="text-2xl font-bold mb-1 truncate">{utama.nama}</h3>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold">Rp {utama.harga}</span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="ml-1">4.5</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Kartu kecil */}
          <motion.div
            className="md:col-span-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {lainnya.map((produk, index) => (
              <motion.div
                key={produk.id}
                className="flex items-center bg-gray-800/70 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group"
                whileHover={{ scale: 1.015 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                {/* Gambar */}
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={produk.gambar}
                    alt={produk.nama}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Konten */}
                <div className="p-4 flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-white truncate mb-1">
                    {produk.nama}
                  </h4>
                  <div className="flex justify-between items-center text-sm text-gray-300">
                    <span className="font-semibold">Rp {produk.harga}</span>
                    <div className="flex items-center gap-1 text-yellow-400">
                      ★★★★☆ <span className="ml-1 text-gray-400">4.5</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
