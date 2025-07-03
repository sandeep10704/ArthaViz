import React from 'react'
import ProductShowCard from './Components/ProductShowCard'
import ProductReviewCard from './Components/ProductReviewCard';
import ProductDescriptionCard from './Components/ProductDescriptionCard';
import ReviewForm from './Components/ReviewForm';
import {  Box, Stack } from '@mui/material';
import RelatedItems from './Components/RelatedItems';


const ProductShopLayout = () => {
  const reviews = [
    {
      image: 'https://i.pravatar.cc/150?img=3',
      name: 'Emma Chamberlin',
      date: '11/22/2022',
      text: 'Vitae tortor condimentum lacinia quis vel eros donec ac. Nam at lectus urna duis convallis convallis.',
    },
    {
      image: 'https://i.pravatar.cc/150?img=5',
      name: 'John Doe',
      date: '02/10/2023',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ];
  const productDescription = {
    title: 'Product Description',
    topText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.',
    points: [
      'Donec nec justo eget felis facilisis fermentum.',
      'Suspendisse urna viverra non, semper suscipit pede.',
    ],
    bottomText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.',
  };
  return (
    <Stack sx={{ padding: "50px 0 30px 0" }} spacing={2}>
      <ProductShowCard />


      <ProductDescriptionCard data={productDescription} />


      {reviews.map((review, index) => (
        <ProductReviewCard key={index} review={review} />
      ))}


      <ReviewForm />
      <Box sx={{mx:"auto"}}> 

      <RelatedItems />
      </Box>
    </Stack>
  )
}

export default ProductShopLayout
