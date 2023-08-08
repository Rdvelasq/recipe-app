import { useEffect, useState } from "react";

import "./App.css";
import RecipeList from "./components/RecipeList";
import RecipeForm, { IRecipe } from "./components/RecipeForm";
import { useColorMode, Button } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import {
  createRecipe,
  deleteRecipe,
  getRecipes,
  updateRecipe,
} from "./services/api";

function App() {
  const [recipeList, setRecipeList] = useState<IRecipe[]>([]);
  const [isEditingRecipe, setIsEditingRecipt] = useState<IRecipe | null>(null);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const recipes = await getRecipes();
    setRecipeList(recipes);
  };

  const addRecipeHandler = async (newRecipe: IRecipe) => {
    await createRecipe(newRecipe);
    fetchRecipes();
  };
  const deleteRecipeHandler = async (recipe: IRecipe) => {
    const response = await deleteRecipe(recipe);
    console.log(response.message);
    fetchRecipes();
  };

  const editingRecipeHandler = (recipe: IRecipe) => {
    setIsEditingRecipt(recipe);
  };

  const updateRecipeHandler = async (updatedRecipe: IRecipe) => {
    console.log(updatedRecipe);
    const reponse = await updateRecipe(updatedRecipe);
    console.log(reponse);
    fetchRecipes();
    setIsEditingRecipt(null);
  };

  return (
    <>
      <Button onClick={toggleColorMode}>
        {" "}
        Toggle {colorMode === "light" ? "Dark" : "Light"}{" "}
      </Button>

      {/* <RecipeForm
        onAddRecipe={addRecipeHandler}
        isEditingRecipe={isEditingRecipe}
        onUpdateRecipe={updateRecipeHandler}
      /> */}
      <BrowserRouter>
        <Link to="/create-recipe">
          <Button>Create Recipe</Button>
        </Link>
        <Routes>
          <Route
            path="/"
            element={
              <RecipeList
                recipesList={recipeList}
                onDeleteRecipe={deleteRecipeHandler}
                onEditRecipe={editingRecipeHandler}
              />
            }
          ></Route>
          <Route
            path="/create-recipe"
            element={
              <RecipeForm
                onAddRecipe={addRecipeHandler}
                isEditingRecipe={isEditingRecipe}
                onUpdateRecipe={updateRecipeHandler}
              />
            }
          ></Route>
          <Route path="/"></Route>
        </Routes>
      </BrowserRouter>
      {/* <RecipeList
        recipesList={recipeList}
        onDeleteRecipe={deleteRecipeHandler}
        onEditRecipe={editingRecipeHandler}
      /> */}
    </>
  );
}

export default App;
