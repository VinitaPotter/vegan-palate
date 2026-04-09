import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ReviewProps = {
  handleDialogueWindow: (val: boolean) => void;
};
export default function ReviewDialogue({ handleDialogueWindow }: ReviewProps) {
  const navigate = useNavigate();

  const [tempRating, setTempRating] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  function handleTempRating(value: number): void {
    setTempRating(value);
  }
  function giveRating(value: number): void {
    setRating(value);
  }
  return (
    <div>
      <div className="fixed z-50 bg-white top-1/2 left-1/2 p-6 drop-shadow-2xl drop-shadow-black rounded-2xl -translate-x-1/2 -translate-y-1/2 w-1/3">
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
        <textarea className="border w-full min-h-30"></textarea>
        <div>
          <label>
            <span className="text-lg">😋 Add to my favorites:</span>{" "}
            <input
              type="checkbox"
              name="myCheckbox"
              className=" h-4 w-4 cursor-pointer "
            />
          </label>
        </div>
        <div className="flex justify-end">
          <p
            className="border px-4 py-1 cursor-pointer text-xl mr-10"
            onClick={() => handleDialogueWindow(false)}
          >
            Skip
          </p>
          <p
            className="px-4 py-1 bg-primary text-white cursor-pointer text-xl"
            onClick={() => navigate(`/`)}
          >
            Submit
          </p>
        </div>
      </div>
    </div>
  );
}
