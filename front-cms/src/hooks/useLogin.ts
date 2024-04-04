import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginFormState } from '../utils/interfaces';
import { useAuth } from '../context'; 
import { authenticateUser } from '../api/auth'; 

export const useLogin = () => {
  const [formState, setFormState] = useState<LoginFormState>({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); 
    const token = await authenticateUser(formState.email, formState.password);
    if (token) {
      login(token);
      navigate('/dashboard');
    } else {
      setError('Authentication failed. Please check your credentials.');
    }
  };

  return { formState, handleInputChange, handleSubmit, error };
};
