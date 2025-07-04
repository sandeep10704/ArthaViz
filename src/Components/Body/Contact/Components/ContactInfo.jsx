import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const ContactInfo = () => {
  return (
    <Box sx={{ px: { xs: 0, md: 6 }, py: 4, maxWidth: "600px" }}>
      {/* Contact Info Title */}
      <Typography
        variant="h6"
        sx={{ letterSpacing: 1, mb: 1, fontFamily: 'Outfit', fontWeight: 200 }}
      >
        CONTACT INFO
      </Typography>

      {/* Contact Info Description */}
      <Typography
        variant="body2"
        sx={{ mb: 4, fontFamily: 'Outfit', fontWeight: 200 }}
      >
        Tortor dignissim convallis aenean et tortor at risus viverra adipiscing.
      </Typography>

      {/* Contact Details Grid */}
      <Grid container spacing={4}>
        {/* Office */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 200, letterSpacing: 1, fontFamily: 'Outfit' }}
          >
            OFFICE
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'Outfit', fontWeight: 200 }}
          >
            730 Glenstone Ave 65802, Springfield, US
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

        {/* Management */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 200, letterSpacing: 1, fontFamily: 'Outfit' }}
          >
            MANAGEMENT
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'Outfit', fontWeight: 200 }}
          >
            730 Glenstone Ave 65802, Springfield, US
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
      </Grid>
    </Box>
  );
};

export default ContactInfo;
