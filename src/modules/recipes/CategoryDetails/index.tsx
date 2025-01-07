import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchRecipesByCategory } from "../api";
import { Recipe } from "../models";

export const CategoryDetails: React.FC = () => {
  // useParams'tan dönen değerin tipini tanımlıyoruz
  const { category } = useParams<{ category: string }>();

  // recipes için tip belirtiyoruz
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        // fetchRecipesByCategory'nin döndüğü veriye uygun tip belirtiyoruz
        const data: Recipe[] = await fetchRecipesByCategory(category!);
        setRecipes(data);
      } catch (err) {
        setError("Recipes could not be reached");
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [category]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-details">
      <h1>{category} Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.idMeal}>
            <Link to={`/recipe/${recipe.idMeal}`}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h2>{recipe.strMeal}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
