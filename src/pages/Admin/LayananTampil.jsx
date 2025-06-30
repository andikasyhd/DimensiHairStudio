import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete, AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { layananAPI } from "../../service/layananAPI";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Layanan() {
  const [layanan, setLayanan] = useState([]);
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    loadLayanan();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, priceFilter]);

  const loadLayanan = async () => {
    try {
      setLoading(true);
      const data = await layananAPI.fetchLayanan();
      setLayanan(data);
    } catch (error) {
      console.error("Gagal memuat data layanan:", error);
      setError("Gagal memuat data layanan.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirmed = async () => {
    if (!confirmDeleteId) return;
    try {
      setLoading(true);
      await layananAPI.deleteLayanan(confirmDeleteId);
      setSuccess("Layanan berhasil dihapus.");
      await loadLayanan();
    } catch (err) {
      console.error("Gagal menghapus:", err);
      setError("Gagal menghapus layanan.");
    } finally {
      setLoading(false);
      setConfirmDeleteId(null);
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 2000);
    }
  };

  const filterByPrice = (item) => {
    const harga = parseInt(item.harga);
    switch (priceFilter) {
      case "0-50000":
        return harga >= 0 && harga <= 50000;
      case "50000-100000":
        return harga > 50000 && harga <= 100000;
      case ">100000":
        return harga > 100000;
      default:
        return true;
    }
  };

  const filteredLayanan = layanan
    .filter((item) => item.nama.toLowerCase().includes(search.toLowerCase()))
    .filter(filterByPrice);

  const totalPages = Math.ceil(filteredLayanan.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredLayanan.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:bg-sky-600 transition-colors duration-300 rounded-3xl shadow-2xl mb-8">

          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative px-8 py-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div>
                <h1 className="text-xl lg:text-3xl font-bold text-white mb-3 tracking-tight">
                  ✂️ Manajemen Layanan
                </h1>
                <p className="text-blue-100 text-lg max-w-md">
                  Kelola semua layanan Anda dengan mudah dan efisien
                </p>
              </div>
              <Link
                to="/tambahlayanan"
                className="group relative overflow-hidden bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <AiOutlinePlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="font-semibold">Tambah Layanan</span>
                </div>
              </Link>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        {/* Enhanced Notifications */}
        <div className="space-y-4 mb-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl shadow-sm animate-pulse">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">!</span>
                </div>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-xl shadow-sm animate-bounce">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-green-700 font-medium">{success}</p>
              </div>
            </div>
          )}
          
          {confirmDeleteId && (
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-800">Konfirmasi Penghapusan</h3>
                    <p className="text-amber-700">Apakah Anda yakin ingin menghapus layanan ini?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors duration-200"
                    onClick={() => setConfirmDeleteId(null)}
                  >
                    Batal
                  </button>
                  <button 
                    className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200 shadow-md"
                    onClick={handleDeleteConfirmed}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Filter & Search Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8 border border-white/50">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari layanan..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-white/80"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              
              <select
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-white/80 min-w-48"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="all">Semua Harga</option>
                <option value="0-50000"> Rp 0 - 50.000</option>
                <option value="50000-100000"> Rp 50.000 - 100.000</option>
                <option value=">100000"> &gt; Rp 100.000</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Tampilan:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    viewMode === "grid" 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  📊 Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    viewMode === "list" 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  📋 List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Service Cards */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner text="Memuat data layanan..." />
          </div>
        ) : currentItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">Tidak ada layanan ditemukan</h3>
            <p className="text-gray-500">Coba ubah filter pencarian atau tambah layanan baru</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          }`}>
            {currentItems.map((item, index) => (
              <div
                key={item.id}
                className={`group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 overflow-hidden ${
                  viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards"
                }}
              >
                <div className={`${
                  viewMode === "list" 
                    ? "sm:w-64 sm:flex-shrink-0" 
                    : "aspect-[4/3]"
                } bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative`}>
                  {item.gambar ? (
                    <img
                      src={item.gambar}
                      alt={item.nama}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fallback.png";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl text-gray-400 group-hover:scale-110 transition-transform duration-700">
                      🖼️
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {item.nama}
                    </h2>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <button
                        onClick={() => navigate(`/edit/${item.id}`)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors duration-200 transform hover:scale-110"
                      >
                        <AiFillEdit size={18} />
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(item.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors duration-200 transform hover:scale-110"
                      >
                        <AiFillDelete size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{item.deskripsi}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="relative">
                      <span className="inline-block bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-xl font-bold shadow-md transform group-hover:scale-105 transition-transform duration-200">
                        Rp {parseInt(item.harga).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredLayanan.length > itemsPerPage && (
  <div className="mt-10 bg-white/60 backdrop-blur-md rounded-xl p-4 shadow border border-gray-200">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="text-sm text-gray-700">
        Menampilkan{" "}
        <span className="font-medium text-blue-600">{startIndex + 1}</span> -{" "}
        <span className="font-medium text-blue-600">
          {Math.min(startIndex + itemsPerPage, filteredLayanan.length)}
        </span>{" "}
        dari <span className="font-medium text-blue-600">{filteredLayanan.length}</span> layanan
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-sm rounded-md border border-gray-300 bg-white hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⏮
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-2 py-1 text-sm rounded-md border border-gray-300 bg-white hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ◀
        </button>

        <span className="text-sm px-3 py-1 rounded-md bg-blue-100 text-blue-700 font-semibold">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-sm rounded-md border border-gray-300 bg-white hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ▶
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-sm rounded-md border border-gray-300 bg-white hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⏭
        </button>
      </div>
    </div>
  </div>
)}

      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}