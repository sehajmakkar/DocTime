import React, { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Pre-fill admin credentials when Admin tab is selected
  useEffect(() => {
    if (state === "Admin") {
      setEmail("admin@doc.com");
      setPassword("Admin123!");
    } else {
      // Clear fields when Doctor tab is selected
      setEmail("");
      setPassword("");
    }
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/v1/admin/login`, {
          email,
          password,
        });

        // console.log("Sending login data:", data);

        if (data.success === true) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success(data.message);
        } else{
          toast.error(data.message);
        }
        
      } else {
        // Doctor Login
        const {data} = await axios.post(`${backendUrl}/api/v1/doctor/login`, {
          email,
          password,
        });

        if (data.success === true) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      // console.error("Login failed:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  // Function to handle state change and set credentials
  const handleStateChange = (newState) => {
    setState(newState);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F2DE]">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-lg bg-white">
        {/* Toggle Tabs */}
        <div className="flex mb-6 rounded-full overflow-hidden border-2 border-[#ECDCBF]">
          <button
            type="button"
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              state === "Admin"
                ? "bg-[#A31D1D] text-white"
                : "bg-[#ECDCBF] text-[#A31D1D]"
            }`}
            onClick={() => handleStateChange("Admin")}
          >
            Admin
          </button>
          <button
            type="button"
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              state === "Doctor"
                ? "bg-[#A31D1D] text-white"
                : "bg-[#ECDCBF] text-[#A31D1D]"
            }`}
            onClick={() => handleStateChange("Doctor")}
          >
            Doctor
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-center text-[#A31D1D]">
            {state} Login
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-[#ECDCBF] focus:outline-none focus:ring-2 focus:ring-[#D84040]"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-[#ECDCBF] focus:outline-none focus:ring-2 focus:ring-[#D84040]"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#D84040] text-white font-medium hover:bg-[#A31D1D] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A31D1D] focus:ring-offset-2"
          >
            Login
          </button>

          {state === "Admin" && (
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>
                <span className="text-[#D84040] font-medium">Note:</span> Admin credentials are pre-filled for your convenience
              </p>
            </div>
          )}

          {/* <div className="mt-4 text-center text-sm text-gray-600">
            <p className="text-sm mt-6 text-gray-600">
              Forgot password? <a href="#" className="text-[#D84040] hover:underline">Reset here</a>
            </p>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;