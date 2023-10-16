import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
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
import { useEffect } from "react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface IRecipeFormProps {
  onAddRecipe: (newRecipe: IRecipe) => void;
  isEditingRecipe: IRecipe | null;
  onUpdateRecipe: (updatedRecipe: IRecipe) => void;
}

const RecipeSchema = z.object({
  _id: z.string().optional(),
  title: z
    .string()
    .min(1, { message: "Title must contain at least 1 character" }),
  instructions: z.string().min(1, { message: "Instructions are required" }),
  ingredient: z.string().optional(),
  ingredients: z
    .array(z.string())
    .min(1, { message: "Must contain ingredients" }),
  imageURL: z.string().optional(),
});

export type IRecipe = z.infer<typeof RecipeSchema>;

const RecipeForm: FC<IRecipeFormProps> = ({
  onAddRecipe,
  isEditingRecipe,
  onUpdateRecipe,
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IRecipe>({ resolver: zodResolver(RecipeSchema) });

  const ingredientInput = watch("ingredient", "") ?? "";
  const ingredientList = watch("ingredients", []);

  const addIngredientHandler = () => {
    setValue("ingredients", [...ingredientList, ingredientInput]);
    setValue("ingredient", "");
  };

  const removeIngredientHandler = (ingredient: string) => {
    setValue(
      "ingredients",
      ingredientList.filter((ing) => ing !== ingredient)
    );
  };

  useEffect(() => {
    if (isEditingRecipe) {
      setValue("title", isEditingRecipe.title);
      setValue("instructions", isEditingRecipe.instructions);
      setValue("ingredients", isEditingRecipe.ingredients);
      setValue("imageURL", isEditingRecipe.imageURL || "");
    } else {
      setValue("title", "");
      setValue("instructions", "");
      setValue("ingredients", []);
      setValue("imageURL", "");
    }
  }, [isEditingRecipe, setValue]);

  const submitHandler = (data: IRecipe) => {
    const newRecipe: IRecipe = {
      _id: isEditingRecipe?._id,
      title: data.title,
      instructions: data.instructions,
      ingredients: data.ingredients,
      imageURL: data.imageURL || "",
    };
    if (isEditingRecipe) {
      onUpdateRecipe(newRecipe);
    } else {
      onAddRecipe(newRecipe);
    }
    setValue("title", "");
    setValue("instructions", "");
    setValue("ingredients", []);
    setValue("ingredient", "");
    setValue("imageURL", "");

    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Box
        maxW="md"
        p={5}
        m="auto"
        borderWidth="1px"
        borderRadius="lg"
        shadow="lg"
        as={VStack}
        spacing={7}
      >
        <Heading mb={5} textAlign="center">
          {isEditingRecipe ? "Edit Recipe" : "Create Recipe"}
        </Heading>
        <FormControl as={VStack} spacing={5} isInvalid={!!errors.title}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            placeholder="Enter title"
            focusBorderColor="blue.500"
            {...register("title")}
          />
          {errors.title && (
            <FormErrorMessage> {errors.title.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.instructions} as={VStack} spacing={5}>
          <FormLabel>Instructions</FormLabel>
          <Textarea
            placeholder="Enter instructions"
            focusBorderColor="blue.500"
            resize="vertical"
            {...register("instructions")}
          />
          {errors.instructions && (
            <FormErrorMessage> {errors.instructions.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.ingredients} as={VStack} spacing={5}>
          <FormLabel>Ingredients</FormLabel>
          <InputGroup>
            <Input
              type="text"
              placeholder="Enter ingredient"
              focusBorderColor="blue.500"
              {...register("ingredient")}
            />
            {errors.ingredients && (
              <FormErrorMessage>
                {" "}
                {errors.ingredients.message}{" "}
              </FormErrorMessage>
            )}

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
        </FormControl>
        <FormControl as={VStack} spacing={5}>
          <FormLabel>Image Url</FormLabel>
          <Input
            type="text"
            placeholder="Enter image URL"
            focusBorderColor="blue.500"
            {...register("imageURL")}
          />
        </FormControl>

        <Button colorScheme="blue" type="submit" w="100%" mt={5}>
          {isEditingRecipe ? "Update Recipe " : "Create Recipe"}
        </Button>
      </Box>
    </form>
  );
};

export default RecipeForm;
