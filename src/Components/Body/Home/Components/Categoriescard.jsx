import React from "react";
import { Box, Typography } from "@mui/material";
import '@fontsource/outfit/300.css';
import { cardHoverStyle, imageHoverBoxStyle } from "../../../../Assets/CommonCss";

const Categoriescard = ({ data }) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "170px",
        height: "200px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        ...cardHoverStyle,
      }}
    >
<Box
  sx={{
    position: "absolute",
    top: "20px",
    left: "33px",
    width: "102px",
    height: "120px",
     ...imageHoverBoxStyle, 
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
          top: "145px",
          left: "46px",
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
            fontSize: "18px",
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
