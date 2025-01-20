import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipesByCategory } from "../api";
import { Recipe, CategoryDetails } from "../models";

export const CategoryDetailsComponent: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [categoryDetails, setCategoryDetails] = useState<CategoryDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data: Recipe[] = await fetchRecipesByCategory(category!);
        const convertedData: CategoryDetails[] = data.map((recipe) => ({
          idCategory: recipe.idMeal,
          strCategory: recipe.strCategory as string,
          strCategoryThumb: recipe.strMealThumb || "",
          strCategoryDescription: "",
        }));
        setCategoryDetails(convertedData);
      } catch (err) {
        setError("Recipes could not be reached");
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [category]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-details">
      <h1>Category: {category}</h1>
      <ul>
        {categoryDetails.map((category) => (
          <li key={category.idCategory}>
            <h2>{category.strCategory}</h2>
            <img src={category.strCategoryThumb} alt={category.strCategory} />
            <p>{category.strCategoryDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
