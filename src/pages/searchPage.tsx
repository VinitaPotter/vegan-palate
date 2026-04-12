import { useEffect, useState } from "react";
import Search from "../components/search";
import { useSearchParams } from "react-router-dom";
import ALL_RECIPES from "../data/recipes.json";
import RecipeCard from "../components/recipeCard";

import Skeleton from "../components/skeleton";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const query = searchParams.get("q") || "";

  function handleQueryChange(q: string) {
    setLoading(true);
    setSearchParams({ q: q.trim() }, { replace: true });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  const searchedRecipes = query
    ? [...ALL_RECIPES].filter((r) =>
        (r.title.trim() + r.dishTypes.toString())
          .toLocaleLowerCase()
          .includes(query.trim().toLocaleLowerCase()),
      )
    : [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="max-w-100vw">
      <div className="text-center mt-10">
        <Search query={query} onSearch={handleQueryChange} />
      </div>
      {!query && !searchedRecipes?.length ? (
        <div>
          <div className="playful-font text-2xl text-center mt-20">
            What would you like to eat today, chef!?
          </div>
        </div>
      ) : loading && query ? (
        <div className="flex flex-wrap max-h-[75vh] mt-6 ">
          {Array.from(Array(8)).map(() => {
            return (
              <div className="mx-6 p-6 bg-white border px-4 py-2 border-gray-200 w-78 rounded-2xl h-96">
                <Skeleton />
              </div>
            );
          })}
        </div>
      ) : !loading && searchedRecipes?.length ? (
        <div className="flex flex-wrap">
          {searchedRecipes.map((recipe, index) => {
            return (
              <RecipeCard
                key={recipe.id}
                index={index}
                meal={recipe}
                page="search"
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-40">
          <p className="text-5xl playful-font"> Argggggggggggg!!</p>
          <p className="text-lg mt-10">
            Let's find you something different!{" "}
            <span className="text-2xl">🫠</span>
          </p>
        </div>
      )}
    </div>
  );
}
