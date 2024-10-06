import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Contexts/UserContext";
import { NavBar } from "./shared-components/NavBar";
import { SearchBar } from "./modules/recipes/SearchBar";
import { RecipeList } from "./modules/recipes/RecipeList";
import { RecipeDetails } from "./modules/recipes/RecipeDetails";
import { Categories } from "./modules/recipes/Categories";
import { CategoryDetails } from "./modules/recipes/CategoryDetails";
import { CreateRecipe } from "./modules/recipes/CreateRecipe";
import { ProtectedRoute } from "./ProtectedRoute";
import { fetchRecipeDetailsById } from "./modules/recipes/recipeService";
import { useEffect } from 'react';
import "./App.css";

export const App = ({ recipes, onRecipeClick }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // API çağrısı burada yapılabilir
    // Veri yüklendiğinde setIsLoading(false) yapın
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleRecipeClick = async (idMeal) => {
    const details = await fetchRecipeDetailsById(idMeal);
    setSelectedRecipe(details);
    if (onRecipeClick) {
      onRecipeClick(details);
    }
  };

  return (
    <UserProvider>
      <Router>
        <NavBar />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchBar />
                  {recipes && recipes.length > 0 ? (
                    <RecipeList
                      recipes={recipes}
                      onRecipeClick={handleRecipeClick}
                    />
                  ) : (
                    <></>
                  )}
                  {selectedRecipe && <RecipeDetails recipe={selectedRecipe} />}
                </>
              }
            />
            <Route path="/recipes/categories" element={<Categories />} />
            <Route
              path="/recipes/category/:category"
              element={<CategoryDetails />}
            />
            <Route
              path="/recipes/create"
              element={
                <ProtectedRoute>
                  <CreateRecipe />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};
