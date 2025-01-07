import React from "react";
import { RecipesProvider } from "./modules/recipes/RecipesProvider";
import { UserProvider } from "./modules/user/UserContext";
import { NavBar } from "./shared-components/NavBar";
import { AppRouter } from "./AppRouter";
import "./App.css";

export const App: React.FC = () => {
  return (
    <UserProvider>
      <RecipesProvider initialState={{ recipes: [], isLoading: false }}>
        <NavBar />
        <div className="container">
          <AppRouter />
        </div>
      </RecipesProvider>
    </UserProvider>
  );
};
