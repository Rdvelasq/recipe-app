import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Textarea,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IRecipeFormProps {
  onAddRecipe: (newRecipe: IRecipe) => void;
  isEditingRecipe: IRecipe | null;
  onUpdateRecipe: (updatedRecipe: IRecipe) => void;
}

export interface IRecipe {
  _id?: string;
  title: string;
  instructions: string;
  ingredients: string[];
  imageURL: string;
}

const RecipeForm: FC<IRecipeFormProps> = ({
  onAddRecipe,
  isEditingRecipe,
  onUpdateRecipe,
}) => {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();
  const addIngredientHandler = () => {
    setIngredientList([...ingredientList, ingredient]);
  };

  const removeIngredientHandler = (ingredient: string) => {
    setIngredientList(
      ingredientList.filter(
        (currentIngredient) => currentIngredient != ingredient
      )
    );
  };

  useEffect(() => {
    if (isEditingRecipe) {
      setTitle(isEditingRecipe.title);
      setInstructions(isEditingRecipe.instructions);
      setIngredientList(isEditingRecipe.ingredients);
      setImageURL(isEditingRecipe.imageURL);
    } else {
      setTitle("");
      setInstructions("");
      setIngredientList([]);
      setImageURL("");
    }
  }, [isEditingRecipe]);

  const submitHandler = () => {
    const newRecipe: IRecipe = {
      _id: isEditingRecipe?._id,
      title: title,
      instructions: instructions,
      ingredients: ingredientList,
      imageURL: imageURL,
    };
    if (isEditingRecipe) {
      onUpdateRecipe(newRecipe);
    } else {
      onAddRecipe(newRecipe);
    }
    setTitle("");
    setInstructions("");
    setIngredientList([]);
    setIngredient("");
    setImageURL("");

    navigate("/");
  };

  return (
    <Box
      maxW="md"
      p={5}
      m="auto"
      borderWidth="1px"
      borderRadius="lg"
      shadow="lg"
    >
      <Heading mb={5} textAlign="center">
        Create Recipe
      </Heading>
      <FormControl as={VStack} spacing={5}>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          focusBorderColor="blue.500"
        />
        <FormLabel>Instructions</FormLabel>
        <Textarea
          value={instructions}
          placeholder="Enter instructions"
          onChange={(e) => setInstructions(e.target.value)}
          focusBorderColor="blue.500"
          resize="vertical"
        />
        <FormLabel>Ingredients</FormLabel>
        <InputGroup>
          <Input
            type="text"
            value={ingredient}
            placeholder="Enter ingredient"
            onChange={(e) => setIngredient(e.target.value)}
            focusBorderColor="blue.500"
          />
          <InputRightElement>
            <Button onClick={addIngredientHandler}>Add</Button>
          </InputRightElement>
        </InputGroup>
        <UnorderedList spacing={2}>
          {ingredientList.map((ingredient, index) => (
            <ListItem key={index}>
              {ingredient}{" "}
              <Button
                onClick={() => removeIngredientHandler(ingredient)}
                size="xs"
                colorScheme="red"
              >
                Remove
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
        <FormLabel>Image Url</FormLabel>
        <Input
          type="text"
          placeholder="Enter image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          focusBorderColor="blue.500"
        />
        {isEditingRecipe ? (
          <Button colorScheme="blue" onClick={submitHandler} w="100%">
            Update Recipe
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={submitHandler} w="100%">
            Submit Recipe
          </Button>
        )}
      </FormControl>
    </Box>
  );
};

export default RecipeForm;
