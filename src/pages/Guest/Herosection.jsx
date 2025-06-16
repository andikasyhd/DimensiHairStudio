export default function Herosection() {
  return (
    <section className="bg-gradient-to-b from-gray-900 via-black to-black text-white py-20 px-6 md:px-20 font-serif">
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Konten kiri */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
            Temukan <span className="text-emerald-400">Gaya Baru</span> Anda <br className="hidden md:block" />
            di <span className="text-emerald-400">DimensiHairStudio</span>
          </h1>
          <p className="mb-6 text-lg text-gray-300 max-w-md mx-auto md:mx-0">
            Kami hadir untuk memberikan transformasi terbaik untuk rambut Anda—perpaduan antara seni, kenyamanan, dan keahlian profesional.
          </p>
        </div>

        {/* Gambar kanan */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/img/makanan.jpg" // Ganti dengan gambar salon jika tersedia
            alt="DimensiHairStudio Interior"
            className="w-full max-w-md rounded-xl shadow-2xl object-cover border border-gray-700"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
