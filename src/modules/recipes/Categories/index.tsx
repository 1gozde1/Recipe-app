import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../api";

// Category tipi 
type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
};

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError("Categories could not be reached");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="categories">
      <h1>Food categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.idCategory}>
            <Link to={`/recipes/category/${category.strCategory}`}>
              <img src={category.strCategoryThumb} alt={category.strCategory} />
              <h2>{category.strCategory}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};