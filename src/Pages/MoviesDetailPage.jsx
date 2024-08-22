import { useLoaderData } from "react-router-dom";
import SeriesAndMovieHero from "../components/SeriesAndMovieHero";

const DetailPage = () => {
  const movie = useLoaderData();

  if (!movie) {
    return <div>No movie data found.</div>;
  }

  const productionCountries = movie.production_countries || [];
  const genres = movie.genres || [];

  return (
    <div>
      <SeriesAndMovieHero title={movie.original_title} />
      <div className="flex flex-col lg:flex-row justify-center items-center mt-10 p-6 text-white">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="Movie Poster"
          className="md:w-[304px] md:h-[408px] shadow-lg mb-6 lg:mb-0 sm:w-[200px] sm:h-[250px]"
        />
        <div className="p-6 lg:ml-10 w-auto lg:w-auto sm:w-auto sm:ml-10">
          <h2 className="text-5xl font-bold mb-8 ">{movie.title}</h2>
          <p className="mb-8 lg:w-[550px] text-base font-normal">
            {movie.overview}
          </p>
          <p className="mb-2">
            <strong>Country:</strong>{" "}
            {productionCountries.map((country) => country.name).join(", ")}
          </p>
          <p className="mb-2">
            <strong>Genre:</strong>{" "}
            {genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="mb-2">
            <strong>Year:</strong> {new Date(movie.release_date).getFullYear()}
          </p>
          <p className="mb-4">
            <strong>Type:</strong> {movie.original_language}
          </p>
          <p className="mb-4">
            <strong>Time:</strong> {movie.runtime} minutes
          </p>
          <p className="mb-4">
            <strong>Rating:</strong> {movie.vote_average}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
