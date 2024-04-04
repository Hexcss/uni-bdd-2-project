import { TextField, InputAdornment, IconButton } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import { useRef } from "react";

interface ImageUploadFieldProps {
  value: string;
  onFileChange: (file: File) => void;
  label: string;
  favicon?: boolean;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value,
  onFileChange,
  label,
  favicon,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const convertToWebP = async (file: File) => {
    return new Promise<File>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              const newFile = new File(
                [blob],
                file.name.replace(/\.\w+$/, ".webp"),
                {
                  type: "image/webp",
                }
              );
              resolve(newFile);
            } else {
              reject(new Error("Could not convert image to WebP"));
            }
          }, "image/webp");
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      if (!favicon) {
        try {
          const validFileTypes = ["image/webp"];
          const convertedFile = await convertToWebP(file);
          if (validFileTypes.includes(convertedFile.type)) {
            onFileChange(convertedFile);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        const validFileTypes = ["image/webp", "image/x-icon"];
        if (validFileTypes.includes(file.type)) {
          onFileChange(file);
        } else {
          console.error("Invalid file type: " + file.type);
        }
      }
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <TextField
        fullWidth
        variant="outlined"
        label={label}
        value={value}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleClick}>
                <AttachFile />
              </IconButton>
            </InputAdornment>
          ),
        }}
        size="small"
        sx={{
          marginTop: 2,
        }}
      />
      <input
        accept={favicon ? ".ico, image/webp" : "image/*"}
        id="image-upload"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        ref={inputRef}
      />
    </>
  );
};

export default ImageUploadField;
