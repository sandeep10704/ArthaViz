import React from 'react';
import { Box, Typography, Grow } from '@mui/material';
import '@fontsource/outfit/200.css';

const TextHeading = ({ text }) => {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    // Trigger the grow after mount
    setChecked(true);
  }, []);

  return (
    <Box display="flex" alignItems="center">
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Outfit",
          letterSpacing: '0.2em',
          fontWeight: 200,
          fontSize: { xs: '16px', sm: '20px', md: '24px' },
          lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
          textTransform: "uppercase"
        }}
      >
        {text}
      </Typography>
      <Grow in={checked} timeout={4000}>
        <Box
          ml={2}
          flexGrow={1}
          sx={{
            height: { xs: '10px', md: '14px' },
            backgroundImage:
              'repeating-linear-gradient(-45deg, #ccc, #ccc 1px, transparent 2px, transparent 8px)',
          }}
        />
      </Grow>
    </Box>
  );
};

export default TextHeading;
