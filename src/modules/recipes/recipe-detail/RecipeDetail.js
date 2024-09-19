
import './RecipeDetail.css';

export const RecipeDetail = ({ recipe }) => {
    if (!recipe) return null;

    return (
        <div className='recipe-detail'>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h2>{recipe.strMeal}</h2>
            <p>{recipe.strInstructions}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
        </div>
    );
};
