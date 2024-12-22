import "./styles.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchRecipeById } from "../api";
import { useRecipes } from "../RecipesProvider";

export const RecipeDetails = () => {
  const { recipeId } = useParams();
  const recipes = useRecipes();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        setLoading(true);
        const data = await fetchRecipeById(recipeId);
        setRecipe(data);
      } catch (err) {
        setError("Recipe details could not be reached");
      } finally {
        setLoading(false);
      }
    };
    console.log(recipes);
    console.log(recipeId);

    const maybeRecipeInContext = recipes.find(
      (recipe) => recipe.idMeal === recipeId,
    );

    console.log(maybeRecipeInContext);
    if (!!maybeRecipeInContext) {
      setRecipe(maybeRecipeInContext);
    } else {
      getRecipe();
    }
  }, [recipeId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Recipe not found</p>;

  const ingredientsAndMeasures = getRecipeIngredientsAndMeasures(recipe);

  return (
    recipe && (
      <div className="recipe-detail">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <h2>{recipe.strMeal}</h2>
        <p>{recipe.strInstructions}</p>
        <h3>Ingredients:</h3>
        {ingredientsAndMeasures.length > 0 ? (
          <ul>
            {ingredientsAndMeasures.map((item, index) => (
              <li key={index}>{`${item.ingredient} - ${item.measure}`}</li>
            ))}
          </ul>
        ) : (
          <p>No ingredients</p>
        )}
      </div>
    )
  );
};

function getRecipeIngredientsAndMeasures(recipe) {
  const ingredientsAndMeasures = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient) {
      ingredientsAndMeasures.push({ ingredient, measure });
    }
  }
  return ingredientsAndMeasures;
}
