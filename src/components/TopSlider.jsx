import { AiFillStar } from "react-icons/ai";
import { IoTime } from "react-icons/io5";
import { useEffect, useState } from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
// import supergirl from "../assets/Images/series/supergirl.jpg";
// import captainMarvel from "../assets/Images/movies/captain-marvel.png";
// import demonSlayer from "../assets/Images/cartoons/demon-slayer.jpg";
// import bloodshot from "../assets/Images/movies/blood-shot.jpg";
// import wandaVision from "../assets/Images/series/wanda.png";
// import batMan from "../assets/Images/movies/bat-man.jpg";

// const movieItems = [
//   { image: supergirl, title: "Supergirl", rating: "9.5", time: "120", age: "16+" },
//   { image: captainMarvel, title: "Captain Marvel", rating: "9.5", time: "120",age: "16+" },
//   { image: demonSlayer, title: "Infinity Train", rating: "9.5", time: "120",age: "16+" },
//   { image: bloodshot, title: "Bloodshot", rating: "9.5", time: "120",age: "16+" },
//   { image: wandaVision, title: "Wanda Vision", rating: "9.5", time: "120",age: "16+" },
//   { image: batMan, title: "The Dark Knight", rating: "9.5", time: "120",age: "16+" },
// ];

const TopSlider = ({ className }) => {

  const [movieItems, setSeries] = useState([]);

  const fetchSeries = async () => {
    const apiKey = "b3c8574ec4e0950c0501b1bf409be1e0";
    const apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;

    // https://api.themoviedb.org/3/tv/popular?api_key=b3c8574ec4e0950c0501b1bf409be1e0

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

      setSeries(filteredSeries.slice(0, 8) );
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  return (
    <div className={`relative h-full ${className}`}>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={movieItems.length}
        visibleSlides={5}
        isPlaying={true}
        interval={3000}
        infinite={true}
        touchEnabled={true}
        dragEnabled={true}
      >
        <div className="absolute bg-dark-custom top-0 left-0 w-full h-full">
          <Slider className="relative">
            {movieItems.map((slide, slideIndex) => (
              <Slide key={slideIndex} index={slideIndex}>
                <div className="flex w-full h-[350px] ">
                  <div className="relative w-full h-full transition-transform duration-300 hover:scale-105">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${slide.poster_path}`}
                      alt={slide.original_name}
                      className="object-cover w-full h-full transition-opacity duration-300 hover:opacity-70"
                    />
                    <div className="absolute inset-0  bg-black opacity-20 transition-opacity duration-300 hover:opacity-30"></div>
                    <div className="absolute inset-0 flex flex-col justify-end items-center text-white p-4">
                      <h3 className="text-md font-bold mb-4">{slide.original_name}</h3>
                      <div className="flex flex-row items-center space-x-3 mb-9">
                        <p className="flex flex-row items-center ">
                          <AiFillStar className="text-blue-500" />
                          {slide.vote_average}
                        </p>
                        <p className="flex flex-row items-center">
                        <span>{slide.quality || "HD"}</span>
                        </p>
                      </div>
                    </div>
                  </div>
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
