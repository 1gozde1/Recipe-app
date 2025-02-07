import "./styles.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { fetchRecipeById } from "../recipeService";


export const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      try {

        const data = await fetchRecipeById(recipeId);
        setRecipe(data);
      } catch (err) {
        setError("Recipe details could not be reached");
      } finally {
        setLoading(false);
      }
    };

    getRecipe();
  }, [recipeId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Recipe not found</p>;

  return <RecipeDetail recipe={recipe} />;
};

const RecipeDetail = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className="recipe-detail">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h2>{recipe.strMeal}</h2>
      <p>{recipe.strInstructions}</p>
      <p>
        <strong>Ingredients:</strong>
      </p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};
