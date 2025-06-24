import { NavLink } from "react-router-dom";

export default function SidebarMenuItem({ to, icon: Icon, label }) {
  return (
    <li>
      <NavLink
        to={to}
        className="flex items-center px-4 py-2 rounded-lg text-black hover:bg-sky-600 hover:text-white transition-colors duration-200"
      >
        <Icon className="mr-2" />
        {label}
      </NavLink>
    </li>
  );
}
