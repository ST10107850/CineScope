import { AiFillStar } from "react-icons/ai";
import { IoTime } from "react-icons/io5";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useEffect, useState } from "react";

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const descriptionLimit = 300; 

  const fetchMovies = async () => {
    const apiKey = "b3c8574ec4e0950c0501b1bf409be1e0";
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log("Fetched data: ", data);

      const filteredMovies = data.results
        .filter(
          (movie) => movie.release_date && movie.release_date.startsWith("2024")
        )
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

      setSlides(filteredMovies.slice(0, 8));
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="relative bg-dark-custom overflow-hidden">
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={slides.length}
        isPlaying={true}
        interval={3000}
      >
        <div className="relative w-full h-[70vh]">
          <Slider>
            {slides.map((slide, index) => {
              const isLongDescription = slide.overview.length > descriptionLimit;

             
              const shortDescription = slide.overview.substring(0, descriptionLimit) + "...";
              
              return (
                <Slide key={index}>
                  <div
                    className="relative w-full h-[90vh] bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${slide.poster_path}`})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-8 ml-12">
                      <div className="text-3xl font-bold mb-4">
                        {slide.original_title}
                      </div>
                      <div className="flex space-x-4 mb-4">
                        <div className="flex items-center">
                          <AiFillStar className="text-yellow-400" />
                          <span className="ml-2 flex flex-row items-center space-x-3">
                            {slide.vote_average}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <IoTime className="text-white" />
                          <span className="ml-2 flex flex-row items-center">
                            {slide.runtime ? `${slide.runtime} minutes` : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span>{slide.quality || "HD"}</span>
                        </div>
                        <div className="flex items-center">
                          <span>
                            {/* Assuming you have a way to get certification data */}
                            {slide.certification || "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="mb-4 w-[400px]">
                        {showFullDescription || !isLongDescription
                          ? slide.overview
                          : shortDescription}
                        {isLongDescription && (
                          <button
                            onClick={toggleDescription}
                            className="text-blue-400 mt-2"
                          >
                            {showFullDescription ? "Read less" : "Read more"}
                          </button>
                        )}
                      </div>
                      <a
                        href="#"
                        className="btn btn-hover text-lg bg-red-500 text-white py-2 px-4 rounded flex items-center"
                      >
                        <span>View now</span>
                      </a>
                    </div>
                  </div>
                </Slide>
              );
            })}
          </Slider>
          <ButtonBack className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center text-2xl">
            &lt;
          </ButtonBack>
          <ButtonNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-800 w-12 h-12 text-center rounded-full flex items-center justify-center text-2xl">
            &gt;
          </ButtonNext>
        </div>
      </CarouselProvider>
    </div>
  );
};

export default Hero;
