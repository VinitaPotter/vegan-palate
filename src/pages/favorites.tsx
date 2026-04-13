import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFavoriteRecipes } from "../store/recipeSelector";
import type { Meal } from "../types/meal";

import RecipeCard from "../components/recipeCard";
import Search from "../components/search";
import Skeleton from "../components/skeleton";

export default function Favorites() {
  const myFavRecipes = useFavoriteRecipes();

  const [activeFilter, setActiveFilter] = useState<{
    name: string;
    index: number;
  }>({
    name: "all",
    index: 0,
  });
  const myFilteredRecipes =
    activeFilter.name === "all"
      ? myFavRecipes
      : myFavRecipes.filter((r) => r.dishTypes?.includes(activeFilter.name));
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  function handleFilterClick(name: string, index: number) {
    if (name === activeFilter.name) return;
    setLoading(true);
    setTimeout(() => {
      setActiveFilter({ name, index });
      setLoading(false);
    }, 500);
  }
  function handleOnSearch(query: string): void {
    console.log("handling search");
    navigate(`/search/?q=${query || activeFilter.name}`);
  }

  return (
    <div className="flex  gap-4">
      <div className="min-w-[1/3] pl-10 py-10 border-r border-gray-200 bg-accent relative z-0">
        <p className="text-6xl playful-font mb-20 -rotate-2">
          Make <span className="text-primary">'em</span> again!
        </p>
        <div
          className="indicator bg-white h-15 w-[90%] absolute z-10 -right-px rounded-l-xl transition-transform duration-500 ease-out top-60"
          style={{
            transform: `translateY(${activeFilter.index * 80}px)`,
          }}
        ></div>
        {[
          "all",
          "breakfast",
          "appetizer",
          "main course",
          "snack",
          "dessert",
        ].map((item, index) => {
          return (
            <div
              key={index}
              className="pl-4 -ml-4 my-5 min-h-15  hover:text-primary rounded-l-2xl  cursor-pointer  capitalize z-20 relative flex items-center w-[stretch]"
              onClick={() => handleFilterClick(item, index)}
            >
              {item}
            </div>
          );
        })}
      </div>
      {/* recipes */}
      <div className="flex flex-wrap w-full max-h-[95vh] overflow-scroll">
        {!loading && myFilteredRecipes && myFilteredRecipes.length ? (
          myFilteredRecipes.map((t, index) => (
            <RecipeCard
              key={index + 1}
              index={index}
              meal={t}
              page="favorites"
            />
          ))
        ) : !loading && !myFilteredRecipes.length ? (
          <div className="w-full mt-40">
            <div className="text-center">
              <p className="playful-font text-8xl mb-10 text-primary">
                Uh no!!{" "}
              </p>
              <p>
                You don't have any{" "}
                {activeFilter.name === "all" ? "" : activeFilter.name} recipes
                saved
              </p>
              <p className="mb-10">
                Don't be hangry! Find something you'll like now!
              </p>
              <Search
                query={activeFilter.name === "all" ? "" : activeFilter.name}
                onSearch={handleOnSearch}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap">
            {Array.from(Array(8)).map(() => {
              return (
                <div className=" bg-white m-6 border px-4 py-2 border-gray-200 w-78 rounded-2xl h-96">
                  <Skeleton />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
