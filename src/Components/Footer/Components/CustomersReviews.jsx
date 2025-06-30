import { Box, useMediaQuery } from '@mui/material';
import React from 'react';
import ReviewCard from './ReviewCard';
import TextHeading from '../../CommonComponents/TextHeading';
import Carousel from '../../CommonComponents/Carousel';

const CustomersReviews = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(max-width:960px)');

  const reviews = [
    {
      Component: ReviewCard,
      props: {
        text: "“I stumbled upon this tech store while searching for a new laptop, and I couldn't be happier with my experience! The staff was incredibly knowledgeable and guided me through the process of choosing the perfect device for my needs. Highly recommended!”",
        name: "John Doe",
        stars: 4,
      },
    },
    {
      Component: ReviewCard,
      props: {
        text: "“Amazing customer service and the prices were unbeatable. Will definitely shop here again!”",
        name: "Jane Smith",
        stars: 5,
      },
    },
    {
      Component: ReviewCard,
      props: {
        text: "“Great variety of products and quick delivery. Overall a pleasant shopping experience.”",
        name: "Alex Johnson",
        stars: 4,
      },
    },
    {
      Component: ReviewCard,
      props: {
        text: "“Quality products and fast shipping. I highly recommend this store to anyone looking for great deals.”",
        name: "Emily Brown",
        stars: 5,
      },
    },
  ];

  // Decide number of items to show based on screen size
  const itemsToShow = isSmallScreen ? 1 : (isMediumScreen ? 2 : 3);

  // Calculate width based on screen size
  const cardWidth = isSmallScreen
    ? '100%' // full width for small screens
    : isMediumScreen
    ? '60%' // 5/7 for mid screens
    : '100%'; // default full size for large screens

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      width="auto"
      mx={!isSmallScreen ? "10%" : "0%"}
      my="10px"
    >
      <Box>
        <TextHeading text="Customers Reviews" />
      </Box>

      <Carousel
        items={reviews.map((review) => ({
          ...review,
          props: {
            ...review.props,
            width: cardWidth, // pass calculated width to ReviewCard
          },
        }))}
        itemsToShow={itemsToShow}
      />
    </Box>
  );
};

export default CustomersReviews;
