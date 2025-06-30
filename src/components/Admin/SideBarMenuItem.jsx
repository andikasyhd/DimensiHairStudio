import { NavLink } from "react-router-dom";

export default function SidebarMenuItem({ to, icon: Icon, label, isActive = false, isCollapsed = false, onClick }) {
  return (
    <li>
      <a
        href={to}
        onClick={onClick}
        className={`group relative flex items-center px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden
          ${isActive 
            ? 'bg-sky-600 text-white shadow-md scale-[1.02]' 
            : 'bg-white text-gray-800 hover:bg-sky-600 hover:text-white'
          }
          ${isCollapsed ? 'justify-center' : 'justify-start'}
        `}
      >
        {/* Ikon */}
        <Icon className={`text-xl relative z-10 transition-colors duration-200
          ${isActive 
            ? 'text-white' 
            : label.toLowerCase().includes("admin") 
              ? 'text-sky-600 group-hover:text-white' // ikon admin tetap biru
              : 'text-gray-600 group-hover:text-white'
          }
          ${isCollapsed ? 'mr-0' : 'mr-3'}
        `} />

        {/* Label */}
        {!isCollapsed && (
          <span className={`font-medium relative z-10 transition-colors duration-200
            ${isActive ? 'text-white' : 'group-hover:text-white'}
          `}>
            {label}
          </span>
        )}

        {/* Tooltip */}
        {isCollapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
            {label}
          </div>
        )}
      </a>
    </li>
  );
}
