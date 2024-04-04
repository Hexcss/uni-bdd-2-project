import React from 'react';
import { Button, TextField, Typography, Box, Card, CardContent } from '@mui/material';
import { useLogin } from '../../hooks/useLogin'; 
import BackgroundImage from "../../assets/login-bg.png"; // Ensure this path is correct

const Login: React.FC = () => {
  const { formState, handleInputChange, handleSubmit, error } = useLogin();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Card sx={{ width: 450, boxShadow: 3, paddingY: 6 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
          <Typography variant='h3' gutterBottom>
            Gustus CMS
          </Typography>
          <Typography variant="h6" color="text.secondary" component="div" sx={{ margin: '20px 0' }}>
            Sign in to your account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formState.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formState.password}
              onChange={handleInputChange}
            />
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Log In
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
