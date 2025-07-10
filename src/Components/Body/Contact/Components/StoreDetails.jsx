import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const StoreDetails = () => {
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
      
      <Typography
        variant="h6"
        sx={{
          letterSpacing: 1,
          mb: 1,
          maxWidth: "600px",
          fontFamily: 'Outfit',
          fontWeight: 200,
        }}
      >
        OUR STORES
      </Typography>

      
      <Typography
        variant="body2"
        sx={{ mb: 4, fontFamily: 'Outfit', fontWeight: 200 }}
      >
        You can also directly buy products from our stores.
      </Typography>

      
      <Grid container spacing={4}>
        
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 200,
              letterSpacing: 1,
              fontFamily: 'Outfit',
            }}
          >
            USA
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'Outfit', fontWeight: 200 }}
          >
            730 Glenstone Ave 65802, US
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'Outfit', fontWeight: 200 }}
          >
            +123 666 777 88
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'Outfit', fontWeight: 200 }}
          >
            info@yourinfo.com
          </Typography>
        </Grid>

   
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 200,
              letterSpacing: 1,
              fontFamily: 'Outfit',
            }}
          >
            FRANCE
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'Outfit', fontWeight: 200 }}
          >
            13 Rue Montmartre 75001, Paris, France
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'Outfit', fontWeight: 200 }}
          >
            +123 222 333 44
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'Outfit', fontWeight: 200 }}
          >
            info@yourinfo.com
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StoreDetails;
