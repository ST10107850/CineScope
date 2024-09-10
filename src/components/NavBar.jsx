import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import axios from "axios";
import debounce from "lodash.debounce";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [scrolling, setScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const apiKey = "b3c8574ec4e0950c0501b1bf409be1e0";
  const baseUrl = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const movieGenres = await axios.get(
          `${baseUrl}/genre/movie/list?api_key=${apiKey}`
        );
        const tvGenres = await axios.get(
          `${baseUrl}/genre/tv/list?api_key=${apiKey}`
        );
        setGenres([
          ...movieGenres.data.genres.map((genre) => ({
            ...genre,
            type: "movie",
          })),
          ...tvGenres.data.genres.map((genre) => ({ ...genre, type: "tv" })),
        ]);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    fetchResults(option, searchQuery, selectedGenre);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    fetchResults(selectedOption, searchQuery, e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchResults = async (option, query, genre) => {
    if (query === "") {
      setResults([]);
      return;
    }
    setLoading(true);
    let url = "";
    let mediaType = "";
    if (option === "Movies") {
      url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&with_genres=${genre}`;
      mediaType = "movie";
    } else if (option === "Series") {
      url = `${baseUrl}/search/tv?api_key=${apiKey}&query=${query}&with_genres=${genre}`;
      mediaType = "tv";
    } else if (option === "People") {
      url = `${baseUrl}/search/person?api_key=${apiKey}&query=${query}`;
    } else {
      url = `${baseUrl}/search/multi?api_key=${apiKey}&query=${query}`;
    }
    try {
      const response = await axios.get(url);
      setResults(
        response.data.results.map((item) => ({
          ...item,
          media_type: mediaType,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchResults = debounce(
    (option, query, genre) => fetchResults(option, query, genre),
    300
  );

  useEffect(() => {
    if (searchQuery) {
      debouncedFetchResults(selectedOption, searchQuery, selectedGenre);
    }
    return () => {
      debouncedFetchResults.cancel();
    };
  }, [searchQuery, selectedOption, selectedGenre]);

  const handleMovieClick = async (movieId) => {
    try {
      const response = await axios.get(
        `${baseUrl}/movie/${movieId}?api_key=${apiKey}`
      );
      setSelectedMovie(response.data);
      setResults([]);
      setSearchQuery("");
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getClassName = ({ isActive }) =>
    `hover:text-red-500 ${isActive ? 'text-red-500' : ''}`;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 shadow-base bg-gray-900 transition-colors duration-300 ${
        scrolling ? 'bg-gray-900' : 'md:bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-7">
            <NavLink to="/" className="text-white text-2xl font-bold">
              <i className="bx bx-movie-play bx-tada text-red-500"></i>
              <span className="inline">Cine</span>
              <span className="text-red-500">S</span>
              <span className="hidden md:inline">cope</span>
            </NavLink>

            <div className="relative flex flex-col md:flex-row items-center w-full">
              <div className="flex items-center bg-transparent border border-white text-white rounded-2xl px-2 py-1 w-full lg:w-96 md:w-64 sm:w-48">
                <FiSearch className="text-white w-5 h-5 mr-2" />
                <div className="relative flex-grow">
                  <button
                    onClick={toggleDropdown}
                    className={`bg-transparent text-white px-2 rounded-2xl text-sm focus:outline-none ${
                      isOpen ? 'bg-gray-700' : ''
                    }`}
                  >
                    {selectedOption}
                  </button>
                  {isOpen && (
                    <ul className="absolute left-0 mt-2 w-32 bg-gray-800 rounded-md shadow-lg z-10">
                      {['All', 'Movies', 'Series', 'People'].map((option) => (
                        <li
                          key={option}
                          onClick={() => handleOptionClick(option)}
                          className={`px-4 py-2 text-white hover:bg-gray-700 cursor-pointer ${
                            selectedOption === option ? 'bg-gray-700' : ''
                          }`}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Search by title, genre"
                  className="bg-transparent text-sm text-white focus:outline-none w-full ml-2"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </div>
              {(selectedOption === 'Movies' || selectedOption === 'Series') && (
                <select
                  className="mt-2 md:mt-0 md:ml-2 bg-gray-700 text-white rounded-md"
                  value={selectedGenre}
                  onChange={handleGenreChange}
                >
                  <option value="">Select Genre</option>
                  {genres
                    .filter(
                      (genre) =>
                        genre.type === (selectedOption === 'Movies' ? 'movie' : 'tv')
                    )
                    .map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                </select>
              )}
            </div>
            {searchQuery && (
              <div className="absolute left-0 top-full mt-2 w-auto max-h-60 overflow-y-auto bg-gray-800 rounded-md shadow-lg z-20">
                {loading && <div className="text-white p-2">Loading...</div>}
                {results.length > 0 ? (
                  <ul className="p-2">
                    {results.map((item) => (
                      <NavLink
                        key={item.id}
                        to={`/${item.media_type === 'tv' ? 'series' : 'movies'}/${item.id}`}
                        onClick={() => item.media_type === 'movie' && handleMovieClick(item.id)}
                      >
                        <li className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer flex items-center">
                          <img
                            src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                            alt={item.title || item.name}
                            className="w-16 h-24 object-cover mr-2"
                          />
                          <div>
                            <h3 className="text-sm font-bold">{item.title || item.name}</h3>
                            <p className="text-xs text-gray-400">
                              {item.release_date || item.first_air_date || ''}
                            </p>
                          </div>
                        </li>
                      </NavLink>
                    ))}
                  </ul>
                ) : (
                  !loading && <div className="text-white p-2">No results found</div>
                )}
              </div>
            )}
          </div>
          <div className="hidden lg:flex space-x-4 text-white text-lg font-semibold">
            <NavLink to="/" className={getClassName}>
              Home
            </NavLink>
            <NavLink to="/movies" className={getClassName}>
              Movie
            </NavLink>
            <NavLink to="/series" className={getClassName}>
              Series
            </NavLink>
            <NavLink to="/about" className={getClassName}>
              About
            </NavLink>
          </div>
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden flex-col flex bg-gray-900 text-white py-2 px-6">
          <NavLink
            to="/movies"
            className={getClassName}
            onClick={() => setIsMenuOpen(false)}
          >
            Movies
          </NavLink>
          <NavLink
            to="/series"
            className={getClassName}
            onClick={() => setIsMenuOpen(false)}
          >
            Series
          </NavLink>
          <NavLink
            to="/watchlist"
            className={getClassName}
            onClick={() => setIsMenuOpen(false)}
          >
            Watchlist
          </NavLink>
          <NavLink
            to="/account"
            className={getClassName}
            onClick={() => setIsMenuOpen(false)}
          >
            Account
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default NavBar;
