import { SearchBar } from './modules/recipes/search-bar';
import { fetchRecipesByIngredient } from './modules/recipes/recipeService';
import './App.css';
import { useState, useEffect } from 'react';

export const App = () => {
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		fetchRecipesByIngredient('chicken_breast').then((recipes) =>
			setRecipes(recipes.length > 0 ? recipes : []),
		);
	}, []);

	return (
		<div className='container'>
			<header>Recipe Search App</header>
			<SearchBar />
			{recipes.length > 0 ? (
				<ul>
					{recipes.map((recipe) => (
						<li key={recipe.idMeal}>{recipe.strMeal}</li>
					))}
				</ul>
			) : (
				<></>
			)}
		</div>
	);
};
