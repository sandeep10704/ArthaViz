import { Box, useMediaQuery } from "@mui/material";
import TextHeading from "../../../CommonComponents/TextHeading";
import Carousel from "../../../CommonComponents/Carousel";
import ImagesAssets from "../../../../Assets/ImagesAssets";
import ProductCard from '../../../CommonComponents/ProductCard'
import React from "react";


function BestSellingItems() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

//  const ProductCard = React.lazy(() => import('../../../CommonComponents/ProductCard'));

  const posts = [
    {
      Component: ProductCard,
      props: {
        data: { 
          image: ImagesAssets.Selling01,
          text: "Phones",
          amount:"$870"
          }
      }
    },
    {
      Component: ProductCard ,
      props: {
        data: { 
          image: ImagesAssets.Selling02,
          text: "PlayStations",
          amount:"$600"
          }
      }
    },
    {
      Component: ProductCard ,
      props: {
        data: { 
          image: ImagesAssets.Selling03,
          text: "Digital watches",
          amount:"$400"
          }
      }
    },
    {
     Component: ProductCard ,
      props: {
        data: { 
          image: ImagesAssets.Selling04,
          text: "Joysticks",
          amount:"$900"
          }
      }
    },{
        Component: ProductCard ,
      props: {
        data: { 
          image: ImagesAssets.Selling05,
          text: "EarPods",
          amount:"$300"
          }
      }
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
       width="100%"
      mx= {!isSmallScreen ? "10%" : "0%"}
    >
      <Box width={isSmallScreen ? "300px" : "100%"}

>
        <TextHeading text="Best Selling Items" />
      </Box>

      {isSmallScreen ? (
        <Box width="350px" mx="auto"> 
        <Carousel items={posts} itemsToShow={2} />
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
          {posts.map(({ Component, props }, index) => (
            <Component key={index} {...props} />
          ))}
        </Box>
      )}
     
    </Box>
  );
}

export default BestSellingItems;
