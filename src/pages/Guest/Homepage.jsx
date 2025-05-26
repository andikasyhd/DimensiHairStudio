import FooterGuest from "../../components/Guest/FooterGuest";
import Navbar from "../../components/Guest/Navbar";
import AboutUs from "./AboutUs";
import Herosection from "./Herosection";
import Produk from "./Produk";
import Testimoni from "./Testimoni";

export default function Homepage() {
  return (
    <div>
        <Herosection/>
        <AboutUs/>
        <Produk/>
        <Testimoni/>
    </div>
  )
}