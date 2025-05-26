export default function ListProduct() {
  return (
    <div className="card">
      <h1>Rekomendasi Produk</h1>

      <ProdukSamsung />
      <ProdukIp/>
      <ProdukXiomi/>
      <ProdukOnePlus/>
    </div>
  );
}
function ProdukSamsung() {
  return (
    <div className="card">
    <h2>Samsung Galaxy S25</h2>
    <ul>
      <li>
        <strong>Harga:</strong> Rp 12.999.000
      </li>
      <li>
        <strong>Spesifikasi:</strong>
        <ul>
          <li>Layar: 6.8 inci Super AMOLED</li>
          <li>Prosesor: Exynos 2200</li>
          <li>Kamera utama: 108 MP</li>
          <li>Baterai: 5000 mAh</li>
        </ul>
      </li>
    </ul>
  </div>
  );
}
function ProdukIp() {
  return (
    <div className="card">
      <ul>
        <li>
          <strong>Apple iPhone 15 Pro</strong>
          <ul>
            <li>
              <strong>Harga:</strong> Rp 15.499.000
            </li>
            <li>
              <strong>Spesifikasi:</strong>
              <ul>
                <li>Layar: 6.8 inci Super AMOLED</li>
                <li>Prosesor: Exynos 2200</li>
                <li>Kamera utama: 108 MP</li>
                <li>Baterai: 5000 mAh</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

function ProdukXiomi() {
  return (
    <div className="card">
      <ul>
        <li>
          <strong>Xiaomi Mi 14</strong>
          <ul>
            <li>
              <strong>Harga:</strong> Rp 7.999.000
            </li>
            <li>
              <strong>Spesifikasi:</strong>
              <ul>
                <li>Layar: 6.8 inci Super AMOLED</li>
                <li>Prosesor: Exynos 2200</li>
                <li>Kamera utama: 108 MP</li>
                <li>Baterai: 5000 mAh</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

function ProdukOnePlus() {
    return (
      <div className="card">
        <ul>
          <li>
            <strong>OnePlus 12</strong>
            <ul>
              <li>
                <strong>Harga:</strong> Rp 9.999.000
              </li>
              <li>
                <strong>Spesifikasi:</strong>
                <ul>
                  <li>Layar: 6.8 inci Super AMOLED</li>
                  <li>Prosesor: Exynos 2200</li>
                  <li>Kamera utama: 108 MP</li>
                  <li>Baterai: 5000 mAh</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }