import { useState, useEffect } from "react";
import recipes from "../data/recipes.json";
import RecipeCard from "../components/recipeCard";
import type { Meal } from "../types/meal";

type MealCard = Pick<Meal, "id" | "title" | "image" | "readyInMinutes">;

export default function Home() {
  const [trending, setTrending] = useState<Meal[]>([]);

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
      console.log({ data });
      setTrending(data);
    }
    getdata();
  }, []);

  return (
    <div>
      <div>
        <div className="px-10 my-16 ">
          <h1 className="text-5xl text-secondary heading-font font-bold">
            Best trending now..
          </h1>
        </div>
        <div className="bg-accent">
          <div className="flex justify-around h-[70vh] ">
            {trending.map((t, id) =>
              id < 4 ? <RecipeCard key={t.id} index={id} meal={t} /> : <></>,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
