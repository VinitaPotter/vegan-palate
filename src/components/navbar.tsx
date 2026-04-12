import { NavLink } from "react-router-dom";

import Logo from "../assets/logo_yellow_bg.png";
export default function Navbar() {
  return (
    <div className="flex  justify-between bg-accent w-full h-16 border-b border-b-gray-200">
      <p className="w-1/5 cursor-pointer">
        <NavLink to={`/`}>
          <img
            src={Logo}
            width="150"
            height="55"
            className="bg-transparent h-16 object-cover"
          />
        </NavLink>
      </p>
      <div className="flex justify-around w-1/3 p-4">
        <NavLink
          to={"/favorites"}
          className={({ isActive }) =>
            isActive
              ? "bg-white  rounded-t-2xl pb-8 pt-4 px-6"
              : "cursor-pointer pb-8 pt-4 px-6"
          }
        >
          <p>My recipes</p>
        </NavLink>
        <NavLink
          to={"/resources"}
          className={({ isActive }) =>
            isActive
              ? "bg-white  rounded-t-2xl pb-8 pt-4 px-6"
              : "cursor-pointer pb-8 pt-4 px-6"
          }
        >
          <p>Helpful resources</p>
        </NavLink>
        <NavLink
          to={"/events"}
          className={({ isActive }) =>
            isActive
              ? "bg-white  rounded-t-2xl pb-8 pt-4 px-6"
              : "cursor-pointer pb-8 pt-4 px-6"
          }
        >
          <p>Events</p>
        </NavLink>
      </div>
      <div className="p-4">
        <NavLink to={"/search"}>
          <p className=" border py-1 px-4 rounded-xl hover:scale-105 hover:bg-primary hover:text-white cursor-pointer flex items-center">
            Search
          </p>
        </NavLink>
      </div>
    </div>
  );
}
