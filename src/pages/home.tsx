import { useState, useEffect } from "react";
import recipes from "../data/recipes.json";
import RecipeCard from "../components/recipeCard";
import type { Meal } from "../types/meal";
import { Link } from "react-router-dom";

type MealCard = Pick<Meal, "id" | "title" | "image" | "readyInMinutes">;
type TrendingMeal = [Meal, Meal, Meal, Meal];
export default function Home() {
  const [trending, setTrending] = useState<TrendingMeal[]>([]);

  function getRecipes(): Promise<MealCard[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(recipes as Meal[]);
      }, 500);
    });
  }

  useEffect(() => {
    async function getdata() {
      const data = await getRecipes();
      const ned = data.slice(1, 5);
      setTrending(ned);
    }
    getdata();
  }, []);

  return (
    <div>
      <div className="px-10 my-16 flex justify-between">
        <h1 className="text-5xl text-secondary heading-font font-bold">
          Best trending now..
        </h1>
        <Link to={"search"}>
          <div className="cursor-pointer relative">
            <p className="highlight-container  "></p>
            <p className="text-2xl relative z-20 mb-5 animate-bounce">
              Or let's find something you'll love! →
            </p>
          </div>
        </Link>
      </div>
      <div className="bg-accent">
        <div className="flex justify-around h-[70vh] ">
          {(trending && trending.length ? trending : Array.from(Array(4))).map(
            (t, index) => (
              <RecipeCard
                key={index + 1}
                index={index}
                meal={t}
                rotate={true}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
