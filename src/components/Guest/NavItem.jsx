import { NavLink } from "react-router-dom";

export default function NavItem({ id, to, children }) {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2
    ${isActive ? 
      "text-hitam bg-birumuda  font-extrabold" : 
      "text-putih hover:text-putih hover:bg-birumuda hover:font-extrabold"
    }`;

  return (
    <NavLink id={id} to={to} className={menuClass}>
      <span >{children}</span>
    </NavLink>
  );
}
