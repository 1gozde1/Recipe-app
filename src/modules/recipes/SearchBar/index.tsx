import React, { useState, ChangeEvent, FormEvent } from "react";
import "./styles.css";
import { fetchRecipeById } from "../api";
import { RECIPE_ACTIONS, useRecipesDispatch } from "../RecipesProvider";
import { Recipe } from "../models";

export const SearchBar = () => {
  const [query, setQuery] = useState<string>(""); // query değişkeni string türünde olacak
  const dispatch = useRecipesDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value.trim());
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const recipeDetail = await fetchRecipeById(query);
    dispatch({ TYPE: RECIPE_ACTIONS.REFRESH, payload: [recipeDetail] });
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
