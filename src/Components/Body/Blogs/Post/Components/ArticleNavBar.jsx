import React from 'react';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const ArticleNavBar = ({ categories, previousArticle, nextArticle }) => {
  return (
    <Box sx={{ px: 3, py: 2 }}>
      <Grid container alignItems="center" justifyContent="space-between">
       
        <Grid item>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {categories.map((category, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ fontFamily: 'Outfit', fontWeight: 200 }}
              >
                {category}
              </Typography>
            ))}
          </Box>
        </Grid>

        <Grid item>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontFamily: 'Outfit', fontWeight: 200 }}
            >
              Share:
            </Typography>
            <FacebookIcon sx={{ color: '#ff5722' }} />
            <InstagramIcon sx={{ color: '#ccc' }} />
            <TwitterIcon sx={{ color: '#ccc' }} />
            <LinkedInIcon sx={{ color: '#ccc' }} />
            <YouTubeIcon sx={{ color: '#ccc' }} />
          </Box>
        </Grid>
      </Grid>


      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 2 }}
      >
        <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <Typography
            variant="body2"
            sx={{ fontFamily: 'Outfit', fontWeight: 200 }}
          >
            {previousArticle}
          </Typography>
        </Grid>

        <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: '#ff5722', fontFamily: 'Outfit', fontWeight: 200 }}
          >
            {nextArticle}
          </Typography>
          <IconButton>
            <ArrowForwardIosIcon fontSize="small" sx={{ color: '#ff5722' }} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArticleNavBar;
