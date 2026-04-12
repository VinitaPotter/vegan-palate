import { NavLink } from "react-router-dom";

import Logo from "../assets/logo_yellow_bg.png";
export default function Navbar() {
  return (
    <div className="flex  items-center justify-between bg-accent w-full h-16 ">
      <p className="w-1/5 cursor-pointer">
        <NavLink to={`/`}>
          <img
            src={Logo}
            width="150"
            height="55"
            className="bg-transparent h-16 object-cover mx-10"
          />
        </NavLink>
      </p>
      <div className="flex items-center justify-around w-1/3 nav-link-class h-full pt-3 ">
        <NavLink
          to={"/favorites"}
          className={({ isActive }) =>
            `${isActive ? "bg-white " : ""} hover:bg-white rounded-t-2xl min-w-40 items-center mx-5`
          }
        >
          <div className="text-center mt-2">My recipes</div>
        </NavLink>
        <NavLink
          to={"/resources"}
          className={({ isActive }) =>
            `${isActive ? "bg-white " : ""} hover:bg-white rounded-t-2xl min-w-40 items-center mx-5`
          }
        >
          <div className="text-center mt-2">Helpful resources</div>
        </NavLink>
        <NavLink
          to={"/events"}
          className={({ isActive }) =>
            `${isActive ? "bg-white " : ""} hover:bg-white rounded-t-2xl min-w-40 items-center mx-5`
          }
        >
          <div className="text-center mt-2">Events</div>
        </NavLink>
      </div>
      <div className="w-1/6 p-4 mx-10 ">
        <NavLink to={"/search"}>
          <p className=" border py-1 px-4 rounded-xl hover:scale-105 hover:bg-primary hover:text-white cursor-pointer text-center">
            Get started →
          </p>
        </NavLink>
      </div>
    </div>
  );
}
