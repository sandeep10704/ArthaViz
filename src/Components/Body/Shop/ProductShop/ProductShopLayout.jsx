import React, { useEffect } from 'react';
import { Box, Stack, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../../../store/singleProductSlice';

import ProductShowCard from './Components/ProductShowCard';
import ProductReviewCard from './Components/ProductReviewCard';
import ProductDescriptionCard from './Components/ProductDescriptionCard';
import ReviewForm from './Components/ReviewForm';
import RelatedItems from './Components/RelatedItems';

const ProductShopLayout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    product,
    productDescription,
    reviews,
    status,
    error
  } = useSelector((state) => state.singleProduct);

  useEffect(() => {
    console.log("🟡 URL Param id:", id);
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (status === 'loading') return <CircularProgress />;
  if (status === 'failed') return <Typography color="error">Error: {error}</Typography>;
  if (status === 'succeeded' && !product) {
    return <Typography>No product found.</Typography>;
  }

  return (
    <Stack sx={{ padding: "50px 0 30px 0" }} spacing={2}>
      <ProductShowCard product={product} Id={id} />

      <ProductDescriptionCard data={productDescription} />
      {reviews.map((review, index) => (
        <ProductReviewCard key={index} review={review} />
      ))}
      <ReviewForm id={id}/>
      <Box sx={{ mx: "auto" }}>
        <RelatedItems />
      </Box>
    </Stack>
  );
};

export default ProductShopLayout;
