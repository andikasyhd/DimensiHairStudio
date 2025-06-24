// import { useState, useEffect } from "react";
// import { FaShoppingCart, FaStar, FaFireAlt } from "react-icons/fa";
// import productData from "../../JSON/produk.json";

// export default function ProdukTampil() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     try {
//       // Using the imported data directly
//       console.log("Data produk:", productData);
//       setProducts(productData);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error loading products:", err);
//       setError("Gagal memuat data produk");
//       setLoading(false);
//     }
//   }, []);

//   if (loading) return <div className="text-center p-10">Memuat produk...</div>;
//   if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;
//   if (!products || products.length === 0) return <div className="text-center p-10">Tidak ada produk yang tersedia</div>;

//   return (
//     <section className="py-12 px-4 md:px-8 bg-red-50">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-red-600 mb-2 flex items-center justify-center gap-2">
//             <FaFireAlt /> Layanan Spesial Dimensi HairStudio
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Nikmati pengalaman pangkas rambut profesional dengan sentuhan gaya modern dan kualitas terbaik.
//           </p>
//         </div>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <div key={product.kode_produk} className="bg-white rounded-xl shadow-md overflow-hidden border border-red-100 hover:shadow-lg transition-all duration-300">
//               <div className="relative">
//                 <div className="h-48 bg-red-50 flex items-center justify-center">
//                   <FaShoppingCart className="text-red-200 text-5xl" />
//                 </div>
//                 {product.stok === 0 && (
//                   <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
//                     HABIS
//                   </div>
//                 )}
//               </div>
              
//               <div className="p-5">
//                 <div className="flex justify-between items-start mb-2">
//                   <h3 className="text-lg font-bold text-gray-800">{product.nama_produk}</h3>
//                   {product.harga > 35000 && (
//                     <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full flex items-center">
//                       <FaFireAlt className="mr-1" /> Premium
//                     </span>
//                   )}
//                 </div>
                
//                 <p className="text-red-600 font-bold text-xl mb-3">Rp{product.harga?.toLocaleString() || 0}</p>
                
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center">
//                     <div className="flex text-yellow-400">
//                       <FaStar />
//                       <FaStar />
//                       <FaStar />
//                       <FaStar />
//                       <FaStar className="text-gray-300" />
//                     </div>
//                   </div>
                  
//                   <div className={`text-sm font-medium px-3 py-1 rounded-full ${
//                     product.stok > 0 
//                       ? "bg-green-100 text-green-800" 
//                       : "bg-gray-100 text-gray-800"
//                   }`}>
//                     {product.stok > 0 ? `Stok: ${product.stok}` : "Stok Habis"}
//                   </div>
//                 </div>
                
//                 <button 
//                   className={`w-full mt-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${
//                     product.stok > 0
//                       ? "bg-red-600 hover:bg-red-700 text-white"
//                       : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   } transition-colors`}
//                   disabled={product.stok === 0}
//                 >
//                   <FaShoppingCart />
//                   {product.stok > 0 ? "Pesan Sekarang" : "Stok Habis"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         <div className="mt-12 text-center">
//           <button className="px-8 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg flex items-center gap-2 mx-auto">
//             Lihat Semua Menu <span className="text-xl">→</span>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
// import { useEffect, useState } from "react";
// import { layananAPI } from "../../service/layananAPI";

// export default function ProdukTampil() {
//   const [loading, setLoading] = useState(false);
//   const [layananList, setLayananList] = useState([]);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [editId, setEditId] = useState(null);

//   const [formLayanan, setFormLayanan] = useState({
//     nama: "",
//     harga: "",
//     deskripsi: "",
//     gambarFile: "",
//     gambarUrl: "",
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const data = await layananAPI.fetchLayanan();
//     setLayananList(data);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "gambarFile") {
//       setFormLayanan({ ...formLayanan, gambarFile: files[0] });
//     } else {
//       setFormLayanan({ ...formLayanan, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       let gambarUrl = formLayanan.gambarUrl;

//       if (formLayanan.gambarFile) {
//         gambarUrl = await layananAPI.uploadGambar(formLayanan.gambarFile);

//         // Validasi hasil upload
//         if (!gambarUrl.includes("https://")) {
//           throw new Error("Upload gambar gagal.");
//         }
//       }

