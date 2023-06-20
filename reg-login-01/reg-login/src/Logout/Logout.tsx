import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase';
import { Button } from '@mui/material';

const Logout = () => {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={logout}>
      Logout
    </Button>
  );
};

export default Logout;