import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { IoTime } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const LatestSeries = ({ className }) => {
  const [movieItems, setSeries] = useState([]);

  const fetchSeries = async () => {
    const apiKey = "b3c8574ec4e0950c0501b1bf409be1e0";
    const apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;

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

      setSeries(filteredSeries.slice(0, 10));
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  return (
    <div className={`relative h-full ${className}`}>
      {/* Horizontal Line Above */}

      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={movieItems.length}
        visibleSlides={4}
        isPlaying={true}
        interval={3000}
        infinite={true}
        touchEnabled={true}
        dragEnabled={true}
      >
        <div className="relative w-full h-full px-20 mt-20">
          <div className="relative w-full">
            <div className="border-t-2 border-blue-500 "></div>
          </div>
          <h2 className="text-white text-2xl uppercase font-bold my-4">
            Latest Series
          </h2>
          <div className="relative w-full">
            <div className="border-t-2 border-blue-500 mt-4"></div>
          </div>
          <Slider className="relative mt-14">
            {movieItems.map((movie, index) => (
              <Slide key={index} index={index}>
                <div className="flex justify-center items-center h-[300px]">
                  <Link to={`/series/${movie.id}`}>
                    <div className="relative h-full transition-transform duration-300 hover:scale-105">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="object-cover w-full h-full transition-opacity duration-300 hover:opacity-70"
                      />
                      <div className="absolute inset-0 bg-black opacity-20 transition-opacity duration-300 hover:opacity-30"></div>
                      <div className="absolute inset-0 flex flex-col justify-end items-center text-white p-4">
                        <h3 className="text-xl font-bold">
                          {movie.original_name}
                        </h3>
                        <div className="flex flex-row items-center space-x-3 ">
                          <p className="flex flex-row items-center ">
                            <AiFillStar className="text-blue-500" />
                            {movie.vote_average}
                          </p>

                          <p className="flex flex-row items-center">
                            {" "}
                            <span>{movie.quality || "HD"}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </Slide>
            ))}
          </Slider>
          <div className="absolute inset-y-1/2 flex justify-between items-center w-11/12 transform -translate-y-1/2 px-24">
            <ButtonBack className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-600 transform transition-transform duration-300">
              &larr;
            </ButtonBack>
            <ButtonNext className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-600 transform transition-transform duration-300">
              &rarr;
            </ButtonNext>
          </div>
        </div>
      </CarouselProvider>
    </div>
  );
};

export default LatestSeries;
