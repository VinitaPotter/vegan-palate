import { useState, useEffect } from "react";
import recipes from "../data/recipes.json";
import RecipeCard from "../components/recipeCard";
import type { Meal } from "../types/meal";

type MealCard = Pick<Meal, "id" | "title" | "image" | "readyInMinutes">;

export default function Favorites() {
  const [myRecipes, setMyRecipes] = useState<Meal[]>([]);

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
      setMyRecipes(data);
    }
    getdata();
  }, []);
  return (
    <div>
      <div className="flex  w-screen flex-wrap">
        {myRecipes.map((t, index) => (
          <RecipeCard key={index + 1} index={index} meal={t} />
        ))}
      </div>
    </div>
  );
}
