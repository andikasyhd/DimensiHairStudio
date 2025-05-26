import { createRoot } from "react-dom/client";
import FrameworkList from "./FrameworkList";
import "./custom.css";
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
import FrameworkListSearchFilterEfisien from "./FrameworkListSearchFilterEfisien";
import ResponsiveDesign from "./ResponsiveDesign ";
import Latihan from "./Latihan";

createRoot(document.getElementById("root")).render(
  <div>
    {/* <FrameworkList/> */}
    <FrameworkListSearchFilter/>
    {/* <FrameworkListSearchFilterEfisien /> */}
    {/* <ResponsiveDesign /> */}
    {/* <Latihan/> */}
  </div>
);
