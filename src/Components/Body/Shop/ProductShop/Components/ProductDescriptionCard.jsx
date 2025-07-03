import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import ColorPalette from '../../../../../Assets/ColorPalette';

const ProductDescriptionCard = ({ data }) => {
  const { title, topText, points, bottomText } = data;
  return (
    <Box
      sx={{
        padding: '16px',
        backgroundColor: '#fff',
        margin: 'auto',
      }}
    >
    <Divider sx={{ borderColor: ColorPalette.line }} />

      <Typography variant="subtitle1" sx={{ fontWeight: 400, mb: 1,mt:2, fontFamily: "Outfit" }}>
        {title}
      </Typography>

      <Typography variant="body2" sx={{ mb: 1, fontFamily: "Outfit", fontWeight: 200 }}>
        {topText}
      </Typography>

      <List sx={{ pl: 6, mb: 1 }}>
        {points.map((point, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'list-item',
              py: 0,
              listStyleType: 'disc',
            }}
          >
            <ListItemText
              primary={point}
              primaryTypographyProps={{
                sx: {
                  fontFamily: "Outfit",
                  fontWeight: 200
                }
              }}
            />


          </ListItem>
        ))}
      </List>

      <Typography variant="body2" sx={{ mb: 2, fontFamily: "Outfit", fontWeight: 200 }}>
        {bottomText}
      </Typography>
      <Divider sx={{ borderColor: ColorPalette.line }} />
    </Box>
  );
};

export default ProductDescriptionCard;
