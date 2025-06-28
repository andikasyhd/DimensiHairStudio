import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { layananAPI } from "../../service/layananAPI";
import { AiFillStar } from "react-icons/ai";
import { FaCut } from "react-icons/fa";
import { motion } from "framer-motion";

export default function LayananGuest() {
  const [layanan, setLayanan] = useState([]);
  const [filteredLayanan, setFilteredLayanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLayanan = async () => {
      try {
        const data = await layananAPI.fetchLayanan();
        setLayanan(data);
        setFilteredLayanan(data);
      } catch (err) {
        console.error("Gagal memuat layanan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLayanan();
  }, []);

  useEffect(() => {
    const filtered = layanan.filter((item) =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLayanan(filtered);
    setCurrentPage(1); // Reset ke halaman pertama saat search berubah
  }, [searchTerm, layanan]);

  const handleBookingClick = (layananItem) => {
    navigate("/form", { state: { layanan: layananItem } });
  };

  const openImageModal = (url) => {
    setModalImageUrl(url);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setModalImageUrl("");
  };

  // Pagination logic
  const totalItems = filteredLayanan.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filteredLayanan.slice(startIndex, endIndex);

  return (
    <section className="bg-gradient-to-b from-gray-900 via-black to-black text-white py-16 px-4 sm:px-8 md:px-16 font-serif min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-3 text-emerald-400 text-3xl font-bold mb-2">
            <FaCut className="animate-bounce" />
            <h1 className="text-2xl md:text-3xl">Layanan Pangkas Profesional</h1>
          </div>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto">
            Pilih layanan terbaik untuk tampil keren dan rapi. Booking sekarang sebelum slot habis!
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Cari layanan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-sm mx-auto block px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Konten */}
        {loading ? (
          <p className="text-center text-gray-300">Memuat layanan...</p>
        ) : currentItems.length === 0 ? (
          <p className="text-center text-gray-400">Layanan tidak ditemukan.</p>
        ) : (
          <>
            {/* Info jumlah */}
            <div className="text-sm text-gray-400 mb-3">
              Menampilkan {startIndex + 1} - {endIndex} dari {totalItems}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {currentItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="w-full h-40 overflow-hidden">
                    {item.gambar ? (
                      <img
                        src={item.gambar}
                        alt={item.nama}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => openImageModal(item.gambar)}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/fallback.png";
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-700 text-gray-400 text-2xl">
                        🖼️
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-md font-bold text-emerald-400 mb-1 truncate">{item.nama}</h2>
                    <p className="text-xs text-gray-300 mb-1 line-clamp-2">{item.deskripsi}</p>
                    <p className="text-sm font-semibold text-white mb-2">
                      Rp {Number(item.harga).toLocaleString("id-ID")}
                    </p>
                    <div className="flex items-center gap-1 text-yellow-400 mb-3 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <AiFillStar key={i} size={14} />
                      ))}
                      <span className="ml-1 text-gray-300">5.0</span>
                    </div>
                    <button
                      onClick={() => handleBookingClick(item)}
                      className="mt-auto bg-emerald-500 hover:bg-emerald-600 text-sm text-white py-1.5 px-3 rounded-md w-full"
                    >
                      Booking Sekarang
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center text-gray-400 text-sm">
                <span>
                  Menampilkan {startIndex + 1} - {endIndex} dari {totalItems}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="px-2 py-1 border rounded disabled:opacity-30"
                  >
                    &laquo;
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-2 py-1 border rounded disabled:opacity-30"
                  >
                    &lt;
                  </button>
                  <span className="px-3 py-1 border rounded bg-white text-black">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 border rounded disabled:opacity-30"
                  >
                    &gt;
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 border rounded disabled:opacity-30"
                  >
                    &raquo;
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal Gambar */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center cursor-zoom-out"
          onClick={closeImageModal}
        >
          <img
            src={modalImageUrl}
            alt="Zoomed"
            className="max-w-[90%] max-h-[90%] rounded-lg border-4 border-white shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
