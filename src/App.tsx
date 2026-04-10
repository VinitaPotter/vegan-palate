import "./App.css";
import Navbar from "./components/navbar";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./pages/home";
import RecipeDetails from "./pages/recipeDetails";
import Favorites from "./pages/favorites";

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
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
