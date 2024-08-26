import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useMediaQuery } from 'react-responsive';

const LatestMovies = ({ className }) => {
  const [movieItems, setMovies] = useState([]);

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

      setMovies(filteredMovies.slice(0, 10));
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Media query hooks
  const isSm = useMediaQuery({ query: '(min-width: 640px)' });
  const isMd = useMediaQuery({ query: '(min-width: 768px)' });
  const isLg = useMediaQuery({query: '(min-width: 991px)'})

  // Determine visibleSlides based on screen size
  const visibleSlides = isLg ? 4 : (isMd ? 3 : (isSm ? 2 : 2));

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
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
        <div className="relative w-full h-full px-6 sm:px-20  sm:mt-28">
          <div className="relative w-full">
            <div className="border-t-2 border-blue-500"></div>
          </div>
          <h2 className="text-white uppercase text-2xl font-bold my-4">
            Latest Movies
          </h2>
          <div className="relative w-full">
            <div className="border-t-2 border-blue-500 mt-4"></div>
          </div>
          <Slider className="relative mt-14">
            {movieItems.map((movie, index) => (
              <Slide key={index} index={index}>
                <div className="flex justify-center items-center mx-2">
                  <Link to={`/movies/${movie.id}`}>
                    <div className="relative w-full h-[300px] transition-transform duration-300 hover:scale-105">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="object-cover w-full h-full transition-opacity duration-300 hover:opacity-70"
                      />
                      <div className="absolute inset-0 bg-black opacity-20 transition-opacity duration-300 hover:opacity-30"></div>
                      <div className="absolute inset-0 flex flex-col justify-end items-center text-white p-4">
                        <h3 className="text-xl font-bold">{movie.title}</h3>
                        <div className="flex flex-row items-center space-x-3">
                          <p className="flex flex-row items-center">
                            <AiFillStar className="text-blue-500" />
                            {movie.vote_average}
                          </p>
                          <p className="flex flex-row items-center">
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
          <div className="/md:block inset-y-1/2 flex justify-center items-center w-full px-6 sm:px-20 transform -translate-y-1/2 space-x-5">
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

export default LatestMovies;
