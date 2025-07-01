import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import '@fontsource/outfit/300.css';
import ColorPalette from "../../Assets/ColorPalette";

const ProductCard = ({ data }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));


  const width = 250; 
  const height = 300;
  const imgWidth = 180;
  const imgHeight = 140;
  const imgTop = 40;
  const imgLeft =35;
  const textTop = 200;
  const textWidth = 292;
  const textHeight = 61;
  const fontSize = 21;
  const gap = 9;


  const scale = isSmallScreen ? 0.5 : 1;

  return (
    <Box
      sx={{
        position: "relative",
        width: `${width * scale}px`,
        height: `${height * scale}px`,
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={data.image}
        alt="Card Image"
        sx={{
          position: "absolute",
          top: `${imgTop * scale}px`,
          left: `${imgLeft * scale}px`,
          width: `${imgWidth * scale}px`,
          height: `${imgHeight * scale}px`,
          objectFit: "cover",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: `${textTop * scale}px`,
          left: `${(width * scale - textWidth * scale) / 2}px`,
          width: `${textWidth * scale}px`,
          height: `${textHeight * scale}px`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: `${gap * scale}px`,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Outfit",
            fontWeight: 300,
            fontSize: `${fontSize * scale}px`,
            lineHeight: "100%",
            letterSpacing: "1%",
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          {data.text}
        </Typography>

        <Typography
          sx={{
            fontFamily: "Outfit",
            fontWeight: 300,
            fontSize: `${fontSize * scale}px`,
            lineHeight: "100%",
            letterSpacing: "1%",
            textAlign: "center",
            textTransform: "capitalize",
            color:ColorPalette.orange
          }}
        >
          {data.amount}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductCard;
