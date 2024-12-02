// Bu dosyayı oluşturun
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchRecipesByCategory } from "../recipeService";
import "./styles.css";

export const CategoryDetails = () => {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipesByCategory(category);
        setRecipes(data);
      } catch (err) {
        setError("Recipes could not be reached");
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [category]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-details">
      <h1>{category} Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.idMeal}>
            <Link to={`/recipe/${recipe.idMeal}`}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h2>{recipe.strMeal}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
