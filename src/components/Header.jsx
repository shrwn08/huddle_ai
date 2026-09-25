import React from "react";
import Logo from "../assets/logo_nobg.png";
import { Link } from "react-router";
function Header() {
  return (
    <div className="w-full h-auto pb-5 xl:flex justify-center items-center">
      <div className="w-full flex flex-col items-center gap-y-3 xl:w-6/7 xl:flex-row xl:justify-between">
        <div className="flex justify-center items-center">
          <img src={Logo} alt="logo" className="w-20" />
          <span className="text-5xl font-bold text-[#0291fa]">Huddle </span>
          <span className="text-5xl font-bold text-[#62c6aa]"> AI</span>
        </div>
        <div className=" w-full px-1 flex justify-between xl:justify-end items-center xl:gap-x-4">
          <p className="text-lg cursor-pointer hover:border xl:px-3 py-1 hover:bg-[#0291fA] border-[#0291fA] hover:text-white font-semibold rounded-md ">
            Features
          </p>
          <p className="text-lg cursor-pointer hover:border xl:px-3 py-1 hover:bg-[#0291fA] border-[#0291fA] hover:text-white font-semibold rounded-md ">
            Pricing
          </p>
          <p className="text-lg cursor-pointer hover:border xl:px-3 py-1 hover:bg-[#0291fA] border-[#0291fA] hover:text-white font-semibold rounded-md ">
            Documentation
          </p>
          <Link to="/login" className="text-lg cursor-pointer hover:border xl:px-3 py-1 hover:bg-[#0291fA] border-[#0291fA] hover:text-white font-semibold rounded-md ">
            Log in
          </Link>
          <Link to="/signup" className="text-lg cursor-pointer hover:border xl:px-3 py-1 hover:bg-[#0291fA] border-[#0291fA] hover:text-white font-semibold rounded-md ">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
