import { useEffect, useState } from 'react';
import { pemesananAPI } from '../../service/pemesananAPI';

export default function ListPelanggan() {
  const [pemesanan, setPemesanan] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await pemesananAPI.getAllPemesanan();
        setPemesanan(data);
        setFiltered(data);
      } catch (error) {
        console.error('Gagal memuat data pemesanan:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    let hasilFilter = [...pemesanan];

    if (searchTerm) {
      hasilFilter = hasilFilter.filter(item =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === 'terbaru') {
      hasilFilter.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortOrder === 'terlama') {
      hasilFilter.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    setFiltered(hasilFilter);
  }, [searchTerm, sortOrder, pemesanan]);

  const kirimPesan = (noHP, isiPesan) => {
    const nomorFormatInternasional = noHP.replace(/^0/, '62');
    const url = `https://wa.me/${nomorFormatInternasional}?text=${isiPesan}`;
    window.open(url, '_blank');
  };

  const buatPesanSetuju = (item) => {
    const isi = `Halo ${item.nama}%0A` +
      `Terima kasih telah melakukan pemesanan layanan Pangkas.%0A` +
      `Pemesanan Anda telah diterima%0A` +
      `- Tanggal: ${item.tanggal}%0A` +
      `- Waktu: ${item.waktu}%0A%0A` +
      `Mohon datang tepat waktu sesuai jadwal.%0A%0A` +
      `Salam,%0ATim Layanan,%0ADimensi Hair Studio`;
    return isi;
  };

  const buatPesanTolak = (item) => {
    const isi = `Halo ${item.nama}%0A` +
      `Mohon maaf, pemesanan layanan Pangkas%0A%0A Pada:%0A` +
      `- tanggal: ${item.tanggal}%0A` +
      `- Waktu: ${item.waktu}%0A` +
      `sudah penuh.%0ASilakan coba booking di waktu lain.%0A` +
      `Terima kasih atas pengertiannya %0A%0A`+
      `Salam,%0ATim Layanan,%0ADimensi Hair Studio`;
    return isi;
  };

  return (
    <div className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-4">Daftar Pemesanan Pelanggan</h1>

      {/* Filter */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Cari data"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-black rounded-full px-4 py-2 text-sm w-64 placeholder:text-gray-400"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-black rounded-full px-4 py-2 text-sm w-40 text-black"
        >
          <option value="">Urutkan</option>
          <option value="terbaru">Terbaru</option>
          <option value="terlama">Terlama</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-sky-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">No</th>
              <th className="px-4 py-2 text-left">Nama</th>
              <th className="px-4 py-2 text-left">No HP</th>
              <th className="px-4 py-2 text-left">Tanggal</th>
              <th className="px-4 py-2 text-left">Waktu</th>
              <th className="px-4 py-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Tidak ada data pemesanan
                </td>
              </tr>
            ) : (
              filtered.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? 'bg-gray-100 text-black' : 'bg-white text-black'}
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.nama}</td>
                  <td className="px-4 py-2">{item.noHP}</td>
                  <td className="px-4 py-2">{item.tanggal}</td>
                  <td className="px-4 py-2">{item.waktu}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => kirimPesan(item.noHP, buatPesanSetuju(item))}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Setujui
                    </button>
                    <button
                      onClick={() => kirimPesan(item.noHP, buatPesanTolak(item))}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Tolak
                    </button>
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
