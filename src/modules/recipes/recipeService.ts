import { fetchData } from "../../utils";

export const BD_BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

// API yanıtının tiplerini tanımlıyoruz
interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  // Bu özellik yalnızca `fetchRecipeDetailsById` için geçerli olabilir
  strInstructions?: string; 
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
}

interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  ingredients: string[];
}

interface ApiResponse<T> {
  meals: T[] | null;
}

// `idMeal` parametresi string tipinde olmalı
export async function fetchRecipesByIngredient(idMeal: string): Promise<Recipe[]> {
  const data = await fetchData<ApiResponse<Recipe>>(`${BD_BASE_URL}filter.php?i=${idMeal}`);
  return data.meals || []; // Eğer 'meals' varsa döndür, yoksa boş bir array dön
}

export async function searchRecipesByName(query: string): Promise<Recipe[]> {
  const data = await fetchData<ApiResponse<Recipe>>(`${BD_BASE_URL}search.php?s=${query}`);
  return data.meals || [];
}

export async function fetchRecipeDetailsById(idMeal: string): Promise<RecipeDetail | null> {
  const data = await fetchData<ApiResponse<Recipe>>(`${BD_BASE_URL}lookup.php?i=${idMeal}`);
  const meal = data.meals ? data.meals[0] : null;

  return meal
    ? {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        strInstructions: meal.strInstructions || "", // Burada opsiyonel olduğu için kontrol ekledik
        ingredients: [
          meal.strIngredient1 && meal.strIngredient1,
          meal.strIngredient2 && meal.strIngredient2,
          meal.strIngredient3 && meal.strIngredient3,
        ].filter(Boolean) as string[], // Boş değerleri filtrele
      }
    : null;
}
