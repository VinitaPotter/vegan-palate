import { useEffect, useState } from "react";
import Search from "../components/search";
import { useSearchParams } from "react-router";
import recipes from "../data/recipes.json";
import RecipeCard from "../components/recipeCard";

import type { Meal } from "../types/meal";
import Skeleton from "../components/skeleton";

type MealSearch = Pick<
  Meal,
  | "id"
  | "title"
  | "summary"
  | "image"
  | "glutenFree"
  | "dishTypes"
  | "instructions"
>[];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedRecipes, setSearchedRecipes] = useState<MealSearch>();
  const [loading, setLoading] = useState(false);
  const query = searchParams.get("q") || "";

  function handleQueryChange(q) {
    setSearchParams({ q: q });
    searchRecipes();
  }

  function searchRecipes() {
    setLoading(true);
    if (query) {
      const sr = recipes.filter((r) =>
        r.title.replace(/ /g, "").toLocaleLowerCase().includes(query),
      );
      setSearchedRecipes((prev) => {
        return [...sr];
      });
    } else {
      setSearchedRecipes((prev) => {
        return [];
      });
    }
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }
  useEffect(() => {
    searchRecipes();
  }, [query]);

  return (
    <div className="max-w-100vw overflow-hidden">
      <div className="text-center mt-10">
        <Search query={query} onSearch={handleQueryChange} />
      </div>
      {!query && !searchedRecipes?.length && !loading ? (
        <div>
          <div className="playful-font text-2xl text-center mt-20">
            What would you like to eat today, chef!?
          </div>
        </div>
      ) : loading ? (
        <div className="flex flex-wrap max-h-[75vh] mt-6 ">
          {Array.from(Array(8)).map((skeleton) => {
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
                key={index + 1}
                index={index}
                meal={recipe}
                rotate={false}
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
