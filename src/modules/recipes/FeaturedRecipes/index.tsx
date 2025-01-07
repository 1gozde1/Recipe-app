import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Recipe as ExpectedRecipe, Recipe } from "../models";
import { fetchRecipesByIngredient } from "../api";

import {
  useRecipes,
  useRecipesDispatch,
  RECIPE_ACTIONS,
} from "../RecipesProvider";

export const FeaturedRecipes: React.FC = () => {
  const recipes = useRecipes() as unknown as Recipe[];
  const dispatch = useRecipesDispatch() as React.Dispatch<{
    type: string;
    payload: Recipe[];
  }>;
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipesByIngredient("chicken_breast").then((recipes: Recipe[]) => {
      const mappedRecipes: Recipe[] = recipes.map((recipe) => ({
        idMeal: recipe.idMeal,
        strMeal: recipe.strMeal,
        strMealThumb: recipe.strMealThumb,
        strInstructions: recipe.strInstructions || "No instructions available",
        ingredients: [],
        strCategory: recipe.strCategory || "Unknown",
        strArea: recipe.strArea || "Unknown",
      }));
      dispatch({ type: RECIPE_ACTIONS.UPDATE, payload: mappedRecipes });
    });
  }, [dispatch]);

  const handleRecipeClick = (idMeal: string): void => {
    navigate(`/recipe/${idMeal}`);
  };

  return (
    <>
      {recipes.length > 0 ? (
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li
              key={recipe.idMeal}
              onClick={() => handleRecipeClick(recipe.idMeal)}
            >
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h3>{recipe.strMeal}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-recipes">No recipes found</p>
      )}
    </>
  );
};
