import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlaceHolder from "../assets/placeholder.jpg";
import recipes from "../data/recipes.json";
import type { Meal } from "../types/meal";

type RelatedMeals = Pick<
  Meal,
  "image" | "dishTypes" | "aggregateLikes" | "title" | "id"
>[];

type RelatedProps = {
  types: [];
  recipeId: number;
};
export default function Related({ types, recipeId }: RelatedProps) {
  const [relatedItems, setRelatedItems] = useState<RelatedMeals>([]);

  const navigate = useNavigate();

  function navigateToRecipe(id: number) {
    window.scrollTo(0, 0);
    navigate(`/recipe/${id}`);
  }

  function getRelatedMeals(relatedType: []): void {
    const tempArray: RelatedMeals = [];

    const currentRecipe = recipes.findIndex((r) => r.id === recipeId);
    console.log({ currentRecipe });
    const otherRecipes = JSON.parse(JSON.stringify(recipes));
    otherRecipes.splice(currentRecipe, 1);

    // if (relatedType && relatedType.length) {
    //   relatedType.forEach((type) => {
    //     otherRecipes.forEach((recipe, index) => {
    //       if (index < 3 && recipe?.dishTypes?.includes(type)) {
    //         tempArray.push(recipe);
    //       }
    //     });
    //   });
    // } else {
    //   tempArray.push(...otherRecipes.slice(0, 2));
    // }
    tempArray.push(...otherRecipes.slice(0, 3));
    setRelatedItems(tempArray);
  }

  useEffect(() => {
    getRelatedMeals(types);
  }, [recipeId]);

  return (
    <div className="flex justify-between bg-accent/80 p-10">
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
