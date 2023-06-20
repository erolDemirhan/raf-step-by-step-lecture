import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './Firebase/firebase';
import Login from './Login/Login';
import Register from './Register/Register';
import Logout from './Logout/Logout';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';


const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user:any) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress color="success" />
    </Stack>
    ); // or return your custom loading spinner
  }

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.email}!</h2>
          <Logout />
          {/* Add your application logic here */}
        </div>
      ) : (
        <div>
          <h2>Please log in or register</h2>
          <Login />
          <Register />
        </div>
      )}
    </div>
  );
};

export default App;
