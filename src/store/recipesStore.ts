import { create } from "zustand";
interface RecipesState {
  favoriteIds: number[];
}

export const useRecipeStore = create<RecipesState>()(() => ({
  favoriteIds: [],
}));
