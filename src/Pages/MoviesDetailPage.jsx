import { useLoaderData } from "react-router-dom";
import SeriesAndMovieHero from "../components/SeriesAndMovieHero";

const DetailPage = () => {
  const movie = useLoaderData(); 

  // Find the certification for the US if available  
  const certification = movie.release_dates.results.find(
    (result) => result.iso_3166_1 === "US"
  );

  return (
    <div>
      <SeriesAndMovieHero title={movie.original_title} />
      <div className="flex flex-col lg:flex-row justify-center items-center mt-10 p-6 text-white">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="Movie Poster"
          className="md:w-[304px] md:h-[408px] shadow-lg mb-6 lg:mb-0 sm:w-[200px] sm:h-[250px]"
        />
        <div className="p-6 lg:ml-10 w-full lg:w-auto sm:w-auto sm:ml-10">
          <h2 className="text-5xl font-bold mb-8">{movie.original_title}</h2>
          <p className="mb-8 lg:w-[550px] text-base font-normal">
            {movie.overview}
          </p>
          <p className="mb-2">
            <strong>Country:</strong>{" "}
            {movie.production_countries
              .map((country) => country.name)
              .join(", ")}
          </p>
          <p className="mb-2">
            <strong>Genre:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
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
            <strong>Rating:</strong> { movie.vote_average}
          </p>
        </div>
      </div>
    </div>
  );
};

const detailLoader = async ({ params }) => {
  const apiKey = "b3c8574ec4e0950c0501b1bf409be1e0";
  const movieId = params.id;
  
  // Fetch the movie details
  const movieRes = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
  );
  const movieData = await movieRes.json();

  // Fetch release dates to get certification information
  const releaseDatesRes = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${apiKey}`
  );
  const releaseDatesData = await releaseDatesRes.json();

  // Add release dates information to movie data
  movieData.release_dates = releaseDatesData;

  return movieData;
};

export { DetailPage as default, detailLoader };
