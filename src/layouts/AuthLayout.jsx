import { Outlet } from "react-router-dom";
import "../assets/tailwind.css";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-black to-black text-white flex flex-col items-center justify-center px-4 py-8">
      
      {/* Tambahkan style animasi spin-slow */}
      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 4s linear infinite;
            display: inline-block;
          }
        `}
      </style>

      {/* Judul dengan Gunting ✂️ */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3">
          <span className="animate-spin-slow">✂️</span>
          DimensiHairStudio
          <span className="animate-spin-slow">✂️</span>
        </h1>
        
      </div>

      {/* Outlet untuk halaman login/register */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
        <Outlet />
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-6">
        © 2025 Dimensi Hair Studio.
      </p>
    </div>
  );
}
