import { Children } from "react";

export default function ArtikelDetail() {
  return (
    <div className="card">
      <h1>Panduan Memilih Smartphone Terbaik 2025</h1>
      <Gambar />
      <Deskripsi />
      <TanggalRelease />
      <Jenis />
    </div>
  );
}
function Deskripsi() {
  return (
    <div>
      <p>
        Memilih smartphone terbaik di tahun 2025 bisa jadi tantangan, mengingat
        banyaknya pilihan yang tersedia di pasaran. Dalam artikel ini, kami akan
        memberikan panduan lengkap tentang cara memilih smartphone terbaik
        berdasarkan kebutuhan Anda, serta rekomendasi produk yang cocok untuk
        berbagai keperluan.
      </p>
    </div>
  );
}
function Jenis() {
  return (
    <div>
      <p>Rekomendasi</p>
    </div>
  );
}
function Gambar() {
  return (
    <div>
      <img src="/img/hp.jpg" alt="logo" />
    </div>
  );
}
function TanggalRelease() {
  return (
    <div>
      <p>{new Date().toLocaleDateString()}</p>
    </div>
  );
}
