import { useState, useEffect } from "react";
import { FaShoppingCart, FaStar, FaFireAlt } from "react-icons/fa";
import productData from "../../JSON/produk.json";

export default function ProdukTampil() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Using the imported data directly
      console.log("Data produk:", productData);
      setProducts(productData);
      setLoading(false);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Gagal memuat data produk");
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="text-center p-10">Memuat produk...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  if (!products || products.length === 0) return <div className="text-center p-10">Tidak ada produk yang tersedia</div>;

  return (
    <section className="py-12 px-4 md:px-8 bg-red-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-red-600 mb-2 flex items-center justify-center gap-2">
            <FaFireAlt /> Layanan Spesial Dimensi HairStudio
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nikmati pengalaman pangkas rambut profesional dengan sentuhan gaya modern dan kualitas terbaik.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.kode_produk} className="bg-white rounded-xl shadow-md overflow-hidden border border-red-100 hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <div className="h-48 bg-red-50 flex items-center justify-center">
                  <FaShoppingCart className="text-red-200 text-5xl" />
                </div>
                {product.stok === 0 && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    HABIS
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{product.nama_produk}</h3>
                  {product.harga > 35000 && (
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full flex items-center">
                      <FaFireAlt className="mr-1" /> Premium
                    </span>
                  )}
                </div>
                
                <p className="text-red-600 font-bold text-xl mb-3">Rp{product.harga?.toLocaleString() || 0}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar className="text-gray-300" />
                    </div>
                  </div>
                  
                  <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                    product.stok > 0 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {product.stok > 0 ? `Stok: ${product.stok}` : "Stok Habis"}
                  </div>
                </div>
                
                <button 
                  className={`w-full mt-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${
                    product.stok > 0
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  } transition-colors`}
                  disabled={product.stok === 0}
                >
                  <FaShoppingCart />
                  {product.stok > 0 ? "Pesan Sekarang" : "Stok Habis"}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg flex items-center gap-2 mx-auto">
            Lihat Semua Menu <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}