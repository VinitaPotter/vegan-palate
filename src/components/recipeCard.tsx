import RecipeOverviewModal from "./recipeOverviewModal";
import { useState } from "react";
import type { Meal } from "../types/meal";

type MealCard = Pick<
  Meal,
  | "id"
  | "title"
  | "summary"
  | "image"
  | "glutenFree"
  | "dishTypes"
  | "instructions"
>;
type recipeCardProps = {
  meal: MealCard;
  index: number;
  rotate: boolean;
};

export default function RecipeCard({
  meal,
  index,
  rotate = false,
}: recipeCardProps) {
  const [cardVisible, setCardVisible] = useState<boolean>(false);

  function handleCardVisibility() {
    return setCardVisible((prev) => !prev);
  }

  return (
    <div>
      <div
        onClick={handleCardVisibility}
        className={`bg-white card-shadow border-gray-200 w-78 rounded-xl px-4 py-2 ${rotate ? "hover:scale-105 hover:border-secondary border-2 h-3/4 duration-500 relative hover:z-20 hover:cursor-pointer" : "m-6 h-112.5"}`}
        style={
          rotate
            ? {
                transform: `rotate(${(index - 3 / 2) * 17}deg) translateY(${[0, 3].includes(index) ? 100 : 0}px)`,
              }
            : {}
        }
      >
        {meal ? (
          <div>
            <div className="h-10">
              <span className="border px-1 rounded text-xs">
                {meal.dishTypes[0]}
              </span>
            </div>
            <div className="text-xl mb-4 h-12">{meal.title}</div>
            <img
              src={meal.image}
              alt={meal.title}
              className="h-40 w-68 object-cover mx-auto mb-4"
            />
            <p>{meal.summary}</p>
          </div>
        ) : (
          <div className="animate-pulse ease-in-out duration-1000">
            <div className=" bg-secondary/20 mb-4 h-6 w-20"></div>
            <div className=" bg-secondary/20 mb-4 h-12"></div>
            <div className=" bg-secondary/20 mb-4 h-40"></div>
            <div className=" bg-secondary/20 mb-4 h-20"></div>
          </div>
        )}
      </div>
      {cardVisible ? (
        <div>
          <RecipeOverviewModal
            meal={meal}
            handleClickOutside={handleCardVisibility}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
