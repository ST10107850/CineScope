import { useEffect, useState } from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const SeriesAndMovieHero = ({ title }) => {
  const [slides, setSlides] = useState([]);

  const fetchMovies = async () => {
    const apiKey = "b3c8574ec4e0950c0501b1bf409be1e0";
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log("Fetched data: ", data);

      const filteredMovies = data.results
        .filter((movie) => movie.release_date && movie.release_date.startsWith("2024"))
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

      setSlides(filteredMovies.slice(0, 8));
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="relative bg-dark-custom overflow-hidden">
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={56.25} // Adjust height to maintain aspect ratio
        totalSlides={slides.length}
        isPlaying={true}
        interval={3000}
      >
        <div className="relative w-full h-[80vh]">
          <Slider>
            {slides.map((slide, index) => (
              <Slide key={index}>
                <div
                  className="relative w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${`https://image.tmdb.org/t/p/w780${slide.poster_path}`})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%', 
                    opacity: 0.9,
                  }}
                >
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 mb-28">
                    <h1 className="text-white font-bold uppercase text-3xl text-center mt-20">{slide.title}</h1>
                    <p className="w-[80%] md:w-[50%] lg:w-[30%] text-white text-center mt-5">{slide.overview}</p>
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

export default SeriesAndMovieHero;
