import jobs from "../../JSON/produkunggulan.json";

export default function Produk() {
  const utama = jobs[0];
  const lainnya = jobs.slice(1, 4);

  return (
    <section className="px-6 md:px-12 py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 text-center md:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-teks mb-2">
              Produk Unggulan 
            </h2>
          </div>
        </div>

        {/* Konten */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kartu besar */}
          <div className="md:col-span-1 relative rounded-2xl overflow-hidden shadow-lg group">
            <img
              src={utama.gambar}
              alt={utama.nama}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
              <p className="text-sm mb-1">{utama.lokasi || "Tegal, Indonesia"}</p>
              <h3 className="text-2xl font-bold">{utama.nama}</h3>
              <div className="flex justify-between items-center mt-2 text-sm">
                <span className="font-semibold">Rp. {utama.harga}</span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="ml-1">4.5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kartu kecil */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {lainnya.map((produk) => (
              <div
                key={produk.id}
                className="flex bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
              >
                {/* Gambar */}
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={produk.gambar}
                    alt={produk.nama}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Konten */}
                <div className="p-4 flex flex-col justify-center flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-teks mb-1 truncate">
                    {produk.nama}
                  </h4>
                  <div className="flex justify-between items-center text-sm text-teks-samping">
                    <span className="font-semibold">Rp. {produk.harga}</span>
                    <div className="flex items-center gap-1 text-yellow-400">
                      ★★★★☆ <span className="ml-1 text-gray-600">4.5</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
