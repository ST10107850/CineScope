import React from 'react';
import supergirl from "../assets/Images/series/supergirl.jpg";
import captainMarvel from "../assets/Images/movies/captain-marvel.png";
import demonSlayer from "../assets/Images/cartoons/demon-slayer.jpg";
import bloodshot from "../assets/Images/movies/blood-shot.jpg";
import wandaVision from "../assets/Images/series/wanda.png";
import batMan from "../assets/Images/movies/bat-man.jpg";

const moviesData = [
  {
    image: supergirl,
    title: "Supergirl",
    rating: "9.5",
    time: "120 min",
    age: "16+",
  },
  {
    image: captainMarvel,
    title: "Captain Marvel",
    rating: "9.5",
    time: "120 min",
    age: "16+",
  },
  {
    image: demonSlayer,
    title: "Infinity Train",
    rating: "9.5",
    time: "120 min",
    age: "16+",
  },
  {
    image: bloodshot,
    title: "Bloodshot",
    rating: "9.5",
    time: "120 min",
    age: "16+",
  },
  {
    image: wandaVision,
    title: "Wanda Vision",
    rating: "9.5",
    time: "120 min",
    age: "16+",
  },
  {
    image: batMan,
    title: "The Dark Knight",
    rating: "9.5",
    time: "120 min",
    age: "16+",
  },
  {
    image: batMan,
    title: "The Dark Knight",
    rating: "9.5",
    time: "120 min",
    age: "16+",
  },
  {
    image: batMan,
    title: "The Dark Knight",
    rating: "9.5",
    time: "120 min",
    age: "16+",
  },
  {
    image: batMan,
    title: "The Dark Knight",
    rating: "9.5",
    time: "120 min",
    age: "16+",
  },
];

const Movies = () => {
  return (
    <div className="p-11">
      {/* Title Section */}
      <h2 className="text-3xl font-bold mb-8 text-center uppercase text-white">Featured Movies</h2>

      <div className="flex flex-col md:flex-row">

        <div className="md:w-1/4 mb-8 md:mb-0 md:mr-6 bg-slate-700 p-5 rounded-md h-[60vh]">
          <div className="space-y-4">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 font-semibold">
              All
            </button>

            <div className="bg-white shadow-md rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2">Genres</h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Action</button>
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Drama</button>
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Comedy</button>
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Horror</button>
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Thriller</button>
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Romance</button>
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Crime</button>
                <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Science Fiction</button>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Grid with Vertical Scroll */}
        <div className="md:w-3/4 overflow-y-auto h-[60vh] md:h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {moviesData.map((movie, index) => (
              <div key={index} className="relative shadow-lg rounded-lg overflow-hidden group">
                <img src={movie.image} alt={movie.title} className="w-full h-72 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300" />
              
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movies;
