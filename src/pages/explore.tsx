/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
import RecipeCard from "../components/recipeCard";
import ALL_RECIPES from "../data/recipes.json";

export default function Explore() {
  const ingredient_focus = "mushroom";

  // Sorting by popularity
  const talkingCopy = JSON.parse(JSON.stringify(ALL_RECIPES));
  const talking = talkingCopy
    .sort((a: any, b: any) => (b.aggregateLikes || 0) - (a.aggregateLikes || 0))
    .splice(0, 10);

  // Filtering by specific ingredient
  const focusCopy = JSON.parse(JSON.stringify(ALL_RECIPES));
  const focus = focusCopy.reduce((acc: any[], cur: any) => {
    cur.extendedIngredients.forEach((ing: any) => {
      // Added : any
      if (ing.name.includes(ingredient_focus)) {
        acc.push(cur);
      }
    });
    return acc;
  }, []);

  // Random community shuffle
  const communityCopy = JSON.parse(JSON.stringify(ALL_RECIPES));
  const community = communityCopy.sort(() => Math.random() - 0.5).splice(0, 10);

  // Sorting by date
  const newRecipesCopy = JSON.parse(JSON.stringify(ALL_RECIPES));
  const newRecipes = newRecipesCopy
    .sort(
      (a: any, b: any) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .splice(0, 10);

  const sections = {
    talkingRecipes: {
      title: `What's got everyone talking..`,
      recipes: talking,
    },
    focusRecipes: {
      title: `Ingredient in the focus: ${ingredient_focus}`,
      recipes: focus,
    },
    communityRecipes: {
      title: `From your community..`,
      recipes: community,
    },
    newRecipes: {
      title: `New to you..`,
      recipes: newRecipes,
    },
  };

  return (
    <div className="m-10">
      {Object.values(sections).map((sect: any) => {
        // Added : any
        return (
          <div className="mb-5" key={sect.title}>
            <div className="heading-font text-4xl text-primary mb-5">
              {sect.title}
            </div>
            <div className="flex shrink-0 flex-nowrap overflow-x-auto overflow-y-hidden no-scrollbar bg-radial from-accent from-5 via-accent/10 via-5 to-transparent">
              {sect?.recipes &&
                sect.recipes.map((t: any, index: number) => {
                  return (
                    <div
                      key={`${t.id}-${sect.title}-${index}`}
                      className="h-130 bg-cover! bg-center! min-w-82 "
                    >
                      <RecipeCard meal={t} index={index} page="explore" />
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
