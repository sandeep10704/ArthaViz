import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import '@fontsource/outfit/300.css';
import ColorPalette from "../../Assets/ColorPalette";
import { cardHoverStyle, imageHoverBoxStyle } from "../../Assets/CommonCss";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ data }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const width = 205;
  const height = 230;
  const imgHeight = 130;
  const fontSize = 21;
  const gap = 9;

  const scale = isSmallScreen ? 0.5 : 1;

  const handleCardClick = () => {
    navigate(`/shop/${data.id}`);
  };

  let text = data.text.trim();
  let words = text.split(/\s+/);
  let title = '';

  for (let word of words) {
    if ((title + ' ' + word).trim().length <= 10) {
      title = (title + ' ' + word).trim();
    } else {
      break;
    }
  }

  return (
    <Box
      onClick={handleCardClick}
      sx={{
        width: `${width * scale}px`,
        height: `${height * scale}px`,
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: `${20 * scale}px`,
        gap: `${gap * scale}px`,
        ...cardHoverStyle,
      }}
    >
      <Box sx={{ ...imageHoverBoxStyle, display: "flex", justifyContent: "center" }}>
        <Box
          component="img"
          src={data.image}
          alt="Card Image"
          sx={{
            width: "auto",
            height: `${imgHeight * scale}px`,
          }}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: `${gap * scale}px`,
          paddingX: `${10 * scale}px`,
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
          {title}
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
            color: ColorPalette.orange,
          }}
        >
          {data.amount}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductCard;
