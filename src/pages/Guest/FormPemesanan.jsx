import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pemesananAPI } from "../../service/pemesananAPI";

export default function FormPemesanan() {
  const [nama, setNama] = useState('');
  const [noHP, setNoHP] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [waktu, setWaktu] = useState('');
  const [success, setSuccess] = useState(false);
  const [layanan, setLayanan] = useState(null);
  const [minDate, setMinDate] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const layananData = location.state?.layanan;
    if (layananData) {
      setLayanan(layananData);
    } else {
      navigate('/layanan');
    }

    // Set tanggal minimum ke hari ini
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = new Date(tanggal);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (selectedDate < now) {
      alert("Tanggal tidak boleh di masa lalu.");
      return;
    }

    try {
      await pemesananAPI.createPemesanan({
        id: layanan?.id,
        nama,
        noHP,
        tanggal,
        waktu,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate('/layanan');
      }, 2000);

      setNama('');
      setNoHP('');
      setTanggal('');
      setWaktu('');
    } catch (error) {
      alert('Gagal melakukan booking.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black text-white flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-10 font-serif">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Form Pemesanan</h2>

        {success && (
          <div role="alert" className="flex items-center gap-2 text-sm bg-green-700/20 text-green-200 p-4 rounded-lg mb-4 border border-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Terima kasih sudah booking! Untuk info lebih lanjut hubungi +62 821 706 790</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm sm:text-base">
          <div>
            <label className="block mb-1">Layanan</label>
            <input
              type="text"
              value={layanan?.nama || ''}
              disabled
              className="w-full rounded-md bg-gray-800 text-white px-4 py-2 border border-white/20"
            />
          </div>

          <div>
            <label className="block mb-1">Nama</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full rounded-md bg-gray-800 text-white px-4 py-2 border border-white/20"
              required
            />
          </div>

          <div>
            <label className="block mb-1">No HP</label>
            <input
              type="tel"
              value={noHP}
              onChange={(e) => setNoHP(e.target.value)}
              className="w-full rounded-md bg-gray-800 text-white px-4 py-2 border border-white/20"
              required
              placeholder="Contoh: 081234567890"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Tanggal</label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full rounded-md bg-gray-800 text-white px-4 py-2 border border-white/20"
                required
                min={minDate}
              />
            </div>

            <div>
              <label className="block mb-1">Waktu</label>
              <input
                type="time"
                value={waktu}
                onChange={(e) => setWaktu(e.target.value)}
                className="w-full rounded-md bg-gray-800 text-white px-4 py-2 border border-white/20"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition duration-300 transform hover:scale-105"
          >
            Booking
          </button>

          <button
            type="button"
            onClick={() => navigate('/layanan')}
            className="w-full py-2 mt-2 rounded-lg border border-white hover:bg-white hover:text-black transition duration-300"
          >
            Kembali ke Layanan
          </button>
        </form>
      </div>
    </div>
  );
}
