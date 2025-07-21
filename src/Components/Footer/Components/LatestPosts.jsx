import { Box, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import TextHeading from '../../CommonComponents/TextHeading';
import Carousel from '../../CommonComponents/Carousel';
import { useLocation } from 'react-router';
import PostCard from '../../CommonComponents/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLastPosts } from '../../../store/LastPost-slice';
import LoadingScreen from '../../CommonComponents/LoadingScreen'


function LatestPosts() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const location = useLocation();
  const dispatch = useDispatch();

  const { list: posts, loading, error } = useSelector((state) => state.LastPost);

  useEffect(() => {
    dispatch(fetchLastPosts());
  }, [dispatch]);

  if (location.pathname === '/blogs') {
    return null;
  }

  if (loading) return <LoadingScreen/>;
  if (error) return <p>Error: {error.message}</p>;

  const formattedPosts = posts.map((post) => ({
    Component: PostCard,
    props: {
      data: {
        cardHeading: post.cardHeading,
        textHeading: post.textHeading,
        text: post.text,
        image: post.image,
        id:post.id,
      }
    }
  }));

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      mx={!isSmallScreen ? "10%" : "auto"}
    >
      <Box>
        <TextHeading text="LATEST POSTS" />
      </Box>

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

export default LatestPosts;
