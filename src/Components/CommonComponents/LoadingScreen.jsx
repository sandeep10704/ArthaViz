import React from 'react';
import { Box } from '@mui/material';
import ColorPalette from '../../Assets/ColorPalette';

const LoadingDots = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box sx={dotStyle(0)} />
        <Box sx={dotStyle(0.4)} />
        <Box sx={dotStyle(0.8)} />
      </Box>
    </Box>
  );
};

const dotStyle = (delay) => ({
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: ColorPalette.orangeline,
  animation: `bounce 2s infinite`,
  animationDelay: `${delay}s`,
  '@keyframes bounce': {
    '0%, 80%, 100%': {
      transform: 'scale(0)',
    },
    '40%': {
      transform: 'scale(1)',
    },
  },
});

export default LoadingDots;
