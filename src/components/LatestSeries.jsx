import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from 'react-responsive';

const LatestSeries = ({ className }) => {
  const [seriesItems, setSeries] = useState([]);

  const fetchSeries = async () => {
    const apiKey = "b3c8574ec4e0950c0501b1bf409be1e0";
    const apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log("Fetched data: ", data);

      const filteredSeries = data.results
        // .filter(
        //   (show) =>
        //     show.first_air_date && show.first_air_date.startsWith("2024")
        // )
        .sort(
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

  // Media query hooks
  const isSm = useMediaQuery({ query: '(min-width: 640px)' });
  const isMd = useMediaQuery({ query: '(min-width: 768px)' });
  const isLg = useMediaQuery({ query: '(min-width: 1024px)' });

  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isLg ? 4 : (isMd ? 3 : 2),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };


  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <div className="relative w-full h-full px-6 sm:px-20 sm:mt-28">
        <div className="relative w-full">
          <div className="border-t-2 border-blue-500"></div>
        </div>
        <h2 className="text-white text-2xl uppercase font-bold my-4">
          Latest Movies
        </h2>
        <div className="relative w-full">
          <div className="border-t-2 border-blue-500 mt-4"></div>
        </div>
        <Slider {...settings} className="relative mt-14 h-full md:h-[400px]">
          {seriesItems.map((movie, index) => (
            <div key={index} className="flex justify-center items-center mx-2">
              <Link to={`/movies/${movie.id}`}>
                <div className="relative w-full md:w-[290px] h-full transition-transform duration-300 hover:scale-105">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title || "Movie Poster"} // Adjust alt text
                    className="object-cover w-full h-full transition-opacity duration-300 hover:opacity-70"
                  />
                  <div className="absolute inset-0 bg-black opacity-20 transition-opacity duration-300 hover:opacity-30"></div>
                  <div className="absolute inset-0 flex flex-col justify-end items-center text-white p-4 md:mb-10">
                    <h3 className="text-xl font-bold">
                      {movie.title || "Title Not Available"}
                    </h3>
                    <div className="flex flex-row items-center space-x-3">
                      <p className="flex flex-row items-center">
                        <AiFillStar className="text-blue-500" />
                        {movie.vote_average || "N/A"}
                      </p>
                      <p className="flex flex-row items-center">
                        <span>{movie.quality || "HD"}</span>
                      </p>
                    </div>
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

export default LatestSeries;
