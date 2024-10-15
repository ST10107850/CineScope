import Hero from "../components/Hero";
import TopMovies from "../components/TopMovies";
import TopShows from "../components/TopShows";
import TopSlider from "../components/TopSlider";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <TopSlider />
      <TopMovies/>
      <TopShows/>
    </div>
  );
};

export default HomePage;
