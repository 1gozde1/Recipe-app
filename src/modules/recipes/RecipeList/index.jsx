import { useRecipes } from "../RecipesProvider";
import { Link } from "react-router-dom";
import "./styles.css";

export const RecipeList = () => {
  // Tarife erişim context üzerinden yapılacak
  const recipes = useRecipes();

  return (
    <>
      {recipes.length > 0 ? (
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li
              key={recipe.idMeal}
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
