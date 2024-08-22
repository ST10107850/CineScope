import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
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
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 shadow-lg"
      style={{
        backgroundColor: scrolling ? "#1a1a1a" : "transparent", 
        transition: "background-color 0.3s ease", 
      }}
    >
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-7">
            <NavLink to="/" className="text-white text-2xl font-bold">
              <i className="bx bx-movie-play bx-tada text-red-500"></i>Cine
              <span className="text-red-500">S</span>cope
            </NavLink>

            {/* Search Box */}
            <div className="relative flex items-center w-full">
              <div className="flex item-center">
                <div className="flex items-center bg-transparent border border-white text-white rounded-2xl px-2 py-1 w-full">
                  <FiSearch className="text-white w-5 h-5 mr-2" />

                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className={`bg-transparent text-white px-2 rounded-2xl text-sm focus:outline-none ${
                        isOpen ? "bg-gray-700" : ""
                      }`}
                    >
                      {selectedOption}
                    </button>

                    {isOpen && (
                      <ul className="absolute left-0 mt-2 w-32 bg-gray-800 rounded-md shadow-lg z-10">
                        <li
                          onClick={() => handleOptionClick("All")}
                          className={`px-4 py-2 text-white hover:bg-gray-700 cursor-pointer ${
                            selectedOption === "All" ? "bg-gray-700" : ""
                          }`}
                        >
                          All
                        </li>
                        <li
                          onClick={() => handleOptionClick("Movies")}
                          className={`px-4 py-2 text-white hover:bg-gray-700 cursor-pointer ${
                            selectedOption === "Movies" ? "bg-gray-700" : ""
                          }`}
                        >
                          Movies
                        </li>
                        <li
                          onClick={() => handleOptionClick("Series")}
                          className={`px-4 py-2 text-white hover:bg-gray-700 cursor-pointer ${
                            selectedOption === "Series" ? "bg-gray-700" : ""
                          }`}
                        >
                          Series
                        </li>
                        <li
                          onClick={() => handleOptionClick("People")}
                          className={`px-4 py-2 text-white hover:bg-gray-700 cursor-pointer ${
                            selectedOption === "People" ? "bg-gray-700" : ""
                          }`}
                        >
                          People
                        </li>
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

                {(selectedOption === "Movies" ||
                  selectedOption === "Series") && (
                  <select
                    className="ml-2 bg-gray-700 text-white rounded-md"
                    value={selectedGenre}
                    onChange={handleGenreChange}
                  >
                    <option value="">Select Genre</option>
                    {genres
                      .filter(
                        (genre) =>
                          genre.type ===
                          (selectedOption === "Movies" ? "movie" : "tv")
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
                <div className="absolute left-0 top-full mt-2 w-full max-h-60 overflow-y-auto bg-gray-800 rounded-md shadow-lg z-20">
                  {loading && <div className="text-white p-2">Loading...</div>}
                  {results.length > 0 ? (
                    <ul className="p-2">
                      {results.map((item) => (
                        <NavLink
                          key={item.id}
                          to={`/${
                            item.media_type === "tv" ? "series" : "movies"
                          }/${item.id}`}
                          onClick={() => handleMovieClick(item.id)}
                        >
                          <li className="text-white px-4 py-2 flex items-center space-x-4 hover:bg-gray-700 cursor-pointer">
                            <img
                              src={`https://image.tmdb.org/t/p/w92/${
                                item.poster_path ||
                                item.profile_path ||
                                "default.jpg"
                              }`}
                              alt={item.title || item.name || "Image"}
                              className="w-16 h-24 object-cover rounded-md"
                            />
                            <div className="flex flex-col">
                              <span className="font-semibold">
                                {item.title || item.name || "Untitled"}
                              </span>
                              <span className="text-sm text-gray-400">
                                {item.media_type || "N/A"} -{" "}
                                {item.release_date?.split("-")[0] ||
                                  item.first_air_date?.split("-")[0] ||
                                  "N/A"}
                              </span>
                            </div>
                          </li>
                        </NavLink>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-white p-2">No results found</div>
                  )}
                </div>
              )}
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
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
