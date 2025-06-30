import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import '@fontsource/outfit/100.css';
import '@fontsource/outfit/400.css';
import SplitText from '../../CommonComponents/SplitText';

const PageHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const pageTitles = {
    '/about': 'About Us',
    '/shop': 'Our Shop',
    '/blogs': 'Latest Blogs',
    '/contact': 'Contact Us',
    '/cart': 'Your Cart',
  };

  if (!pageTitles[currentPath]) {
    return null; // return nothing if route is not defined
  }

  const pageTitle = pageTitles[currentPath];

  const handleAnimationComplete = () => {
    console.log('Animation complete');
  };

  return (
    <Box
      sx={{
        width: '100%',           // full width
        maxWidth: '1920px',      // restrict max width
        height: { xs: '150px', sm: '200px', md: '281px' }, // responsive height
        backgroundColor: '#f8f8f8',
        fontFamily: 'Outfit',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px',
        px: 2,                   // horizontal padding on small screens
        boxSizing: 'border-box',
        marginTop:"100px",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 300,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          display: 'inline-block',
          marginBottom: '0px',
          lineHeight: 1,
          fontSize: { xs: '24px', sm: '36px', md: '48px' }, // responsive title size
        }}
      >
        <Box sx={{ overflow: 'hidden', display: 'inline-block' }}>
          <SplitText
            key={pageTitle}
            text={pageTitle}
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </Box>
      </Typography>

      <Box>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 100,
            fontSize: { xs: '14px', sm: '18px', md: '20px' },
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
            fontSize: { xs: '14px', sm: '18px', md: '20px' },
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
            fontSize: { xs: '14px', sm: '18px', md: '20px' },
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
