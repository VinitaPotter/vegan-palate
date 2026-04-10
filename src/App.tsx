import "./App.css";
import Navbar from "./components/navbar";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./pages/home";
import RecipeDetails from "./pages/recipeDetails";
import Favorites from "./pages/favorites";
import SearchPage from "./pages/searchPage";
import Resources from "./pages/resources";
import Events from "./pages/events";
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/recipe/:id", element: <RecipeDetails /> },
      { path: "favorites", element: <Favorites /> },
      { path: "search", element: <SearchPage /> },
      { path: "resources", element: <Resources /> },
      { path: "events", element: <Events /> },
    ],
  },
]);

function App() {
  return (
    <div className="max-h-[100vh] overflow-hidden">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
