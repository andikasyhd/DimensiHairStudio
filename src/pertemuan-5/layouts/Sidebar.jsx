import { CgAdd } from "react-icons/cg"; 
import { AiFillCustomerService } from "react-icons/ai"; 
import { BsBorderStyle } from "react-icons/bs"; 
import { AiFillDashboard } from "react-icons/ai"; 
import Logo from "./Logo";
import ListMenu from "./ListMenu";
import Footer from "./Footer";
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
