import React from 'react';
import { Box, Typography, Avatar, Grid,} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';


const ProductReviewCard = ({ review }) => {
  return (
    <Box sx={{ p: 2 }}>

      <Grid container spacing={2}>
        <Grid item>
          <Avatar src={review.image} alt={review.name} sx={{ width: 70, height: 70 }} />
        </Grid>
        <Grid item xs>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} sx={{ color: '#FF6543', fontSize: 18 }} />
            ))}
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight:400,fontFamily:"Outfit" }}>
            {review.name}
            <Typography variant="body2" component="span" sx={{ ml: 1, color: 'grey.800',fontFamily:"Outfit"}}>
              - {review.date}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5,fontFamily:"Outfit",fontWeight:200 }}>
            {review.text}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductReviewCard;
