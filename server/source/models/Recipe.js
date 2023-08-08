import mongoose from "mongoose";
const { Schema } = mongoose;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: [String],
  instructions: String,
  imageURL: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
