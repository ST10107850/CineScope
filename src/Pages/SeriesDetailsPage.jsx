import { useLoaderData } from "react-router-dom";
import SeriesAndMovieHero from "../components/SeriesAndMovieHero";

const SeriesDetailsPage = () => {
  const series = useLoaderData();

  if (!series) {
    return <div>No series data found.</div>;
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <SeriesAndMovieHero title={series.name} />
      
      <div className="p-6 lg:p-12 max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-center">
          {series.name}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
            alt="Series Poster"
            className="w-full max-w-xs md:w-[250px] rounded-lg shadow-lg"
          />
          <div className="flex flex-col gap-4 max-w-lg">
            <p className="text-sm lg:text-base mb-4">
              {series.overview}
            </p>
            <div className="space-y-2 text-sm lg:text-base">
              <p>
                <strong>Country:</strong>{" "}
                {series.production_countries.map((country) => country.name).join(", ")}
              </p>
              <p>
                <strong>Genre:</strong>{" "}
                {series.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p>
                <strong>Year:</strong> {new Date(series.first_air_date).getFullYear()}
              </p>
              <p>
                <strong>Type:</strong> {series.original_language}
              </p>
              <p>
                <strong>Time:</strong> {series.runtime} minutes
              </p>
              <p>
                <strong>Rating:</strong> {series.vote_average}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsPage;
