import { useState } from "react";
import { UserProvider } from "./modules/user/UserContext";
import { NavBar } from "./shared-components/NavBar";
import { fetchRecipeDetailsById } from "./modules/recipes/recipeService";
import { AppRouter } from "./AppRouter";
import { useRecipes } from "./modules/recipes/RecipesProvider";
import "./App.css";

export const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // recipe contextten tarifleri alıyoruz
  const recipes = useRecipes();

  const handleRecipeClick = async (idMeal) => {
    const details = await fetchRecipeDetailsById(idMeal);
    setSelectedRecipe(details);
  };

  return (
    <UserProvider>
      <NavBar />
      <div className="container">
        <AppRouter
          handleRecipeClick={handleRecipeClick}
          selectedRecipe={selectedRecipe}
        />
      </div>
    </UserProvider>
  );
};
