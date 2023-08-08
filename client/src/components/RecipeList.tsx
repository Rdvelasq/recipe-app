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
} from "@chakra-ui/react";

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
  return (
    <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
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
                <Button size="sm" onClick={() => onEditRecipe(recipe)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => onDeleteRecipe(recipe)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default RecipeList;
