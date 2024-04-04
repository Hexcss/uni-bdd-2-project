import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  DialogActions,
  Grid,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { EmptyRecipe } from "../../../utils/constants";
import { IRecipe } from "../../../utils/interfaces";
import { generateId } from "../../../utils/functions";
import { getData, postData, updateData } from "../../../api/data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context";

interface RecipeFormProps {
  onClose: () => void;
  data?: IRecipe;
  id?: string;
}

export const RecipeForm: React.FC<RecipeFormProps> = ({
  onClose,
  data = EmptyRecipe,
  id
}) => {
  const [recipe, setRecipe] = useState<IRecipe>(data);
  const userId = useAuth().userId;
  const queryClient = useQueryClient();

  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getData("tags"),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getData("categories"),
  });

  const categoriesData = categories?.data;
  const tagsData = tags?.data;

  useEffect(() => {
    if (recipe.id === "") {
      setRecipe({
        ...recipe,
        id: generateId(),
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
        authorId: userId!,
      });
    } else {
      setRecipe({ ...recipe, updatedAt: Date.now().toString(), authorId: userId! });
    }
  }, [recipe, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (event: SelectChangeEvent<string | string[]>) => {
    const { name, value } = event.target;
    if (Array.isArray(value)) {
      setRecipe({ ...recipe, [name]: value });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  const handleArrayChange = (
    index: number,
    value: string,
    field: "ingredients" | "steps" | "tag_ids"
  ) => {
    const updatedArray = [...recipe[field]];
    updatedArray[index] = value;
    setRecipe({ ...recipe, [field]: updatedArray });
  };

  const addArrayItem = (field: "ingredients" | "steps" | "tag_ids") => {
    setRecipe({ ...recipe, [field]: [...recipe[field], ""] });
  };

  const removeArrayItem = (
    index: number,
    field: "ingredients" | "steps" | "tag_ids"
  ) => {
    const filteredArray = recipe[field].filter((_, i) => i !== index);
    setRecipe({ ...recipe, [field]: filteredArray });
  };

  const mutation = useMutation({
    mutationFn: () => id ? updateData(recipe, "recipes") : postData(recipe, "recipes"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      onClose();
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const handleSubmit = async () => {
    mutation.mutate();
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={recipe.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category_id"
              value={recipe.category_id}
              onChange={handleSelectChange}
              label="Category"
            >
              {categoriesData?.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            fullWidth
            value={recipe.description}
            onChange={handleChange}
          />
        </Grid>
        {/* Dynamic Fields for Ingredients */}
        <Grid item xs={12}>
          <Typography>Ingredients</Typography>
          {recipe.ingredients.map((ingredient: string, index: number) => (
            <Grid container spacing={1} alignItems="center" key={index}>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={ingredient}
                  onChange={(e) =>
                    handleArrayChange(index, e.target.value, "ingredients")
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  onClick={() => removeArrayItem(index, "ingredients")}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => addArrayItem("ingredients")}
          >
            Add Ingredient
          </Button>
        </Grid>
        {/* Dynamic Fields for Steps */}
        <Grid item xs={12}>
          <Typography>Steps</Typography>
          {recipe.steps.map((step: string, index: number) => (
            <Grid container spacing={1} alignItems="center" key={index}>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={step}
                  onChange={(e) =>
                    handleArrayChange(index, e.target.value, "steps")
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => removeArrayItem(index, "steps")}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => addArrayItem("steps")}
          >
            Add Step
          </Button>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              name="tag_ids"
              value={recipe.tag_ids}
              onChange={handleSelectChange}
              renderValue={(selected) => 
                selected
                  .map((selectedId) => 
                    tagsData?.find((tag) => tag.id === selectedId)?.name || ''
                  )
                  .join(", ")
              }
            >
              {tagsData?.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </form>
  );
};
