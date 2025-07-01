import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import TextHeading from "../../../CommonComponents/TextHeading";
import Carousel from "../../../CommonComponents/Carousel";
import ImagesAssets from "../../../../Assets/ImagesAssets";
import Categoriescard from "./Categoriescard";


function Categories() {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
// const CategoriesCard = React.lazy(() => import('./Categoriescard'));
  const posts = [
    {
      Component: Categoriescard,
      props: {
        data: {
          image: ImagesAssets.Categorie01,
          text: "Phones",
        }
      }
    },
    {
      Component: Categoriescard,
      props: {
        data: {
          image: ImagesAssets.Categorie02,
          text: "PlayStations",
        }
      }
    },
    {
      Component: Categoriescard,
      props: {
        data: {
          image: ImagesAssets.Categorie03,
          text: "Digital watches",
        }
      }
    },
    {
      Component: Categoriescard,
      props: {
        data: {
          image: ImagesAssets.Categorie04,
          text: "Joysticks",
        }
      }
    },
    {
      Component: Categoriescard,
      props: {
        data: {
          image: ImagesAssets.Categorie05,
          text: "EarPods",
        }
      }
    },
    {
      Component: Categoriescard,
      props: {
        data: {
          image: ImagesAssets.Categorie06,
          text: "Laptops",
        }
      }
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      mx={!isSmallScreen ? "10%" : "0%"}
      width="auto"
    >
      <Box width={isSmallScreen ? "300px" : "auto"}>
        <TextHeading text="Categories" />
      </Box>

      {isSmallScreen ? (
        <Box width="300px" mx="auto">
        <Carousel items={posts} itemsToShow={1} />
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

export default Categories;
