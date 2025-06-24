import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { layananAPI } from "../../service/layananAPI";

export default function EditLayanan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
    deskripsi: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // ✅ untuk alert sukses

  useEffect(() => {
    fetchLayanan();
  }, []);

  const fetchLayanan = async () => {
    try {
      setLoading(true);
      const layanan = await layananAPI.getLayananById(id);
      if (layanan) {
        setFormData({
          nama: layanan.nama || "",
          harga: layanan.harga || "",
          deskripsi: layanan.deskripsi || "",
        });
      } else {
        alert("Data layanan tidak ditemukan.");
        navigate("/layanantampil");
      }
    } catch (error) {
      console.error("Gagal mengambil data layanan:", error);
      alert("Gagal mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.harga || !formData.deskripsi) {
      alert("Semua field wajib diisi!");
      return;
    }

    try {
      setLoading(true);
      await layananAPI.updateLayanan(id, formData);
      setSuccess(true); // ✅ Tampilkan alert sukses

      // Redirect setelah 1.5 detik
      setTimeout(() => {
        navigate("/layanantampil");
      }, 1500);
    } catch (error) {
      console.error("Gagal mengupdate layanan:", error);
      alert("Terjadi kesalahan saat menyimpan perubahan.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/layanantampil");
  };

  return (
    <div className="p-8 ml-16 min-h-screen bg-[#f9fafb]">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Edit Layanan</h1>

      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl">

        {/* ✅ ALERT SUCCESS */}
        {success && (
          <div className="alert alert-info mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Data layanan berhasil diperbarui!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama Layanan */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Nama Layanan</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: Potong Rambut"
            />
          </div>

          {/* Harga */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Harga</label>
            <input
              type="text"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: 25000"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Deskripsi</label>
            <textarea
              name="deskripsi"
              rows="4"
              value={formData.deskripsi}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Deskripsikan layanan secara singkat..."
            />
          </div>

          {/* Tombol */}
          <div className="flex justify-end space-x-4 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-50 text-sm"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-sm disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
