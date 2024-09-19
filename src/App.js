import React, { useState, useEffect } from 'react';
import { SearchBar } from './modules/recipes/search-bar';
import { fetchRecipesByIngredient, fetchRecipeDetailsById } from './modules/recipes/recipeService';
import './App.css';
import { RecipeList } from './modules/recipes/recipe-list/RecipeList';
import { RecipeDetail } from './modules/recipes/recipe-detail/RecipeDetail.js'; 

export const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null); 

    useEffect(() => {
        fetchRecipesByIngredient('chicken_breast').then((recipes) =>
            setRecipes(recipes.length > 0 ? recipes : []),
        );
    }, []);

    const handleRecipeClick = async (idMeal) => {
        const details = await fetchRecipeDetailsById(idMeal);
        setSelectedRecipe(details);
    };

    return (
        <div className='container'>
            <header>Recipe Search App</header>
            <SearchBar />
            {recipes.length > 0 ? (
                <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
            ) : (
                <></>
            )}
            {selectedRecipe && <RecipeDetail recipe={selectedRecipe} />} {/* Detaylı tarif bileşenini göster */}
        </div>
    );
};





