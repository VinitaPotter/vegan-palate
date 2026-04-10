import { useState, useEffect } from "react";
import recipes from "../data/recipes.json";
import RecipeCard from "../components/recipeCard";
import type { Meal } from "../types/meal";
import Search from "../components/search";
import { useNavigate } from "react-router-dom";

type MealCard = Pick<Meal, "id" | "title" | "image" | "readyInMinutes">;

export default function Favorites() {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<{
    name: string;
    index: number;
  }>({
    name: "recent",
    index: 0,
  });

  const [myFavRecipes, setMyFavRecipes] = useState<Meal[]>([]);
  const [myFilteredRecipes, setFilteredRecipes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  function getRecipes(): Promise<MealCard[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(recipes as Meal[]);
      }, 500);
    });
  }

  function handleOnSearch(query: string): void {
    console.log("handling search");
    navigate(`/search/?q=${query || activeFilter.name}`);
  }

  useEffect(() => {
    setLoading(true);
    async function getdata() {
      const data = await getRecipes();
      setMyFavRecipes(data);
      setFilteredRecipes(data);
      setLoading(false);
    }
    getdata();
  }, []);

  useEffect(() => {
    if (activeFilter.name === "recent") {
      setFilteredRecipes((prev) => myFavRecipes);
    } else {
      const filtered_recipes = myFavRecipes.filter((r) => {
        if (r.dishTypes.length && r.dishTypes.includes(activeFilter.name)) {
          return r;
        }
        setFilteredRecipes((prev) => filtered_recipes);
      });
    }
  }, [activeFilter.name]);
  return (
    <div>
      <div className="flex w-screen max-h-[92vh]">
        <div className="min-w-[2/5] pl-10 py-10 border-r border-gray-200 bg-accent relative z-0">
          <p className="text-6xl playful-font mb-20 -rotate-2">
            Make <span className="text-primary">'em</span> again!
          </p>
          <div
            className="indicator bg-white h-15 w-[90%] absolute z-10 -right-px rounded-l-xl transition-transform duration-500 ease-out top-60"
            style={{
              transform: `translateY(${activeFilter.index * 80}px)`,
            }}
          ></div>
          {[
            "recent",
            "breakfast",
            "appetizer",
            "main course",
            "snacks",
            "dessert",
          ].map((item, index) => {
            return (
              <div
                className="pl-4 -ml-4 my-5 min-h-15  hover:text-primary rounded-l-2xl  cursor-pointer  capitalize z-20 relative flex items-center w-[stretch]"
                onClick={() => setActiveFilter({ name: item, index })}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div
          className="flex flex-wrap overflow-scroll w-full"
          style={{ height: `calc(100vh - 4rem)` }}
        >
          {!loading && myFilteredRecipes && myFilteredRecipes.length ? (
            myFilteredRecipes.map((t, index) => (
              <RecipeCard
                key={index + 1}
                index={index}
                meal={t}
                rotate={false}
              />
            ))
          ) : !loading && !myFilteredRecipes.length ? (
            <div className="w-full mt-40">
              <div className="text-center">
                <p className="playful-font text-8xl mb-10 text-primary">
                  Uh no!!{" "}
                </p>
                <p>You don't have any {activeFilter.name} recipes saved</p>
                <p className="mb-10">
                  Don't be hangry! Find something you'll like now!
                </p>
                <Search query={activeFilter.name} onSearch={handleOnSearch} />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
