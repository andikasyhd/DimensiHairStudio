import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { layananAPI } from "../../service/layananAPI";
import { pemesananAPI } from "../../service/pemesananAPI";

const bulanKeNama = (index) => {
  const bulan = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
  ];
  return bulan[index] || "";
};

export default function Dashboard() {
  const [jumlahPelanggan, setJumlahPelanggan] = useState(0);
  const [jumlahLayanan, setJumlahLayanan] = useState(0);
  const [jumlahPelangganHariIni, setJumlahPelangganHariIni] = useState(0);
  const [pelangganPerLayanan, setPelangganPerLayanan] = useState([]);
  const [pelangganBulanan, setPelangganBulanan] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const pemesanan = await pemesananAPI.getAllPemesanan();
        const layanan = await layananAPI.fetchLayanan();

        setJumlahPelanggan(pemesanan.length);
        setJumlahLayanan(layanan.length);

        const today = new Date();
        const hariIniStr = today.toISOString().split("T")[0];
        let countHariIni = 0;

        const pelangganBulananDefault = Array.from({ length: 12 }, (_, i) => ({
          bulan: bulanKeNama(i),
          jumlah: 0
        }));

        // Inisialisasi map jumlah pelanggan per layanan
        const layananMap = {};
        layanan.forEach((l) => {
          layananMap[l.nama] = 0;
        });

        pemesanan.forEach((item) => {
          // Pelanggan hari ini
          const createdAt = new Date(item.created_at);
          const createdDateStr = createdAt.toISOString().split("T")[0];
          if (createdDateStr === hariIniStr) {
            countHariIni += 1;
          }

          // Pelanggan per bulan
          const bulanIndex = createdAt.getMonth();
          pelangganBulananDefault[bulanIndex].jumlah += 1;

          // Hitung berdasarkan nama layanan
          const layananDipesan = layanan.find(l => l.id === item.id);
          if (layananDipesan) {
            layananMap[layananDipesan.nama] += 1;
          }
        });

        // Ubah map ke array
        const layananArray = Object.entries(layananMap).map(([nama, jumlah]) => ({
          nama,
          jumlah
        }));

        setJumlahPelangganHariIni(countHariIni);
        setPelangganPerLayanan(layananArray);
        setPelangganBulanan(pelangganBulananDefault);

      } catch (err) {
        console.error("Gagal ambil data dashboard:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard Admin</h1>

      {/* Statistik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-green-500 text-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg">Jumlah Layanan</h2>
          <p className="text-3xl font-bold">{jumlahLayanan}</p>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg">Jumlah Pelanggan</h2>
          <p className="text-3xl font-bold">{jumlahPelanggan}</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg">Pelanggan Hari Ini</h2>
          <p className="text-3xl font-bold">{jumlahPelangganHariIni}</p>
        </div>
      </div>

      {/* Bar Chart: Pelanggan per Layanan */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Jumlah Pelanggan per Layanan</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pelangganPerLayanan}>
            <XAxis
              dataKey="nama"
              angle={-30}
              textAnchor="end"
              interval={0}
              height={120} // Tinggikan dari 80 ke 100 atau lebih jika perlu
  tick={{ fontSize: 12, dy: 10 }} // dy untuk memberi jarak antar teks
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="jumlah" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Bar Chart: Pelanggan per Bulan */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Perkembangan Pelanggan per Bulan</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pelangganBulanan}>
            <XAxis dataKey="bulan" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="jumlah" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
