import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { layananAPI } from "../../service/layananAPI";

export default function EditLayanan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
    deskripsi: "",
    gambar: "",
  });
  const [gambarBaru, setGambarBaru] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const layanan = await layananAPI.getLayananById(id);
        if (layanan) {
          setFormData(layanan);
        } else {
          setError("Layanan tidak ditemukan.");
        }
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data layanan.");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGambarChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setGambarBaru(null);
      setPreviewUrl("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 2MB.");
      return;
    }

    setError("");
    setGambarBaru(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let imageUrl = formData.gambar;

      if (gambarBaru) {
        imageUrl = await layananAPI.uploadGambar(gambarBaru);
      }

      const updatedData = {
        ...formData,
        gambar: imageUrl,
      };

      await layananAPI.updateLayanan(id, updatedData);
      setSuccess("✅ Layanan berhasil diperbarui!");
      setTimeout(() => {
        navigate("/layanantampil");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("❌ Gagal memperbarui layanan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 sm:px-10">
      <div className="max-w-2xl ml-0 bg-white shadow-xl rounded-3xl p-8 border border-gray-200 transition-all">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Edit Layanan</h2>

        {error && (
          <div className="mb-4 text-red-700 bg-red-100 border border-red-300 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 text-green-700 bg-green-100 border border-green-300 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Nama Layanan</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              placeholder="Contoh: Potong Rambut"
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Harga</label>
            <input
              type="number"
              name="harga"
              value={formData.harga}
              onChange={handleChange}
              required
              placeholder="Contoh: 25000"
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Deskripsi</label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              rows={4}
              required
              placeholder="Deskripsikan layanan secara singkat..."
              className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Upload Gambar Baru</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleGambarChange}
              className="file-input file-input-bordered w-full"
            />
            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1">Preview Gambar Baru:</p>
                <img
                  src={previewUrl}
                  alt="Preview"
                  onClick={() => setIsModalOpen(true)}
                  className="w-48 h-48 object-cover border rounded-xl cursor-zoom-in hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
          </div>

          {!previewUrl && formData.gambar && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-1">Gambar Saat Ini:</p>
              <img
                src={formData.gambar}
                alt="Gambar Lama"
                className="w-48 h-48 object-cover border rounded-xl"
              />
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/layanantampil")}
              className="px-6 py-3 rounded-xl border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>

      {/* Modal Zoom Gambar */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={previewUrl}
            alt="Zoom Gambar"
            className="max-w-full max-h-full rounded-xl shadow-2xl border-4 border-white"
          />
        </div>
      )}
    </div>
  );
}
