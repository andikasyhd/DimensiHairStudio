import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { layananAPI } from "../../service/layananAPI";
import { AiFillStar } from "react-icons/ai";
import { motion } from "framer-motion";

export default function LayananGuest() {
  const [layanan, setLayanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLayanan = async () => {
      try {
        const data = await layananAPI.fetchLayanan();
        setLayanan(data);
      } catch (err) {
        console.error("Gagal memuat layanan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLayanan();
  }, []);

  const handleBookingClick = (layananItem) => {
    navigate("/form", { state: { layanan: layananItem } });
  };

  return (
    <section className="bg-gradient-to-b from-gray-900 via-black to-black text-white py-20 px-6 md:px-20 font-serif">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Daftar Layanan Kami
        </motion.h1>

        {loading ? (
          <p className="text-center text-gray-300">Memuat layanan...</p>
        ) : layanan.length === 0 ? (
          <p className="text-center text-gray-400">Belum ada layanan tersedia.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {layanan.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-700 hover:shadow-2xl transition"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.gambar && (
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}

                <h2 className="text-xl font-semibold text-emerald-400 mb-1">
                  {item.nama}
                </h2>
                <p className="text-sm text-gray-300 mb-3">{item.deskripsi}</p>
                <p className="text-md font-medium text-white mb-2">
                  Rp {Number(item.harga).toLocaleString("id-ID")}
                </p>

                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <AiFillStar key={i} size={16} />
                  ))}
                  <span className="ml-2 text-sm text-gray-300">5.0</span>
                </div>

                <button
                  onClick={() => handleBookingClick(item)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg w-full transition"
                >
                  Booking
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
