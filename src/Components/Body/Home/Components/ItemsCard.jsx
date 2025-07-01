import React from 'react';
import { Box, Typography } from '@mui/material';

const ItemsCard = () => {
  const items = [
    { id: 1, name: 'Wireless Headset', price: '$500', image: 'https://via.placeholder.com/80x90' },
    { id: 2, name: 'Iphone X Pro Max', price: '$820', image: 'https://via.placeholder.com/80x90' },
    { id: 3, name: 'Iphone 11 Pro', price: '$960', image: 'https://via.placeholder.com/80x90' },
  ];

  return (
    <Box
      sx={{
        width: '370px',
        height: '557px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '40px 30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '39px',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Outfit',
          fontWeight: 300,
          fontSize: '21px',
          lineHeight: '100%',
          letterSpacing: '1%',
          textTransform: 'capitalize',
        }}
      >
        Featured
      </Typography>

      <Box
        sx={{
          width: '310px',
          height: '352px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              width: '310px',
              height: '90px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
            }}
          >
            <Box
              component="img"
              src={item.image}
              alt={item.name}
              sx={{
                width: '80px',
                height: '90px',
                borderRadius: '6px',
                objectFit: 'cover',
              }}
            />
            <Box
              sx={{
                width: '215px',
                height: '61px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '9px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Outfit',
                  fontWeight: 300,
                  fontSize: '21px',
                  lineHeight: '100%',
                  letterSpacing: '1%',
                  textTransform: 'capitalize',
                }}
              >
                {item.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Outfit',
                  fontWeight: 300,
                  fontSize: '21px',
                  lineHeight: '100%',
                  letterSpacing: '1%',
                  textTransform: 'capitalize',
                  color: 'red',
                }}
              >
                {item.price}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ItemsCard;
