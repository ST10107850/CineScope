import  { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { AiFillStar } from "react-icons/ai";
import { IoTime } from "react-icons/io5";
import { Link } from "react-router-dom";

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

      const filteredMovies = data.results.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );

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

  const items = slides.map((slide, index) => {
    const isLongDescription = slide.overview.length > descriptionLimit;
    const shortDescription =
      slide.overview.substring(0, descriptionLimit) + "...";

    const posterUrl = `https://image.tmdb.org/t/p/w1280${slide.poster_path}`;

    return (
      <div
        key={index}
        className="relative w-full h-full"
        style={{
          backgroundImage: `url(${posterUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "60vh", // Ensure the height is set
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-12 ml-10 ">
          <div className="text-base sm:text-xl md:text-3xl font-bold mb-4">
            {slide.original_title}
          </div>
          <div className="flex space-x-4 mb-4 text-xs sm:text-sm md:text-base">
            <div className="flex items-center">
              <AiFillStar className="text-yellow-400" />
              <span className="ml-2">{slide.vote_average}</span>
            </div>
            <div className="flex items-center">
              <IoTime className="text-white" />
              <span className="ml-2">
                {slide.runtime ? `${slide.runtime} minutes` : "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <span>{slide.quality || "HD"}</span>
            </div>
            <div className="flex items-center">
              <span>{slide.certification || "N/A"}</span>
            </div>
          </div>
          <div className="mb-4 text-xs sm:text-sm md:text-base md:max-w-lg">
            <p>
              {showFullDescription || !isLongDescription
                ? slide.overview
                : shortDescription}
            </p>
            {isLongDescription && (
              <button
                onClick={toggleDescription}
                className="text-blue-400 mt-2"
              >
                {showFullDescription ? "Read less" : "Read more"}
              </button>
            )}
          </div>
          <Link
            to={`/movies/${slide.id}`}
            className="bg-red-500 text-white px-1 md:py-2 md:px-4 rounded md:flex items-center mb-5"
          >
            <span>View now</span>
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="relative bg-dark-custom overflow-hidden">
      <AliceCarousel
        autoPlay
        autoPlayInterval={9000}
        infinite
        disableButtonsControls
        items={items}
        renderPrevButton={() => (
          <div className="absolute left-0 z-10">Prev</div>
        )}
        renderNextButton={() => (
          <div className="absolute right-0 z-10">Next</div>
        )}
      />
    </div>
  );
};

export default Hero;
