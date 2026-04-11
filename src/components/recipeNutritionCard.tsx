import { useState } from "react";
import Cheap from "../assets/cheap.png";
import Gluten from "../assets/gluten_free.png";
import Healthy from "../assets/healthy.png";

import type { Meal } from "../types/meal";

type MealCard = Pick<
  Meal,
  | "glutenFree"
  | "dishTypes"
  | "servings"
  | "veryHealthy"
  | "cheap"
  | "cookingMinutes"
  | "preparationMinutes"
  | "readyInMinutes"
  | "weightPerServing"
  | "nutrition"
  | "image"
>;
type recipeCardProps = {
  meal: MealCard;
};

export default function RecipeCard({ meal }: recipeCardProps) {
  function calculateTime(time: number): string {
    if (time > 60) {
      const duration = Math.round(time / 60);
      const minutes = time % 60;

      return `${duration} hours ${minutes} mins`;
    } else return `${time} mins`;
  }
  return (
    <div className="min-w-full">
      <div className="bg-white ml-6 rounded-2xl">
        <img src={meal?.image} className="h-80 w-full object-cover" />
        <div className="flex -mt-10 justify-evenly ">
          {meal.veryHealthy ? (
            <img className="h-16 w-16" src={Healthy} />
          ) : (
            <></>
          )}
          {meal.cheap ? <img className="h-16 w-16" src={Cheap} /> : <></>}
          {meal.glutenFree ? <img className="h-16 w-16" src={Gluten} /> : <></>}

          {!meal.cheap && !meal.veryHealthy && !meal.glutenFree ? (
            <p className="text-6xl text-center -m-4">🍋</p>
          ) : (
            <></>
          )}
        </div>

        <div className="p-6">
          {/* Times */}
          <div className="flex justify-evenly pb-6 mb-6 border-b border-gray-200">
            <div className="px-2 text-center ">
              <p className="font-semibold text-sm text-gray-500 mb-3">Prep:</p>
              <p>{calculateTime(meal.preparationMinutes || 0)} </p>
            </div>
            <div className="border border-gray-200"></div>
            <div className="px-2 text-center ">
              <p className="font-semibold text-sm text-gray-500 mb-3">
                Cooking:
              </p>
              <p>{calculateTime(meal.cookingMinutes || 0)}</p>
            </div>
            <div className="border border-gray-200"></div>
            <div className="px-2 text-center ">
              <p className="font-semibold text-sm text-gray-500 mb-3">Total:</p>
              <p>{calculateTime(meal.readyInMinutes || 0)}</p>
            </div>
          </div>
          {/* Servings */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <p className="">
              Servings:{" "}
              {Array.from(Array(meal.servings)).map((_s, i) => {
                return (
                  <span key={i + 1} className="text-2xl">
                    🍲{" "}
                  </span>
                );
              })}
            </p>
            <p className="text-sm text-gray-600 ">
              Serving size: {meal.weightPerServing.amount}
              {meal.weightPerServing.unit} each
            </p>
          </div>
          {/* Nutrition */}
          {meal.nutrition ? (
            <div>
              {meal.nutrition.calories ? (
                <p className="mb-2">
                  <span className="w-[10ch] inline-block">🔥 Calories:</span>{" "}
                  {meal.nutrition.calories} kcal
                </p>
              ) : (
                <></>
              )}
              {meal.nutrition.protein ? (
                <p className="mb-2">
                  <span className="w-[10ch] inline-block">🫘 Protein:</span>{" "}
                  {meal.nutrition.protein} gm
                </p>
              ) : (
                <></>
              )}
              {meal.nutrition.carbs ? (
                <p className="mb-2">
                  <span className="w-[10ch] inline-block">🍞 Carbs:</span>{" "}
                  {meal.nutrition.carbs} gm
                </p>
              ) : (
                <></>
              )}
              {meal.nutrition.fat ? (
                <p className="mb-2">
                  <span className="w-[10ch] inline-block">🥑 Fat:</span>{" "}
                  {meal.nutrition.fat} gm
                </p>
              ) : (
                <></>
              )}
              {meal.nutrition.fiber ? (
                <p className="mb-2">
                  <span className="w-[10ch] inline-block">🥬 Fiber:</span>{" "}
                  {meal.nutrition.fiber} gm
                </p>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
