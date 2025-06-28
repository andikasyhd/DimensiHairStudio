import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
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
    <div className="p-6">
      {/* Header & Tombol Tambah */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-sky-700">✂️ Manajemen Layanan</h1>
        <Link
          to="/tambahlayanan"
          className="bg-sky-600 text-white px-5 py-2 rounded-lg shadow hover:bg-sky-700 transition"
        >
          + Tambah Layanan
        </Link>
      </div>

      {/* Notifikasi */}
      {error && <div className="alert alert-error mb-4">{error}</div>}
      {success && <div className="alert alert-success mb-4">{success}</div>}
      {confirmDeleteId && (
        <div className="alert bg-yellow-100 border border-yellow-400 text-black mb-4 flex justify-between items-center">
          <span>Apakah Anda yakin ingin menghapus layanan ini?</span>
          <div className="flex gap-2">
            <button className="btn btn-sm" onClick={() => setConfirmDeleteId(null)}>Batal</button>
            <button className="btn btn-sm btn-error" onClick={handleDeleteConfirmed}>Hapus</button>
          </div>
        </div>
      )}

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="🔍 Cari layanan..."
            className="p-2 border border-gray-300 rounded-xl w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-2 border border-gray-300 rounded-xl"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="all">Semua Harga</option>
            <option value="0-50000">Rp 0 - 50.000</option>
            <option value="50000-100000">Rp 50.000 - 100.000</option>
            <option value=">100000">&gt; Rp 100.000</option>
          </select>
        </div>
      </div>

      {/* Daftar Layanan */}
      {loading ? (
        <LoadingSpinner text="Memuat data layanan..." />
      ) : currentItems.length === 0 ? (
        <div className="text-center text-gray-500">Belum ada layanan tersedia.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition group"
            >
              <div className="mb-3 aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                {item.gambar ? (
                  <img
                    src={item.gambar}
                    alt={item.nama}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fallback.png"; // opsional
                    }}
                  />
                ) : (
                  <span className="text-gray-400 text-4xl flex items-center justify-center h-full">🖼️</span>
                )}
              </div>
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-sky-700 transition">
                {item.nama}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{item.deskripsi}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                  Rp {item.harga}
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/edit/${item.id}`)}
                    className="text-sky-600 hover:text-sky-800 transition"
                  >
                    <AiFillEdit size={18} />
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(item.id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <AiFillDelete size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredLayanan.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-6 text-sm text-gray-700">
          <div>
            Menampilkan {startIndex + 1} -{" "}
            {Math.min(startIndex + itemsPerPage, filteredLayanan.length)} dari{" "}
            {filteredLayanan.length} layanan
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              {"<<"}
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              {"<"}
            </button>
            <span className="px-3 py-1 border rounded bg-gray-100">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              {">"}
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              {">>"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
