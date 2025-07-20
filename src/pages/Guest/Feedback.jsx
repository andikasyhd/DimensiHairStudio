import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { feedbackAPI } from '../../service/feedbackAPI'; // pastikan path ini sesuai

export default function Feedback() {
  const [nama, setNama] = useState('');
  const [noHP, setNoHP] = useState('');
  const [saran, setSaran] = useState('');
  const [rating, setRating] = useState(0);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await feedbackAPI.createFeedback({
        nama,
        no_hp: noHP,
        rating: rating.toString(), // rating disimpan sebagai text
        saran,
      });

      setSuccess(true);
      setNama('');
      setNoHP('');
      setSaran('');
      setRating(0);

      setTimeout(() => {
        navigate('/kontak');
      }, 2500);
    } catch (err) {
      console.error('Gagal mengirim feedback:', err);
      alert('Gagal mengirim feedback.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black text-white py-20 px-4 md:px-10 font-serif">
      <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Form Feedback</h2>

        {success && (
          <div className="mb-4 p-4 bg-green-500/20 text-green-300 rounded-md text-sm">
            Terima kasih atas feedback Anda! ❤️
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1">Nama</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full bg-gray-800 border border-white/20 text-white rounded-md px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Nomor HP</label>
            <input
              type="tel"
              value={noHP}
              onChange={(e) => setNoHP(e.target.value)}
              className="w-full bg-gray-800 border border-white/20 text-white rounded-md px-4 py-2"
              placeholder="Contoh: 081234567890"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Rating</label>
            <div className="flex space-x-2 text-yellow-400 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-500'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-1">Saran / Pesan</label>
            <textarea
              value={saran}
              onChange={(e) => setSaran(e.target.value)}
              rows={4}
              className="w-full bg-gray-800 border border-white/20 text-white rounded-md px-4 py-2"
              placeholder="Tulis saran atau pesan Anda..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-300 transition duration-300"
          >
            Kirim Feedback
          </button>

          <button
            type="button"
            onClick={() => navigate('/kontak')}
            className="w-full mt-2 text-white border border-white hover:bg-white hover:text-black rounded-md py-2 transition duration-300"
          >
            Kembali ke Beranda
          </button>
        </form>
      </div>
    </div>
  );
}
