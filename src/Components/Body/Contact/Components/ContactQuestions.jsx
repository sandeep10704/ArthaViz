import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import CustomButton from '../../../CommonComponents/CustomButton';

const ContactQuestions = () => {
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }} maxWidth="600px">
      
      <Typography
        variant="h6"
        sx={{ letterSpacing: 1, mb: 1, fontFamily: 'Outfit', fontWeight: 200 }}
      >
        ANY QUESTIONS?
      </Typography>

     
      <Typography
        variant="body2"
        sx={{ mb: 4, fontFamily: 'Outfit', fontWeight: 200 }}
      >
        Use the form below to get in touch with us.
      </Typography>

      <form noValidate autoComplete="off">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
            }}
          >
           
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Your full name *"
              InputProps={{
                sx: { fontFamily: 'Outfit', fontWeight: 200 },
              }}
              InputLabelProps={{
                sx: { fontFamily: 'Outfit', fontWeight: 200 },
              }}
            />

           
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Write your email here *"
              InputProps={{
                sx: { fontFamily: 'Outfit', fontWeight: 200 },
              }}
              InputLabelProps={{
                sx: { fontFamily: 'Outfit', fontWeight: 200 },
              }}
            />
          </Box>

         
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Phone number"
            InputProps={{
              sx: { fontFamily: 'Outfit', fontWeight: 200 },
            }}
            InputLabelProps={{
              sx: { fontFamily: 'Outfit', fontWeight: 200 },
            }}
          />

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Write your subject here"
            InputProps={{
              sx: { fontFamily: 'Outfit', fontWeight: 200 },
            }}
            InputLabelProps={{
              sx: { fontFamily: 'Outfit', fontWeight: 200 },
            }}
          />

          
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Write your message here *"
            multiline
            minRows={4}
            InputProps={{
              sx: { fontFamily: 'Outfit', fontWeight: 200 },
            }}
            InputLabelProps={{
              sx: { fontFamily: 'Outfit', fontWeight: 200 },
            }}
          />

        
          <Box width={"auto"}>
            <CustomButton text={"Submit"} />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ContactQuestions;
