export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  ingredients: string[];
  strInstructions: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  [key: `strIngredient${number}`]: string | undefined;
  [key: `strMeasure${number}`]: string;
}

export interface ApiResponse<T> {
  meals: T[] | null;
}

export interface CategoryDetails {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export enum Category {
  Beef = "Beef",
  Chicken = "Chicken",
  Dessert = "Dessert",
  Lamb = "Lamb",
  Miscellaneous = "Miscellaneous",
  Pasta = "Pasta",
  Pork = "Pork",
  Seafood = "Seafood",
  Side = "Side",
  Starter = "Starter",
  Vegan = "Vegan",
  Vegetarian = "Vegetarian",
  Breakfast = "Breakfast",
  Goat = "Goat",
  Other = "Other",
}

export const Categories: Category[] = Object.values(Category);

export enum Area {
  Italian = "Italian",
  Chinese = "Chinese",
  Mexican = "Mexican",
  Japanese = "Japanese",
  Indian = "Indian",
  American = "American",
  French = "French",
  Mediterranean = "Mediterranean",
  MiddleEastern = "Middle Eastern",
  Thai = "Thai",
  Asian = "Asian",
  Other = "Other",
}

export const Areas: Area[] = Object.values(Area);
