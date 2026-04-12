import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlaceHolder from "../assets/placeholder.jpg";
import ALL_RECIPES from "../data/recipes.json";
import type { Meal } from "../types/meal";

type RelatedMeals = Pick<
  Meal,
  "image" | "dishTypes" | "aggregateLikes" | "title" | "id"
>[];

type RelatedProps = {
  mealTypes: string[];
  recipeId: number;
};
export default function Related({ mealTypes, recipeId }: RelatedProps) {
  const [relatedItems, setRelatedItems] = useState<RelatedMeals>([]);

  const navigate = useNavigate();

  function navigateToRecipe(id: number) {
    window.scrollTo(0, 0);
    navigate(`/recipe/${id}`);
  }

  function getRelatedMeals(relatedType: []): void {
    const tempArray: RelatedMeals = [];

    const currentRecipeId = ALL_RECIPES.findIndex((r) => r.id === recipeId);
    const otherRecipes = [...ALL_RECIPES];
    otherRecipes.splice(currentRecipeId, 1);

    if (relatedType && relatedType.length) {
      otherRecipes.forEach((recipe) => {
        if (
          recipe?.dishTypes?.includes(relatedType[0]) &&
          tempArray.length < 3
        ) {
          tempArray.push(recipe as Meal);
        }
      });
    } else {
      otherRecipes.slice(0, 3).map((r) => tempArray.push(r as Meal));
    }
    setRelatedItems(tempArray);
  }

  useEffect(() => {
    getRelatedMeals(mealTypes);
  }, [recipeId]);

  return (
    <div className="flex justify-between bg-linear-to-t  from-accent from-45% via-accent/80 to-transparent p-10 ">
      <div className="text-5xl text-center w-1/3 heading-font m-auto">
        Related Recipes
      </div>
      <div className="flex w-2/3 justify-around">
        {relatedItems && relatedItems.length ? (
          relatedItems.map((t) => {
            return (
              <div onClick={() => navigateToRecipe(t.id)}>
                <img
                  src={t.image || PlaceHolder}
                  className="w-50 h-50 object-cover rounded-full drop-shadow-md drop-shadow-black mb-5 hover:scale-110 duration-1000 transition-all cursor-pointer mx-auto"
                />
                <p className="text-center text-xl">{t.title}</p>
                <p className="text-center text-sm text-gray-600">
                  Liked by {t.aggregateLikes} others
                </p>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
