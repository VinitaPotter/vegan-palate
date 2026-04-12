import RecipeOverviewModal from "./recipeOverviewModal";
import { useState } from "react";
import type { Meal } from "../types/meal";
import Skeleton from "./skeleton";
import PlaceHolder from "../assets/placeholder.jpg";
import { useRecipeStore } from "../store/recipesStore";
type MealCard = Pick<
  Meal,
  | "id"
  | "title"
  | "summary"
  | "image"
  | "glutenFree"
  | "dishTypes"
  | "instructions"
  | "aggregateLikes"
>;
type recipeCardProps = {
  meal: MealCard;
  index: number;
  page: string;
};

export default function RecipeCard({
  meal,
  index,
  page = "",
}: recipeCardProps) {
  const [cardVisible, setCardVisible] = useState<boolean>(false);

  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const favoriteIds = useRecipeStore((state) => state.favoriteIds);

  const isFav = favoriteIds.includes(meal.id);

  function handleCardVisibility() {
    return setCardVisible((prev) => !prev);
  }

  function handleUnfavorite(event: Event): void {
    event.stopPropagation();
    if (page === "favorites") toggleFavorite(meal.id);
  }

  return (
    <>
      <div
        onClick={handleCardVisibility}
        className={`bg-white group relative border-gray-200 w-78 rounded-xl px-4 py-2 cursor-pointer ${page === "trending" ? "hover:scale-105 hover:border-secondary border-2 h-3/4 duration-500 relative hover:z-20 card-shadow " : "m-6  h-112.5 border"} ${page === "search" ? "hover:scale-105 transition-all duration-300" : ""}`}
        style={
          page === "trending"
            ? {
                transform: `rotate(${(index - 3 / 2) * 17}deg) translateY(${[0, 3].includes(index) ? 100 : -20}px)`,
              }
            : {}
        }
      >
        {meal ? (
          <div>
            <div className="h-10 ">
              {page === "trending" ? (
                <p className="text-md mt-2">
                  <span className="text-[1px] group-hover:text-5xl transition-all duration-500 text-3xl rotate-12 inline-block absolute -top-2.5 -right-2.5">
                    🫶🏼
                  </span>
                  <span className="playful-font ">
                    ♥️ Loved by {meal.aggregateLikes}
                  </span>
                </p>
              ) : (
                <span className="border px-1 rounded text-xs">
                  {meal.dishTypes[0]}
                </span>
              )}
            </div>
            <div className="text-xl mb-4 h-12 flex">
              <span>{meal.title}</span>
              {isFav ? (
                <div className="group/tooltip" onClick={handleUnfavorite}>
                  <span
                    className={`absolute top-0 right-0 p-2 ${page === "favorites" ? "group-hover/tooltip:invisible" : ""}`}
                  >
                    ♥️
                  </span>
                  {page === "favorites" ? (
                    <p className="absolute top-0 right-0 p-2 group-hover/tooltip:visible invisible">
                      <span className="text-xs bg-white border mr-3 px-2 py-1 border-gray-200 rounded-xl">
                        Unfavorite?
                      </span>
                      <span className="">💔</span>
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
            <img
              src={meal.image || PlaceHolder}
              alt={meal.title}
              className="h-40 w-68 object-cover mx-auto mb-4"
            />
            <p>{meal.summary}</p>
          </div>
        ) : (
          <div className="translate-y-0">
            <Skeleton />
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
    </>
  );
}
