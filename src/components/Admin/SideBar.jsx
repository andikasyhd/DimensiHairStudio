import { HiOutlineHome } from "react-icons/hi";
import { RiScissors2Line } from "react-icons/ri";
import { FiUsers, FiLogOut, FiUser } from "react-icons/fi";
import SidebarMenuItem from "./SideBarMenuItem";

export default function Sidebar() {
  return (
    <aside className="w-80 min-w-[5rem] h-screen bg-[#F2F2F2] shadow-md p-6 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div id="sidebar-logo" className="mb-6">
          <span className="font-serif font-extrabold text-2xl text-black leading-tight">
            DimensiHairStudio<b className="text-yellow-400">.</b>
          </span>
        </div>

        {/* Menu */}
        <nav className="mt-10 ">
            
          <ul className="space-y-2">
            <SidebarMenuItem to="/layanantampil" icon={HiOutlineHome} label="Dashboard" />
            <SidebarMenuItem to="/layanantampil" icon={RiScissors2Line} label="List Layanan" />
            <SidebarMenuItem to="/listpelanggan" icon={FiUsers} label="List Pelanggan" />
          </ul>
        </nav>
      </div>

      {/* Akun & Logout */}
      <div className="space-y-2 mt-6">
        <hr className="my-2 border-gray-300" />
        <ul className="space-y-2">
          <SidebarMenuItem to="/akun" icon={FiUser} label="Akun Saya" />
          <SidebarMenuItem to="/logout" icon={FiLogOut} label="Keluar" />
        </ul>
      </div>

      <div className="text-xs text-gray-500 mt-4">© 2025 DimensiHairStudio</div>
    </aside>
  );
}
