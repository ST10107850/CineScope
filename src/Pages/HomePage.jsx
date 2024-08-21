import Hero from "../components/Hero";
import LatestMovies from "../components/LatestMovies";
import LatestSeries from "../components/LatestSeries";
import NavBar from "../components/NavBar";
import TopSlider from "../components/TopSlider";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <TopSlider />
      <div className="mt-[55vh]">
        <LatestMovies />
      </div>
      <LatestSeries />
    </div>
  );
};

export default HomePage;
