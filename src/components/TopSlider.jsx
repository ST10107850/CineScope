import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IoTime } from "react-icons/io5";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TopSlider = ({ className }) => {
  const [movieItems, setSeries] = useState([]);

  const fetchSeries = async () => {
    const apiKey = "b3c8574ec4e0950c0501b1bf409be1e0";
    const apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log("Fetched data: ", data);

      const filteredSeries = data.results
        // .filter(
        //   (show) =>
        //     show.first_air_date && show.first_air_date.startsWith("2024")
        // )
        .sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date));

      setSeries(filteredSeries.slice(0, 8));
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className={`relative h-[40vh] ${className} overflow-hidden`}>
      <div className="absolute bg-dark-custom top-0 left-0 w-full">
        <Slider {...settings} className="relative">
          {movieItems.map((slide, slideIndex) => (
            <div key={slideIndex} className="flex w-full h-[40vh] px-2">
              <Link to={`/series/${slide.id}`}>
                <div className="relative w-full h-full transition-transform duration-300 hover:scale-105">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${slide.poster_path}`}
                    alt={slide.original_name}
                    className="object-cover w-full h-full transition-opacity duration-300 hover:opacity-70"
                  />
                  <div className="absolute inset-0 bg-black opacity-20 transition-opacity duration-300 hover:opacity-30"></div>
                  <div className="absolute inset-0 flex flex-col justify-end items-center text-white p-4">
                    <h3 className="text-md font-bold mb-4">
                      {slide.original_name}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopSlider;
