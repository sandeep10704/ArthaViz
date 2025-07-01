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
          amount:"$870"
          }
      }
    },
    {
      Component: ProductCard ,
      props: {
        data: { 
          image: ImagesAssets.Selling03,
          text: "Digital watches",
          amount:"$870"
          }
      }
    },
    {
     Component: ProductCard ,
      props: {
        data: { 
          image: ImagesAssets.Selling04,
          text: "Joysticks",
          amount:"$870"
          }
      }
    },{
        Component: ProductCard ,
      props: {
        data: { 
          image: ImagesAssets.Selling05,
          text: "EarPods",
          amount:"$870"
          }
      }
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      width="auto"
      mx= {!isSmallScreen ? "10%" : "0%"}
    >
      <Box width={isSmallScreen ? "300px" : "auto"}

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
