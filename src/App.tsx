import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useRecipeStore } from "./store/recipesStore";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import RecipeDetails from "./pages/recipeDetails";
import Favorites from "./pages/favorites";
import SearchPage from "./pages/searchPage";
import Resources from "./pages/resources";
import Events from "./pages/events";
import Explore from "./pages/explore";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/recipe/:id", element: <RecipeDetails /> },
        { path: "favorites", element: <Favorites /> },
        { path: "search", element: <SearchPage /> },
        { path: "resources", element: <Resources /> },
        { path: "events", element: <Events /> },
        { path: "explore", element: <Explore /> },
      ],
    },
  ],
  {
    basename: "/vegan-palate",
  },
);

function App() {
  const initDb = useRecipeStore((state) => state.initDb);

  useEffect(() => {
    initDb();
  }, []); //
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
