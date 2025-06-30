import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { layananAPI } from "../../service/layananAPI";
import { FaUpload, FaImage, FaCheck, FaTimes, FaEdit, FaMoneyBill } from "react-icons/fa";

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

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 10MB.");
      return;
    }

    setError("");
    setGambarBaru(file);
    setPreviewUrl(URL.createObjectURL(file));
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

      await layananAPI.updateLayanan(id, {
        ...formData,
        gambar: imageUrl,
      });

      setSuccess("✅ Layanan berhasil diperbarui!");
      setTimeout(() => navigate("/layanantampil"), 1500);
    } catch (err) {
      setError("❌ Gagal memperbarui layanan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-10 px-4 sm:px-10">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-purple-500 to-indigo-500 text-white rounded-full mb-2 shadow-lg">
            <FaEdit size={24} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Edit Layanan</h2>
          <p className="text-sm text-gray-500">Perbarui informasi layanan Anda dengan mudah</p>
        </div>

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

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kolom Form */}
          <div className="space-y-5">
            <div>
              <label className="font-semibold flex items-center gap-2 text-gray-700 mb-1">
                <FaEdit /> Nama Layanan
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                placeholder="Contoh: Potong Rambut Premium"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="font-semibold flex items-center gap-2 text-gray-700 mb-1">
                <FaMoneyBill /> Harga (Rupiah)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-gray-400">Rp</span>
                <input
                  type="number"
                  name="harga"
                  value={formData.harga}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold flex items-center gap-2 text-gray-700 mb-1">
                <FaEdit /> Deskripsi Layanan
              </label>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                rows={4}
                required
                className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          {/* Kolom Gambar */}
          <div>
            <label className="font-semibold flex items-center gap-2 text-gray-700 mb-2">
              <FaImage /> Upload Gambar
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
              <label className="cursor-pointer flex flex-col items-center gap-2 text-gray-500">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg">
                  <FaUpload />
                </div>
                <span>Drag & drop gambar di sini</span>
                <span className="text-blue-500 underline">klik untuk browse</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleGambarChange}
                  className="hidden"
                />
                <p className="text-sm text-gray-400 mt-1">PNG, JPG, JPEG (Max. 10MB)</p>
              </label>
            </div>

            {(previewUrl || formData.gambar) && (
              <div className="mt-5">
                <p className="text-sm text-gray-500 mb-2">Gambar Saat Ini:</p>
                <img
                  src={previewUrl || formData.gambar}
                  alt="Preview"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full rounded-xl shadow-md cursor-zoom-in object-cover max-h-64"
                />
              </div>
            )}
          </div>

          {/* Tombol Aksi */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate("/layanantampil")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-400 text-gray-600 font-medium hover:bg-gray-100 transition"
            >
              <FaTimes /> Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2  bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition disabled:opacity-50"
            >
              <FaCheck />
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>

      {/* Modal Gambar */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={previewUrl || formData.gambar}
            alt="Zoom Gambar"
            className="max-w-full max-h-full rounded-xl shadow-2xl border-4 border-white"
          />
        </div>
      )}
    </div>
  );
}
