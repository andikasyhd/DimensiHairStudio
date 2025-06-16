import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import LogoGuest from "./LogoGuest";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-black text-white shadow-md">
      {/* Kiri: Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold pl-4 font-serif">
        <LogoGuest />
        <span>DimensiHairStudio</span>
      </div>

      {/* Tengah: Menu navigasi */}
      <div className="hidden md:flex gap-6 text-base font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative hover:text-yellow-500 font-serif ${
              isActive
                ? "font-bold after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[3px] after:bg-yellow-500"
                : ""
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/produktampil"
          className={({ isActive }) =>
            `relative hover:text-yellow-500 font-serif ${
              isActive
                ? "font-bold after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[3px] after:bg-yellow-500"
                : ""
            }`
          }
        >
          Layanan
        </NavLink>

        <NavLink
          to="/cek"
          className={({ isActive }) =>
            `relative hover:text-yellow-500 font-serif ${
              isActive
                ? "font-bold after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[3px] after:bg-yellow-500"
                : ""
            }`
          }
        >
          Pemesanan
        </NavLink>
      </div>
    </nav>
  );
}