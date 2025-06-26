import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/SideBar";
import "../assets/admin.css";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden"> {/* Flex horizontal layout */}
      <Sidebar /> {/* Sidebar di kiri */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6"> {/* Konten utama */}
        <Outlet />
      </main>
    </div>
  );
}
