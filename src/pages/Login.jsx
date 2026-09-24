import React, { useState } from "react";
import Logo from "../assets/logo_nobg.png";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useNavigate } from "react-router";
import Chatbot from "../assets/chatbot.png";
import { login } from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { isError, isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

  };

   const handlePasswordVisible = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      
      const result = await dispatch(login(formData));
      console.log(result)
      if (login.fulfilled.match(result)) {
        navigate("/");
      }
  
      setFormData({
        email: "",
        password: "",
      });
      
    };

  return (
    <div className="h-screen w-full flex justify-center items-center  sm:justify-between">
      <form
        className="w-11/12 sm:w-full sm:flex justify-center items-center gap-y-3"
        onSubmit={handleSubmit}
      >
        <div className=" w-full h-auto bg-[#EFEFEF] shadow-md flex justify-center items-center flex-col gap-y-5 rounded-2xl py-8 sm:w-3/5">
          <div className="flex justify-center items-center">
            <img src={Logo} alt="logo" className="w-20" />
            <span className="text-5xl font-bold text-[#0291fa]">Huddle </span>
            <span className="text-5xl font-bold text-[#62c6aa]"> AI</span>
          </div>
          <p className="text-[#1C1D21] font-600 text-2xl font-semibold">
            Welcome back to HuddleAI
          </p>

          <div className="w-11/12">
            <p>Email</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Johndoe@gmail.com"
              onChange={handleChange}
              className="border border-[#bdbfbe] bg-white w-full h-8 rounded-md pl-3"
            />
          </div>
          <div className="w-11/12">
            <p>Password</p>
            <div className="relative w-full">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="********"
                name = "password"
                value={formData.password}
                onChange={handleChange}
                className="border border-[#bdbfbe] bg-white w-full h-8 rounded-md pl-3"
              />
              <button
                className="absolute right-2"
                onClick={handlePasswordVisible}
                type="button"
              >
                {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </button>
            </div>
          </div>

          <div className={!error&& "hidden "}>
            <p className="text-red-600">{error && error}</p>
          </div>
          <div className={!isError&& "hidden"}>
            <p className="text-red-600">{isError && isError}</p>
          </div>
          <div className="flex w-11/12  items-center justify-end ">
            <Link to="/forget-password" className="text-[#0291fa]">Forget password?</Link>
          </div>
          <div className="bg-[#0291fa] text-white w-11/12 h-10 rounded-md overflow-hidden">
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full h-full "
            >
              {" "}
              {isLoading ? "loading..." : "Login"}
            </button>
          </div>
          <div className="w-11/12">
            <p className="text-center">
              New to HuddleAI?{" "}
              <Link to="/signup" className="text-[#0291fa] font-semibold">
                Signup for an account
              </Link>{" "}
            </p>
          </div>
        </div>
      </form>
      <div className="hidden h-full w-full xl:flex justify-center items-center flex-col">
        <img src={Chatbot} alt="chatbot" className="bg-transparent h-60" />
        <div>
          <p className="text-2xl font-semibold">
            Meet Ashvin - your AI teammate, always in the loop.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
