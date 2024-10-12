import { useRecipes, useRecipesDispatch } from "../RecipesProvider"; 
import { RECIPE_ACTIONS } from "../RecipesProvider";
import { Link } from "react-router-dom";
import "./styles.css";

// TODO: take recipes as props in this component.
export const RecipeList = () => {
  const recipes = useRecipes();
  const dispatch = useRecipesDispatch(); // Get dispatch fonksiyonu

  const handleRecipeClick = (idMeal) => {
    console.log("Recipe clicked:", idMeal);
  };

  const addNewRecipe = (newRecipe) => {
    dispatch({ type: RECIPE_ACTIONS.update, payload: [newRecipe] });
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
              <Link to={`/recipes/${recipe.idMeal}`}>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                <h3>{recipe.strMeal}</h3>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-recipes">No recipes found</p>
      )}
    </>
  );
};
