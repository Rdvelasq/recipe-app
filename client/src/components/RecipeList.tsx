import React, { FC } from "react";

import { IRecipe } from "./RecipeForm";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  SimpleGrid,
  GridItem,
  Box,
  Grid,
  Image,
  Stack,
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

              <Box
                mt="2"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {recipe.ingredients}
              </Box>

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
