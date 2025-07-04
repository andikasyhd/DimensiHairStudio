import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminAPI } from "../../../service/adminAPI.js";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      setError("Password dan konfirmasi tidak sama");
      return;
    }
    try {
      await adminAPI.register({
        username: formData.username,
        password: formData.password,
      });
      navigate("/");
    } catch (err) {
      setError(err.message || "Gagal registrasi");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md text-white">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Your Account ✨
        </h2>

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white text-black placeholder-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Masukkan username"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white text-black placeholder-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Masukkan password"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirm" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white text-black placeholder-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Konfirmasi password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Register
          </button>

          <p className="text-sm text-center mt-4 text-gray-300">
            Sudah punya akun?{" "}
            <a href="/" className="text-yellow-400 hover:underline">
              Login di sini
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
