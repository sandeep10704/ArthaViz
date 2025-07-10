import React, { lazy } from 'react'

// import Poster from './Components/Poster'
import Carousel from '../../CommonComponents/Carousel'
import TextHeading from '../../CommonComponents/TextHeading';
import PostCard from '../../CommonComponents/PostCard';
import ImagesAssets from '../../../Assets/ImagesAssets';
import FeaturesRow from '../../CommonComponents/FeaturesRow';
import Categories from './Components/Categories';
import BestSellingItems from './Components/BestSellingItems';
import { Box } from '@mui/material';
import ItemsCard from './Components/ItemsCard';
import Items from './Components/Items';
import PosterDiscount from './Components/PosterDiscount';

const HomeLayout = () => {
  const Poster = lazy(() => import('./Components/Poster'));
  const items = [
     { Component: Poster, props: { direction: 'left', title: 'Poster 2' } },
    { Component: Poster, props: { direction: 'right', title: 'Poster 1' } },
   
];



  return (
    <> 
 <Box gap="60px"
      sx={{
        display: "flex",
        flexDirection: "row", 
        flexWrap: "wrap", 
        width: "100%",
        justifyContent:"center"
      }}
    >
      <Carousel items={items} itemsToShow={1} />
      <FeaturesRow />
      <Categories />
      <BestSellingItems />
      <PosterDiscount/>
      <Items/>

    </Box>


</>
  )

}

export default HomeLayout