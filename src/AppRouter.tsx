import { Routes, Route } from "react-router-dom";
import { SearchBar } from "./modules/recipes/SearchBar";
import { RecipeDetails } from "./modules/recipes/RecipeDetails";
import { ProtectedRoute } from "./ProtectedRoute";
import { NewRecipeForm } from "./modules/recipes/NewRecipeForm";
import { Login } from "./modules/user/Login";
import { RecipeList } from "./modules/recipes/RecipeList";
import { CategoryDetails } from "./modules/recipes/CategoryDetails";
import { Register } from "./modules/user/Register";
import { FeaturedRecipes } from "./modules/recipes/FeaturedRecipes";

export const AppRouter = () => {
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
              <RecipeList />
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
