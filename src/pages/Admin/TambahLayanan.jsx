import { useState } from "react";
import { layananAPI } from "../../service/layananAPI";
import { useNavigate } from "react-router-dom";

export default function TambahLayanan() {
  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
    deskripsi: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await layananAPI.createLayanan(formData);
      setSuccess("Layanan berhasil ditambahkan!");
      setTimeout(() => {
        navigate("/layanantampil");
      }, 1500);
    } catch (err) {
      setError("Gagal menambahkan layanan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start bg-gray-50 p-4 sm:px-10 sm:py-8">
      <div className="w-full max-w-2xl ml-2 sm:ml-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Tambah Layanan
        </h2>

        {/* ✅ Alert Error */}
        {error && (
          <div role="alert" className="alert alert-error mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* ✅ Alert Success */}
        {success && (
          <div role="alert" className="alert alert-success mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{success}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 sm:p-8 space-y-6"
        >
          {/* Nama Layanan */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Nama Layanan
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              placeholder="Contoh: Potong Rambut"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Harga */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Harga
            </label>
            <input
              type="text"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              required
              placeholder="Contoh: 25000"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              rows={4}
              required
              placeholder="Deskripsikan layanan secara singkat..."
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/layanantampil")}
              className="px-6 py-3 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
