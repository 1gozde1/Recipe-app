import { useForm } from "react-hook-form";
import "./styles.css";

export const NewRecipeForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    strMeal: "",
    strCategory: "Beef",
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    //TODO: Add new recipe data to Recipe store (Context)
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
