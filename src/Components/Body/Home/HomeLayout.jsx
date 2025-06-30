import React from 'react'

import Poster from './Components/Poster'
import Carousel from '../../CommonComponents/Carousel'
import TextHeading from '../../CommonComponents/TextHeading';
import PostCard from '../../CommonComponents/PostCard';
import ImagesAssets from '../../../Assets/ImagesAssets';

const HomeLayout = () => {
  const items = [
    { Component: Poster, props: { direction: 'right', title: 'Poster 1' } },
    { Component: Poster, props: { direction: 'left', title: 'Poster 2' } },
];


  return (
    <> 
    {/* <Poster imagePosition="left" /> */}
{/* <Poster /> */}
{/* <PosterL /> */}
{/* <Poster ="directionright" />
<Poster direction="left" /> */}
<Carousel items={items} itemsToShow = {1}/>


</>
  )

}

export default HomeLayout