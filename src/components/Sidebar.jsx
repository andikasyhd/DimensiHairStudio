import { CgAdd } from "react-icons/cg";
import { AiFillCustomerService } from "react-icons/ai";
import { BsBorderStyle } from "react-icons/bs";
import { AiFillDashboard } from "react-icons/ai";
import { Link } from "react-router-dom"

import Logo from "../components/Logo";
import ListMenu from "../components/ListMenu";
import Footer from "../components/Footer";
export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg"
    >
      {/* Logo */}
      <Logo/>

      {/* List Menu */}
      <ListMenu/>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
