import Hero from "./components/Hero";
import LatestMovies from "./components/LatestMovies";
import LatestSeries from "./components/LatestSeries";
import NavBar from "./components/NavBar";
import TopSlider from "./components/TopSlider";

function App() {
  return (
    <div className="bg-dark-custom">
      <NavBar />
      <Hero/>
      <TopSlider />
      <div className="mt-[55vh]"> {/* Add margin or padding here for spacing */}
        <LatestMovies />
      </div>
      <LatestSeries/>
    </div>
  );
}

export default App;
