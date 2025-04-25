import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import axios from "axios";
import { IoReturnDownBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      if (rememberMe) {
        localStorage.setItem("userToken", token);
      } else {
        sessionStorage.setItem("userToken", token);
      }

      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: response.data._id,
          name: response.data.name,
          email: response.data.email,
        })
      );

      window.location.href = "/";
    } catch (error) {
      setError(
        error.response?.data?.message || "Đăng nhập thất bại vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12 relative">
      <div onClick={() => {navigate("/")}} className=" z-10 absolute top-8 left-8 bg-[rgb(54,65,83)] cursor-pointer
                      px-6 py-1 rounded-md hover:bg-[rgb(45,54,67)]">
        <IoReturnDownBackSharp className="text-4xl text-white" />
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-[rgb(15,20,22)] "></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <div className="text-4xl font-bold">
            <span className="text-red-600">Movie</span>
            <span className="text-white">Hub</span>
          </div>
        </div>

        <div className="bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white text-center">
              Create Back
            </h2>
            <p className="text-gray-400 text-center mt-1">
              Sign in to continue your movie experience
            </p>
          </div>

          <form className="px-6 py-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-medium mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label
                  className="block text-gray-400 text-sm font-medium"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-cyan-400 hover:text-cyan-300"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center mb-6">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 bg-gray-700 border-gray-600 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-400"
              >
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            <div className="relative flex items-center mt-8 mb-6">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            <div className="flex justify-center space-x-4">
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300">
                <FaGoogle className="text-lg" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300">
                <FaFacebookF className="text-lg" />
              </button>
              <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300">
                <FaTwitter className="text-lg" />
              </button>
            </div>
          </form>

          <div className="px-6 py-4 bg-gray-900/50 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Sign up now
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          © 2025 CineStream. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
