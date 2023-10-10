import express from "express";
import Recipe from "../models/Recipe.js";
import mongoose from "mongoose";

const router = express.Router();

const validateObjectId = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Unable to locate recipe" });
  }

  next();
};

router.post("/", async (req, res) => {
  const newRecipe = new Recipe(req.body);

  try {
    const savedRecipe = await newRecipe.save();
    res.status(201).json({ message: "Recipe Saved", data: savedRecipe });
  } catch (e) {
    res
      .status(400)
      .json({ message: "An error has occurred while creating a recipe" });
  }
});

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error has occurred while getting the recipes" });
  }
});

router.get("/:id", validateObjectId, async (req, res) => {
  const id = req.params.id;
  try {
    const recipe = await Recipe.findById(id);
    res.json(recipe);
  } catch (e) {
    res.status(500).json({ message: "Am error occure while getting a recipe" });
  }
});

router.delete("/:id", validateObjectId, async (req, res) => {
  const id = req.params.id;
  try {
    await Recipe.findByIdAndDelete(id);
    res.status(200).json({ message: "Recipe deleted" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occured while deleting a recipe" });
  }
});

router.patch("/:id", validateObjectId, async (req, res) => {
  const id = req.params.id;
  const newTitle = req.body.title;
  const newIngredients = req.body.ingredients;
  const newInstructions = req.body.instructions;
  const newImageURL = req.body.imageURL;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        title: newTitle,
        ingredients: newIngredients,
        instructions: newInstructions,
        imageURL: newImageURL,
      },
      { new: true }
    );
    res.status(200).json({ message: "Recipe Updated", data: updatedRecipe });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occured while updating a recipe" });
  }
});

export default router;
