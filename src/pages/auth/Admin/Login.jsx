import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminAPI } from "../../../service/adminAPI.js";

export default function Login() {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await adminAPI.login(dataForm);
      localStorage.setItem("admin", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Gagal login");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-white text-center mb-6">
        Login Admin <span className="inline-block">🔒</span>
      </h2>

      {error && (
        <p className="text-red-400 text-sm text-center mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm text-gray-300 mb-1">Username</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Masukkan username"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm text-gray-300 mb-1">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Masukkan password"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-300">
          Belum punya akun?{" "}
          <a href="/register" className="text-yellow-400 hover:underline">
            Daftar di sini
          </a>
        </p>
      </form>
    </div>
  );
}
