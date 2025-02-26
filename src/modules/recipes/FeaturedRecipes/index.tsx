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
  const recipesState = useRecipes();
  const dispatch = useRecipesDispatch() as React.Dispatch<{
    type: string;
    payload: Recipe[];
  }>;

  useEffect(() => {
    
    if (recipesState.recipes.length > 0) return;
    
    fetchRecipesByIngredient("chicken_breast").then((recipes: Recipe[]) => {
      const mappedRecipes: Recipe[] = recipes.map((recipe) => ({
        idMeal: recipe.idMeal,
        strMeal: recipe.strMeal,
        strMealThumb: recipe.strMealThumb,
        strInstructions: recipe.strInstructions || "No instructions available",
        ingredients: [],
        strCategory: recipe.strCategory || "Unknown",
        strArea: recipe.strArea || "Unknown",
        strIngredient1: recipe.strIngredient1,
        strIngredient2: recipe.strIngredient2,
        strIngredient3: recipe.strIngredient3,
        strIngredient4: recipe.strIngredient4,
        strIngredient5: recipe.strIngredient5,
        strIngredient6: recipe.strIngredient6,
        strIngredient7: recipe.strIngredient7,
        strIngredient8: recipe.strIngredient8,
        strIngredient9: recipe.strIngredient9,
        strIngredient10: recipe.strIngredient10,
        strIngredient11: recipe.strIngredient11,
        strIngredient12: recipe.strIngredient12,
        strIngredient13: recipe.strIngredient13,
        strIngredient14: recipe.strIngredient14,
        strIngredient15: recipe.strIngredient15,
        strIngredient16: recipe.strIngredient16,
        strIngredient17: recipe.strIngredient17,
        strIngredient18: recipe.strIngredient18,
        strIngredient19: recipe.strIngredient19,
        strIngredient20: recipe.strIngredient20,
        strMeasure1: recipe.strMeasure1,
        strMeasure2: recipe.strMeasure2,
        strMeasure3: recipe.strMeasure3,
        strMeasure4: recipe.strMeasure4,
        strMeasure5: recipe.strMeasure5,
        strMeasure6: recipe.strMeasure6,
        strMeasure7: recipe.strMeasure7,
        strMeasure8: recipe.strMeasure8,
        strMeasure9: recipe.strMeasure9,
        strMeasure10: recipe.strMeasure10,
        strMeasure11: recipe.strMeasure11,
        strMeasure12: recipe.strMeasure12,
        strMeasure13: recipe.strMeasure13,
        strMeasure14: recipe.strMeasure14,
        strMeasure15: recipe.strMeasure15,
        strMeasure16: recipe.strMeasure16,
        strMeasure17: recipe.strMeasure17,
        strMeasure18: recipe.strMeasure18,
        strMeasure19: recipe.strMeasure19,
        strMeasure20: recipe.strMeasure20,
      }));
      dispatch({ type: RECIPE_ACTIONS.UPDATE, payload: mappedRecipes });
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

