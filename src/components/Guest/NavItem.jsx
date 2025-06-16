export default function NavItem({ id, to, children }) {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2 font-serif
    ${isActive ? 
      "text-black bg-yellow-400 font-extrabold" : 
      "text-white hover:text-white hover:bg-yellow-500 hover:font-extrabold"
    }`;

  return (
    <NavLink id={id} to={to} className={menuClass}>
      <span>{children}</span>
    </NavLink>
  );
}