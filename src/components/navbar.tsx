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
        <p className="cursor-pointer">Helpful resources</p>
        <p className="cursor-pointer">Events</p>
        <p className="cursor-pointer">Blog</p>
      </div>
      <div className="p-4">
        <p className="text-right border py-1 px-2 cursor-pointer">
          Get started
        </p>
      </div>
    </div>
  );
}
