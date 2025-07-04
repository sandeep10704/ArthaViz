
import './App.css';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import { createTheme, ThemeProvider } from '@mui/material';


function App() {
  const theme = createTheme({
  typography: {
    fontFamily: 'Outfit, sans-serif',
    fontWeightLight: 200,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
  },
});
  return (
    <ThemeProvider theme={theme}> 
<RouterProvider router={Router} />
</ThemeProvider>
  );
}

export default App;
