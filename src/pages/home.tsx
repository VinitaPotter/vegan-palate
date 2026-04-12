import { Link } from "react-router-dom";
import RecipeCard from "../components/recipeCard";
import { useTrendingRecipes } from "../store/recipeSelector";

export default function Home() {
  const trending = useTrendingRecipes();

  return (
    <div>
      <div className="px-10 mt-16 flex justify-between">
        <h1 className="text-5xl text-secondary heading-font font-bold">
          Best trending now..
        </h1>
        <Link to={"search"}>
          <div className="cursor-pointer relative">
            <p className="highlight-container  "></p>
            <p className="text-2xl relative z-20 mb-5 animate-bounce">
              Or let's find something you'll love! →
            </p>
          </div>
        </Link>
      </div>
      <div className="bg-accent">
        <div className="flex justify-around h-[70vh] ">
          {(trending && trending.length ? trending : Array.from(Array(4))).map(
            (t, index) => (
              <RecipeCard
                key={index + 1}
                index={index}
                meal={t}
                rotate={true}
                page="trending"
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
