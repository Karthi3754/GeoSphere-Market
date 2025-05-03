// seller/src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 border border-r-0 border-gray-300 rounded-l ${
              isActive ? "bg-pink-100 text-pink-700" : "text-gray-700"
            }`
          }
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 border border-r-0 border-gray-300 rounded-l ${
              isActive ? "bg-pink-100 text-pink-700" : "text-gray-700"
            }`
          }
          to="/chat"
        >
          <img className="w-5 h-5" src={assets.chat_icon} alt="" />
          <p className="hidden md:block">Chat with Admin</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 border border-r-0 border-gray-300 rounded-l ${
              isActive ? "bg-pink-100 text-pink-700" : "text-gray-700"
            }`
          }
          to="/chat-with-user"
        >
          <img className="w-5 h-5" src={assets.chat_icon} alt="" />
          <p className="hidden md:block">Chat with User</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;