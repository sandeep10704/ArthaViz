import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import ItemsCard from "./ItemsCard";
import Carousel from "../../../CommonComponents/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../../../store/Items-slice";


function Items() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const { list: posts, loading, error } = useSelector((state) => state.Items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const formattedPosts = posts.map((post) => ({
    Component: ItemsCard,
    props: {
      title: post.title,
      items: post.items,
      id:post.id,
    }
  }));

  return (
    <Box width="100%" mx={!isSmallScreen ? "10%" : "0%"}>
      {isSmallScreen ? (
        <Carousel items={formattedPosts} itemsToShow={1} />
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

export default Items;
