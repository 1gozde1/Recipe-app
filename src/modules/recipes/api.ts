const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Recipe için TypeScript türü
export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  ingredients: string[];
  [key: string]: any; // Ek alanlar için
}

// Category için TypeScript türü
export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

// fetchRecipeById fonksiyonu
export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) {
      throw new Error("Recipe could not be reached");
    }
    const data = await response.json();

    if (data.meals && data.meals.length > 0) {
      const recipe = data.meals[0];

      const ingredients: string[] = [];
      for (let i = 1; i <= 20; i++) {
        if (recipe[`strIngredient${i}`]) {
          ingredients.push(
            `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`,
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
  } catch (error) {
    console.error("Recipe could not be reached:", error);
    throw error;
  }
};

// fetchCategories fonksiyonu
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories.php`);
    if (!response.ok) {
      throw new Error("Categories could not be reached");
    }
    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error("Category could not be reached:", error);
    throw error;
  }
};

// fetchRecipesByCategory fonksiyonu
export const fetchRecipesByCategory = async (
  category: string,
): Promise<Recipe[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);
    if (!response.ok) {
      throw new Error("Categories could not be reached");
    }
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Categories could not be reached:", error);
    throw error;
  }
};
