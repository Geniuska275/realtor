import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function Header() {
  const [pageState, setPageState] = useState("Sign in");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign in");
      }
    });
  }, [auth]);

  const pathMatchRoute = (route) => {
    console.log(route);
    console.log(location.pathname);
    if (route === location.pathname) {
      console.log("true");
      return true;
    }
  };
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
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
              className={`py-3 text-sm font-semibold cursor-pointer text-gray-400 border-b-[3px] ${
                pathMatchRoute("/") && "text-blue-500 border-b-blue-700"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`py-3 text-sm  cursor-pointer font-semibold text-gray-400 border-b-[3px] ${
                pathMatchRoute("/Offers") && "text-blue-500 border-b-blue-700"
              }`}
              onClick={() => navigate("/Offers")}
            >
              Offers
            </li>
            <li
              className={`py-3 text-sm font-semibold cursor-pointer text-gray-400 border-b-[3px]  ${
                (pathMatchRoute("/Sign-in") || pathMatchRoute("/Profile")) &&
                "text-blue-500 border-b-blue-700"
              }`}
              onClick={() => navigate("/Profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
