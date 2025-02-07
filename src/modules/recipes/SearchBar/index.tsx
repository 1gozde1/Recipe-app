import { useState, ChangeEvent, FormEvent } from "react";
import "./styles.css";
import { fetchRecipesByIngredient } from "../api";
import { RECIPE_ACTIONS, useRecipesDispatch} from "../RecipesProvider";

export const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const dispatch = useRecipesDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value.trim());
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const recipes = await fetchRecipesByIngredient(query);
      dispatch({ type: RECIPE_ACTIONS.REFRESH, payload: recipes });
  }

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
