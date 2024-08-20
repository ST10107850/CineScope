import React from "react";

const NavBar = () => {
  return (
    <div className="bg-gray-900"> {/* Set background color here */}
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="text-white text-2xl font-bold">
            <i className="bx bx-movie-play bx-tada text-red-500"></i>Fl
            <span className="text-red-500">i</span>x
          </a>
          <ul className="hidden md:flex space-x-6 text-white">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Genre</a>
            </li>
            <li>
              <a href="#">Movies</a>
            </li>
            <li>
              <a href="#">Series</a>
            </li>
            <li>
              <a href="#">About</a>
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
