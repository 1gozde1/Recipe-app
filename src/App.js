import { useState } from "react";
import { UserProvider } from "./Contexts/UserContext";
import { NavBar } from "./shared-components/NavBar";
import { AppRouter } from "./AppRouter";
import { fetchRecipeById } from "./modules/recipes/recipeService";
import "./App.css";

export const App = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeClick = async (idMeal) => {
    try {
      const details = await fetchRecipeById(idMeal);
      setSelectedRecipe(details);
    } catch (error) {
      console.error("Failed to fetch recipe details:", error);
    }
  };

  return (
    <UserProvider>
      <NavBar />
      <div className="container">
        <AppRouter
          recipes={recipes}
          handleRecipeClick={handleRecipeClick}
          selectedRecipe={selectedRecipe}
        />
      </div>
    </UserProvider>
  );
};
