import { useEffect } from 'react';
import { useRecipes, useRecipesDispatch, RECIPE_ACTIONS } from '../RecipesProvider';
import { fetchRecipesByIngredient } from '../recipeService';
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
