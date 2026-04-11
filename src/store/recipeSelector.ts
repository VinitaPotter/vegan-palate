import { useRecipeStore } from "./recipesStore";
import ALL_RECIPES from "../data/recipes.json";
import type { Meal } from "../types/meal";

type MealCard = Pick<
  Meal,
  "id" | "title" | "image" | "readyInMinutes" | "aggregateLikes"
>;

const trendingData: MealCard[] = [...ALL_RECIPES]
  .sort((a, b) => b.aggregateLikes - a.aggregateLikes)
  .slice(0, 4) as MealCard[];
function useTrendingRecipes() {
  return useRecipeStore(() => trendingData);
}

export default useTrendingRecipes;
