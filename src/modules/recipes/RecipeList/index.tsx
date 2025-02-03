import { Link } from "react-router-dom";
import { useRecipes } from "../RecipesProvider";
import "./styles.css";

export const RecipeList = () => {
  const recipesState = useRecipes();

  if (!recipesState.recipes || recipesState.recipes.length === 0)
    return <p>No recipes found...</p>;

  return (
    <div>
      <ul className="recipe-list">
        {recipesState.recipes.map((recipe) => (
          <li key={recipe.idMeal}>
            <Link to={`/recipes/${recipe.idMeal}`}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h3>{recipe.strMeal}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
