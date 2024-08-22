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
    <div className="text-white min-h-screen">
      <SeriesAndMovieHero title={movie.original_title} />

      <div className="p-6 lg:p-12 max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-center">
          {movie.title}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="Movie Poster"
            className="w-full max-w-xs md:w-[250px]  rounded-lg shadow-lg"
          />
          <div className="flex flex-col gap-4 max-w-lg">
            <p className="text-sm lg:text-base mb-4">
              {movie.overview}
            </p>
            <div className="space-y-2 text-sm lg:text-base">
              <p>
                <strong>Country:</strong>{" "}
                {productionCountries.map((country) => country.name).join(", ")}
              </p>
              <p>
                <strong>Genre:</strong>{" "}
                {genres.map((genre) => genre.name).join(", ")}
              </p>
              <p>
                <strong>Year:</strong> {new Date(movie.release_date).getFullYear()}
              </p>
              <p>
                <strong>Type:</strong> {movie.original_language}
              </p>
              <p>
                <strong>Time:</strong> {movie.runtime} minutes
              </p>
              <p>
                <strong>Rating:</strong> {movie.vote_average}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
