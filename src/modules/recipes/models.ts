// Recipe için TypeScript türü
export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  [key: string]: any; // Ek alanlar için
}

export type FormData = {
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealImage: string;
  ingredients: {
    ingredient: string;
    measure: string;
    amount: string;
  }[];
};

// RecipeDetail için TypeScript türü
export interface RecipeDetail extends Recipe {
  strInstructions: string;
  ingredients: string[];
}

// ApiResponse için TypeScript türü
export interface ApiResponse<T> {
  meals: T[] | null;
}

// Category için TypeScript türü
export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export enum CategoryEnum {
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

export const Categories: CategoryEnum[] = Object.values(CategoryEnum);

export enum AreaEnum {
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

export const Areas: AreaEnum[] = Object.values(AreaEnum);
