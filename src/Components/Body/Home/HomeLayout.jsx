import React from 'react'

import Poster from './Components/Poster'
import Carousel from '../../CommonComponents/Carousel'
import TextHeading from '../../CommonComponents/TextHeading';
import PostCard from '../../CommonComponents/PostCard';
import ImagesAssets from '../../../Assets/ImagesAssets';
import FeaturesRow from '../../CommonComponents/FeaturesRow';
import Categoriescard from './Components/Categoriescard';
import Categories from './Components/Categories';
import BestSellingItems from './Components/BestSellingItems';
import { Box } from '@mui/material';

const HomeLayout = () => {
  const items = [
    { Component: Poster, props: { direction: 'right', title: 'Poster 1' } },
    { Component: Poster, props: { direction: 'left', title: 'Poster 2' } },
];


  return (
    <> 
 <Box gap="60px"
      sx={{
        display: "flex",
        flexDirection: "row", // default as row
        flexWrap: "wrap", // optional: wraps if space ends
        width: "100%",
        justifyContent:"center"
      }}
    >
      <Carousel items={items} itemsToShow={1} />
      <FeaturesRow />
      <Categories />
      <BestSellingItems />
    </Box>


</>
  )

}

export default HomeLayout