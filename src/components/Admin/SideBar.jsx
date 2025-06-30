import React, { useState } from 'react';
import { HiOutlineHome, HiMenu, HiX } from "react-icons/hi";
import { RiScissors2Line } from "react-icons/ri";
import { FiUsers, FiLogOut, FiUser } from "react-icons/fi";
import SidebarMenuItem from "./SideBarMenuItem";
import { useLocation } from 'react-router-dom';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
const [activeItem, setActiveItem] = useState(location.pathname);

  const menuItems = [
    { to: "/dashboard", icon: HiOutlineHome, label: "Dashboard" },
    { to: "/layanantampil", icon: RiScissors2Line, label: "List Layanan" },
    { to: "/listpelanggan", icon: FiUsers, label: "List Pelanggan" },
  ];

  const handleMenuClick = (to) => {
    setActiveItem(to);
    setIsMobileOpen(false); // close on mobile
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isMobileOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        ${isCollapsed ? 'w-20' : 'w-80'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:relative top-0 left-0 h-screen z-40
        bg-gradient-to-b from-gray-50 to-gray-100
        shadow-2xl transition-all duration-300 ease-in-out
        flex flex-col justify-between overflow-hidden
      `}>
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full opacity-10 -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400 rounded-full opacity-10 translate-y-12 -translate-x-12" />

        {/* Sidebar Top */}
        <div className="relative z-10">
          {/* Brand Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className={`transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
              <span className="font-serif font-extrabold text-2xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
                DimensiHairStudio<span className="text-yellow-500">.</span>
              </span>
            </div>
            {/* Collapse button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-2 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300"
            >
              <HiMenu className="text-gray-600 text-xl" />
            </button>
          </div>

          {/* User Profile */}
          <div className={`p-6 ${isCollapsed ? 'px-4' : 'px-6'}`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full flex items-center justify-center shadow-lg">
                <FiUser className="text-white text-xl" />
              </div>
              {!isCollapsed && (
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">Admin</h3>
                  <p className="text-sm text-gray-500">Hair Stylist</p>
                </div>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <nav className={`${isCollapsed ? 'px-4' : 'px-6'}`}>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  isActive={activeItem === item.to}
                  isCollapsed={isCollapsed}
                  onClick={() => handleMenuClick(item.to)}
                />
              ))}
            </ul>
          </nav>
        </div>

        {/* Sidebar Bottom */}
        <div className="relative z-10 p-6 border-t border-gray-200">
          <ul className="space-y-2 mb-4">
            <SidebarMenuItem
              to="/"
              icon={FiLogOut}
              label="Log Out"
              isCollapsed={isCollapsed}
              onClick={() => handleMenuClick('/')}
            />
          </ul>
          {!isCollapsed && (
            <div className="text-xs text-gray-400 text-center">
              © 2025 DimensiHairStudio
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
