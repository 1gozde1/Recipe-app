import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../recipeService";
import "./styles.css";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            <Link to={`/categories/${category.strCategory}`}>
              <img src={category.strCategoryThumb} alt={category.strCategory} />
              <h2>{category.strCategory}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
