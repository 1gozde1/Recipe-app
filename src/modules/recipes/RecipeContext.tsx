import React, { createContext, useContext, useState, ReactNode } from "react";
import { RecipeDetail } from "./models";

interface RecipeContextType {
  selectedRecipe: RecipeDetail | null;
  setSelectedRecipe: (recipe: RecipeDetail | null) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetail | null>(
    null
  );

  return (
    <RecipeContext.Provider value={{ selectedRecipe, setSelectedRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipeContext must be used within a RecipeProvider");
  }
  return context;
};
