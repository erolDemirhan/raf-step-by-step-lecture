import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebase';
import { TextField, Button } from '@mui/material';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const register = async (e: React.FormEvent) => {
      e.preventDefault();
    setError('');
    // Basic input validation
    if (!email || !password) {
        setError('Email and password are required');
        return;
      }

    // Firebase error handling
    try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message); // Display error message to user
        }
        console.log(error);
      }
    }
  
    return (
        <form onSubmit={register}>
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
          Register
        </Button>
        {error && <p>{error}</p>}
      </form>
    )
  }
  
  export default Register;