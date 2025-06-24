import { HiOutlineHome } from "react-icons/hi";
import { RiScissors2Line } from "react-icons/ri";
import { FiUsers, FiLogOut, FiUser } from "react-icons/fi";
import SidebarMenuItem from "./SideBarMenuItem";

export default function Sidebar() {
  return (
    <aside className="w-80 min-w-[5rem] h-screen bg-white shadow-md p-6 flex flex-col justify-between">

      {/* Header */}
      <div>
        {/* Logo */}
        <div id="sidebar-logo" className="flex flex-col mb-6">
          <span
            id="logo-title"
            className="font-serif font-extrabold text-2xl text-black leading-tight break-words"
          >
            DimensiHairStudio
            <b className="text-yellow-400">.</b>
          </span>
        </div>

        {/* Menu List */}
        <div id="sidebar-menu" className="mt-10">
          <ul id="menu-list" className="space-y-3">
            <SidebarMenuItem to="#" icon={HiOutlineHome} label="Dashboard" />
            <SidebarMenuItem to="/layanantampil" icon={RiScissors2Line} label="List Layanan" />
            <SidebarMenuItem to="#" icon={FiUsers} label="List Pelanggan" />
          </ul>
        </div>
      </div>

      {/* Akun & Logout */}
      <div className="space-y-2 mt-6">
        <hr className="my-2 border-gray-200" />
        <ul className="space-y-3">
          <SidebarMenuItem to="/akun" icon={FiUser} label="Akun Saya" />
          <SidebarMenuItem to="/logout" icon={FiLogOut} label="Keluar" />
        </ul>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-400 mt-4">© 2025 PCR</div>
    </aside>
  );
}
