import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "react-responsive";

const TopShows = ({ className }) => {
  const [seriesItems, setSeries] = useState([]);

  const fetchSeries = async () => {
    const apiKey = "b3c8574ec4e0950c0501b1bf409be1e0";
    const apiUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log("Fetched data: ", data);

      const filteredSeries = data.results.sort(
        (a, b) => new Date(b.first_air_date) - new Date(a.first_air_date)
      );

      setSeries(filteredSeries.slice(0, 10));
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {

    fetchSeries();

   

    
  }, []);

  const isMd = useMediaQuery({ query: "(min-width: 768px)" });
  const isLg = useMediaQuery({ query: "(min-width: 1024px)" });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isLg ? 4 : isMd ? 3 : 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className={`relative h-full w-full mb-6 overflow-hidden ${className}`}>
      <div className="relative w-full h-full px-6 sm:px-20 sm:mt-28">
        <div className="relative w-full">
          <div className="border-t-2 border-blue-500"></div>
        </div>
        <h2 className="text-white text-2xl uppercase font-bold my-4">
          Top 10 TV shows this week
        </h2>
        <div className="relative w-full">
          <div className="border-t-2 border-blue-500 mt-4"></div>
        </div>
        <Slider {...settings} className="relative mt-14 h-full md:h-[400px]">
          {seriesItems.map((movie, index) => (
            <div key={index} className="flex justify-center items-center px-2">
              <Link to={`/movies/${movie.id}`}>
                <div className="relative w-full max-w-[180px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] h-full transition-transform duration-300 hover:scale-105">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || "Series Poster"}
                    className="object-cover w-full h-full transition-opacity duration-300 hover:opacity-70"
                  />
                  <div className="absolute inset-0 bg-black opacity-20 transition-opacity duration-300 hover:opacity-30"></div>

                  <div className="absolute inset-0 flex flex-col justify-end items-center text-white p-4 md:mb-10">
                    <h3 className="text-sm sm:text-lg font-bold text-center">
                      {movie.title || "Title Not Available"}
                    </h3>
                  </div>

                  <div className="absolute top-4 left-4 flex items-center bg-black bg-opacity-70 px-2 py-1 rounded text-white text-sm">
                    <AiFillStar className="text-yellow-500 mr-1" />
                    <span>{movie.vote_average || "N/A"}</span>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center bg-black bg-opacity-70 px-2 py-1 rounded text-white text-sm">
                    <span>{movie.quality || "HD"}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopShows;
