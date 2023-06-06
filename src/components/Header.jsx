import React from "react";
import { useLocation, useNavigate } from "react-router";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const pathmatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto ">
        <div>
          <h1
            className="cursor-pointer text-bold text-blue-700 h-5 font-extrabold "
            onClick={() => navigate("/")}
          >
            HELEX
          </h1>
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`py-3 text-sm font-semibold cursor-pointer text-gray-400 border-b-[3px] border-b-transparent ${
                pathmatchRoute("/") && "text-black border-b-blue-700"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`py-3 text-sm  cursor-pointer font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathmatchRoute("/Offers") && "text-black border-b-blue-700"
              }`}
              onClick={() => navigate("/Offers")}
            >
              Offers
            </li>
            <li
              className={`py-3 text-sm font-semibold cursor-pointer text-gray-400 border-b-[3px] border-b-transparent ${
                pathmatchRoute("/Sign-in") && "text-black border-b-blue-700"
              }`}
              onClick={() => navigate("/Sign-in")}
            >
              Sign in
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
