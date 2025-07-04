import React from 'react';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const ArticleNavBar = () => {
  return (
    <Box sx={{ px: 3, py: 2 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        {/* Left Side - Categories */}
        <Grid item>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography
              variant="body2"
              sx={{ fontFamily: 'Outfit', fontWeight: 200 }}
            >
              Tech
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: 'Outfit', fontWeight: 200 }}
            >
              Tips
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: 'Outfit', fontWeight: 200 }}
            >
              Gadgets
            </Typography>
          </Box>
        </Grid>

        {/* Right Side - Share Icons */}
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

      {/* Navigation Arrows and Titles */}
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
            BEST DIGITAL WATCHES TO BUY IN THIS YEAR
          </Typography>
        </Grid>

        <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="body2"
            sx={{ color: '#ff5722', fontFamily: 'Outfit', fontWeight: 200 }}
          >
            BEST AIRPOD THAT YOU MUST GET IT
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
