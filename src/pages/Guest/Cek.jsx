import produkList from "../../JSON/produk.json";
import { useState } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaShoppingBasket, FaSearch } from "react-icons/fa";

export default function Cek() {
  const [kode, setKode] = useState("");
  const [error, setError] = useState("");
  const [produk, setProduk] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setProduk(null);
    setError("");
    setStatus("");

    const kodeTrimmed = kode.trim().toUpperCase();

    if (!kodeTrimmed) {
      setError("Kode produk tidak boleh kosong.");
      return;
    }
    if (kodeTrimmed.length < 2) {
      setError("Kode produk minimal 4 karakter.");
      return;
    }

    const found = produkList.find((p) => p.kode_produk === kodeTrimmed);

    if (!found) {
      setStatus("notfound");
      return;
    }

    setProduk(found);
    if (found.stok > 0) {
      setStatus("available");
    } else {
      setStatus("empty");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-6 bg-white shadow-xl rounded-2xl mt-12 mb-12 border border-red-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 text-red-600 flex items-center justify-center gap-2">
          <FaSearch className="text-red-500" /> 
          Cek Ketersediaan Produk
        </h2>
        <p className="text-gray-600">Masukkan kode produk untuk mengetahui stok dan harga</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Contoh: P01"
            value={kode}
            onChange={(e) => setKode(e.target.value)}
            className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-100 text-lg transition-all"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400">
            <FaShoppingBasket className="text-xl" />
          </div>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
            <FaTimesCircle />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <FaSearch /> Cek Sekarang
        </button>
      </form>

      {status === "available" && produk && (
        <div className="p-6 bg-gradient-to-r from-red-50 to-white border-2 border-red-200 rounded-xl shadow-sm mb-6">
          <div className="flex items-start gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <FaCheckCircle className="text-red-600 text-2xl" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-red-700 mb-1">Produk Tersedia!</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">{produk.nama_produk}</span> - Rp{produk.harga}
              </p>
              <p className="text-sm bg-red-100 text-red-700 inline-block px-3 py-1 rounded-full">
                Stok: {produk.stok} unit
              </p>
            </div>
          </div>
        </div>
      )}

      {status === "empty" && produk && (
        <div className="p-6 bg-gradient-to-r from-orange-50 to-white border-2 border-orange-200 rounded-xl shadow-sm mb-6">
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <FaExclamationTriangle className="text-orange-600 text-2xl" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-orange-700 mb-1">Stok Habis</h3>
              <p className="text-gray-700 mb-2">
                Produk <span className="font-semibold">{produk.nama_produk}</span> sedang tidak tersedia
              </p>
              <p className="text-sm text-orange-600">
                Silakan cek kembali lain waktu atau hubungi kami
              </p>
            </div>
          </div>
        </div>
      )}

      {status === "notfound" && (
        <div className="p-6 bg-gradient-to-r from-red-100 to-white border-2 border-red-200 rounded-xl shadow-sm mb-6">
          <div className="flex items-start gap-4">
            <div className="bg-red-200 p-3 rounded-full">
              <FaTimesCircle className="text-red-700 text-2xl" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-red-800 mb-1">Produk Tidak Ditemukan</h3>
              <p className="text-gray-700 mb-2">
                Kode produk yang Anda masukkan tidak terdaftar
              </p>
              <p className="text-sm text-red-700">
                Pastikan kode produk benar atau hubungi tim kami
              </p>
            </div>
          </div>
        </div>
      )}

      {status && (
        <div className="text-center mt-8">
          <button className="px-6 py-2 bg-white border-2 border-red-300 text-red-600 rounded-full font-medium hover:bg-red-50 transition-all">
            Lihat Semua Produk
          </button>
        </div>
      )}
    </div>
  );
}