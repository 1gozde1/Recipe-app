import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecipesProvider } from "./modules/recipes/RecipesProvider";
import { BrowserRouter } from "react-router-dom";

// RecipesProvider için initialState tanımlandı
const initialRecipesState = {
  recipes: [],
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecipesProvider initialState={initialRecipesState}>
        <App />
      </RecipesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Performans ölçümleme
reportWebVitals();
