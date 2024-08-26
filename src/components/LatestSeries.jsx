import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
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

  // Media query hooks
  const isSm = useMediaQuery({ query: '(min-width: 640px)' });
  const isMd = useMediaQuery({ query: '(min-width: 768px)' });
  const isLg = useMediaQuery({ query: '(min-width: 1024px)' });

  // Determine visibleSlides based on screen size
  const visibleSlides = isLg ? 4 : (isMd ? 3 : (isSm ? 2 : 2));

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* Horizontal Line Above */}

      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={seriesItems.length}
        visibleSlides={visibleSlides}
        isPlaying={true}
        interval={3000}
        infinite={true}
        touchEnabled={true}
        dragEnabled={true}
      >
        <div className="relative w-full h-full px-6 sm:px-20 sm:mt-28">
          <div className="relative w-full">
            <div className="border-t-2 border-blue-500"></div>
          </div>
          <h2 className="text-white text-2xl uppercase font-bold my-4">
            Latest Series
          </h2>
          <div className="relative w-full">
            <div className="border-t-2 border-blue-500 mt-4"></div>
          </div>
          <Slider className="relative mt-14">
            {seriesItems.map((series, index) => (
              <Slide key={index} index={index}>
                <div className="flex justify-center items-center mx-2">
                  <Link to={`/series/${series.id}`}>
                    <div className="relative w-full h-[300px] transition-transform duration-300 hover:scale-105">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                        alt={series.original_name}
                        className="object-cover w-full h-full transition-opacity duration-300 hover:opacity-70"
                      />
                      <div className="absolute inset-0 bg-black opacity-20 transition-opacity duration-300 hover:opacity-30"></div>
                      <div className="absolute inset-0 flex flex-col justify-end items-center text-white p-4">
                        <h3 className="text-xl font-bold">
                          {series.original_name}
                        </h3>
                        <div className="flex flex-row items-center space-x-3">
                          <p className="flex flex-row items-center">
                            <AiFillStar className="text-blue-500" />
                            {series.vote_average}
                          </p>
                          <p className="flex flex-row items-center">
                            <span>{series.quality || "HD"}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </Slide>
            ))}
          </Slider>
          <div className="/md:block inset-y-1/2 flex justify-center space-x-5 items-center w-full px-6 sm:px-20 transform -translate-y-1/2">
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
