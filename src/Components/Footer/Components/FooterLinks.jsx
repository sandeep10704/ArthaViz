import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const FooterLinks = () => {
  return (
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          QUICK LINKS
        </Typography>
        <List dense>
          {['Home', 'About', 'Shop', 'Blogs', 'Contact'].map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          HELP & INFO
        </Typography>
        <List dense>
          {['Track Your Order', 'Returns Policies', 'Shipping + Delivery', 'Contact Us', 'FAQs'].map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default FooterLinks;
