import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import LogoGuest from "./LogoGuest";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-gradient-to-b from-red-700 to-red-900 text-white shadow-md">
      {/* Kiri: Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold pl-4">
        <LogoGuest />
      </div>

      {/* Tengah: Menu navigasi */}
      <div className="hidden md:flex gap-6 text-base font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative hover:text-yellow-400 ${
              isActive
                ? "font-bold after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[3px] after:bg-yellow-400"
                : ""
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/produktampil"
          className={({ isActive }) =>
            `relative hover:text-yellow-400 ${
              isActive
                ? "font-bold after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[3px] after:bg-yellow-400"
                : ""
            }`
          }
        >
          Produk
        </NavLink>

        <NavLink
          to="/cek"
          className={({ isActive }) =>
            `relative hover:text-yellow-400 ${
              isActive
                ? "font-bold after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[3px] after:bg-yellow-400"
                : ""
            }`
          }
        >
          Cek Ketersediaan Produk
        </NavLink>
      </div>

      {/* Kanan: Icon dan tombol */}
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="bg-white text-red-800 px-4 py-2 rounded-lg font-semibold hover:brightness-110 transition hover:bg-yellow-400 hover:text-black"
        >
          <button>Masuk</button>
        </Link>
      </div>
    </nav>
  );
}
