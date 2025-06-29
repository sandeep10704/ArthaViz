import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const FooterContact = () => {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        CONTACT US
      </Typography>
      <Typography variant="body2">
        Do you have any queries or suggestions?
        <br />
        <Link href="mailto:yourinfo@gmail.com">yourinfo@gmail.com</Link>
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        If you need support? Just give us a call.
        <br />
        <Link href="tel:+5511122233344">+55 111 222 333 44</Link>
      </Typography>
    </Box>
  );
};

export default FooterContact;
