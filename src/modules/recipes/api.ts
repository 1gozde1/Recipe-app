import { Recipe, RecipeDetail, ApiResponse } from "./models";
import { fetchData } from "../../utils";

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// fetchRecipeById fonksiyonu
export const fetchRecipeById = async (id: string): Promise<RecipeDetail> => {
  const fullUrl = `${API_BASE_URL}/lookup.php?i=${id}`;
  const data: ApiResponse<RecipeDetail> = await fetchData(fullUrl);

  if (data.meals && data.meals.length > 0) {
    const recipe = data.meals[0];
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push(
          `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`
        );
      }
    }
    return {
      ...recipe,
      ingredients,
    };
  } else {
    throw new Error("Recipe not found");
  }
};

// fetchRecipesByIngredient fonksiyonu
export const fetchRecipesByIngredient = async (
  ingredient: string
): Promise<Recipe[]> => {
  const fullUrl = `${API_BASE_URL}/filter.php?i=${ingredient}`;
  const data: ApiResponse<Recipe> = await fetchData(fullUrl);
  return data.meals || [];
};

// fetchRecipesByCategory fonksiyonu
export const fetchRecipesByCategory = async (
  category: string
): Promise<Recipe[]> => {
  const fullUrl = `${API_BASE_URL}/filter.php?c=${category}`;
  const data: ApiResponse<Recipe> = await fetchData(fullUrl);
  return data.meals || [];
};
