import React, { useEffect } from "react";
import { Recipe } from "../models";
import { fetchRecipesByIngredient } from "../api";
import {
  useRecipes,
  useRecipesDispatch,
  RECIPE_ACTIONS,
} from "../RecipesProvider";
import { RecipeList } from "../RecipeList";

export const FeaturedRecipes: React.FC = () => {
  const recipesState = useRecipes();
  const dispatch = useRecipesDispatch() as React.Dispatch<{
    type: string;
    payload: Recipe[];
  }>;

  useEffect(() => {
    
    if (recipesState.recipes.length > 0) return;
    
    fetchRecipesByIngredient("chicken_breast").then((recipes: Recipe[]) => {
      
      dispatch({ type: RECIPE_ACTIONS.UPDATE, payload: recipes });
    });
  }, [dispatch, recipesState.recipes.length]);

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

