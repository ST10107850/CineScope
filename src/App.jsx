import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import HomePage from "./Pages/HomePage";
import MainLayout from "./Layout/MainLayout";
import MoviesPage from "./Pages/MoviesPage";
import SeriesPage from "./Pages/SeriesPage";
import DetailPage from "./Pages/MoviesDetailPage";
import SeriesDetailsPage from "./Pages/SeriesDetailsPage";
import { seriesDetailLoader, detailLoader } from "./Loaders";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route
          path="/movies/:id"
          element={<DetailPage />}
          loader={detailLoader}
        />
        <Route
          path="/series/:id"
          element={<SeriesDetailsPage />}
          loader={seriesDetailLoader} // Use the loader here
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
