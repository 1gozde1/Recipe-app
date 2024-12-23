import { useForm, useFieldArray } from "react-hook-form";
import { useRecipesDispatch, RECIPE_ACTIONS } from "../RecipesProvider";
import { useState } from "react";
import "./styles.css";

export const NewRecipeForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useRecipesDispatch();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      strMeal: "",
      strCategory: "Beef",
      strArea: "Asian",
      ingredients: [{ ingredient: "", measure: "", amount: "" }],
      strInstructions: "",
      strMealImage: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit = (data) => {
    const newRecipe = {
      idMeal: Date.now().toString(),
      strMeal: data.strMeal,
      strCategory: data.strCategory,
      strArea: data.strArea,
      strInstructions: data.strInstructions,
      strMealThumb: data.strMealImage,
    };

    // Malzemeleri ve ölçüleri ayırma işlemi
    data.ingredients.forEach((item, index) => {
      if (index < 20) {
        newRecipe[`strIngredient${index + 1}`] = item.ingredient;
        newRecipe[`strMeasure${index + 1}`] = item.amount
          ? `${item.amount} ${item.measure}`
          : "";
      }
    });

    // Eğer 20'den az malzeme varsa, kalan alanları boş yapar
    for (let i = data.ingredients.length; i < 20; i++) {
      newRecipe[`strIngredient${i + 1}`] = "";
      newRecipe[`strMeasure${i + 1}`] = "";
    }

    // Yeni tarifi Recipe Context'e ekle
    dispatch({ type: RECIPE_ACTIONS.update, payload: [newRecipe] });

    // Formu sıfırla ve başarı mesajını göster
    reset();
    setSuccessMessage("Recipe added successfully!");
    setTimeout(() => setSuccessMessage(""), 5000); // 5 saniye sonra mesajı temizle
  };

  return (
    <div className="form-container">
      <h2>Add New Recipe</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="strMeal">Meal Name</label>
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
          {errors.strMeal && (
            <p className="error-message">{errors.strMeal.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="strCategory">Select Category</label>
          <select id="strCategory" {...register("strCategory")}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="strArea">Select Area</label>
          <select id="strArea" {...register("strArea")}>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          {fields.map((field, index) => (
            <div key={field.id}>
              <div className="ingredient-item">
                <input
                  {...register(`ingredients.${index}.ingredient`, {
                    required: "Ingredient is required.",
                  })}
                  placeholder="Ingredient"
                />
                <input
                  type="text"
                  {...register(`ingredients.${index}.amount`, {
                    required: "Amount is required.",
                    pattern: {
                      value: /^(\d+(\.\d+)?|\d+(\d+)?)/,
                      message: "Please enter a valid amount.",
                    },
                  })}
                  placeholder="Amount"
                />

                <select {...register(`ingredients.${index}.measure`)}>
                  <option value="">Measure</option>
                  <option value="grams">Grams</option>
                  <option value="liters">Liters</option>
                  <option value="pieces">Pieces</option>
                </select>
                <button
                  className="btn-primary"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              </div>
              {errors.ingredients?.[index]?.ingredient && (
                <p className="error-message">
                  {errors.ingredients[index].ingredient.message}
                </p>
              )}
            </div>
          ))}
          <button
            className="btn-primary"
            onClick={() => append({ ingredient: "", measure: "", amount: "" })}
          >
            Add Ingredient
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="strInstructions">Instructions</label>
          <textarea
            id="strInstructions"
            {...register("strInstructions", {
              required: "Instructions are required.",
            })}
          />
          {errors.strInstructions && (
            <p className="error-message">{errors.strInstructions.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="strMealImage">Meal Image URL</label>
          <input
            id="strMealImage"
            {...register("strMealImage", {
              required: "An image is required.",
              pattern: {
                value:
                  /^https:\/\/(?:www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
                message: "Please enter a valid URL for an image.",
              },
            })}
          />
          {errors.strMealImage && (
            <p className="error-message">{errors.strMealImage.message}</p>
          )}
        </div>

        <button type="submit" className="btn-primary">
          Submit
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
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
  "Other",
];

const areas = [
  "Italian",
  "Chinese",
  "Mexican",
  "Japanese",
  "Indian",
  "American",
  "French",
  "Mediterranean",
  "Middle Eastern",
  "Thai",
  "Asian",
  "Other",
];
