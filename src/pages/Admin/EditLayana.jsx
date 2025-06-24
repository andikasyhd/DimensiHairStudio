import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { layananAPI } from "../../service/layananAPI";

export default function EditLayanan() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
    deskripsi: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      navigate("/layanantampil");
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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Layanan
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama */}
        <div>
          <label className="block mb-1 font-medium text-sm">Nama Layanan</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl text-sm"
            placeholder="Masukkan nama layanan"
          />
        </div>

        {/* Harga */}
        <div>
          <label className="block mb-1 font-medium text-sm">Harga</label>
          <input
            type="text"
            name="harga"
            value={formData.harga}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl text-sm"
            placeholder="Contoh: 45000"
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block mb-1 font-medium text-sm">Deskripsi</label>
          <textarea
            name="deskripsi"
            rows="4"
            value={formData.deskripsi}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl text-sm"
            placeholder="Tuliskan deskripsi layanan"
          />
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-xl text-sm hover:bg-gray-400"
            disabled={loading}
          >
            Batal
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
