import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { RecipeForm, CategoryForm, TagForm } from "../../";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteData, getSingleData } from "../../../api/data";
import {
  capitalizeFirstLetter,
  transformPluralToSingular,
} from "../../../utils/functions";
import { ICategory, ImageType, IRecipe, ITag } from "../../../utils/interfaces";
import { deleteImage } from "../../../api/images";

interface IProps {
  open: boolean;
  onClose: () => void;
  subRoute: string;
}

const CreationModal: React.FC<IProps> = ({ open, onClose, subRoute }) => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const { data: formData, isLoading, isError } = useQuery({
    queryKey: [transformPluralToSingular(subRoute), id],
    queryFn: () => getSingleData(subRoute, id as string),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      deleteData(id!, subRoute);
      if (subRoute !== "tags") {
        deleteImage(transformPluralToSingular(subRoute) as ImageType , id!);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [subRoute] });
      onClose();
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteMutation.mutate();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">
          {id ? "Edit " : "Add New "}{" "}
          {capitalizeFirstLetter(transformPluralToSingular(subRoute))}
        </Typography>
        {id && (
          <IconButton
            edge="end"
            aria-label="delete"
            color="error"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers>
        {isLoading ? <CircularProgress /> : getContent()}
      </DialogContent>
    </Dialog>
  );

  function getContent() {
    if (isError) {
      return <p>Error fetching data.</p>;
    }

    switch (subRoute) {
      case "recipes":
        return (
          <RecipeForm
            onClose={onClose}
            data={formData as IRecipe}
            id={id as string}
          />
        );
      case "categories":
        return (
          <CategoryForm
            onClose={onClose}
            data={formData as ICategory}
            id={id as string}
          />
        );
      case "tags":
        return (
          <TagForm
            onClose={onClose}
            data={formData as ITag}
            id={id as string}
          />
        );
      default:
        return null;
    }
  }
};

export default CreationModal;
