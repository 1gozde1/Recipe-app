import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Recipe } from "./models";

export enum RECIPE_ACTIONS {
  UPDATE = "update",
  REFRESH = "refresh",
  DELETE_ALL = "delete_all",
}

interface RecipesState {
  recipes: Recipe[];
  isLoading: boolean;
}

interface RecipesProviderProps {
  children: ReactNode;
  initialState?: RecipesState;
}

const initialState: RecipesState = {
  recipes: [],
  isLoading: false,
};

export const RecipesContext = createContext<RecipesState | undefined>(
  undefined
);
export const RecipesDispatchContext = createContext<
  React.Dispatch<any> | undefined
>(undefined);

export const RecipesProvider: React.FC<RecipesProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(recipesReducer, initialState);

  return (
    <RecipesContext.Provider value={state}>
      <RecipesDispatchContext.Provider value={dispatch}>
        {children}
      </RecipesDispatchContext.Provider>
    </RecipesContext.Provider>
  );
};

function recipesReducer(
  state: RecipesState,
  action: { type: RECIPE_ACTIONS; payload?: any }
): RecipesState {
  switch (action.type) {
    case RECIPE_ACTIONS.UPDATE: {
      const newRecipes = action.payload.filter(
				(payloadItem: Recipe) =>
					!state.recipes.some((recipe: Recipe) => recipe.idMeal === payloadItem.idMeal)
			);
      return { ...state, recipes: [ ...newRecipes, ...state.recipes] };
    }
    case RECIPE_ACTIONS.REFRESH: {
      return { ...state, recipes: action.payload };
    }
    case RECIPE_ACTIONS.DELETE_ALL: {
      return { ...state, recipes: [] };
    }
    default: {
      return state;
    }
  }
}

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipesProvider");
  }
  return context;
};

export const useRecipesDispatch = () => {
  const context = useContext(RecipesDispatchContext);
  if (!context) {
    throw new Error("useRecipesDispatch must be used within a RecipesProvider");
  }
  return context;
}
