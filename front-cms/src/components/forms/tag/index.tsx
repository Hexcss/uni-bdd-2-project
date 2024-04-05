import React, { useEffect, useState } from 'react';
import { Button, TextField, DialogActions } from '@mui/material';
import { ITag } from '../../../utils/interfaces';
import { EmptyTag } from '../../../utils/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postData, updateData } from '../../../api/data';
import { generateId } from '../../../utils/functions';
import { snackbar } from '../../../utils/signals';
import { useSignals } from '@preact/signals-react/runtime';

interface TagFormProps {
  onClose: () => void;
  data?: ITag;
  id?: string;
}

const TagForm: React.FC<TagFormProps> = ({ onClose, data = EmptyTag, id }) => {
  useSignals();
  const queryClient = useQueryClient();
  const [tag, setTag] = useState<ITag>(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag({ ...tag, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (tag.id === "") {
      setTag({ ...tag, id: generateId() });
    }
  }, [tag]);

  const mutation = useMutation({
    mutationFn: () => id ? updateData(tag, "tags") : postData(tag, "tags"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["tag"] });
      snackbar.value = {
        open: true,
        message: id? "Tag updated" : "Tag created",
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

  return (
    <form noValidate autoComplete="off" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <TextField
        name="name"
        label="Name"
        fullWidth
        value={tag.name}
        onChange={handleChange}
      />
      <DialogActions>
        <Button color="inherit"  onClick={onClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </form>
  );
};

export default TagForm;
