import { Box, useMediaQuery } from "@mui/material";

import ItemsCard from "./ItemsCard";
import ImagesAssets from "../../../../Assets/ImagesAssets";

import Carousel from "../../../CommonComponents/Carousel";



function Items() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const posts = [
    {
      Component: ItemsCard,
      props: {

        title:"Featured",
        items :[
        { id: 1, name: 'Wireless Headset', price: '$500', image: ImagesAssets.Item11 },
        { id: 2, name: 'Iphone X Pro Max', price: '$820', image: ImagesAssets.Item12 },
        { id: 3, name: 'Iphone 11 Pro', price: '$960', image: ImagesAssets.Item13 },
    ]
        
      }
    },
    {
      Component: ItemsCard,
      props: {

        title:"Latest items",
        items :[
        { id: 1, name: 'Apple airPod', price: '$450', image: ImagesAssets.Item21 },
        { id: 2, name: 'Screen touch watch', price: '$750', image: ImagesAssets.Item22 },
        { id: 3, name: 'Digital watch', price: '$660', image: ImagesAssets.Item23 },
    ]
        
      }
      
    },
    {
      Component: ItemsCard,
      props: {
    
        title:"best reviewed",
        items :[
        { id: 1, name: 'Wireless Joysticks', price: '$350', image: ImagesAssets.Item31 },
        { id: 2, name: 'Apple White AirPod', price: '$330', image: ImagesAssets.Item32 },
        { id: 3, name: 'Gimbal stabilizer', price: '$920', image: ImagesAssets.Item33},
    ]
        }
      
    },
    {
      Component: ItemsCard,
      props: {

        title:"on sale",
        items :[
        { id: 1, name: 'Iphone 15 pro max', price: '$500', image: ImagesAssets.Item41 },
        { id: 2, name: 'White AirPods', price: '$820', image: ImagesAssets.Item42 },
        { id: 3, name: 'Security CCTV camera', price: '$960', image: ImagesAssets.Item43 },
    ]
        
      }
    },
  ];

  return (
    <Box
      width="100%"
      mx= {!isSmallScreen ? "10%" : "0%"}
    >


      {isSmallScreen ? (
        <Carousel items={posts} itemsToShow={1} />
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

export default Items;
