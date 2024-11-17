import {
  useRecipes,
  useRecipesDispatch,
  RECIPE_ACTIONS,
} from "../RecipesProvider";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

// API'den dönen öğe tiplerini tanımlıyoruz
interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export const RecipeList = () => {
  const recipes = useRecipes();
  const dispatch = useRecipesDispatch(); 

  // useEffect ile sayfa yüklendiğinde API'den tarifleri çekecek
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          ("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"),
        );
        const data = await response.json();
        

        if (data.meals) {
          dispatch({ type: RECIPE_ACTIONS.update, payload: data.meals });
        }
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    fetchRecipes(); // API çağrısını başlatır
  }, [dispatch]);

  const handleRecipeClick = (idMeal: string): void => {
    console.log("Recipe clicked:", idMeal);
  };

  return (
    <>
      {recipes.length > 0 ? (
        <ul className="recipe-list">
          {recipes.map((recipe: Recipe) => (
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