import "./styles.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchRecipeById } from "../api";

// Tarifin yapısını tanımlıyoruz
interface Ingredient {
  ingredient: string;
  measure: string;
  amount: string;
}

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  ingredients: string[];
}

export const RecipeDetails = () => {
  // recipeId'yi URL parametrelerinden alıyoruz ve tipini belirliyoruz
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);  // `recipe` state'ini tipliyoruz
  const [loading, setLoading] = useState<boolean>(true);  // `loading` state'ini tipliyoruz
  const [error, setError] = useState<string | null>(null);  // `error` state'ini tipliyoruz

  useEffect(() => {
    const getRecipe = async () => {
      if (!recipeId) {
        setError("Recipe ID is missing");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchRecipeById(recipeId);  // `fetchRecipeById` fonksiyonunun `Recipe` tipinde döneceğini varsayıyoruz
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

// `RecipeDetail` bileşeninin props'larını tipliyoruz
interface RecipeDetailProps {
  recipe: Recipe;
}

const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
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
