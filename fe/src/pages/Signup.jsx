import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaFacebookF,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import axios from "axios";
import { IoReturnDownBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      return false;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Kiểm tra dữ liệu nhập vào
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Kết nối với API backend để đăng ký
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      console.log("Đăng ký thành công:", response.data);
      setSuccess(true);

      // Sau khi đăng ký thành công, chuyển hướng đến trang đăng nhập sau 2 giây
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      setError(
        error.response?.data?.message ||
          "Đăng ký không thành công. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      <div
        onClick={() => {
          navigate("/");
        }}
        className=" z-10 absolute top-8 left-8 bg-[rgb(54,65,83)] cursor-pointer
                      px-6 py-1 rounded-md hover:bg-[rgb(45,54,67)]"
      >
        <IoReturnDownBackSharp className="text-4xl text-white" />
      </div>
      {/* Background cinematic effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-[rgb(15,20,22)] "></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="text-4xl font-bold">
            <span className="text-red-600">Movie</span>
            <span className="text-white">Hub</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white text-center">
              Create an account
            </h2>
            <p className="text-gray-400 text-center mt-1">
              To experience our ultimate service
            </p>
          </div>

          {/* Error or Success Message */}
          {error && (
            <div className="mx-6 mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mx-6 mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg">
              <p className="text-green-500 text-sm">
                Đăng ký thành công! Đang chuyển hướng...
              </p>
            </div>
          )}

          {/* Form */}
          <form className="px-6 py-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-medium mb-2"
                htmlFor="name"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-500" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label
                  className="block text-gray-400 text-sm font-medium"
                  htmlFor="password"
                >
                  Password
                </label>
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

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label
                  className="block text-gray-400 text-sm font-medium"
                  htmlFor="confirmPassword"
                >
                  Confirm password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 disabled:opacity-70"
            >
              {loading ? "Đang đăng ký..." : "Sign Up"}
            </button>

            {/* Divider */}
            <div className="relative flex items-center mt-8 mb-6">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            {/* Social Login */}
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300"
              >
                <FaGoogle className="text-lg" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300"
              >
                <FaFacebookF className="text-lg" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300"
              >
                <FaTwitter className="text-lg" />
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-900/50 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-cyan-400 hover:text-cyan-300 font-medium"
              >
                Log in
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          © 2025 MovieHub. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Signup;
