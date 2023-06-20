import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebase';
import { TextField, Button } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
        setError('Email and password are required');
        return;
      }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        if (error instanceof Error) {
            setError(error.message); // Display error message to user
          }
      console.log(error);
    }
  }

  return (
    <form onSubmit={login}>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button type="submit">
        Login
      </Button>
      {error && <p>{error}</p>}
    </form>
  )
}

export default Login;
