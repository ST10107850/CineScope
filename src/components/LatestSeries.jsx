import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
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

const LatestSeries = ({ className }) => {
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
          <h2 className="text-white text-2xl font-bold my-4">Latest Series</h2>
          <div className="relative w-full">
            <div className="border-t-2 border-blue-500 mt-4"></div>
          </div>
          <Slider className="relative mt-14">
            {movieItems.map((movie, index) => (
              <Slide key={index} index={index}>
                <div className="flex justify-center items-center h-[400px]">
                  <div className="relative h-full transition-transform duration-300 hover:scale-105">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="object-cover w-full h-full transition-opacity duration-300 hover:opacity-70"
                    />
                    <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 hover:opacity-30"></div>
                    <div className="absolute inset-0 flex flex-col justify-end items-center text-white p-4">
                      <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                    </div>
                  </div>
                </div>
              </Slide>
            ))}
          </Slider>
          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center mb-4 px-24">
            <div className="flex-1 flex justify-start">
              <ButtonBack className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 transform transition-transform duration-300">
                &larr;
              </ButtonBack>
            </div>
            <div className="flex-1 flex justify-end">
              <ButtonNext className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 transform transition-transform duration-300">
                &rarr;
              </ButtonNext>
            </div>
          </div>
        </div>
      </CarouselProvider>

      {/* Horizontal Line Below */}
      <div className="relative w-full mt-8">
        <div className="border-t-2 border-blue-500"></div>
      </div>
    </div>
  );
};

export default LatestSeries;
