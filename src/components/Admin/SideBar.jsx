import { HiOutlineHome } from "react-icons/hi";
import { RiScissors2Line } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import SidebarMenuItem from "/SidebarMenuItem"; // Komponen terpisah

// export default function Sidebar() {
//   return (
//     <aside className="w-64 h-screen bg-white shadow-md p-4">
//       <div className="font-bold text-lg mb-6">
//         <p>Sistem Informasi Prestasi</p>
//         <small className="text-gray-500">Kemahasiswaan PCR</small>
//       </div>
//       <nav className="flex flex-col gap-3">
//         <a href="#" className="text-sm text-gray-700 hover:font-semibold">Dashboard</a>
//         <a href="#" className="text-sm text-gray-700 hover:font-semibold">Prestasi</a>
//         <a href="#" className="text-sm text-gray-700 hover:font-semibold">Pengajuan Lomba</a>
//         <a href="#" className="text-sm text-blue-700 font-semibold">Pelaporan Prestasi</a>
//         <a href="#" className="text-sm text-gray-700 hover:font-semibold">Bimbingan</a>
//       </nav>
//       <div className="absolute bottom-4 text-xs text-gray-400">© 2025 PCR</div>
//     </aside>
//   );
// }
// import React from "react";
// import SidebarMenuItem from "../components/SidebarMenuItem";
// import { MdDashboard } from "react-icons/md";
// import { AiOutlineOrderedList } from "react-icons/ai";
// import { BsFillPeopleFill } from "react-icons/bs";
// import { MdFastfood, MdNote } from "react-icons/md";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white shadow-md p-6 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="font-bold text-lg mb-6">
          <p>Sistem Informasi Prestasi</p>
          <small className="text-gray-500">Kemahasiswaan PCR</small>
        </div>

        {/* Menu List */}
        <div id="sidebar-menu" className="mt-10">
          <ul id="menu-list" className="space-y-3">
            <SidebarMenuItem to="/dashboard" icon={HiOutlineHome} label="Dashboard" />
            <SidebarMenuItem to="/layanan" icon={RiScissors2Line} label="List Layanan" />
            <SidebarMenuItem to="/pelanggan" icon={FiUsers} label="List Pelanggan" />
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-400 mt-auto">© 2025 PCR</div>
    </aside>
  );
}

