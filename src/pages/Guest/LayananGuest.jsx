import { useEffect, useState } from "react";
import { layananAPI } from "../../service/layananAPI";
import { AiFillStar } from "react-icons/ai";

export default function LayananGuest() {
  const [layanan, setLayanan] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="bg-gradient-to-b from-gray-900 via-black to-black text-white py-20 px-6 md:px-20 font-serif">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Daftar Layanan Kami
        </h1>

        {loading ? (
          <p className="text-center text-gray-300">Memuat layanan...</p>
        ) : layanan.length === 0 ? (
          <p className="text-center text-gray-400">Belum ada layanan tersedia.</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {layanan.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-700 hover:shadow-2xl transition"
              >
                {/* Gambar layanan */}
                {item.gambar && (
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-full h-44 object-cover rounded-lg mb-4 border border-gray-700"
                  />
                )}

                {/* Nama layanan */}
                <h2 className="text-xl font-semibold text-emerald-400 mb-1">
                  {item.nama}
                </h2>

                {/* Deskripsi */}
                <p className="text-sm text-gray-300 mb-3">
                  {item.deskripsi}
                </p>

                {/* Harga */}
                <p className="text-md font-medium text-white mb-2">
                  Rp {Number(item.harga).toLocaleString("id-ID")}
                </p>

                {/* Rating bintang dummy */}
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <AiFillStar key={i} size={16} />
                  ))}
                  <span className="ml-2 text-sm text-gray-300">5.0</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
