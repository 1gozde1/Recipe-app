import { useForm, useFieldArray } from "react-hook-form";
import { useRecipesDispatch } from "../RecipesProvider";
import { RECIPE_ACTIONS } from "../RecipesProvider";
import "./styles.css";

export const NewRecipeForm = () => {
  const dispatch = useRecipesDispatch();
  const {
    register,
    handleSubmit,
    control,
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
      ingredients: data.ingredients,
    };

    dispatch({ type: RECIPE_ACTIONS.update, payload: [newRecipe] });
    console.log("Form submitted:", newRecipe);
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
            <div key={field.id} className="ingredient-item">
              <input
                {...register(`ingredients.${index}.ingredient`, {
                  required: "Ingredient is required.",
                })}
                placeholder="Ingredient"
              />
              <input
                type="number"
                {...register(`ingredients.${index}.amount`, {
                  required: "Amount is required.",
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
                type="button"
                className="remove-button"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-button"
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
              pattern: {
                value: /https?:\/\/.+\.(jpg|jpeg|png)$/,
                message: "Please enter a valid URL.",
              },
            })}
          />
          {errors.strMealImage && (
            <p className="error-message">{errors.strMealImage.message}</p>
          )}
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
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
