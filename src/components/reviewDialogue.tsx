import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "../store/recipesStore";
import RatingSystem from "../components/rating";
type ReviewProps = {
  handleDialogueWindow: (val: boolean) => void;
  recipeId: number;
};
export default function ReviewDialogue({
  handleDialogueWindow,
  recipeId,
}: ReviewProps) {
  const toggleFavorites = useRecipeStore((state) => state.toggleFavorite);
  const favoriteIds = useRecipeStore((state) => state.favoriteIds);

  const navigate = useNavigate();

  const [tempRating, setTempRating] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [isRated, setIsRated] = useState<boolean>(true);
  const [addToFav, setaddToFav] = useState<boolean>(false);
  const [showRatingSystem, setshowRatingSystem] = useState<boolean>(false);

  function handleTempRating(value: number): void {
    setTempRating(value);
  }
  function giveRating(value: number): void {
    setRating(value);
    setIsRated(true);
  }

  function handleSubmit(): void {
    if (!rating) {
      setIsRated(false);
      return;
    } else {
      setshowRatingSystem(true);
      if (addToFav) {
        toggleFavorites(recipeId);
        setTimeout(() => {
          navigate(`/favorites`);
        }, 1000);
      } else {
        setTimeout(() => {
          navigate(`/`);
        }, 1200);
      }
    }
  }

  return (
    <div>
      <div
        className="fixed top-0 left-0 w-screen h-screen z-12 backdrop-blur-xs"
        onClick={() => handleDialogueWindow(false)}
      ></div>
      <div className="fixed z-50 bg-white top-1/2 left-1/2 p-6 drop-shadow-2xl drop-shadow-black rounded-2xl -translate-x-1/2 -translate-y-1/2 w-1/3 ">
        <div className="text-2xl mb-6">How did you like the recipe?</div>
        <div className="min-h-10" onMouseLeave={() => handleTempRating(rating)}>
          {Array.from(Array(5)).map((a, i) => {
            return (
              <div
                className="inline-block transition-all duration-500"
                onMouseEnter={() => handleTempRating(i + 1)}
                onClick={() => giveRating(i + 1)}
              >
                {i >= tempRating ? (
                  <p className=" h-10 w-8 text-3xl cursor-pointer ">⭐︎</p>
                ) : (
                  <p className=" h-10 w-8 text-3xl cursor-pointer ">⭐</p>
                )}
              </div>
            );
          })}
        </div>
        {!isRated ? (
          <span className="text-sm text-red-600">
            Please add rating before submitting
          </span>
        ) : (
          <></>
        )}
        <textarea className="border w-full min-h-30 text-2xl p-2"></textarea>
        <div className="py-5 ">
          <label className="checkbox">
            <p className="text-lg flex items-center ">
              <span className="text-2xl mr-2 ">😋</span> Add to my favorites:
            </p>
            <input
              type="checkbox"
              name="fav"
              className=" h-4 w-4 cursor-pointer"
              onChange={() => setaddToFav((prev) => !prev)}
              defaultChecked={favoriteIds.includes(recipeId)}
            />
            <div className="checkbox__checkmark"></div>
            <div className="checkbox__body"></div>
          </label>
        </div>
        <div className="flex justify-end items-center">
          <p
            className="border px-4 py-1 cursor-pointer text-xl mr-5 rounded-xl"
            onClick={() => handleDialogueWindow(false)}
          >
            Skip
          </p>
          <p
            className={`${!rating ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-primary"} px-4 py-1 text-white text-xl rounded-xl border border-primary`}
            onClick={handleSubmit}
          >
            Submit
          </p>
        </div>
        {showRatingSystem ? <RatingSystem userRating={rating} /> : ""}
      </div>
    </div>
  );
}
