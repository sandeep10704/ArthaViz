import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import '@fontsource/outfit/100.css';
import '@fontsource/outfit/400.css';

const PageHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  console.log("Current URL Path:", currentPath);

  // Mapping of paths to titles
  const pageTitles = {
    '/about': 'About Us',
    '/shop': 'Our Shop',
    '/blogs': 'Latest Blogs',
    '/contact': 'Contact Us',
    '/cart': 'Your Cart',
  };

  // If current path is not in pageTitles, do not render anything
  if (!pageTitles[currentPath]) {
    return null;
  }

  const pageTitle = pageTitles[currentPath];

  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: '50px 0',
        backgroundColor: '#f8f8f8',
        fontFamily: 'Outfit',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 100,
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}
      >
        {pageTitle}
      </Typography>

      <Box sx={{ marginTop: '10px' }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 100,
            display: 'inline',
            marginRight: '5px',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            Home
          </Link>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 100,
            display: 'inline',
            margin: '0 5px',
          }}
        >
          &gt;
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 100,
            textDecoration: 'underline',
            display: 'inline',
          }}
        >
          {currentPath.replace('/', '')}
        </Typography>
      </Box>
    </Box>
  );
};

export default PageHeader;
