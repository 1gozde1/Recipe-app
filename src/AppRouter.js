import { Routes, Route } from "react-router-dom";
import { FeaturedRecipes } from "./modules/recipes/FeaturedRecipes";
import { RecipeList } from "./modules/recipes/RecipeList";
import { SearchBar } from "./modules/recipes/SearchBar";
import { RecipeDetails } from "./modules/recipes/RecipeDetails";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<h1>Login page</h1>} />
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
      </Route>

      <Route path="/" element={<FeaturedRecipes />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
};
