import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

const Movies = () => {
  const [moviesData, setMovies] = useState([]);
  const [currentPage, setCurrentpage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const fetchMovies = async (page = 1, genre = "") => {
    const apiKey = "b3c8574ec4e0950c0501b1bf409be1e0";
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}${
      genre ? `&with_genres=${genre}` : ""
    }`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log("Fetched data: ", data);

      const filteredMovies = data.results
        .filter(
          (movie) => movie.release_date && movie.release_date.startsWith("2024")
        )
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

      setMovies(filteredMovies);
      setTotalPages(data.total_pages);
      setCurrentpage(page);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    const genreId = getGenreId(selectedGenre);
    fetchMovies(currentPage, genreId);
  }, [currentPage, selectedGenre]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentpage(newPage);
    }
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setCurrentpage(1); // Reset to the first page when genre changes
  };

  const getGenreId = (genre) => {
    const genres = {
      Action: 28,
      Drama: 18,
      Comedy: 35,
      Horror: 27,
      Thriller: 53,
      Romance: 10749,
      Crime: 80,
      "Science Fiction": 878,
    };
    return genres[genre] || "";
  };

  // Media query hook
  const isMobile = useMediaQuery({ query: '(max-width: 639px)' });
  const isMdOrLg = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-8 text-center uppercase text-white">
        {selectedGenre === "All"
          ? "Featured Movies"
          : `${selectedGenre} Movies`}
      </h2>

      <div className={`flex ${isMobile ? "flex-col" : "flex-row"} w-full`}>
        {!isMobile && (
          <div className="hidden md:block w-1/4 mb-8 md:mb-0 md:mr-6 bg-slate-700 p-5 rounded-md h-full">
            <div className="space-y-4">
              <button
                onClick={() => handleGenreChange("All")}
                className={`w-full py-2 px-4 rounded-md font-semibold ${
                  selectedGenre === "All"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                All
              </button>

              <div className="bg-white shadow-md rounded-md p-4">
                <h3 className="text-md font-semibold mb-2">Genres</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Action",
                    "Drama",
                    "Comedy",
                    "Horror",
                    "Thriller",
                    "Romance",
                    "Crime",
                    "Science Fiction",
                  ].map((genre) => (
                    <button
                      key={genre}
                      onClick={() => handleGenreChange(genre)}
                      className={`px-1 text-md py-2 rounded-md w-auto ${
                        selectedGenre === genre
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black hover:bg-gray-300"
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={`flex-1 overflow-y-auto ${isMobile ? "w-full" : "md:w-3/4"} h-[60vh] md:h-[70vh]`}>
          {isMobile && (
            <div className="mb-4">
              <select
                value={selectedGenre}
                onChange={(e) => handleGenreChange(e.target.value)}
                className="w-full p-2 rounded-md bg-white text-black"
              >
                <option value="All">All</option>
                <option value="Action">Action</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
                <option value="Horror">Horror</option>
                <option value="Thriller">Thriller</option>
                <option value="Romance">Romance</option>
                <option value="Crime">Crime</option>
                <option value="Science Fiction">Science Fiction</option>
              </select>
            </div>
          )}
          <div className={`grid ${isMdOrLg ? "grid-cols-3" : "grid-cols-2"} gap-8`}>
            {moviesData.map((movie, index) => (
              <div
                key={index}
                className="relative shadow-lg rounded-lg overflow-hidden group"
              >
                <Link to={`/movies/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-72 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10 space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-600 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-lg text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-600 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
