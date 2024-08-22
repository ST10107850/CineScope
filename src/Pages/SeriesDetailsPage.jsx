import { useLoaderData } from "react-router-dom";
import SeriesAndMovieHero from "../components/SeriesAndMovieHero";

const SeriesDetailsPage = () => {
  const series = useLoaderData();

  return (
    <div>
      <SeriesAndMovieHero title={series.name} />
      <div className="flex flex-col lg:flex-row justify-center items-center mt-10 p-6 text-white">
        <img
          src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
          alt="Series Poster"
          className="lg:w-[304px] lg:h-[408px] shadow-lg mb-6 lg:mb-0 sm:w-[200px] sm:h-[250px]"
        />
        <div className="p-6 lg:ml-10 w-full lg:w-auto sm:w-auto sm:ml-10">
          <h2 className="text-5xl font-bold mb-8">{series.name}</h2>
          <p className="mb-8 lg:w-[550px] text-base font-normal">
            {series.overview}
          </p>
          <p className="mb-2">
            <strong>Country:</strong>{" "}
            {series.production_countries.map((country) => country.name).join(", ")}
          </p>
          <p className="mb-2">
            <strong>Genre:</strong>{" "}
            {series.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="mb-2">
            <strong>Year:</strong> {new Date(series.first_air_date).getFullYear()}
          </p>
          <p className="mb-4">
            <strong>Type:</strong> {series.original_language}
          </p>
          <p className="mb-4">
            <strong>Time:</strong> {series.runtime} minutes
          </p>
          <p className="mb-4">
            <strong>Rating:</strong> {series.vote_average}
          </p>
        </div>
      </div>
    </div>
  );
};



export default SeriesDetailsPage;
