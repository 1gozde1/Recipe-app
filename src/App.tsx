import { useState } from "react";
import { UserProvider } from "./modules/user/UserContext";
import { NavBar } from "./shared-components/NavBar";
import { fetchRecipeDetailsById } from "./modules/recipes/recipeService";
import { AppRouter } from "./AppRouter";
import { useRecipes } from "./modules/recipes/RecipesProvider";
import "./App.css";

interface RecipeDetails {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  ingredients: string[];
}

export const App: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetails | null>(
    null
  );

  // recipe contextten tarifleri alıyoruz
  const recipes = useRecipes();

  const handleRecipeClick = async (idMeal: string) => {
    const details = await fetchRecipeDetailsById(idMeal);
    setSelectedRecipe(details);
  };

  return (
    <UserProvider>
      <NavBar />
      <div className="container">
        <AppRouter
          onRecipeClick={handleRecipeClick}
          selectedRecipe={selectedRecipe}
        />
      </div>
    </UserProvider>
  );
};
