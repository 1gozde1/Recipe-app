const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Ortak fetch fonksiyonu
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Fetch error: ${error.message}`);
    throw new Error("Unable to fetch data. Please try again later.");
  }
};

// Yemek detayları ve malzemeler
export const fetchRecipeById = async (idMeal) => {
  const data = await fetchData(`${API_BASE_URL}/lookup.php?i=${idMeal}`);
  if (data.meals && data.meals.length > 0) {
    const meal = data.meals[0];

    // Dinamik ingredient listesi
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(measure ? `${ingredient} - ${measure}` : ingredient);
      }
    }

    return {
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      strInstructions: meal.strInstructions,
      ingredients,
    };
  } else {
    throw new Error("Recipe not found");
  }
};

export const fetchCategories = async () => {
  const data = await fetchData(`${API_BASE_URL}/categories.php`);
  return data.categories;
};

export const fetchRecipesByCategory = async (category) => {
  const data = await fetchData(`${API_BASE_URL}/filter.php?c=${category}`);
  return data.meals;
};

export const fetchRecipesByIngredient = async (ingredient) => {
  const data = await fetchData(`${API_BASE_URL}/filter.php?i=${ingredient}`);
  return data.meals;
};

export const searchRecipesByName = async (name) => {
  const data = await fetchData(`${API_BASE_URL}/search.php?s=${name}`);
  return data.meals;
};
