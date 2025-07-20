import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { layananAPI } from "../../service/layananAPI";
import { AiFillStar, AiOutlineClose, AiOutlineInfoCircle, AiOutlineEye } from "react-icons/ai";
import { FaCut, FaClock, FaUser, FaCalendarCheck, FaTags } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function LayananGuest() {
  const [layanan, setLayanan] = useState([]);
  const [filteredLayanan, setFilteredLayanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

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
    setCurrentPage(1);
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

  const openDetailModal = (service) => {
    setSelectedService(service);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedService(null);
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
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
            />
          </div>
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
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-emerald-500"
                >
                  <div className="relative w-full h-40 overflow-hidden">
                    {item.gambar ? (
                      <>
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
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                          <button
                            onClick={() => openImageModal(item.gambar)}
                            className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                          >
                            <AiOutlineEye className="text-white" />
                          </button>
                          <button
                            onClick={() => openDetailModal(item)}
                            className="bg-emerald-500/80 backdrop-blur-sm p-2 rounded-full hover:bg-emerald-500 transition-colors"
                          >
                            <AiOutlineInfoCircle className="text-white" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-700 text-gray-400 text-2xl">
                        🖼️
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-md font-bold text-emerald-400 truncate flex-1">{item.nama}</h2>
                      <button
                        onClick={() => openDetailModal(item)}
                        className="text-gray-400 hover:text-emerald-400 transition-colors ml-2"
                      >
                        <AiOutlineInfoCircle size={18} />
                      </button>
                    </div>
                    
                    <p className="text-xs text-gray-300 mb-2 line-clamp-2">{item.deskripsi}</p>
                    
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-lg font-semibold text-white">
                        Rp {Number(item.harga).toLocaleString("id-ID")}
                      </p>
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
                        Populer
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-yellow-400 mb-3 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <AiFillStar key={i} size={14} />
                      ))}
                      <span className="ml-1 text-gray-300">5.0</span>
                    </div>
                    
                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={() => openDetailModal(item)}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-sm text-white py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-1"
                      >
                        <AiOutlineInfoCircle size={16} />
                        Detail
                      </button>
                      <button
                        onClick={() => handleBookingClick(item)}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-sm text-white py-2 px-3 rounded-md transition-colors"
                      >
                        Booking
                      </button>
                    </div>
                  </div>
                </motion.div>
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
                    className="px-2 py-1 border rounded disabled:opacity-30 hover:bg-gray-700 transition-colors"
                  >
                    &laquo;
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-2 py-1 border rounded disabled:opacity-30 hover:bg-gray-700 transition-colors"
                  >
                    &lt;
                  </button>
                  <span className="px-3 py-1 border rounded bg-emerald-500 text-white">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 border rounded disabled:opacity-30 hover:bg-gray-700 transition-colors"
                  >
                    &gt;
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 border rounded disabled:opacity-30 hover:bg-gray-700 transition-colors"
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
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center cursor-zoom-out"
            onClick={closeImageModal}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={modalImageUrl}
              alt="Zoomed"
              className="max-w-[90%] max-h-[90%] rounded-lg border-4 border-white shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {isDetailModalOpen && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={closeDetailModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-600"
            >
              {/* Header */}
              <div className="relative">
                {selectedService.gambar && (
                  <div className="h-64 overflow-hidden rounded-t-2xl">
                    <img
                      src={selectedService.gambar}
                      alt={selectedService.nama}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}
                <button
                  onClick={closeDetailModal}
                  className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <AiOutlineClose className="text-white" size={20} />
                </button>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-2xl font-bold">{selectedService.nama}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <AiFillStar key={i} size={16} />
                      ))}
                      <span className="ml-1 text-white">5.0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Price and Tags */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-3xl font-bold text-emerald-400">
                      Rp {Number(selectedService.harga).toLocaleString("id-ID")}
                    </p>
                    <p className="text-gray-400 text-sm">Per sesi</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm">
                      Populer
                    </span>
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                      Rekomendasi
                    </span>
                  </div>
                </div>

                

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <AiOutlineInfoCircle className="text-emerald-400" />
                    Deskripsi Layanan
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedService.deskripsi}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <FaTags className="text-emerald-400" />
                    Yang Anda Dapatkan
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Konsultasi gratis dengan ahli",
                      "Produk perawatan berkualitas tinggi",
                      "Styling sesuai bentuk wajah",
                      "Garansi hasil memuaskan",
                      "Kebersihan dan sterilisasi terjamin"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-300">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-600">
                  <button
                    onClick={closeDetailModal}
                    className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 px-4 rounded-lg transition-colors"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => {
                      closeDetailModal();
                      handleBookingClick(selectedService);
                    }}
                    className="flex-2 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold"
                  >
                    <FaCalendarCheck />
                    Booking Sekarang
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}