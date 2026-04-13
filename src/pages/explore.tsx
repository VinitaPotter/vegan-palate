import RecipeCard from "../components/recipeCard";
import ALL_RECIPES from "../data/recipes.json";

export default function Explore() {
  const ingredient_focus = "mushroom";
  const talkingCopy = JSON.parse(JSON.stringify(ALL_RECIPES));
  const talking = talkingCopy
    .sort((a, b) => b.aggregateLikes - a.aggregateLikes)
    .splice(0, 10);

  const focusCopy = JSON.parse(JSON.stringify(ALL_RECIPES));
  const focus = focusCopy.reduce((acc, cur) => {
    cur.extendedIngredients.forEach((ing) => {
      if (ing.name.includes(ingredient_focus)) {
        acc.push(cur);
      }
    });
    return acc;
  }, []);

  const communityCopy = JSON.parse(JSON.stringify(ALL_RECIPES));
  const community = communityCopy.sort(() => Math.random() - 0.5).splice(0, 10);

  const newRecipesCopy = JSON.parse(JSON.stringify(ALL_RECIPES));
  const newRecipes = newRecipesCopy
    .sort(
      (a, b) =>
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
      {Object.values(sections).map((sect) => {
        return (
          <div className="mb-5">
            <div className="heading-font text-4xl text-primary mb-5">
              {sect.title}
            </div>
            <div className="flex shrink-0 flex-nowrap overflow-x-auto overflow-y-hidden no-scrollbar bg-radial from-accent from-5 via-accent/10 via-5 to-transparent">
              {sect?.recipes &&
                sect.recipes.map((t, index) => {
                  return (
                    <div
                      key={`${t.id}-talking`}
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
