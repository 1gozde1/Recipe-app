
export async function fetchRecipesByIngredient (query) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`,
    );
    if (!response.ok) {
      throw Error('An error occured when fetching data.')
    }
    const data = await response.json();
    return data.meals;
  } 

export async function fetchRecipeDetailsById(idMeal) {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`,
    );
    if (!response.ok) {
        throw Error('An error occurred when fetching recipe details.');
    }
    const data = await response.json();
    const meal = data.meals[0];

    return {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        strInstructions: meal.strInstructions,
        ingredients: [
            meal.strIngredient1 && meal.strIngredient1,
            meal.strIngredient2 && meal.strIngredient2,
        ].filter(Boolean),
    };
}
