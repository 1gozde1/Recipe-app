import "./styles.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchRecipeById } from "../api";
import { RecipeDetail } from "../models";
import React from "react";

export const RecipeDetails: React.FC = () => {
  // recipeId'yi URL parametrelerinden alıyoruz ve tipini belirliyoruz
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null); // `recipe` state'ini tipliyoruz
  const [loading, setLoading] = useState<boolean>(true); // `loading` state'ini tipliyoruz
  const [error, setError] = useState<string | null>(null); // `error` state'ini tipliyoruz

  useEffect(() => {
    const getRecipe = async () => {
      if (!recipeId) {
        setError("Recipe ID is missing");
        setLoading(false);
        return;
      }

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

  return (
    <div>
      {recipe && (
        <>
          <h1>{recipe.strMeal}</h1>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <p>{recipe.strInstructions}</p>
          <ul>
            {recipe.ingredients.map((ingredient: string, index: number) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
