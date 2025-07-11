
import './App.css';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import { createTheme, ThemeProvider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkUserSession } from './store/authSlice';


function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Outfit, sans-serif',
      fontWeightLight: 200,
      fontWeightRegular: 400,
      fontWeightMedium: 600,
    },


  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={Router} />
    </ThemeProvider>
  );
}

export default App;
