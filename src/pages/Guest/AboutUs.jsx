export default function AboutUs() {
  return (
    <section className="py-16 px-4 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-red-50 rounded-2xl shadow-md overflow-hidden">
        
        {/* Bagian kiri: Gambar */}
        <div className="md:w-1/2 relative h-full">
          <img
            src="/img/aboutus.jpg"
            alt="Restoran Sedap"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bagian kanan: Konten */}
        <div className="md:w-1/2 p-8">
          <p className="text-red-600 font-semibold uppercase mb-2 tracking-wider">
            Tentang Kami
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug mb-4">
            Menyajikan Cita Rasa <span className="text-red-600">Autentik</span> Indonesia
          </h2>
          <p className="text-gray-600 mb-6">
            Sedap menghadirkan kuliner tradisional dengan sentuhan modern, mempertahankan keaslian rasa warisan nenek moyang.
          </p>
          <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition">
            Jelajahi Menu
          </button>
        </div>
      </div>
    </section>
  );
}