import { useEffect, useState } from 'react';
import { pemesananAPI } from '../../service/pemesananAPI';
import { UserPlus, CalendarCheck2 } from 'lucide-react';

function getClickedKeys() {
  return new Set(JSON.parse(sessionStorage.getItem('klikKonfirmasi') || '[]'));
}

function addClickedKey(key) {
  const set = getClickedKeys();
  set.add(key);
  sessionStorage.setItem('klikKonfirmasi', JSON.stringify([...set]));
}

export default function ListPelanggan() {
  const [pemesanan, setPemesanan] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await pemesananAPI.getAllPemesanan();
        const uniqueData = Array.isArray(data)
          ? data.filter((item, index, self) =>
              index === self.findIndex(i =>
                i.nama === item.nama &&
                i.tanggal === item.tanggal &&
                i.waktu === item.waktu
              )
            )
          : [];
        setPemesanan(uniqueData);
      } catch (error) {
        console.error('Gagal memuat data pemesanan:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let hasil = [...pemesanan];

    if (searchTerm) {
      hasil = hasil.filter(item =>
        item.nama?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === 'terbaru') {
      hasil.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortOrder === 'terlama') {
      hasil.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    setFiltered(hasil);
    setCurrentPage(1);
  }, [pemesanan, searchTerm, sortOrder]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filtered.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // ✅ Menghitung pemesanan hari ini berdasarkan created_at
  const jumlahHariIni = pemesanan.filter(item =>
    new Date(item.created_at).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)
  ).length;

  const kirimPesan = (noHP, isiPesan) => {
    const nomor = noHP.replace(/^0/, '62').replace(/[^0-9]/g, '');
    const url = `https://wa.me/${nomor}?text=${isiPesan}`;
    window.open(url, '_blank');
  };

  const buatPesanSetuju = (item) => {
    return encodeURIComponent(
      `Halo ${item.nama},\n\nTerima kasih telah melakukan pemesanan layanan Pangkas.\nPemesanan Anda telah diterima:\n- Tanggal: ${item.tanggal}\n- Waktu: ${item.waktu}\n\nMohon datang tepat waktu sesuai jadwal.\n\nSalam,\nTim Layanan\nDimensi Hair Studio`
    );
  };

  const buatPesanTolak = (item) => {
    return encodeURIComponent(
      `Halo ${item.nama},\n\nMohon maaf, pemesanan layanan Pangkas Anda:\n- Tanggal: ${item.tanggal}\n- Waktu: ${item.waktu}\nTidak dapat kami terima karena jadwal sudah penuh.\n\nSilakan coba booking di waktu lain.\n\nTerima kasih atas pengertiannya.\n\nSalam,\nTim Layanan\nDimensi Hair Studio`
    );
  };

  const handleKirimPesan = (item, tipe) => {
    const key = `${item.nama}-${item.tanggal}-${item.waktu}`;
    if (!getClickedKeys().has(key)) {
      const pesan = tipe === 'setuju' ? buatPesanSetuju(item) : buatPesanTolak(item);
      kirimPesan(item.noHP, pesan);
      addClickedKey(key);
    }
  };

  return (
    <div className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-6">📋 Daftar Pemesanan Pelanggan</h1>

      {/* Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4 border border-gray-100">
          <UserPlus className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Total Pelanggan</p>
            <p className="text-xl font-semibold">{pemesanan.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4 border border-gray-100">
          <CalendarCheck2 className="text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Pemesanan Hari Ini</p>
            <p className="text-xl font-semibold">{jumlahHariIni}</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari nama pelanggan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 text-sm shadow-sm placeholder:text-gray-500"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-40 text-sm shadow-sm"
        >
          <option value="">Urutkan</option>
          <option value="terbaru">Terbaru</option>
          <option value="terlama">Terlama</option>
        </select>
      </div>

      {/* Box Tabel */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">📑 Data Pemesanan</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-separate border-spacing-y-2">
            <thead className="bg-sky-600 text-white">
              <tr>
                <th className="px-4 py-3 rounded-l-xl">No</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">No HP</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Waktu</th>
                <th className="px-4 py-3 rounded-r-xl">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Tidak ada data pemesanan.
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => {
                  const key = `${item.nama}-${item.tanggal}-${item.waktu}`;
                  const isDisabled = getClickedKeys().has(key);

                  return (
                    <tr
                      key={key}
                      className="bg-gray-50 hover:bg-gray-100 rounded-xl"
                    >
                      <td className="px-4 py-2">{startIndex + index + 1}</td>
                      <td className="px-4 py-2">{item.nama}</td>
                      <td className="px-4 py-2">{item.noHP}</td>
                      <td className="px-4 py-2">{item.tanggal}</td>
                      <td className="px-4 py-2">{item.waktu}</td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          disabled={isDisabled}
                          onClick={() => handleKirimPesan(item, 'setuju')}
                          className={`px-3 py-1 rounded text-sm text-white transition ${
                            isDisabled
                              ? 'bg-green-300 cursor-not-allowed'
                              : 'bg-green-500 hover:bg-green-600'
                          }`}
                        >
                          Setujui
                        </button>
                        <button
                          disabled={isDisabled}
                          onClick={() => handleKirimPesan(item, 'tolak')}
                          className={`px-3 py-1 rounded text-sm text-white transition ${
                            isDisabled
                              ? 'bg-red-300 cursor-not-allowed'
                              : 'bg-red-500 hover:bg-red-600'
                          }`}
                        >
                          Tolak
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 text-sm text-gray-700">
        <p>
          Menampilkan {filtered.length === 0 ? 0 : startIndex + 1} -{' '}
          {Math.min(endIndex, filtered.length)} dari {filtered.length}
        </p>
        <div className="flex items-center space-x-1">
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span className="px-3 py-1 border rounded">
            {currentPage} / {totalPages}
          </span>
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
}
