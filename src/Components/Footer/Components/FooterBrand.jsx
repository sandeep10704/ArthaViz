import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn, YouTube } from '@mui/icons-material';

const FooterBrand = () => {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography variant="h6" fontWeight="bold">
        SHOP<span style={{ fontWeight: 100 }}>LITE</span>
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
        Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit hendrerit. Gravida massa volutpat aenean odio erat nullam fringilla.
      </Typography>
      <Box>
        <IconButton><Facebook /></IconButton>
        <IconButton><Instagram /></IconButton>
        <IconButton><Twitter /></IconButton>
        <IconButton><LinkedIn /></IconButton>
        <IconButton><YouTube /></IconButton>
      </Box>
    </Box>
  );
};

export default FooterBrand;
