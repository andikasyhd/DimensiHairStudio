import { Outlet } from "react-router-dom";
import Navbar from "../components/Guest/Navbar";
import FooterGuest from "../components/Guest/FooterGuest";
import "../assets/guest.css";

export default function GuestLayout() {
  return (
    <div>
      <Navbar />

      <Outlet />

      <FooterGuest />
    </div>
  );
}
