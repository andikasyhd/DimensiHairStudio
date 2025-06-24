import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pemesananAPI } from "../../service/pemesananAPI";

export default function FormPemesanan() {
  const [nama, setNama] = useState('');
  const [noHP, setNoHP] = useState(''); // ← Tambahkan state noHP
  const [tanggal, setTanggal] = useState('');
  const [waktu, setWaktu] = useState('');
  const [success, setSuccess] = useState(false);
  const [layanan, setLayanan] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const layananData = location.state?.layanan;
    if (layananData) {
      setLayanan(layananData);
    } else {
      navigate('/layanan');
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await pemesananAPI.createPemesanan({
        id: layanan?.id,
        nama,
        noHP,      // ← Sertakan noHP dalam data pemesanan
        tanggal,
        waktu,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate('/layanan');
      }, 2000);

      // Reset field
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black text-white py-20 px-6 md:px-20 font-serif">
      <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Form Pemesanan</h2>

        {success && (
          <div role="alert" className="alert alert-success mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Terima kasih sudah booking! Untuk info lebih lanjut dapat hubungi +62 821 706 790</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Layanan</label>
            <input
              type="text"
              value={layanan?.nama || ''}
              disabled
              className="input input-bordered w-full bg-gray-800 text-white border-white/20"
            />
          </div>

          <div>
            <label className="block mb-1">Nama</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="input input-bordered w-full bg-gray-800 text-white border-white/20"
              required
            />
          </div>

          <div>
            <label className="block mb-1">No HP</label>
            <input
              type="tel"
              value={noHP}
              onChange={(e) => setNoHP(e.target.value)}
              className="input input-bordered w-full bg-gray-800 text-white border-white/20"
              required
              placeholder="Contoh: 081234567890"
            />
          </div>

          <div>
            <label className="block mb-1">Tanggal</label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="input input-bordered w-full bg-gray-800 text-white border-white/20"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Waktu</label>
            <input
              type="time"
              value={waktu}
              onChange={(e) => setWaktu(e.target.value)}
              className="input input-bordered w-full bg-gray-800 text-white border-white/20"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full transition-transform hover:scale-105">
            Booking
          </button>

          <button
            type="button"
            onClick={() => navigate('/layanan')}
            className="btn btn-ghost w-full mt-2 text-white border-white hover:bg-white hover:text-black"
          >
            Kembali ke Layanan
          </button>
        </form>
      </div>
    </div>
  );
}
