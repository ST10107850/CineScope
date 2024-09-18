import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import Paginated from "../Js/Pagnation";

const Series = () => {
  const [seriesData, setSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const fetchSeries = async (page = 1, genre = "") => {
    const apiKey = "b3c8574ec4e0950c0501b1bf409be1e0";
    const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&page=${page}${
      genre ? `&with_genres=${genre}` : ""
    }`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log("Fetched data: ", data);

      const filteredSeries = data.results
        .sort(
          (a, b) => new Date(b.first_air_date) - new Date(a.first_air_date)
        );

      setSeries(filteredSeries.slice(0,8));
      setTotalPages(data.total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    const genreId = getGenreId(selectedGenre);
    fetchSeries(currentPage, genreId);
  }, [currentPage, selectedGenre]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const getGenreId = (genre) => {
    const genres = {
      Action: 10759,
      Drama: 18,
      Comedy: 35,
      Horror: 27,
      Thriller: 80,
      Romance: 10749,
      Crime: 80,
      "Science Fiction": 10765,
    };
    return genres[genre] || "";
  };

  // Media query hook
  const isMobile = useMediaQuery({ query: '(max-width: 639px)' });
  const isMdOrLg = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <div className="md:py-4 px-4 md:px-20">
      <h2 className="text-3xl font-bold mb-8 text-center uppercase text-white">
        {selectedGenre === "All" ? "Featured Series" : `${selectedGenre} Series`}
      </h2>

      <div className={`flex ${isMobile ? "flex-col" : "flex-row"} w-full`}>
        {!isMobile && (
          <div className="hidden md:block w-1/4 h-[370px] mb-8 md:mb-0 md:mr-6 bg-slate-700 p-5 rounded-md">
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
                <h3 className="text-lg font-semibold mb-2">Genres</h3>
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
                      className={`px-4 py-2 rounded-md ${
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

        <div className={`flex-1 ${isMobile ? "w-full" : "md:w-3/4"} `}>
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
          <div className={`grid ${isMdOrLg ? "grid-cols-4" : "grid-cols-2"} gap-8`}>
            {seriesData.map((series) => (
              <div
                key={series.id}
                className="relative shadow-lg md:w-[198px] md:h-[270px] group"
              >
                <Link to={`/series/${series.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                    alt={series.name}
                    className="w-full h-full object-cover  group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>
            ))}
          </div>
          <Paginated
            itemsPerPage={8}
            pageCount={totalPages}
            handlePageClick={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Series;
