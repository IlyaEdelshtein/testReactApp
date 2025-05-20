import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { setCredentials } from '../features/authSlice';
import { useAppDispatch } from '../hooks';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'http://localhost:4000';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(setCredentials({ token: data.token, username }));
      navigate('/');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Register</h2>
      <TextField
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        sx={{ m: 1 }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        sx={{ m: 1 }}
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ m: 1 }}>
        Register
      </Button>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
