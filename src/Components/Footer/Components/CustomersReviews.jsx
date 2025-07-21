import { Box, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import TextHeading from '../../CommonComponents/TextHeading';
import Carousel from '../../CommonComponents/Carousel';
import ReviewCard from './ReviewCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerReviews } from '../../../store/CustomerReview-slice';
import LoadingScreen from '../../CommonComponents/LoadingScreen'


const CustomersReviews = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(max-width:960px)');

  const dispatch = useDispatch();
  const { list: reviews, loading, error } = useSelector((state) => state.CustomerReviews);

  useEffect(() => {
    dispatch(fetchCustomerReviews());
  }, [dispatch]);

  if (loading) return <LoadingScreen/>;
  if (error) return <p>Error: {error.message}</p>;

  // Decide number of items to show based on screen size
  const itemsToShow = isSmallScreen ? 1 : (isMediumScreen ? 2 : 3);

  // Calculate width based on screen size
  const cardWidth = isSmallScreen
    ? '100%'
    : isMediumScreen
    ? '60%'
    : '100%';

  const formattedReviews = reviews.map((review) => ({
    Component: ReviewCard,
    props: {
      text: review.reviewText,
      name: review.customerName,
      stars: review.stars,
      width: cardWidth
    }
  }));

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      mx={!isSmallScreen ? "10%" : "auto"}
      my="10px"
    >
      <Box>
        <TextHeading text="Customers Reviews" />
      </Box>

      <Carousel
        items={formattedReviews}
        itemsToShow={itemsToShow}
      />
    </Box>
  );
};

export default CustomersReviews;
