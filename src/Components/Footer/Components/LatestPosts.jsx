import { Box, useMediaQuery } from '@mui/material';
import React, { lazy } from 'react';
import TextHeading from '../../CommonComponents/TextHeading';

import ImagesAssets from '../../../Assets/ImagesAssets';
import Carousel from '../../CommonComponents/Carousel'; // Adjust the path based on your project structure
import { useLocation } from 'react-router';
import PostCard from '../../CommonComponents/PostCard';

function LatestPosts() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
   const location = useLocation(); 
// const PostCard = lazy(() => import('../../CommonComponents/PostCard'));

  if (location.pathname === '/blogs') {
    return null;
  }

  const posts = [
    {
      Component: PostCard,
      props: {
        data: { 
          cardHeading: "Gadgets",
          textHeading: "5 Must-Have Gadgets for the Modern Home",
          text: "Dive into the world of cutting-edge technology with our latest blog post, where we highlight five essential gadgets every modern home should have. From smart assistants to home security systems, discover how these innovations can enhance your daily life and bring convenience to your fingertips.",
          image: ImagesAssets.Post01
        }
      }
    },
    {
      Component: PostCard,
      props: {
        data: {
          cardHeading: "Phones",
          textHeading: "Eco-Friendly Innovations Making a Difference",
          text: "Explore the intersection of technology and sustainability in our latest blog post. Learn about the innovative eco-friendly technologies revolutionizing various industries, from renewable energy solutions to recyclable electronics. Discover how these advancements are paving the way for a more sustainable future.",
          image: ImagesAssets.Post02
        }
      }
    },
    {
      Component: PostCard,
      props: {
        data: {
          cardHeading: "Tech",
          textHeading: "The Future of Wearable Tech: Trends to Watch",
          text: "Stay ahead of the curve with our insightful look into the rapidly evolving landscape of wearable technology. Explore the latest trends, from health monitoring devices to fashion-forward wearables, and learn how these advancements are shaping the future of personal technology.",
          image: ImagesAssets.Post03
        }
      }
    },
    {
      Component: PostCard,
      props: {
        data: {
          cardHeading: "Digital Watch",
          textHeading: "Top Apps and Tools for Remote Work",
          text: "In today's remote work environment, productivity is key. Discover the top apps and tools that can help you stay organized, focused, and efficient while working from home. From project management platforms to time-tracking apps, find out which tools are essential for maximizing your productivity.",
          image: ImagesAssets.Post04
        }
      }
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      // mx="auto"
      mx= {!isSmallScreen ? "10%" : "auto"}
    >
      <Box>
        <TextHeading text="LATEST POSTS" />
      </Box>

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

export default LatestPosts;
