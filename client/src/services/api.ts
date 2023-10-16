import axios from "axios";
import { IRecipe } from "../components/RecipeForm";

const API_URL =
  "https://recipe-keeper-keeper.onrender.com/api/recipes" ||
  "http://localhost:3000/api/recipes";

export const createRecipe = async (newRecipe: IRecipe) => {
  const response = await axios.post(API_URL, newRecipe);
  return response;
};

export const deleteRecipe = async (recipe: IRecipe) => {
  try {
    const response = await axios.delete(`${API_URL}/${recipe._id}`);
    return response.data;
  } catch (e) {
    console.log("Failed to delete", e);
  }
};

export const getRecipes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateRecipe = async (recipe: IRecipe) => {
  const response = await axios.patch(`${API_URL}/${recipe._id}`, recipe);
  return response;
};
