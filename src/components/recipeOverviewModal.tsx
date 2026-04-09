import { Link } from "react-router-dom";
import type { Meal } from "../types/meal";

type MealDetails = Pick<
  Meal,
  | "id"
  | "title"
  | "summary"
  | "image"
  | "cheap"
  | "tags"
  | "nutrition"
  | "servings"
  | "readyInMinutes"
  | "extendedIngredients"
>;

type overviewProps = {
  handleClickOutside: () => void;
  meal: MealDetails;
};

export default function RecipeOverviewModal({
  handleClickOutside,
  meal,
}: overviewProps) {
  return (
    <div>
      <div
        className=" z-50 fixed top-0 left-0 h-screen w-screen "
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(4px)",
        }}
        onClick={() => handleClickOutside()}
      >
        <div
          className="ticket-mask shadow-md w-1/3 ml-auto mr-auto mt-20 rounded-xl bg-cover bg-center "
          style={{
            backgroundImage: `linear-gradient(to top, #fff, #fff, transparent), url(${meal.image})`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className=" relative">
            <div className="h-64"></div>
            <p className="text-3xl absolute top-46 left-6 p-6 text-bold text-shadow-2xl highlight-container">
              <span className="relative">{meal.title}</span>
            </p>
            <div className="p-4 h-2/3 min-h-96 mx-4">
              <div className="mb-4 ">
                <p className="font-extrabold">Description</p>
                <p>{meal.summary}</p>
              </div>
              <div className="bg-accent/40 rounded-2xl p-2 flex justify-between h-24 items-center mb-4">
                <div className="flex  w-1/3 items-center">
                  <p className="text-3xl mr-4">⏲️</p>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-medium text-lg">{meal.readyInMinutes}</p>
                  </div>
                </div>
                <div className="flex  w-1/3 items-center">
                  <p className="text-3xl mr-4">🍋</p>
                  <div>
                    <p className="text-sm text-gray-600">Ingredients</p>
                    <p className="font-medium text-lg">
                      {meal.extendedIngredients?.length}
                    </p>
                  </div>
                </div>
                <div className="flex  w-1/3 items-center">
                  <p className="text-3xl mr-4">🔥</p>
                  <div>
                    <p className="text-sm text-gray-600">Calories</p>
                    <p className="font-medium text-lg">
                      {meal.nutrition.calories}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <p className="font-medium text-lg mb-2">Recipe tags</p>
                {meal.tags.map((tag) => {
                  return (
                    <span className="border border-gray-400 text-gray-500 px-2 py-1 mr-2 rounded-lg text-xs">
                      {tag}
                    </span>
                  );
                })}
              </div>
              <Link to={`/recipe/${meal.id}`}>
                <div className="mb-8">
                  <p className="bg-primary text-semibold text-xl text-white cursor-pointer hover:scale-101 duarion-1000 p-2 rounded-lg items-center text-center hover:shadow-lg">
                    Make this recipe →
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
