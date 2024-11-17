import { useEffect } from "react";
import {
  useRecipes,
  useRecipesDispatch,
  RECIPE_ACTIONS,
} from "../RecipesProvider";
import { fetchRecipesByIngredient } from "../recipeService";

// Recipe tipini tanımlıyoruz
interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export const FeaturedRecipes: React.FC = () => {
  // useRecipes ve useRecipesDispatch türlerini tanımlıyoruz
  const recipes = useRecipes() as Recipe[]; // recipes'in bir Recipe listesi olduğunu belirtiyoruz
  const dispatch = useRecipesDispatch() as React.Dispatch<{
    type: string;
    payload: Recipe[];
  }>;

  useEffect(() => {
    // fetchRecipesByIngredient fonksiyonunun doğru bir Recipe[] döndüğünü belirtiyoruz
    fetchRecipesByIngredient("chicken_breast").then((recipes: Recipe[]) =>
      dispatch({ type: RECIPE_ACTIONS.update, payload: recipes })
    );
  }, [dispatch]);

  // handleRecipeClick fonksiyonuna idMeal'in tipini belirtiyoruz
  const handleRecipeClick = (idMeal: string): void => {
    console.log("Recipe clicked:", idMeal);
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
