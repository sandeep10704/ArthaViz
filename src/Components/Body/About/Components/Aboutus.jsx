import React from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import CustomButton from '../../../CommonComponents/CustomButton';

const Aboutus = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        width: 'auto',
        height: isSmallScreen ? 'auto' : '600px',
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        gap: isSmallScreen ? '40px' : '50px',
        paddingRight: isSmallScreen ? '10px' : '90px',
        paddingLeft: isSmallScreen ? 0 : '10px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >

      <Box
        sx={{
          width: isSmallScreen ? '100%' : 'auto',
          overflow: 'hidden',
          borderRadius: '8px',
        }}
      >
        <iframe
          width={isSmallScreen ? '385' : '800'}
          height={isSmallScreen ? '220' : '450'}
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          style={{
            border: 0,
            borderRadius: '8px',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Box>



      <Box
        sx={{
          width: isSmallScreen ? '100%' : '600px',
          height: isSmallScreen ? 'auto' : '335px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          justifyContent: 'center',
          padding: isSmallScreen ? '10px' : '0px',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Outfit',
            fontWeight: 200,
            fontSize: isSmallScreen ? '20px' : '30px',
            lineHeight: '120%',
            letterSpacing: '6%',
            textTransform: 'uppercase',
            textAlign: isSmallScreen ? 'center' : 'left',
          }}
        >
          BEST DIGITAL STORE BASICSTORE
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Outfit',
            fontWeight: 100,
            fontSize: isSmallScreen ? '14px' : '16px',
            lineHeight: '150%',
            letterSpacing: '1%',
            textAlign: isSmallScreen ? 'center' : 'left',
          }}
        >
          Risus augue curabitur diam senectus congue velit et. Sed vitae metus nibh sit era. Nulla adipiscing pharetra pellentesque maecenas odio eros at. Et libero vulputate amet duis erat volutpat vitae eget. Sed vitae metus nibh sit era. Nulla adipiscing pharetra eros at.
          Nulla adipiscing pharetra pellentesque maecenas odio eros at. Et libero vulputate amet duis erat volutpat vitae eget. Quam libero etiam et in ac at quis. Risus augue curabitur diam senectus congue velit et.
        </Typography>

        <Box sx={{ width: 'auto', display: 'flex', justifyContent: isSmallScreen ? 'center' : 'flex-start' }}>
          <CustomButton text={'GO TO SHOP'} />
        </Box>
      </Box>
    </Box>
  );
};

export default Aboutus;
