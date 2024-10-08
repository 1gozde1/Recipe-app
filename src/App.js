import { useState } from "react";
import { UserProvider } from "./Contexts/UserContext";
import { NavBar } from "./shared-components/NavBar";
import { fetchRecipeDetailsById } from "./modules/recipes/recipeService";
import { AppRouter } from "./AppRouter";
import "./App.css";

export const App = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeClick = async (idMeal) => {
    const details = await fetchRecipeDetailsById(idMeal);
    setSelectedRecipe(details);
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
