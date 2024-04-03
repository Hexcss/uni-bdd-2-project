import React, { useEffect, useState } from "react";
import { Button, TextField, DialogActions, Grid } from "@mui/material";
import { ICategory } from "../../../utils/interfaces";
import { EmptyCategory } from "../../../utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData, updateData } from "../../../api/data";
import { generateId } from "../../../utils/functions";

interface CategoryFormProps {
  onClose: () => void;
  data?: ICategory;
  id?: string;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  onClose,
  data = EmptyCategory,
  id
}) => {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState<ICategory>(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (category.id === "") {
      setCategory({ ...category, id: generateId() });
    }
  }, [category]);

  const mutation = useMutation({
    mutationFn: () => !id ? postData(category, "categories") : updateData(category, "categories"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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
        <Grid item xs={12}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={category.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            fullWidth
            value={category.description}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <DialogActions>
        <Button color="inherit"  onClick={onClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </form>
  );
};
