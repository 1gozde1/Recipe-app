import { useEffect } from "react";
import "./styles.css";

export const CreateRecipe = () => {
  useEffect(() => {
    document.title = "Create Recipe";
  }, []);

  return (
    <div>
      <h1>Create New Recipe</h1>
      <p>Create new recipe page</p>
      {/*BURAYA İLERİDE FORM EKLENEBİLİR*/}
    </div>
  );
};
