import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import LogoGuest from "./LogoGuest";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/layanan", label: "Layanan" },
    { to: "/kontak", label: "Kontak" },
    { to: "/", label: "Log Out" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black text-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold font-serif">
          <LogoGuest />
        </div>

        {/* Tombol Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-6 text-base font-medium">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `relative hover:text-yellow-500 font-serif ${
                  isActive
                    ? "font-bold after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[3px] after:bg-yellow-500"
                    : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4">
          <div className="flex flex-col gap-4 text-base font-medium">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block hover:text-yellow-400 font-serif ${
                    isActive ? "font-bold text-yellow-400" : ""
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
