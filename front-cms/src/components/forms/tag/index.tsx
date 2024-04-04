import React, { useEffect, useState } from 'react';
import { Button, TextField, DialogActions } from '@mui/material';
import { ITag } from '../../../utils/interfaces';
import { EmptyTag } from '../../../utils/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postData, updateData } from '../../../api/data';
import { generateId } from '../../../utils/functions';

interface TagFormProps {
  onClose: () => void;
  data?: ITag;
  id?: string;
}

export const TagForm: React.FC<TagFormProps> = ({ onClose, data = EmptyTag, id }) => {
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
