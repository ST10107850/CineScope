import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-500">
      <div className="container mx-auto py-4">
        {/* Flex container with justify-between */}
        <div className="flex items-center justify-between">
          {/* Left side: Logo and Search */}
          <div className="flex items-center space-x-7">
            <NavLink to="/" className="text-white text-2xl font-bold">
              <i className="bx bx-movie-play bx-tada text-red-500"></i>Fl
              <span className="text-red-500">i</span>x
            </NavLink>

            {/* Search Box */}
            <div className="relative flex items-center">
              <div className="relative w-full">
                <div className="flex items-center bg-transparent border border-white text-white rounded-2xl px-2 py-1">
                  {/* Search Icon */}
                  <FiSearch className="text-white w-5 h-5 mr-2" />

                  {/* Dropdown Button */}
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="bg-transparent text-white px-2 rounded-2xl text-sm focus:outline-none"
                    >
                      All
                    </button>

                    {/* Dropdown Options */}
                    {isOpen && (
                      <ul className="absolute left-0 mt-2 w-32 bg-gray-800 rounded-md shadow-lg z-10">
                        <li className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer">
                          Option 1
                        </li>
                        <li className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer">
                          Option 2
                        </li>
                      </ul>
                    )}
                  </div>

                  {/* Input Field */}
                  <input
                    type="text"
                    placeholder="Search by title, genre"
                    className="bg-transparent text-sm text-white focus:outline-none w-full ml-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Navigation Links */}
          <ul className="hidden md:flex space-x-6 text-white">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/movies">Movies</NavLink>
            </li>
            <li>
              <NavLink to="/series">Series</NavLink>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <div className="hamburger"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
