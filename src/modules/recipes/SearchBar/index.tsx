import { useState, ChangeEvent, FormEvent } from "react";
import "./styles.css";
import { searchRecipesByName } from "../recipeService";
import { RECIPE_ACTIONS, useRecipesDispatch } from "../RecipesProvider";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export const SearchBar = () => {
  const [query, setQuery] = useState<string>(""); // query değişkeni string türünde olacak
  const dispatch = useRecipesDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value.trim());
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const recipes: Recipe[] = await searchRecipesByName(query);
    dispatch({ TYPE: RECIPE_ACTIONS.refresh, payload: recipes });
  }
  // TODO: Send request to search recipes

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        onChange={handleChange}
        aria-label="Recipe search"
        placeholder="Search for recipes..."
        className="search-input"
      />
    </form>
  );
};
