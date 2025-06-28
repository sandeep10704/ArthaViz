import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import '@fontsource/outfit/100.css';
import '@fontsource/outfit/400.css';

const PageHeader = () => {
  const { page } = useParams();

  const pageTitle = page ? page.replace(/-/g, ' ') : 'Page';

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
          {pageTitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default PageHeader;
