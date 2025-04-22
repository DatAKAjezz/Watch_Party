import React, { useState } from "react";
import { Search, UserCircle, Bell, Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Tìm kiếm: ", searchQuery);
    // Xử lý tìm kiếm ở đây
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const genres = [
    "Hành động",
    "Tình cảm",
    "Hài hước",
    "Kinh dị",
    "Viễn tưởng",
    "Hoạt hình",
  ];
  const countries = [
    "Việt Nam",
    "Hàn Quốc",
    "Trung Quốc",
    "Mỹ",
    "Nhật Bản",
    "Thái Lan",
  ];

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        {/* Layout Desktopg */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img className="w-20 mx-2" src="logo.png"/>
            <div className="text-red-600 font-bold text-2xl">
              MOVIE<span className="text-white">HUB</span>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm phim..."
                className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-2">
                <Search
                  size={18}
                  className="text-gray-400 hover:text-red-500"
                />
              </button>
            </form>
          </div>

          {/* Menu điều hướng */}
          <nav className="flex items-center space-x-6">
            <a href="#" className="hover:text-red-500 font-medium">
              Trang chủ
            </a>

            {/* Dropdown Thể loại */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("genres")}
                className="flex items-center hover:text-red-500 font-medium"
              >
                Thể loại <ChevronDown size={16} className="ml-1" />
              </button>
              {activeDropdown === "genres" && (
                <div className="absolute z-10 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1">
                  {genres.map((genre, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-red-500"
                    >
                      {genre}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown Quốc gia */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("countries")}
                className="flex items-center hover:text-red-500 font-medium"
              >
                Quốc gia <ChevronDown size={16} className="ml-1" />
              </button>
              {activeDropdown === "countries" && (
                <div className="absolute z-10 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1">
                  {countries.map((country, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-red-500"
                    >
                      {country}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>


          {/* User & Notification */}
          <div className="flex items-center space-x-4">
            <Bell
              size={22}
              className="text-gray-300 hover:text-red-500 cursor-pointer"
            />
            <div className="flex items-center space-x-1">
              <UserCircle size={24} className="text-gray-300" />
              <a href="#" className="hover:text-red-500">
                Đăng nhập
              </a>
            </div>
          </div>
        </div>

        {/* Layout Mobile */}
        <div className="md:hidden flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-red-600 font-bold text-2xl mr-2">
              MOVIE<span className="text-white">HUB</span>
            </div>
          </div>

          {/* Nút menu mobile */}
          <button onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {/* Tìm kiếm mobile */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Tìm kiếm phim..."
                className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-2">
                <Search
                  size={18}
                  className="text-gray-400 hover:text-red-500"
                />
              </button>
            </form>

            <nav className="flex flex-col space-y-3">
              <a
                href="#"
                className="hover:text-red-500 font-medium py-2 border-b border-gray-800"
              >
                Trang chủ
              </a>

              {/* Dropdown Thể loại mobile */}
              <div className="py-2 border-b border-gray-800">
                <button
                  onClick={() => toggleDropdown("mobile-genres")}
                  className="flex items-center justify-between w-full hover:text-red-500 font-medium"
                >
                  Thể loại <ChevronDown size={16} />
                </button>
                {activeDropdown === "mobile-genres" && (
                  <div className="mt-2 pl-4 flex flex-col space-y-2">
                    {genres.map((genre, index) => (
                      <a
                        key={index}
                        href="#"
                        className="text-sm hover:text-red-500"
                      >
                        {genre}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown Quốc gia mobile */}
              <div className="py-2 border-b border-gray-800">
                <button
                  onClick={() => toggleDropdown("mobile-countries")}
                  className="flex items-center justify-between w-full hover:text-red-500 font-medium"
                >
                  Quốc gia <ChevronDown size={16} />
                </button>
                {activeDropdown === "mobile-countries" && (
                  <div className="mt-2 pl-4 flex flex-col space-y-2">
                    {countries.map((country, index) => (
                      <a
                        key={index}
                        href="#"
                        className="text-sm hover:text-red-500"
                      >
                        {country}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <div className="mt-4 flex justify-between items-center">
              <a
                href="#"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition duration-300"
              >
                Đăng nhập
              </a>
              <a
                href="#"
                className="border border-gray-600 hover:border-red-500 px-4 py-2 rounded-lg font-medium transition duration-300"
              >
                Đăng ký
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
