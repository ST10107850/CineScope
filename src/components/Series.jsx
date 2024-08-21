import { useEffect, useState } from "react";

const Series = () => {
  const [seriesData, setSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("All"); // State to track selected genre

  const fetchSeries = async (page = 1, genre = "") => {
    const apiKey = "b3c8574ec4e0950c0501b1bf409be1e0";
    const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&page=${page}${genre ? `&with_genres=${genre}` : ""}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log("Fetched data: ", data);

      const filteredSeries = data.results
        .filter(
          (show) => show.first_air_date && show.first_air_date.startsWith("2024")
        )
        .sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date));

      setSeries(filteredSeries);
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
    setCurrentPage(1); // Reset to the first page when genre changes
  };

  const getGenreId = (genre) => {
    const genres = {
      "Action": 10759,
      "Drama": 18,
      "Comedy": 35,
      "Horror": 27,
      "Thriller": 80,
      "Romance": 10749,
      "Crime": 80,
      "Science Fiction": 10765,
    };
    return genres[genre] || ""; // Return genre ID or an empty string for "All"
  };

  return (
    <div className="p-11">
      {/* Title Section */}
      <h2 className="text-3xl font-bold mb-8 text-center uppercase text-white">
        {selectedGenre === "All" ? "Featured Series" : `${selectedGenre} Series`}
      </h2>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 mb-8 md:mb-0 md:mr-6 bg-slate-700 p-5 rounded-md h-[60vh]">
          <div className="space-y-4">
            <button
              onClick={() => handleGenreChange("All")}
              className={`w-full py-2 px-4 rounded-md font-semibold ${selectedGenre === "All" ? "bg-blue-500 text-white" : "bg-gray-200 text-black hover:bg-gray-300"}`}
            >
              All
            </button>

            <div className="bg-white shadow-md rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2">Genres</h3>
              <div className="grid grid-cols-2 gap-2">
                {["Action", "Drama", "Comedy", "Horror", "Thriller", "Romance", "Crime", "Science Fiction"].map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreChange(genre)}
                    className={`px-4 py-2 rounded-md ${selectedGenre === genre ? "bg-blue-500 text-white" : "bg-gray-200 text-black hover:bg-gray-300"}`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Series Grid with Vertical Scroll */}
        <div className="md:w-3/4 overflow-y-auto h-[60vh] md:h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {seriesData.map((series, index) => (
              <div
                key={index}
                className="relative shadow-lg rounded-lg overflow-hidden group"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                  alt={series.name}
                  className="w-full h-72 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-600 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-4 text-lg text-white">
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

export default Series;
