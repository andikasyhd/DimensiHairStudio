import { NavLink } from "react-router-dom";

export default function SidebarMenuItem({ to, icon: Icon, label }) {
  const menuClass = ({ isActive }) =>
    `flex items-center rounded-xl px-4 py-3 space-x-3 transition-all
    ${
      isActive
        ? "bg-green-200 text-hijau font-extrabold"
        : "text-gray-600 hover:text-hijau hover:bg-green-100 hover:font-bold"
    }`;

  return (
    <li>
      <NavLink to={to} className={menuClass}>
        <Icon className="text-xl" />
        <span>{label}</span>
      </NavLink>
    </li>
  );
}
