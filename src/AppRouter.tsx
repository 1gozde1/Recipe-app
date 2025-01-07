import React from "react";
import { Routes, Route } from "react-router-dom";
import { SearchBar } from "./modules/recipes/SearchBar";
import { RecipeDetails } from "./modules/recipes/RecipeDetails";
import { ProtectedRoute } from "./ProtectedRoute";
import { NewRecipeForm } from "./modules/recipes/NewRecipeForm";
import { Login } from "./modules/user/Login";
import { Categories } from "./modules/recipes/Categories";
import { CategoryDetails } from "./modules/recipes/CategoryDetails";
import { Register } from "./modules/user/Register";
import { useRecipes } from "./modules/recipes/RecipesProvider";
import { FeaturedRecipes } from "./modules/recipes/FeaturedRecipes";
import { fetchRecipeById } from "./modules/recipes/api";

export const AppRouter: React.FC = () => {
  const recipes = useRecipes();
  const setSelectedRecipe = (recipe: any) => {
    // Add your logic to set the selected recipe
  };

  const handleRecipeClick = async (idMeal: string) => {
    const details = await fetchRecipeById(idMeal);
    setSelectedRecipe(details);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <h1>User page</h1>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <h1>Settings page</h1>
          </ProtectedRoute>
        }
      />
      <Route
        path="/recipes/new"
        element={
          <ProtectedRoute>
            <NewRecipeForm />
          </ProtectedRoute>
        }
      />

      <Route path="/recipes">
        <Route
          path="search"
          element={
            <>
              <SearchBar />
              <Categories />
            </>
          }
        />
        <Route path=":recipeId" element={<RecipeDetails />} />

        <Route path="category/:category" element={<CategoryDetails />} />
      </Route>

      <Route
        path="/"
        element={
          <>
            <SearchBar />
            <FeaturedRecipes />
          </>
        }
      />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
};
