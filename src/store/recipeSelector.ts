import { useShallow } from "zustand/react/shallow";
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

function useFavoriteRecipes() {
  return useRecipeStore(
    useShallow((state) => {
      const ids = state.favoriteIds;
      return ids
        .map((id) => {
          return ALL_RECIPES.find((a) => a.id === id);
        })
        .filter(Boolean);
    }),
  );
}

export { useTrendingRecipes, useFavoriteRecipes };
