import { FC } from "react";

import { IRecipe } from "./RecipeForm";
import {
  Heading,
  Button,
  GridItem,
  Box,
  Grid,
  Stack,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface RecipeListProps {
  recipesList: IRecipe[];
  onDeleteRecipe: (recipe: IRecipe) => void;
  onEditRecipe: (recipe: IRecipe) => void;
}

const RecipeList: FC<RecipeListProps> = ({
  recipesList,
  onDeleteRecipe,
  onEditRecipe,
}) => {
  const navigate = useNavigate();

  const editRecipeHandler = (recipe: IRecipe) => {
    onEditRecipe(recipe);
    navigate("/edit-recipe");
  };

  const { colorMode } = useColorMode();
  const ingredientTextColor = colorMode === "dark" ? "black" : "black";

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      mt={10}
      gap={6}
    >
      {recipesList.map((recipe) => {
        return (
          <GridItem
            key={recipe._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Box p="6">
              <Box alignItems="baseline">
                <Heading size="md">{recipe.title}</Heading>
              </Box>

              <HStack mt={5} mb={5} spacing={3}>
                {recipe.ingredients.map((ingredient, index) => {
                  return (
                    <Box
                      key={index}
                      fontWeight="semibold"
                      bg="teal.100"
                      color={ingredientTextColor}
                      borderRadius={6}
                    >
                      {ingredient}
                    </Box>
                  );
                })}
              </HStack>

              {recipe.instructions.length < 50 ? (
                <Box> {recipe.instructions} </Box>
              ) : (
                <Box> {recipe.instructions.slice(0, 50) + "..."}</Box>
              )}

              <Box mt="2" alignItems="center">
                <Stack direction="row" spacing={3}>
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => editRecipeHandler(recipe)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => onDeleteRecipe(recipe)}
                  >
                    Delete
                  </Button>
                  <Button size="sm" colorScheme="blue">
                    {" "}
                    View{" "}
                  </Button>
                </Stack>
              </Box>
            </Box>
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default RecipeList;
