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
  const [isEditingRecipe, setIsEditingRecipe] = useState<IRecipe | null>(null);
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
    setIsEditingRecipe(recipe);
  };

  const updateRecipeHandler = async (updatedRecipe: IRecipe) => {
    console.log(updatedRecipe);
    const reponse = await updateRecipe(updatedRecipe);
    console.log(reponse);
    fetchRecipes();
    setIsEditingRecipe(null);
  };

  return (
    <>
      <Button onClick={toggleColorMode}>
        {" "}
        Toggle {colorMode === "light" ? "Dark" : "Light"}{" "}
      </Button>

      <BrowserRouter>
        <Link to="/create-recipe">
          <Button onClick={() => setIsEditingRecipe(null)}>
            Create Recipe
          </Button>
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
          <Route
            path="/edit-recipe"
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
