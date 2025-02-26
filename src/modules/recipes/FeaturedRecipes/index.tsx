import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Recipe as Recipe } from "../models";
import { fetchRecipesByIngredient } from "../api";
import {
  useRecipes,
  useRecipesDispatch,
  RECIPE_ACTIONS,
} from "../RecipesProvider";

export const FeaturedRecipes: React.FC = () => {
  const recipesState = useRecipes();
  const dispatch = useRecipesDispatch() as React.Dispatch<{
    type: string;
    payload: Recipe[];
  }>;
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipesByIngredient("chicken_breast").then((recipes: Recipe[]) => {
      dispatch({ type: RECIPE_ACTIONS.UPDATE, payload: recipes });
    });
  }, [dispatch]);

  const handleRecipeClick = (idMeal: string): void => {
    navigate(`/recipe/${idMeal}`);
  };

  return (
    <>
      {recipesState.recipes.length > 0 ? (
        <ul className="recipe-list">
          {recipesState.recipes.map((recipe) => (
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
