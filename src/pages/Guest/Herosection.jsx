export default function Herosection() {
  return (
    <section className="bg-red-50 text-gray-800 py-16 px-8 md:px-24 font-sans">
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Nikmati <span className="text-red-600">Cita Rasa</span> <br /> di <span className="text-red-600">SEDAP!</span>
          </h1>
          <p className="mb-6 text-lg text-gray-600">
            Temukan kelezatan autentik Indonesia dengan sentuhan modern yang menggugah selera!
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition duration-300 transform hover:scale-105">
            Lihat Menu
          </button>
        </div>
        <div>
          <img 
            src="img/makanan.jpg" 
            alt="Makanan Sedap" 
            className="w-full max-w-xl mx-auto rounded-lg shadow-lg" 
          />
        </div>
      </div>
    </section>
  );
}
