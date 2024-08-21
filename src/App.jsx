import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MainLayout from "./Layout/MainLayout";
import MoviesPage from "./Pages/MoviesPage";
import SeriesPage from "./Pages/Seriespage";



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element ={<MainLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="/movies" element={<MoviesPage/>}/>
        <Route path="/series" element={<SeriesPage/>}/>
      </Route>
    )
  )
  return <RouterProvider router={router}/>;
}

export default App;
