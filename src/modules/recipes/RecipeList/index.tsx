import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useRecipes,
  useRecipesDispatch,
  RECIPE_ACTIONS,
} from "../RecipesProvider";
import { fetchRecipesByCategory } from "../api";
import { Recipe } from "../models";
import "./styles.css";

export const RecipeList = () => {
  const recipes = useRecipes();
  const dispatch = useRecipesDispatch();

  // useEffect ile sayfa yüklendiğinde API'den tarifleri çekecek
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await fetchRecipesByCategory("Seafood");
        dispatch({ type: RECIPE_ACTIONS.UPDATE, payload: data });
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    fetchRecipes();
  }, [dispatch]);

  return (
    <div>
      {Array.isArray(recipes) &&
        recipes.map((recipe: Recipe) => (
          <div key={recipe.idMeal}>
            <Link to={`/recipe/${recipe.idMeal}`}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h3>{recipe.strMeal}</h3>
            </Link>
          </div>
        ))}
    </div>
  );
};
