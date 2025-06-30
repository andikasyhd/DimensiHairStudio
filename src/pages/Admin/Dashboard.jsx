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
import {
  FaUserFriends,
  FaCut,
  FaUserClock,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";

const bulanKeNama = (index) => {
  const bulan = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
  ];
  return bulan[index] || "";
};

export default function Dashboard() {
  const [jumlahPelanggan, setJumlahPelanggan] = useState(0);
  const [jumlahLayanan, setJumlahLayanan] = useState(0);
  const [jumlahPelangganHariIni, setJumlahPelangganHariIni] = useState(0);
  const [totalPendapatan, setTotalPendapatan] = useState(0);
  const [pelangganPerLayanan, setPelangganPerLayanan] = useState([]);
  const [pelangganBulanan, setPelangganBulanan] = useState([]);
  const [waktuSekarang, setWaktuSekarang] = useState(getWaktuSekarang());

  function getWaktuSekarang() {
    const now = new Date();
    return now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setWaktuSekarang(getWaktuSekarang());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const pemesanan = await pemesananAPI.getAllPemesanan();
        const layanan = await layananAPI.fetchLayanan();

        setJumlahPelanggan(pemesanan.length);
        setJumlahLayanan(layanan.length);

        const today = new Date();
        const hariIniStr = today.toLocaleDateString("en-CA"); // ← Gunakan waktu lokal

        let countHariIni = 0;
        let pendapatan = 0;

        const pelangganBulananDefault = Array.from({ length: 12 }, (_, i) => ({
          bulan: bulanKeNama(i),
          jumlah: 0,
        }));

        const layananMap = {};
        layanan.forEach((l) => {
          layananMap[l.nama] = 0;
        });

        pemesanan.forEach((item) => {
          const createdAt = new Date(item.created_at);
          const createdDateStr = createdAt.toLocaleDateString("en-CA"); // ← Juga lokal

          if (createdDateStr === hariIniStr) {
            countHariIni += 1;
          }

          const bulanIndex = createdAt.getMonth();
          pelangganBulananDefault[bulanIndex].jumlah += 1;

          const layananDipesan = layanan.find((l) => l.id === item.id);
          if (layananDipesan) {
            layananMap[layananDipesan.nama] += 1;
            pendapatan += layananDipesan.harga || 0;
          }
        });

        const layananArray = Object.entries(layananMap).map(([nama, jumlah]) => ({
          nama,
          jumlah,
        }));

        setJumlahPelangganHariIni(countHariIni);
        setTotalPendapatan(pendapatan);
        setPelangganPerLayanan(layananArray);
        setPelangganBulanan(pelangganBulananDefault);

      } catch (err) {
        console.error("Gagal ambil data dashboard:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-10">
      <h1 className="text-3xl font-extrabold text-sky-700 mb-4">📊 Dashboard Admin</h1>

      {/* Statistik Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<FaCut size={30} />} label="Jumlah Layanan" value={jumlahLayanan} color="bg-emerald-500" />
        <StatCard icon={<FaUserFriends size={30} />} label="Total Pelanggan" value={jumlahPelanggan} color="bg-blue-500" />
        <StatCard icon={<FaUserClock size={30} />} label="Pelanggan Hari Ini" value={jumlahPelangganHariIni} color="bg-purple-500" />
        <ClockCard icon={<FaClock size={30} />} waktu={waktuSekarang} />
      </div>

      {/* Grafik Pelanggan per Layanan */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">📈 Pelanggan per Layanan</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pelangganPerLayanan}>
            <XAxis dataKey="nama" angle={-30} textAnchor="end" interval={0} height={120} tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="jumlah" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Grafik Pelanggan per Bulan */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">📅 Perkembangan Pelanggan per Bulan</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pelangganBulanan}>
            <XAxis dataKey="bulan" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="jumlah" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Kartu Statistik Umum
function StatCard({ icon, label, value, color }) {
  return (
    <motion.div
      className={`rounded-xl text-white p-5 shadow-md ${color} flex items-center justify-between gap-4`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>{icon}</div>
      <div className="text-right">
        <p className="text-lg font-medium">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </motion.div>
  );
}

// Kartu Jam Digital
function ClockCard({ icon, waktu }) {
  return (
    <motion.div
      className="rounded-xl text-white p-5 shadow-md bg-gradient-to-r from-indigo-500 to-indigo-700 flex items-center justify-between gap-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>{icon}</div>
      <div className="text-right">
        <p className="text-lg font-medium">Jam Digital</p>
        <p className="text-2xl font-bold font-mono tracking-wide">{waktu}</p>
      </div>
    </motion.div>
  );
}
