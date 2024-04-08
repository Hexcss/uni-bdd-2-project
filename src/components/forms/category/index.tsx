import React, { useEffect, useState } from "react";
import { Button, TextField, DialogActions, Grid } from "@mui/material";
import { ICategory, ICategoryImageData } from "../../../utils/interfaces";
import { EmptyCategory } from "../../../utils/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postData, updateData } from "../../../api/data";
import { generateId } from "../../../utils/functions";
import { ImageUploadField } from "../../index";
import { getImage, uploadImage } from "../../../api/images";
import { useSignals } from "@preact/signals-react/runtime";
import { snackbar } from "../../../utils/signals";

interface CategoryFormProps {
  onClose: () => void;
  data?: ICategory;
  id?: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  onClose,
  data = EmptyCategory,
  id,
}) => {
  useSignals();
  const queryClient = useQueryClient();
  const [category, setCategory] = useState<ICategory>(data);
  const [file, setFile] = useState<File | null>(null);
  const [httpMethod, setMethod] = useState<"post" | "put">("post");
  const [imageName, setImageName] = useState<string>("");

  const { data: categoryImage } = useQuery({
    queryKey: ["category-image", id],
    queryFn: () => getImage("category", id),
  });

  useEffect(() => {
    if (id && categoryImage?.data.length === 0) {
      setMethod("post");
    } else if (id && !(categoryImage?.data.length === 0)) {
      setMethod("put");
    } else if (!id) {
      setMethod("post");
    }
  }, [categoryImage, id]);

  useEffect(() => {
    if (categoryImage?.data.length > 0) {
      setImageName(categoryImage?.data[0].imageName);
    }
  }, [categoryImage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleFileChange = (newFile: File) => {
    setFile(newFile);
    setImageName(newFile.name);
  };

  useEffect(() => {
    if (category.id === "") {
      setCategory({ ...category, id: generateId() });
    }
  }, [category]);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = id
        ? await updateData(category, "categories")
        : await postData(category, "categories");

      if (file) {
        const categoryImageData: ICategoryImageData = { image: file, category_id: category.id, imageName: file.name };
        await uploadImage(categoryImageData, "category", httpMethod, category.id);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category"] });
      snackbar.value = {
        open: true,
        message: id? "Category updated" : "Category created",
        severity: "success",
      }
      onClose();
    },
    onError: (error) => {
      snackbar.value = {
        open: true,
        message: error.message,
        severity: "error",
      }
      console.error(error.message);
    },
  });

  const handleSubmit = async () => {
    mutation.mutate();
  };

  const handleDownloadImage = () => {
    if (categoryImage?.data && categoryImage.data.length > 0) {
      const buffer = categoryImage.data[0].imageData.data;
      const imageName = categoryImage.data[0].imageName;

      const blob = new Blob([new Uint8Array(buffer)], { type: "image/webp" });

      const imageUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = imageName || "downloaded_image";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(imageUrl);
    }
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
        <Grid item xs={12}>
          <ImageUploadField
            value={imageName}
            onFileChange={handleFileChange}
            label="Category Image"
            onDownload={handleDownloadImage}
          />
        </Grid>
      </Grid>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </form>
  );
};

export default CategoryForm;
