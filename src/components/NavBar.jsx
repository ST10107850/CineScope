import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="bg-gray-900"> {/* Set background color here */}
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="text-white text-2xl font-bold">
            <i className="bx bx-movie-play bx-tada text-red-500"></i>Fl
            <span className="text-red-500">i</span>x
          </NavLink>
          <ul className="hidden md:flex space-x-6 text-white">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="#">Genre</NavLink>
            </li>
            <li>
              <NavLink to="/movies">Movies</NavLink>
            </li>
            <li>
              <NavLink to="/series">Series</NavLink>
            </li>
            <li>
              <NavLink to="#">About</NavLink>
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
