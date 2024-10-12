import { useForm } from "react-hook-form";
import { useRecipesDispatch } from "../RecipesProvider";
import { RECIPE_ACTIONS } from "../RecipesProvider";
import "./styles.css";

export const NewRecipeForm = () => {
  const dispatch = useRecipesDispatch(); // Dispatch fonksiyonunu al
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      strMeal: "",
      strCategory: "Beef",
      strInstructions: "",
      strMealImage: "",
    },
  });

  const onSubmit = (data) => {
    const newRecipe = {
      idMeal: Date.now().toString(), // Geçici bir ID oluştur
      strMeal: data.strMeal,
      strCategory: data.strCategory,
      strInstructions: data.strInstructions,
      strMealThumb: data.strMealImage, // Resim URL'si
    };

    // Yeni tarifi ekle
    dispatch({ type: RECIPE_ACTIONS.update, payload: [newRecipe] });
    console.log("Form submitted:", newRecipe);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="strMeal">Meal name</label>
      <input
        id="strMeal"
        {...register("strMeal", {
          minLength: {
            value: 3,
            message: "Meal name should be at least 3 characters.",
          },
          required: "Meal name is required.",
        })}
      />
      {errors.strMeal && <p>{errors.strMeal.message}</p>}

      <label htmlFor="strCategory">Select Category</label>
      <select id="strCategory" {...register("strCategory")}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label htmlFor="strInstructions">Instructions</label>
      <textarea
        id="strInstructions"
        {...register("strInstructions", {
          required: "Instructions are required.",
        })}
      />
      {errors.strInstructions && <p>{errors.strInstructions.message}</p>}

      <label htmlFor="strMealImage">Meal Image</label>
      <input
        id="strMealImage"
        {...register("strMealImage", {
          pattern: {
            value: /https?:\/\/.+\.(jpg|jpeg|png)$/,
            message: "Please enter a valid URL.",
          },
        })}
      />
      {errors.strMealImage && <p>{errors.strMealImage.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

const categories = [
  "Beef",
  "Chicken",
  "Dessert",
  "Lamb",
  "Miscellaneous",
  "Pasta",
  "Pork",
  "Seafood",
  "Side",
  "Starter",
  "Vegan",
  "Vegetarian",
  "Breakfast",
  "Goat",
];
