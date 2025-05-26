import { CgAdd } from "react-icons/cg";
export default function Footer() {
  return (
    <div id="sidebar-footer" class="mt-auto">
        <div
          id="footer-card"
          class="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center"
        >
          <div id="footer-info" class="flex-1 p-2">
            <div id="footer-text" class="text-white text-sm">
              <span>Please organize your menus through button below!</span>
            </div>
            <div
              id="add-menu-button"
              class="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2 cursor-pointer"
            >
              <span class="text-gray-600 flex items-center"> <CgAdd className="mr-2" />Add Menus</span>
            </div>
          </div>
          <img
            id="footer-avatar"
            class="w-20 rounded-full"
            src="https://avatar.iran.liara.run/public/28"
            alt="Footer Avatar"
          />
        </div>
        <span id="footer-brand" class="font-bold text-gray-400">Sedap Restaurant Admin Dashboard</span>
        <p id="footer-copyright" class="font-light text-gray-400">&copy; 2025 All Right Reserved</p>
      </div>
  );
}
