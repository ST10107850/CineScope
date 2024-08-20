import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import john from "../assets/Images/series/wanda.png";
import TopSlider from "./TopSlider";

const slides = [
  {
    image: john,
    title: "Black Panther",
    rating: "9.5",
    duration: "120 mins",
    quality: "HD",
    age: "16+",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, possimus eius. Deserunt non odit, cum vero reprehenderit laudantium odio vitae autem quam, incidunt molestias ratione mollitia accusantium, facere ab suscipit.",
  },
  {
    image:
      "https://assets.gadgets360cdn.com/pricee/assets/product/202209/black_adam_poster_1662703466.jpeg",
    title: "Black Panther",
    rating: "9.5",
    duration: "120 mins",
    quality: "HD",
    age: "16+",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, possimus eius. Deserunt non odit, cum vero reprehenderit laudantium odio vitae autem quam, incidunt molestias ratione mollitia accusantium, facere ab suscipit.",
  },
  {
    image:
      "https://wp.scoopwhoop.com/wp-content/uploads/2024/04/03170645/image-1.png",
    title: "Black Panther",
    rating: "9.5",
    duration: "120 mins",
    quality: "HD",
    age: "16+",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, possimus eius. Deserunt non odit, cum vero reprehenderit laudantium odio vitae autem quam, incidunt molestias ratione mollitia accusantium, facere ab suscipit.",
  },
  {
    image:
      "https://i.ytimg.com/vi/hcXXZq25FX0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBnx-AIYblrgoPrbydWV7fxGXgZDg",
    title: "Black Panther",
    rating: "9.5",
    duration: "120 mins",
    quality: "HD",
    age: "16+",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, possimus eius. Deserunt non odit, cum vero reprehenderit laudantium odio vitae autem quam, incidunt molestias ratione mollitia accusantium, facere ab suscipit.",
  },
  // Add more slides as needed
];

const Hero = () => {
  return (
    <div className="relative bg-dark-custom overflow-hidden">
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={slides.length}
        isPlaying={false}
        interval={3000}
      >
        <div className="relative w-full h-[70vh]">
          <Slider>
            {slides.map((slide, index) => (
              <Slide key={index}>
                <div
                  className="relative w-full h-[90vh] bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                  <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-8 ml-12">
                    <div className="text-3xl font-bold mb-4">{slide.title}</div>
                    <div className="flex space-x-4 mb-4">
                      <div className="flex items-center">
                        <i className="bx bxs-star text-yellow-400"></i>
                        <span className="ml-2">{slide.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="bx bxs-time text-white"></i>
                        <span className="ml-2">{slide.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <span>{slide.quality}</span>
                      </div>
                      <div className="flex items-center">
                        <span>{slide.age}</span>
                      </div>
                    </div>
                    <div className="mb-4 w-[400px]">{slide.description}</div>
                    <a
                      href="#"
                      className="btn btn-hover text-lg bg-red-500 text-white py-2 px-4 rounded flex items-center"
                    >
                      <i className="bx bxs-right-arrow mr-2"></i>
                      <span>Watch now</span>
                    </a>
                  </div>
                </div>
              </Slide>
            ))}
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
