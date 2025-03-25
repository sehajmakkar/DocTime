import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {backendUrl, token, setToken} = useContext(AppContext)
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    // Name validation for signup
    if (!isLogin && name.trim().length < 2) {
      toast.error("Please enter a valid name");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const endpoint = isLogin
        ? `${backendUrl}/api/v1/user/login`
        : `${backendUrl}/api/v1/user/register`;

      const requestData = isLogin
        ? { email, password }
        : { name, email, password };

      const { data } = await axios.post(endpoint, requestData);

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(isLogin ? "Logged in successfully" : "Registered successfully");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || 
        error.message || 
        "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Reset form when switching modes
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F8F2DE]">
      <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl font-bold text-center text-[#A31D1D] mb-6">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="block mb-2 font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-[#ECDCBF] rounded-md bg-[#F8F2DE] focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-[#ECDCBF] rounded-md bg-[#F8F2DE] focus:outline-none focus:ring-2 focus:ring-[#D84040]"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-[#ECDCBF] rounded-md bg-[#F8F2DE] focus:outline-none focus:ring-2 focus:ring-[#D84040]"
              placeholder={
                isLogin ? "Enter your password" : "Create a password"
              }
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 text-white font-bold rounded-md transition-colors duration-300 ${
              isLoading 
                ? 'bg-[#A31D1D] cursor-not-allowed' 
                : 'bg-[#D84040] hover:bg-[#A31D1D]'
            }`}
          >
            {isLoading ? 'Processing...' : (isLogin ? "Log In" : "Sign Up")}
          </button>

          <div className="text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-[#A31D1D] font-bold hover:underline focus:outline-none"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;