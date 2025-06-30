import { useEffect, useState } from 'react';
import { pemesananAPI } from '../../service/pemesananAPI';
import { UserPlus, CalendarCheck2 } from 'lucide-react';

export default function ListPelanggan() {
  const [pemesanan, setPemesanan] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('terbaru');
  const [statusFilter, setStatusFilter] = useState(''); // Filter status baru
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await pemesananAPI.getAllPemesanan();
        setPemesanan(data);
      } catch (error) {
        console.error('Gagal memuat data pemesanan:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Pastikan pemesanan tidak kosong sebelum memproses
    if (!pemesanan || pemesanan.length === 0) {
      setFiltered([]);
      return;
    }

    // Buat salinan array untuk menghindari mutasi langsung
    let hasil = [...pemesanan];

    // Filter berdasarkan nama (hanya jika searchTerm tidak kosong)
    if (searchTerm && searchTerm.trim() !== '') {
      hasil = hasil.filter(item =>
        item.nama?.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    // Filter berdasarkan status
    if (statusFilter && statusFilter !== '') {
      hasil = hasil.filter(item => {
        const itemStatus = item.status || 'Menunggu';
        return itemStatus === statusFilter;
      });
    }

    // Sorting berdasarkan pilihan
    if (sortOrder === 'terbaru') {
      hasil.sort((a, b) => new Date(b.created_At || b.createdAt || b.created_at) - new Date(a.created_At || a.createdAt || a.created_at));
    } else if (sortOrder === 'terlama') {
      hasil.sort((a, b) => new Date(a.created_At || a.createdAt || a.created_at) - new Date(b.created_At || b.createdAt || b.created_at));
    }
    // Jika sortOrder kosong, tidak ada sorting

    setFiltered(hasil);
    setCurrentPage(1); // Reset ke halaman pertama setiap kali filter berubah
  }, [searchTerm, sortOrder, statusFilter, pemesanan]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filtered.slice(startIndex, endIndex);

  const todayDate = new Date().toLocaleDateString('en-CA');
  const jumlahHariIni = pemesanan.filter(item => {
    const itemDate = new Date(item.created_At || item.createdAt || item.created_at).toLocaleDateString('en-CA');
    return itemDate === todayDate;
  }).length;

  // Hitung jumlah berdasarkan status
  const jumlahDisetujui = pemesanan.filter(item => item.status === 'Disetujui').length;
  const jumlahDitolak = pemesanan.filter(item => item.status === 'Ditolak').length;
  const jumlahMenunggu = pemesanan.filter(item => !item.status || item.status === 'Menunggu').length;

  const kirimPesan = (noHP, isiPesan) => {
    const nomor = noHP.replace(/^0/, '62').replace(/[^0-9]/g, '');
    const url = `https://wa.me/${nomor}?text=${isiPesan}`;
    window.open(url, '_blank');
  };

  const buatPesan = (item, type) => {
    if (type === 'setuju') {
      return encodeURIComponent(
        `Halo ${item.nama},\n\nPemesanan Anda telah diterima:\n- Tanggal: ${item.tanggal}\n- Waktu: ${item.waktu}\n\nMohon datang tepat waktu.\n\nTerima kasih.`
      );
    } else {
      return encodeURIComponent(
        `Halo ${item.nama},\n\nMohon maaf, pemesanan pada:\n- Tanggal: ${item.tanggal}\n- Waktu: ${item.waktu}\nTidak dapat kami proses.\n\nSilakan booking ulang.\n\nTerima kasih.`
      );
    }
  };

  const handleKirimPesan = async (item, type) => {
    if (item.status === 'Disetujui' || item.status === 'Ditolak') return;

    kirimPesan(item.noHP, buatPesan(item, type));

    try {
      const statusBaru = type === 'setuju' ? 'Disetujui' : 'Ditolak';
      await pemesananAPI.updateStatus(item.id, statusBaru);

      // Update data tanpa fetch ulang untuk menghindari duplikasi
      setPemesanan(prevData => 
        prevData.map(item_prev => 
          item_prev.id === item.id 
            ? { ...item_prev, status: statusBaru }
            : item_prev
        )
      );
    } catch (error) {
      console.error('Gagal memperbarui status:', error);
    }
  };

  // Fungsi untuk reset filter
  const resetFilter = () => {
    setSearchTerm('');
    setSortOrder('');
    setStatusFilter('');
    setCurrentPage(1);
  };

  return (
    <div className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-6">📋 Daftar Pemesanan Pelanggan</h1>

      {/* Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
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
        <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4 border border-gray-100">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Disetujui</p>
            <p className="text-xl font-semibold">{jumlahDisetujui}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4 border border-gray-100">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✕</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ditolak</p>
            <p className="text-xl font-semibold">{jumlahDitolak}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4 border border-gray-100">
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">⏳</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Menunggu</p>
            <p className="text-xl font-semibold">{jumlahMenunggu}</p>
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
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-40 text-sm shadow-sm"
        >
          <option value="">Semua Status</option>
          <option value="Menunggu">Menunggu</option>
          <option value="Disetujui">Disetujui</option>
          <option value="Ditolak">Ditolak</option>
        </select>
        <button
          onClick={resetFilter}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm transition-colors"
        >
          Reset Filter
        </button>
      </div>

      {/* Info hasil filter */}
      {(searchTerm || sortOrder || statusFilter) && (
        <div className="mb-4 text-sm text-gray-600">
          Menampilkan {filtered.length} dari {pemesanan.length} data
          {searchTerm && ` dengan nama "${searchTerm}"`}
          {statusFilter && ` dengan status "${statusFilter}"`}
          {sortOrder && ` diurutkan ${sortOrder === 'terbaru' ? 'dari terbaru' : 'dari terlama'}`}
        </div>
      )}

      {/* Tabel */}
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
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-r-xl">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-6">Memuat data...</td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    {searchTerm || statusFilter ? 
                      `Tidak ada data dengan filter yang diterapkan` : 
                      'Tidak ada data pemesanan.'
                    }
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr
                    key={`${item.id}-${index}`} // Pastikan key unik
                    className="bg-gray-50 hover:bg-gray-100 rounded-xl"
                  >
                    <td className="px-4 py-2">{startIndex + index + 1}</td>
                    <td className="px-4 py-2">{item.nama || '-'}</td>
                    <td className="px-4 py-2">{item.noHP || '-'}</td>
                    <td className="px-4 py-2">{item.tanggal || '-'}</td>
                    <td className="px-4 py-2">{item.waktu || '-'}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.status === 'Disetujui' ? 'bg-green-100 text-green-800' :
                        item.status === 'Ditolak' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status || 'Menunggu'}
                      </span>
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        disabled={item.status === 'Disetujui' || item.status === 'Ditolak'}
                        onClick={() => handleKirimPesan(item, 'setuju')}
                        className={`px-3 py-1 rounded text-sm text-white transition ${
                          item.status === 'Disetujui' || item.status === 'Ditolak' 
                            ? 'bg-green-300 cursor-not-allowed' 
                            : 'bg-green-500 hover:bg-green-600'
                        }`}
                      >
                        Setujui
                      </button>
                      <button
                        disabled={item.status === 'Disetujui' || item.status === 'Ditolak'}
                        onClick={() => handleKirimPesan(item, 'tolak')}
                        className={`px-3 py-1 rounded text-sm text-white transition ${
                          item.status === 'Disetujui' || item.status === 'Ditolak'
                            ? 'bg-red-300 cursor-not-allowed' 
                            : 'bg-red-500 hover:bg-red-600'
                        }`}
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

      {/* Pagination */}
      {filtered.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-6 text-sm text-gray-700">
          <p>
            Menampilkan {filtered.length === 0 ? 0 : startIndex + 1} -{' '}
            {Math.min(endIndex, filtered.length)} dari {filtered.length}
          </p>
          <div className="flex items-center space-x-1">
            <button
              className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              &laquo;
            </button>
            <button
              className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <span className="px-3 py-1 border rounded bg-blue-50">
              {currentPage} / {totalPages}
            </span>
            <button
              className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
            <button
              className="px-2 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              &raquo;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}