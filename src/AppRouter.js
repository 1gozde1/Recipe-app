import { Routes, Route } from "react-router-dom";
import { RecipeList } from "./modules/recipes/RecipeList";
import { SearchBar } from "./modules/recipes/SearchBar";
import { RecipeDetails } from "./modules/recipes/RecipeDetails";
import { ProtectedRoute } from "./ProtectedRoute";
import { CreateRecipe } from "./modules/recipes/CreateRecipe";
import { Login } from "./modules/recipes/Login";
import { Categories } from "./modules/recipes/Categories"; // Kategorileri import et
import { CategoryDetails } from "./modules/recipes/CategoryDetails"; // Kategori detaylarını import et

export const AppRouter = ({ recipes, onRecipeClick }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
              <RecipeList recipes={recipes} onRecipeClick={onRecipeClick} />
            </>
          }
        />
        <Route path=":recipeId" element={<RecipeDetails />} />
        <Route
          path="create"
          element={
            <ProtectedRoute>
              <CreateRecipe />
            </ProtectedRoute>
          }
        />
        <Route path="categories" element={<Categories />} />
        <Route path="category/:category" element={<CategoryDetails />} />
      </Route>
      <Route
        path="/recipes/create"
        element={
          <ProtectedRoute>
            <CreateRecipe />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<SearchBar />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
};
