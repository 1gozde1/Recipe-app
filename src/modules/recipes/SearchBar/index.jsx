import { useState } from "react";
import "./styles.css";
import { searchRecipesByName } from "../recipeService";
import { RECIPE_ACTIONS, useRecipesDispatch } from "../RecipesProvider";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useRecipesDispatch();

  function handleChange(e) {
    setQuery(e.target.value.trim());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const recipes = await searchRecipesByName(query);
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
