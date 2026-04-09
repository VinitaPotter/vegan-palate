import "./App.css";
import Navbar from "./components/navbar";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./pages/home";
import RecipeDetails from "./pages/recipeDetails";

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
