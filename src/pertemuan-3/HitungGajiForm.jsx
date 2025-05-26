import { useState } from "react";
import InputGaji from "./components/InputGaji";
import Pajak from "./components/Pajak";
import ErrorMessage from "./components/ErrorMessage";
import ResultMessage from "./components/ResultMessage";

export default function HitungGajiForm() {
  const [gaji, setgaji] = useState("");

  const pajak = 0.11;
  const totalGaji = gaji - gaji * pajak;
  return (
    <div className="flex flex-col items-center justify-center m-5 p-5 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
          Hitung Gaji Bersih
        </h2>

        <InputGaji
          label="Gaji Pokok"
          type="number"
          placeholder="Silahkan Masukkan Gaji Anda ..."
          onChange={(e) => setgaji(e.target.value)}
        />

        <Pajak label="11%" />

        {!gaji ? (
          <ErrorMessage
            pesan="Silakan masukkan gaji yang valid (tidak boleh kosong atau
                negatif)."
          />
        ) : (
          <ResultMessage totalGaji={totalGaji} />
        )}
      </div>
    </div>
  );
}
