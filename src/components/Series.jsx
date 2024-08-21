import { useEffect, useState } from "react";



const Series = () => {
  const [SeriesData, setSeries] = useState([]);
  const [currentPage, setCurrentpage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSeries = async (page =1) => {
    const apiKey = "b3c8574ec4e0950c0501b1bf409be1e0";
    const apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=${page}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log("Fetched data: ", data);

      const filteredSeries = data.results
        .filter(
          (show) =>
            show.first_air_date && show.first_air_date.startsWith("2024")
        )
        .sort(
          (a, b) => new Date(b.first_air_date) - new Date(a.first_air_date)
        );

      setSeries(filteredSeries);
      setTotalPages(data.total_pages);
      setCurrentpage(page);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchSeries(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) =>{
    if(newPage > 0 && newPage <= totalPages){
      setCurrentpage(newPage);
    }
  }



  return (
    <div className="p-11">
      {/* Title Section */}
      <h2 className="text-3xl font-bold mb-8 text-center uppercase text-white">
        Featured Series
      </h2>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 mb-8 md:mb-0 md:mr-6 bg-slate-700 p-5 rounded-md h-[60vh]">
          <div className="space-y-4">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 font-semibold">
              All
            </button>

            <div className="bg-white shadow-md rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2">Genres</h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  Action
                </button>
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  Drama
                </button>
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  Comedy
                </button>
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  Horror
                </button>
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  Thriller
                </button>
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  Romance
                </button>
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  Crime
                </button>
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                  Science Fiction
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Grid with Vertical Scroll */}
        <div className="md:w-3/4 overflow-y-auto h-[60vh] md:h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {SeriesData.map((movie, index) => (
              <div
                key={index}
                className="relative shadow-lg rounded-lg overflow-hidden group"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
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
