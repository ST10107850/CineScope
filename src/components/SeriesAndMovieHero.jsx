import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import john from "../assets/Images/series/wanda.png";

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

const SeriesAndMovieHero = ({title}) => {
  return (
    <div className="relative bg-dark-custom overflow-hidden">
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={slides.length}
        isPlaying={true}  
        interval={3000}  
      >
        <div className="relative w-full h-[50vh]">
          <Slider>
            {slides.map((slide, index) => (
              <Slide key={index}>
                <div
                  className="relative w-full h-[90vh] bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="inset-0 opacity-50 flex justify-center items-center "></div>
                 <h1 className="text-white font-bold uppercase text-3xl text-center mt-20"> {title}</h1>
                </div>
              </Slide>
            ))}
          </Slider>
        </div>
      </CarouselProvider>
    </div>
  );
};

export default SeriesAndMovieHero;
