import { AiFillStar } from "react-icons/ai";
import { IoTime } from "react-icons/io5";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import supergirl from "../assets/Images/series/supergirl.jpg";
import captainMarvel from "../assets/Images/movies/captain-marvel.png";
import demonSlayer from "../assets/Images/cartoons/demon-slayer.jpg";
import bloodshot from "../assets/Images/movies/blood-shot.jpg";
import wandaVision from "../assets/Images/series/wanda.png";
import batMan from "../assets/Images/movies/bat-man.jpg";

const movieItems = [
  { image: supergirl, title: "Supergirl", rating: "9.5", time: "120", age: "16+" },
  { image: captainMarvel, title: "Captain Marvel", rating: "9.5", time: "120",age: "16+" },
  { image: demonSlayer, title: "Infinity Train", rating: "9.5", time: "120",age: "16+" },
  { image: bloodshot, title: "Bloodshot", rating: "9.5", time: "120",age: "16+" },
  { image: wandaVision, title: "Wanda Vision", rating: "9.5", time: "120",age: "16+" },
  { image: batMan, title: "The Dark Knight", rating: "9.5", time: "120",age: "16+" },
];

const TopSlider = ({ className }) => {
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
                      src={slide.image}
                      alt={slide.title}
                      className="object-cover w-full h-full transition-opacity duration-300 hover:opacity-70"
                    />
                    <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 hover:opacity-30"></div>
                    <div className="absolute inset-0 flex flex-col justify-end items-start text-white p-4">
                      <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
                      <div className="flex flex-row items-center space-x-3">
                        <p className="flex flex-row items-center ">
                          <AiFillStar className="text-blue-500" />
                          {slide.rating}
                        </p>
                        <p className="flex flex-row items-center">
                          <IoTime className="text-blue-500" />
                          {slide.time} mins
                        </p>
                        <p className="flex flex-row items-center">
                          HD
                        </p>
                        <p className="flex flex-row items-center">
                          {slide.age}
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
