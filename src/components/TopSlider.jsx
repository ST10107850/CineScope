import React from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import supergirl from "../assets/Images/series/supergirl.jpg";
import captainMarvel from "../assets/Images/movies/captain-marvel.png";
import demonSlayer from "../assets/Images/cartoons/demon-slayer.jpg";
import bloodshot from "../assets/Images/movies/blood-shot.jpg";
import wandaVision from "../assets/Images/series/wanda.png";
import batMan from "../assets/Images/movies/bat-man.jpg";

const movieItems = [
  { image: supergirl, title: "Supergirl" },
  { image: captainMarvel, title: "Captain Marvel" },
  { image: demonSlayer, title: "Infinity Train" },
  { image: bloodshot, title: "Bloodshot" },
  { image: wandaVision, title: "Wanda Vision" },
  { image: batMan, title: "The Dark Knight" },
];

const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const slides = chunkArray(movieItems, 4);

const TopSlider = ({ className }) => {
  return (
    <div className={`relative h-full ${className}`}>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={50}
        totalSlides={slides.length}
        isPlaying={true}
        interval={3000}
        infinite={true}
        touchEnabled={true}
        dragEnabled={true}
      >
        <div className="absolute bg-dark-custom top-0 left-0 w-full h-full">
          <Slider className="relative">
            {slides.map((slide, slideIndex) => (
              <Slide key={slideIndex} index={slideIndex}>
                <div className="flex w-full h-[350px] "> {/* Add gap here */}
                  {slide.map((movie, movieIndex) => (
                    <div
                      key={movieIndex}
                      className="relative w-1/4 h-full transition-transform duration-300 hover:scale-105"
                    >
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="object-cover w-full h-full transition-opacity duration-300 hover:opacity-70"
                      />
                      <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 hover:opacity-30"></div>
                      <div className="absolute inset-0 flex flex-col justify-end items-center text-white p-4">
                        <h3 className="text-xl font-bold mb-2">
                          {movie.title}
                        </h3>
                      </div>
                    </div>
                  ))}
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
