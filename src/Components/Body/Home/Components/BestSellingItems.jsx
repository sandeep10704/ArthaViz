import { Box, useMediaQuery } from "@mui/material";
import TextHeading from "../../../CommonComponents/TextHeading";
import Carousel from "../../../CommonComponents/Carousel";
import ProductCard from '../../../CommonComponents/ProductCard';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBestSelling } from "../../../../store/BestSellinga-slice";


function BestSellingItems() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const { list: posts, loading, error } = useSelector((state) => state.BestSelling);

  useEffect(() => {
    dispatch(fetchBestSelling());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const formattedPosts = posts.map((post) => ({
    Component: ProductCard,
    props: {
      data: {
        image: post.image,
        text: post.text,
        amount: post.amount,
        id:post.id,
      }
    }
  }));

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      width="100%"
      mx={!isSmallScreen ? "10%" : "0%"}
    >
      <Box width={isSmallScreen ? "300px" : "100%"}>
        <TextHeading text="Best Selling Items" />
      </Box>

      {isSmallScreen ? (
        <Box width="350px" mx="auto"> 
          <Carousel items={formattedPosts} itemsToShow={2} />
        </Box>
      ) : (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          sx={{
            mx: '-8px',
            '& > *': {
              mx: '8px',
              my: '8px',
            },
          }}
        >
          {formattedPosts.map(({ Component, props }, index) => (
            <Component key={index} {...props} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default BestSellingItems;
