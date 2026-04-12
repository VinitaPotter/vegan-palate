import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ALL_RECIPES from "../data/recipes.json";

import confetti from "canvas-confetti";

import RecipeDescriptionCard from "../components/recipeNutritionCard";
import Related from "../components/related";
import ReviewDialogue from "../components/reviewDialogue";
import PlaceHolder from "../assets/placeholder.jpg";
import type { Meal } from "../types/meal";
import { useRecipeStore } from "../store/recipesStore";

export default function RecipeDetails() {
  const favoriteIds = useRecipeStore((state) => state.favoriteIds);
  const fire = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  };
  const params = useParams();
  const recipeId = Number(params.id);
  interface topReview {
    user: string;
    rating: number;
    testimonial: string;
  }
  const [showDialogue, setShowDialogue] = useState<boolean>(false);
  const [mealRecipe, setMealRecipe] = useState<Meal | null>(null);
  const [topUserReview, setTopUserReview] = useState<topReview | null>(null);
  const foodEmojis = [
    "🍇",
    "🍈",
    "🍉",
    "🍊",
    "🍋",
    "🍋‍🟩",
    "🍌",
    "🍍",
    "🥭",
    "🍎",
    "🍏",
    "🍐",
    "🍑",
    "🍒",
    "🍓",
    "🫐",
    "🥝",
    "🍅",
    "🫒",
    "🥥",
  ];

  function celebrate(): void {
    fire();
    setTimeout(() => {
      if (!favoriteIds.includes(recipeId)) setShowDialogue(true);
    }, 1000);
  }
  function getTopReview(): void {
    const foundReview = mealRecipe?.reviews.find(
      (review) => review.rating >= 4,
    );
    if (foundReview) setTopUserReview(foundReview);
  }

  function getUserEmoji(userName: string): string {
    if (userName && userName.length >= foodEmojis.length) {
      return foodEmojis[0];
    }
    return foodEmojis[userName.length];
  }
  useEffect(() => {
    function getDetails() {
      let currentRecipe;
      if (recipeId) {
        currentRecipe = ALL_RECIPES.find((r) => r.id === recipeId);
      } else {
        currentRecipe = ALL_RECIPES[recipeId];
      }
      setMealRecipe(currentRecipe as Meal);
    }
    getDetails();
  }, [recipeId]);

  useEffect(() => {
    getTopReview();
  }, [mealRecipe?.reviews]);

  return (
    <div>
      {showDialogue ? (
        <ReviewDialogue
          handleDialogueWindow={setShowDialogue}
          recipeId={recipeId}
        />
      ) : (
        <></>
      )}
      {mealRecipe && Object.keys(mealRecipe).length ? (
        <div
          className="bg-bottom"
          style={{
            backgroundImage: `linear-gradient(to top,  transparent, #fff), url(${mealRecipe.image || PlaceHolder})`,
            backgroundAttachment: "fixed",
          }}
        >
          <div className="flex w-full justify-between px-6 ">
            {/* Left section */}
            <div className="bg-white p-6 rounded-2xl w-3/4 text-lg justify-items-start mt-10">
              <div className="bg-tertiary/50 rounded-2xl p-6 w-full mb-14">
                <p className="font-thin text-3xl heading-font ">
                  {mealRecipe.title}
                </p>
                <span>Recipe by:</span>
                <a href={mealRecipe?.sourceUrl}>
                  <span> {mealRecipe?.sourceName || "Unknown"}</span>
                </a>
                <p className="text-sm text-primary">
                  {mealRecipe.aggregateLikes
                    ? `${mealRecipe.aggregateLikes} people 👍🏼 this`
                    : ""}
                </p>

                <div className="mt-6">
                  {topUserReview ? (
                    <div className="border rounded-2xl p-4">
                      <p>
                        <span className="mr-2">Top review:</span>
                        {Array.from(Array(topUserReview.rating)).map(() => {
                          return <span>⭐</span>;
                        })}
                      </p>
                      <p>{topUserReview?.testimonial}</p>
                      <p className="mt-5 flex items-center">
                        <span className="mr-2 bg-accent border border-primary px-2.5 py-1 rounded-full ">
                          {getUserEmoji(topUserReview.user)}
                        </span>
                        <span className="text-primary italic">
                          {topUserReview?.user || "Unknown"}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="mb-7 pb-7 border-b border-dashed border-gray-400 flex justify-between w-full">
                <div className="flex">
                  <span className="font-semibold text-lg w-[10ch]">
                    Ingredients:
                  </span>
                  {mealRecipe?.extendedIngredients.length ? (
                    <ol className="list-none ml-5">
                      {mealRecipe?.extendedIngredients?.map((ing) => {
                        return (
                          <li className="mb-1" key={ing.id}>
                            <span className="mr-2 text-2xl">{ing.emoji}</span>
                            <span className="mr-1 ">
                              {ing?.amount || ""} {ing?.unit || ""} {ing?.name}
                            </span>
                            <span></span>
                            <span className=" text-gray-700 ">
                              {ing.preparation ? `(${ing.preparation})` : ""}
                            </span>
                          </li>
                        );
                      })}
                    </ol>
                  ) : (
                    <div>
                      <a href="mailto:someone@example.com">
                        <span className="text-2xl mr-2">🏚️</span>
                        <span className="italic text-blue-600">
                          Report broken content!
                        </span>{" "}
                      </a>
                    </div>
                  )}
                </div>
                <div className="items-center "></div>
              </div>
              <div className="mb-4 flex">
                <p className="font-semibold text-lg w-[10ch]">Directions:</p>

                {mealRecipe.analyzedInstructions?.length ||
                mealRecipe.instructions ? (
                  <ol className="list-none ml-5">
                    {(mealRecipe?.analyzedInstructions.length
                      ? mealRecipe.analyzedInstructions
                      : [{ number: 1, step: mealRecipe.instructions }]
                    )?.map((instruction) => {
                      return (
                        <li key={instruction.number} className="flex">
                          <span className="bg-tertiary p-0.5 -mr-3.5 rounded-full w-7 h-7 text-center inline-block relative z-10 ">
                            {instruction?.number}
                          </span>
                          <span className="pb-10 inline-block border-l-secondary border-dashed border-l pl-7 max-w-[85%]">
                            {instruction?.step}
                          </span>
                        </li>
                      );
                    })}
                    <p className="items-center align-middle">
                      <span className="text-3xl mr-2">✅</span> Enjoy!
                    </p>
                  </ol>
                ) : (
                  <div>
                    <a href="mailto:someone@example.com">
                      <span className="text-2xl mr-2">🏚️</span>
                      <span className="italic text-blue-600">
                        Report broken content!
                      </span>{" "}
                    </a>
                  </div>
                )}
              </div>
              <p
                className="bg-primary text-semibold text-xl text-white cursor-pointer hover:scale-101 duarion-1000 p-2 rounded-lg items-center text-center hover:shadow-lg w-56 my-14 ml-[10ch]"
                onClick={celebrate}
              >
                I made it →
              </p>
            </div>
            {/* Right section / card */}
            <div className="w-1/4 justify-items-end mt-10">
              <RecipeDescriptionCard meal={mealRecipe} />
            </div>
          </div>
          <Related types={mealRecipe.dishTypes} recipeId={mealRecipe.id} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
