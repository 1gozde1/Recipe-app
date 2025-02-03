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
      const mappedRecipes: Recipe[] = recipes.map((recipe) => ({
        ...recipe,
        strInstructions: recipe.strInstructions || "No instructions available",
        strCategory: recipe.strCategory || "Unknown",
        strArea: recipe.strArea || "Unknown",
      }));
      dispatch({ type: RECIPE_ACTIONS.UPDATE, payload: mappedRecipes });
    });
  }, [dispatch, recipesState.recipes.length]);

  return <RecipeList />;
};
