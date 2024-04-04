import { TextField, InputAdornment, IconButton } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import { useRef } from "react";
import { convertToWebP } from "../../../utils/functions";

interface ImageUploadFieldProps {
  value: string;
  onFileChange: (file: File) => void;
  label: string;
  onDownload?: () => void;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value,
  onFileChange,
  label,
  onDownload,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textFieldRef = useRef<HTMLDivElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const validFileTypes = ["image/webp"];
        const convertedFile = await convertToWebP(file);
        if (validFileTypes.includes(convertedFile.type)) {
          onFileChange(convertedFile);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAttachmentClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    inputRef.current?.click();
  };

  const handleTextFieldClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      onDownload &&
      value &&
      !inputRef.current?.contains(event.target as Node)
    ) {
      onDownload();
    }
  };

  return (
    <>
      <div
        onClick={handleTextFieldClick}
        ref={textFieldRef}
        style={{ width: "100%", cursor: "pointer" }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label={label}
          value={value}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleAttachmentClick}>
                  <AttachFile />
                </IconButton>
              </InputAdornment>
            ),
            readOnly: true,
          }}
          sx={{
            marginTop: 2,
            input: { cursor: "pointer" },
          }}
        />
      </div>
      <input
        accept={"image/*"}
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
