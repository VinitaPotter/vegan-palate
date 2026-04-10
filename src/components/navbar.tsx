import { Link } from "react-router-dom";

import Logo from "../assets/logo.png";
export default function Navbar() {
  return (
    <div className="flex  justify-between  w-full h-16 border-b border-b-gray-200">
      <p className="w-1/5 cursor-pointer">
        <Link to={`/`}>
          <img src={Logo} width="150" height="60" className="bg-transparent" />
        </Link>
      </p>
      <div className="flex justify-around w-1/3 p-4">
        <Link to={"/favorites"}>
          <p className="cursor-pointer">My recipes</p>
        </Link>
        <Link to={"/resources"}>
          <p className="cursor-pointer">Helpful resources</p>
        </Link>
        <Link to={"/events"}>
          <p className="cursor-pointer">Events</p>
        </Link>
      </div>
      <div className="p-4">
        <Link to={"/search"}>
          <p className=" border py-1 px-4 rounded-xl hover:scale-105 hover:bg-primary hover:text-white cursor-pointer flex items-center">
            Search
          </p>
        </Link>
      </div>
    </div>
  );
}
