import React from "react";
import { Box, Typography } from "@mui/material";
import '@fontsource/outfit/300.css';

const Categoriescard = ({ data }) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "200px",
        height: "270px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
<Box
  sx={{
    position: "absolute",
    top: "28px",
    left: "28px",
    width: "152px",
    height: "190px",
  }}
>
  <Box
    component="img"
    src={data.image}
    alt="Card Image"
    sx={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
    }}
  />
</Box>



      <Box
        sx={{
          position: "absolute",
          top: "235px",
          left: "66px",
          width: "69px",
          height: "26px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Outfit",
            fontWeight: 300,
            fontSize: "21px",
            lineHeight: "100%",
            letterSpacing: "1%",
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          {data.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default Categoriescard;
