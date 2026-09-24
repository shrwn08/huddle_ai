import React, { useState } from "react";
import Logo from "../assets/logo_nobg.png";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useNavigate } from "react-router";
import Chatbot from "../assets/chatbot.png";
import { signup } from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { isError, isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password === confirmPassword) {
      if (password.length < 8) {
        setError("Password should have at least 8 characters");
        return;
      } else if (!/[a-z]/.test(password)) {
        setError("Password must include at least one lowercase letter");
        return;
      } else if (!/[A-Z]/.test(password)) {
        setError("Password must include at least one uppercase letter");
        return;
      } else if (!/[0-9]/.test(password)) {
        setError("Password must include at least one number");
        return;
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        setError("Password must include at least one special character");
        return;
      }
    }

    const result = await dispatch(signup({ ...formData, password }));
    if (signup.fulfilled.match(result)) {
      navigate("/login");
    }

    setFormData({
      fullname: "",
      email: "",
      password: "",
    });
    setPassword("");
    setConfirmPassword("");
  };

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
          <p className="text-2xl font-semibold">
            Meet Ashvin - your AI teammate, always in the loop.{" "}
          </p>
        </div>
      </div>
      <form
        className="w-11/12 sm:w-full sm:flex justify-center items-center"
        onSubmit={handleSubmit}
      >
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
              name="fullname"
              value={formData.fullname}
              placeholder="John Doe"
              onChange={handleChange}
              className="border border-[#bdbfbe] bg-white w-full h-8 rounded-md pl-3"
            />
          </div>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <div className="w-11/12">
            <p>Confirm Password</p>
            <div className="relative w-full">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-[#bdbfbe] bg-white w-full h-8 rounded-md pl-3"
              />
              <button
                className="absolute right-2"
                onClick={handleConfirmPasswordVisible}
                type="button"
              >
                {confirmPasswordVisible ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </button>
            </div>
          </div>
          <div>
            <p className="text-red-600">{error && error}</p>
          </div>
          <div>
            <p className="text-red-600">{isError && isError}</p>
          </div>
          <div className="flex w-11/12 gap-1 items-start mt-3">
            <div className="h-16 mt-1">
              <input type="checkbox" className="h-5 w-5" />
            </div>

            <p className="h-20 w-auto">
              I agree to the HuddleAI <span>Terms of Services</span> and{" "}
              <span>Privacy Policy</span>
            </p>
          </div>
          <div className="bg-[#0291fa] text-white w-11/12 h-10 rounded-md overflow-hidden">
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full h-full "
            >
              {" "}
              {isLoading ? "loading..." : "Create an account"}
            </button>
          </div>
          <div className="w-11/12">
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-[#0291fa] font-semibold">
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
