import { Recipe, ApiResponse } from "./models";
import { fetchData } from "../../utils";

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const fullUrl = `${API_BASE_URL}/lookup.php?i=${id}`;
  const data: ApiResponse<Recipe> = await fetchData(fullUrl);

  if (data.meals && data.meals.length > 0) {
    return data.meals[0];
  } else {
    throw new Error("Recipe not found");
  }
};

export const fetchRecipesByIngredient = async (
  ingredient: string
): Promise<Recipe[]> => {
  const fullUrl = `${API_BASE_URL}/filter.php?i=${ingredient}`;
  const data: ApiResponse<Recipe> = await fetchData(fullUrl);
  return data.meals || [];
};

export const fetchRecipesByCategory = async (
  category: string
): Promise<Recipe[]> => {
  const fullUrl = `${API_BASE_URL}/filter.php?c=${category}`;
  const data: ApiResponse<Recipe> = await fetchData(fullUrl);
  return data.meals || [];
};
