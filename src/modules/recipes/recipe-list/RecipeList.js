
import './RecipeList.css';

export const RecipeList = ({ recipes, onRecipeClick }) => {
    return (
        <ul>
            {recipes.map((recipe) => (
                <li key={recipe.idMeal} onClick={() => onRecipeClick(recipe.idMeal)}>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                    <h3>{recipe.strMeal}</h3>
                </li>
            ))}
        </ul>
    );
};
