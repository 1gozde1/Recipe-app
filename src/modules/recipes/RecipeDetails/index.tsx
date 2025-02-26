import "./styles.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchRecipeById } from "../api";
import { Recipe } from "../models";
import React from "react";

export const RecipeDetails: React.FC = () => {
  // recipeId'yi URL parametrelerinden alıyoruz ve tipini belirliyoruz
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null); // `recipe` state'ini tipliyoruz
  const [loading, setLoading] = useState<boolean>(true); // `loading` state'ini tipliyoruz
  const [error, setError] = useState<string | null>(null); // `error` state'ini tipliyoruz

  useEffect(() => {

    if (!recipeId) {
      setError("Recipe ID is missing");
      setLoading(false);
      return;
    }

    const getRecipe = async () => {
      try {
        const data = await fetchRecipeById(recipeId); // `fetchRecipeById` fonksiyonunun `RecipeDetail` tipinde döneceğini varsayıyoruz
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

  const ingredientsAndMeasures = Object.entries(recipe || {}).reduce(
    (acc: string[], [key, value]: [string, string]) => {
      if (key.includes("strIngredient") && value) {
        const ingredientNumber = key.replace("strIngredient", "");
        const measure = (recipe as any)[`strMeasure${ingredientNumber}`];
        acc.push(`${value} - ${measure}`);
      }

      return acc;
    },
    []
  )

  return (
    <div>
      {recipe && (
        <>
          <h1>{recipe.strMeal}</h1>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <p>{recipe.strInstructions}</p>
          <ul>
            {ingredientsAndMeasures.map((ingredient: string, index: number) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
