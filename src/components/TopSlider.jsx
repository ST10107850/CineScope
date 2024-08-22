import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useMediaQuery } from 'react-responsive';

const TopSlider = ({ className }) => {
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
        .sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date));

      setSeries(filteredSeries.slice(0, 8));
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

  // Determine visibleSlides based on screen size
  const visibleSlides = isMd ? 4 : isSm ? 3 : 2;

  return (
    <div className={`relative ${className}`}>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={movieItems.length}
        visibleSlides={visibleSlides}
        isPlaying={true}
        interval={3000}
        infinite={true}
        touchEnabled={true}
        dragEnabled={true}
      >
        <div className="relative w-full h-[350px]">
          <Slider>
            {movieItems.map((slide, slideIndex) => (
              <Slide key={slideIndex} index={slideIndex}>
                <div className="relative w-full h-full">
                  <Link to={`/series/${slide.id}`}>
                    <div className="relative w-full h-full transition-transform duration-300 hover:scale-105">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${slide.poster_path}`}
                        alt={slide.original_name}
                        className="object-cover w-full h-full transition-opacity duration-300 hover:opacity-70"
                      />
                      <div className="absolute inset-0 bg-black opacity-20 transition-opacity duration-300 hover:opacity-30"></div>
                      <div className="absolute inset-0 flex flex-col justify-end items-center text-white p-4">
                        <h3 className="text-md font-bold mb-4">{slide.original_name}</h3>
                        <div className="flex flex-row items-center space-x-3 mb-9">
                          <p className="flex flex-row items-center">
                            <AiFillStar className="text-blue-500" />
                            {slide.vote_average}
                          </p>
                          <p className="flex flex-row items-center">
                            <span>{slide.quality || "HD"}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </Slide>
            ))}
          </Slider>
        </div>
      </CarouselProvider>
    </div>
  );
};

export default TopSlider;
