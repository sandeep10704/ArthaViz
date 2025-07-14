import React, { useEffect } from "react";
import { Box, useMediaQuery, Fade } from "@mui/material";
import TextHeading from "../../../CommonComponents/TextHeading";
import Carousel from "../../../CommonComponents/Carousel";
import Categoriescard from "./Categoriescard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../../store/Categories-slice";

function Categories() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const { list: posts, loading, error } = useSelector((state) => state.Categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const formattedPosts = posts.map((post) => ({
    Component: Categoriescard,
    props: {
      data: {
        image: post.image,
        text: post.text,
        id: post.id,
      }
    }
  }));

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      mx={!isSmallScreen ? "10%" : "0%"}
      width="100%"
    >
      <Box width={isSmallScreen ? "300px" : "100%"}>
        <TextHeading text="Categories" />
      </Box>

      {isSmallScreen ? (
        <Box width="300px" mx="auto">
          <Carousel items={formattedPosts} itemsToShow={1} />
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
            <Fade
              in={true}
              timeout={1500}
              style={{ transitionDelay: `${index * 400}ms` }} 
              key={props.data.id}
            >
              <div>
                <Component {...props} />
              </div>
            </Fade>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Categories;
