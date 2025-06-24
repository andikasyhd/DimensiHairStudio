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
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // ✅ Konfirmasi ID

  const itemsPerPage = 10;
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
      setError("");
      await loadLayanan();
    } catch (err) {
      console.error("Gagal menghapus:", err);
      setError("Gagal menghapus layanan.");
      setSuccess("");
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
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Data Layanan</h1>

      {/* ✅ Alert Error */}
      {error && (
        <div role="alert" className="alert alert-error mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* ✅ Alert Success */}
      {success && (
        <div role="alert" className="alert alert-success mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{success}</span>
        </div>
      )}

      {/* ✅ Alert Konfirmasi Hapus */}
      {confirmDeleteId && (
        <div role="alert" className="alert alert-vertical sm:alert-horizontal mb-4 bg-yellow-100 text-black border border-yellow-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Apakah Anda yakin ingin menghapus layanan ini?</span>
          <div className="flex gap-2">
            <button className="btn btn-sm" onClick={() => setConfirmDeleteId(null)}>
              Batal
            </button>
            <button className="btn btn-sm btn-error" onClick={handleDeleteConfirmed}>
              Hapus
            </button>
          </div>
        </div>
      )}

      {/* Search + Filter + Tambah */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex gap-2 items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Cari data"
            className="p-2 border rounded-xl w-full sm:w-64 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-2 border rounded-xl text-sm"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="all">Filter</option>
            <option value="0-50000">Rp 0 - 50.000</option>
            <option value="50000-100000">Rp 50.000 - 100.000</option>
            <option value=">100000">&gt; Rp 100.000</option>
          </select>
        </div>

        <Link
          to="/tambahlayanan"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm hover:bg-blue-700"
        >
          Tambah
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-sky-600 text-white">
            <tr>
              <th className="p-4">No</th>
              <th className="p-4">Nama</th>
              <th className="p-4">Deskripsi</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-6 text-center">
                  <LoadingSpinner text="Memuat data layanan..." />
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-600">
                  Data tidak tersedia.
                </td>
              </tr>
            ) : (
              currentItems.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">{startIndex + index + 1}</td>
                  <td className="p-4">{item.nama}</td>
                  <td className="p-4">{item.deskripsi}</td>
                  <td className="p-4">Rp {item.harga}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/edit/${item.id}`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <AiFillEdit size={18} />
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <AiFillDelete size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredLayanan.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-4 text-sm text-gray-700">
          <div>
            Menampilkan {startIndex + 1} -{" "}
            {Math.min(startIndex + itemsPerPage, filteredLayanan.length)} dari{" "}
            {filteredLayanan.length}
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
