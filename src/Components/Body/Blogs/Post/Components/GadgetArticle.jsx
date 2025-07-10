import React from 'react';
import {
  Box,
  Typography,
  Divider,
  Card,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import CommonCss from '../../../../../Assets/CommonCss';

const GadgetArticle = ({ data }) => {
  return (
    <Box sx={{ mx: 'auto', p: 2, fontFamily: 'Outfit', fontWeight: 200 }}>
  
      <CardMedia
        component="img"
        image={data.headerImage}
        alt="Article Header"
        sx={{ width: '100%', borderRadius: 2 }}
      />

      <Typography variant="caption" color="error" sx={{ mt: 2, display: 'block' }}>
        {data.category}
      </Typography>

      <Typography variant="h4" sx={{ mt: 1, fontWeight: 600 }}>
        {data.title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mt: 2,
          color: 'text.secondary',
          fontFamily: 'Outfit',
          fontWeight: 200,
        }}
      >
        {data.content}
      </Typography>

      <Box
        sx={{
          bgcolor: '#f5f5f5',
          p: 2,
          my: 3,
          borderLeft: '4px solid #ccc',
          fontFamily: 'Outfit',
          fontWeight: 200,
        }}
      >
        <Typography variant="body1" fontStyle="italic">
          {data.quote.text}
        </Typography>
        <Typography
          variant="caption"
          sx={{ display: 'block', mt: 1, fontFamily: 'Outfit', fontWeight: 200 }}
        >
          — {data.quote.author}
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />


      <Box>
        <Typography
          variant="h5"
          sx={{ fontWeight: 300, mb: 2, fontFamily: 'Outfit' }}
        >
          IS THIS GREAT?
        </Typography>

        <List>
          {data.gadgetsList.map((text, index) => (
            <ListItem disablePadding key={index}>
              <ListItemIcon sx={{ minWidth: "24px" }}>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontFamily: 'Outfit', fontWeight: 200 }}
                >
                  •
                </Typography>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        {data.bottomParagraphs.map((para, idx) => (
          <Typography
            key={idx}
            variant="body2"
            sx={{ mt: 2, fontFamily: 'Outfit', fontWeight: 200 }}
          >
            {para}
          </Typography>
        ))}

    
        <Box
          component="section"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
            my: 4,
          }}
        >

          <Box sx={{ flex: { xs: '0 0 auto', md: '0 0 25%' }, width: '100%' }}>
            <Card sx={{ borderRadius: 3, overflow: 'hidden', width: '100%' }}>
              <CardMedia
                component="img"
                image={data.responsiveSection.image}
                alt="Section Image"
                sx={{
                  width: '100%',
                  height: 200,
                  ...CommonCss.imageHoverBoxStyle,
                }}
              />
            </Card>
          </Box>


          <Box
            sx={{
              flex: { xs: '0 0 auto', md: '0 0 75%' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minWidth: 0,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {data.responsiveSection.title}
            </Typography>
            {data.responsiveSection.paragraphs.map((p, i) => (
              <Typography
                key={i}
                variant="body2"
                sx={{ mb: 2, fontFamily: 'Outfit', fontWeight: 200 }}
              >
                {p}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>


      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 4, display: 'block', fontFamily: 'Outfit', fontWeight: 200 }}
      >
        Last Updated: {data.updatedAt} • {data.readTime}
      </Typography>
    </Box>
  );
};

export default GadgetArticle;
