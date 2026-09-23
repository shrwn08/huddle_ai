import React, { useState } from "react";
import Logo from "../assets/logo_nobg.png";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router";
import Chatbot from "../assets/chatbot.png";

function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handlePasswordVisible = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleConfirmPasswordVisible = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };
  return (
    <div className="h-screen w-full flex justify-center items-center sm:justify-between">
      <div className="hidden h-full w-full xl:flex justify-center items-center flex-col">
        <img src={Chatbot} alt="chatbot" className="bg-transparent h-60" />
        <div>
          <p className="text-2xl font-semibold">Meet Ashvin - your AI teammate, always in the loop. </p>
        </div>
      </div>
      <div className="w-11/12 sm:w-full sm:flex justify-center items-center">
        <div className=" w-full h-auto bg-[#EFEFEF] shadow-md flex justify-center items-center flex-col  rounded-2xl py-8 sm:w-3/5">
          <div className="flex justify-center items-center">
            <img src={Logo} alt="logo" className="w-20" />
            <span className="text-5xl font-bold text-[#0291fa]">Huddle </span>
            <span className="text-5xl font-bold text-[#62c6aa]"> AI</span>
          </div>
          <p className="text-[#1C1D21] font-600 text-3xl font-semibold">
            Create an account
          </p>

          <div className="w-11/12">
            <p>Fullname</p>
            <input
              type="text"
              placeholder="John Doe"
              className="border w-full h-8 rounded-md pl-3"
            />
          </div>
          <div className="w-11/12">
            <p>Email</p>
            <input
              type="email"
              placeholder="Johndoe@gmail.com"
              className="border w-full h-8 rounded-md pl-3"
            />
          </div>
          <div className="w-11/12">
            <p>Password</p>
            <div className="relative w-full">
              <input
                type="password"
                placeholder=""
                className="border w-full h-8 rounded-md pl-3"
              />
              <button
                className="absolute right-2"
                onClick={handlePasswordVisible}
              >
                {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </button>
            </div>
          </div>
          <div className="w-11/12">
            <p>Confirm Password</p>
            <div className="relative w-full">
              <input
                type="password"
                placeholder=""
                className="border w-full h-8 rounded-md pl-3"
              />
              <button
                className="absolute right-2"
                onClick={handleConfirmPasswordVisible}
              >
                {confirmPasswordVisible ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </button>
            </div>
          </div>
          <div className="flex w-11/12 gap-1 items-start mt-3">
            <div className="h-16 mt-1">
              <input type="checkbox" className="h-5 w-5" />
            </div>

            <p className="h-16 w-auto">
              I agree to the HuddleAI <span>Terms of Services</span> and{" "}
              <span>Privacy Policy</span>
            </p>
          </div>
          <div className="bg-[#0291fa] text-white w-11/12 h-10 rounded-md overflow-hidden">
            <button className="cursor-pointer w-full h-full ">
              Create an account{" "}
            </button>
          </div>
          <div className="w-11/12">
            <p className="text-center">
              Already have an account? <Link to="/login">Login</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
