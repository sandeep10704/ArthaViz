
import './App.css';
import { RouterProvider } from 'react-router-dom';
import Router from './Router';
import { createTheme, ThemeProvider } from '@mui/material';


function App() {
  const theme = createTheme({
  typography: {
    fontFamily: 'Outfit, sans-serif',
  },
});
  return (
    <ThemeProvider theme={theme}> 
<RouterProvider router={Router} />
</ThemeProvider>
  );
}

export default App;