//       // Bangun payload hanya dengan field yang valid
//       const payload = {
//         nama: formLayanan.nama,
//         harga: formLayanan.harga,
//         deskripsi: formLayanan.deskripsi,
//         ...(gambarUrl && { gambar_url: gambarUrl }),
//       };

//       console.log("Payload dikirim ke Supabase:", payload); // Debug

//       if (editId) {
//         await layananAPI.updateLayanan(editId, payload);
//         setSuccess("Layanan berhasil diperbarui");
//       } else {
//         await layananAPI.createLayanan(payload);
//         setSuccess("Layanan berhasil ditambahkan");
//       }

//       setFormLayanan({
//         nama: "",
//         harga: "",
//         deskripsi: "",
//         gambarFile: null,
//         gambarUrl: "",
//       });
//       setEditId(null);
//       await fetchData();
//     } catch (err) {
//       console.error("Gagal menyimpan data:", err);
//       setError("Gagal menyimpan data: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (layanan) => {
//     setFormLayanan({
//       nama: layanan.nama,
//       harga: layanan.harga,
//       deskripsi: layanan.deskripsi,
//       gambarFile: null,
//       gambarUrl: layanan.gambar_url,
//     });
//     setEditId(layanan.id);
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Yakin ingin menghapus layanan ini?")) return;
//     setLoading(true);
//     await layananAPI.deleteLayanan(id);
//     await fetchData();
//     setLoading(false);
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">
//         {editId ? "Edit Layanan" : "Tambah Layanan"}
//       </h2>

//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-600">{success}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="nama"
//           placeholder="Nama layanan"
//           value={formLayanan.nama}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="harga"
//           placeholder="Harga"
//           value={formLayanan.harga}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <textarea
//           name="deskripsi"
//           placeholder="Deskripsi"
//           value={formLayanan.deskripsi}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           rows={3}
//           required
//         />
//         <input
//           type="file"
//           name="gambarFile"
//           onChange={handleChange}
//           accept="image/*"
//           className="w-full"
//         />

//         {formLayanan.gambarUrl && (
//           <img
//             src={formLayanan.gambarUrl}
//             alt="Preview"
//             className="w-32 h-32 object-cover rounded"
//           />
//         )}

//         <button
//           type="submit"
//           className="bg-emerald-600 text-white px-4 py-2 rounded"
//           disabled={loading}
//         >
//           {loading ? "Menyimpan..." : editId ? "Perbarui" : "Tambah"}
//         </button>
//       </form>

//       <div className="mt-8">
//         <h3 className="text-lg font-semibold mb-2">Daftar Layanan</h3>
//         <ul className="space-y-3">
//           {layananList.map((item) => (
//             <li
//               key={item.id}
//               className="border p-3 rounded flex justify-between items-center"
//             >
//               <div>
//                 <p className="font-bold">{item.nama}</p>
//                 <p>{item.harga}</p>
//                 <p className="text-sm text-gray-500">{item.deskripsi}</p>
//                 {item.gambar_url && (
//                   <img
//                     src={item.gambar_url}
//                     alt={item.nama}
//                     className="w-20 h-20 object-cover mt-2"
//                   />
//                 )}
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleEdit(item)}
//                   className="text-blue-500"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(item.id)}
//                   className="text-red-500"
//                 >
//                   Hapus
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { layananAPI } from "../../service/layananAPI";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router-dom";


export default function Layanan() {
  const [layanan, setLayanan] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadLayanan();
  }, []);

  const loadLayanan = async () => {
    try {
      setLoading(true);
      const data = await layananAPI.fetchLayanan();
      setLayanan(data);
    } catch (error) {
      console.error("Gagal memuat data layanan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus layanan ini?")) return;
    try {
      setLoading(true);
      await layananAPI.deleteLayanan(id);
      await loadLayanan();
    } catch (err) {
      console.error("Gagal menghapus:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLayanan = layanan.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Data Layanan</h1>

      {/* Search & Tambah */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari nama layanan..."
          className="p-2 border rounded-xl w-full sm:w-64 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
            ) : filteredLayanan.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-600">
                  Data tidak tersedia.
                </td>
              </tr>
            ) : (
              filteredLayanan.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4">{index + 1}</td>
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
                        onClick={() => handleDelete(item.id)}
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
    </div>
  );
}
