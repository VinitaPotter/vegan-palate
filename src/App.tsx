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
  <div className="min-h-screen">
    <div className="flex lg:hidden  h-screen w-full flex-col items-center justify-center p-10 text-center bg-linear-to-b from-accent to-white">
      <div className="text-6xl mb-6">🍽️ </div>
      <h1 className="heading-font text-4xl text-primary mb-4">
        Please wait to be served
      </h1>
      <p className="text-lg text-gray-600 ">
        We are currently perfecting our mise en place
      </p>
      <p className="mt-4 font-bold text-primary">
        Please visit us on a desktop or laptop!
      </p>
      <div className="mt-8 text-2xl animate-bounce">🌱</div>
    </div>

    <div className="hidden lg:block">
      <Navbar />
      <Outlet />
    </div>
  </div>
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
