export default function QnASection() {
  return (
    <div className="card">
        <h1>QnA</h1>
      <Form />
      <Pertanyaan />
      <Jawaban />
      <Coment />
    </div>
  );
}
function Form() {
  
  return (
    <div>
      <form action="">
      <label for="nama">Pertanyaan</label>
        <input type="text" />
        <input type="submit" value="Kirim"></input>
      </form>
    </div>
  );
}
function Pertanyaan() {
  const nama = "Teguh";
  const pertanyaan = "Apa yang perlu dipertimbangkan saat memilih smartphone?";
  return (
    <div>
      <hr />
      <p>{nama}</p>
      <p>{pertanyaan}</p>
    </div>
  );
}
function Jawaban() {
  return (
    <div>
      <p><strong>Jawaban : </strong>Saat memilih smartphone, pertimbangkan beberapa
      faktor seperti ukuran layar, kualitas kamera, kinerja prosesor, daya tahan
      baterai, dan tentunya harga. Tentukan prioritas Anda berdasarkan
      kebutuhan, misalnya apakah Anda lebih sering menggunakan smartphone untuk
      fotografi, gaming, atau kegiatan sehari-hari.</p>
    </div>
  );
}
function Coment() {
  return (
    <div>
      <form action="">
      <label for="nama">Coment</label>
        <input type="text" />
        <input type="submit" value="Kirim"></input>    
      </form>   
    </div>
  );
}
