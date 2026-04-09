export type Meal = {
  id: number;
  title: string;
  image: string;
  imageType: string;

  servings: number;
  readyInMinutes: number;
  preparationMinutes: number;
  glutenFree: boolean;
  cookingMinutes: number;
  aggregateLikes: number;

  veryHealthy: boolean;
  cheap: boolean;

  sourceName: string;
  sourceUrl: string;

  weightPerServing: {
    amount: number;
    unit: string;
  };

  tags: string[];
  summary: string;

  dishTypes: string[];

  extendedIngredients: {
    id: number;
    name: string;
    emoji: string;
    amount: number;
    unit: string;
    preparation: string;
  }[];

  instructions: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  analyzedInstructions: {
    number: number;
    step: string;
  }[];
  reviews: {
    user: string;
    rating: number;
    testimonial: string;
  }[];
};
