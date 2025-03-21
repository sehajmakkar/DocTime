import React, { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log(isLogin ? "Logging in" : "Signing up", {
      email,
      password,
      name,
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
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
            className="w-full py-2 px-4 bg-[#D84040] text-white font-bold rounded-md hover:bg-[#A31D1D] transition-colors duration-300"
          >
            {isLogin ? "Log In" : "Sign Up"}
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
