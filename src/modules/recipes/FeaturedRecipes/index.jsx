
import { useEffect } from 'react';
import { useRecipes, useRecipesDispatch, RECIPE_ACTIONS } from '../RecipesProvider';
import { fetchRecipesByIngredient } from '../recipeService';



export const FeaturedRecipes = () => {
    const recipes = useRecipes();
    const dispatch = useRecipesDispatch();

    useEffect(() => {
        fetchRecipesByIngredient('chicken_breast').then((recipes) =>
            dispatch({ type: RECIPE_ACTIONS.update, payload: recipes })
        );
    }, [dispatch]);

    // use RecipeList component to display the list of recipe below

    const handleRecipeClick = (idMeal) => {
        console.log('Recipe clicked:', idMeal);
    };

    return (
        <>
            {recipes.length > 0 ? (
                <ul className='recipe-list'>
                    {recipes.map((recipe) => (
                        <li key={recipe.idMeal} onClick={() => handleRecipeClick(recipe.idMeal)}>
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                            <h3>{recipe.strMeal}</h3>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='no-recipes'>No recipes found</p>
            )}
        </>
    );
};


import { useEffect } from "react";
import { useRecipesDispatch, RECIPE_ACTIONS } from "../RecipesProvider";
import { fetchRecipesByIngredient } from "../recipeService";
import { RecipeList } from "../RecipeList"; // RecipeList bileşenini buraya dahil ediyoruz

export const FeaturedRecipes = () => {
  const dispatch = useRecipesDispatch();

  useEffect(() => {
    const fetchAndUpdateRecipes = async () => {
      try {
        // Chicken breast içerikli tarifleri API'den çekiyoruz
        const recipes = await fetchRecipesByIngredient("chicken_breast");
        dispatch({ type: RECIPE_ACTIONS.update, payload: recipes });
      } catch (error) {
        console.error("Failed to fetch featured recipes:", error);
      }
    };

    fetchAndUpdateRecipes();
  }, [dispatch]);

  return (
    <div>
      {/* RecipeList bileşenini burada kullanıyoruz */}
      <RecipeList />
    </div>
  );
};

