import { useEffect, useState } from "react";
import Search from "../components/search";
import { useSearchParams } from "react-router";
import recipes from "../data/recipes.json";
import RecipeCard from "../components/recipeCard";

import type { Meal } from "../types/meal";

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
        return [...recipes];
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
    <div>
      <div>
        <div className="text-center mt-10">
          <Search query={query} onSearch={handleQueryChange} />
        </div>
        {loading ? (
          <div className="flex flex-wrap">
            {Array.from(Array(8)).map((skeleton) => {
              return (
                <div className="w-78 rounded-xl border border-gray-200 h-90 bg-tertiary/20 animate-pulse m-6"></div>
              );
            })}
          </div>
        ) : !loading && searchedRecipes && searchedRecipes?.length ? (
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
    </div>
  );
}
