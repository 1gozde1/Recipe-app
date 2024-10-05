import { SearchBar } from "./modules/recipes/search-bar";
import { fetchRecipeDetailsById } from "./modules/recipes/recipeService";
import "./App.css";
import { RecipeList } from "./modules/recipes/recipe-list/RecipeList";
import { RecipeDetail } from "./modules/recipes/recipe-detail/RecipeDetail.js";
import { AppRouter } from "./AppRouter.js";
import { useState } from "react";
import { Navbar } from "./shared-components/NavBar";

export const App = ({ recipes, onRecipeClick }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeClick = async (idMeal) => {
    const details = await fetchRecipeDetailsById(idMeal);
    setSelectedRecipe(details);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <AppRouter />
        <SearchBar />
        {recipes.length > 0 ? (
          <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
        ) : (
          <></>
        )}
        {selectedRecipe && <RecipeDetail recipe={selectedRecipe} />}
      </div>
    </>
  );
};
