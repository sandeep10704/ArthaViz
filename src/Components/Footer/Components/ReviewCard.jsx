import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import '@fontsource/outfit/100.css';
import '@fontsource/outfit/400.css';
import { cardHoverStyle } from "../../../Assets/CommonCss";

const ReviewCard = ({ text, name, stars }) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(max-width:1440px)');

  // Base sizes (for large screens)
  const baseCardWidth = 260;
  const baseCardHeight = 200;
  const baseTextBoxWidth = 235;
  const baseTextBoxHeight = 100;
  const basePadding = 15;
  const baseGap = 22.5;
  const baseStarIconSize = 16;
  const baseReviewBoxWidth = 113;
  const baseReviewBoxHeight = 28.25;
  const baseReviewGap = 6.75;
  const baseStarBoxWidth = 104;
  const baseStarBoxHeight = 16;
  const baseStarBoxGap = 6;
  const baseFontSize = 16;

  // Calculate sizes based on screen
  const scale = isSmallScreen ? (2 / 3) : (isMediumScreen ? (3 / 5) : 1);

  const cardWidth = `${baseCardWidth * scale}px`;
  const cardHeight = `${baseCardHeight * scale}px`;
  const textBoxWidth = `${baseTextBoxWidth * scale}px`;
  const textBoxHeight = `${baseTextBoxHeight * scale}px`;
  const padding = `${basePadding * scale}px`;
  const gap = `${baseGap * scale}px`;
  const starIconSize = `${baseStarIconSize * scale}px`;
  const reviewBoxWidth = `${baseReviewBoxWidth * scale}px`;
  const reviewBoxHeight = `${baseReviewBoxHeight * scale}px`;
  const reviewGap = `${baseReviewGap * scale}px`;
  const starBoxWidth = `${baseStarBoxWidth * scale}px`;
  const starBoxHeight = `${baseStarBoxHeight * scale}px`;
  const starBoxGap = `${baseStarBoxGap * scale}px`;
  const fontSize = `${baseFontSize * scale}px`;

  return (
    <Box
      sx={{
        width: cardWidth,
        height: cardHeight,
        borderRadius: "10px",
        border: "1px solid #ccc",
        padding: padding,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: gap,
         ...cardHoverStyle,
      }}
    >
      {/* Text Field */}
      <Box
        sx={{
          width: textBoxWidth,
          height: textBoxHeight,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Outfit",
            fontWeight: 100,
            fontSize: fontSize,
            lineHeight: "100%",
            letterSpacing: "1%",
          }}
        >
          {text}
        </Typography>
      </Box>

      {/* Review Field */}
      <Box
        sx={{
          width: reviewBoxWidth,
          height: reviewBoxHeight,
          display: "flex",
          flexDirection: "column",
          gap: reviewGap,
        }}
      >
        {/* Star Field */}
        <Box
          sx={{
            width: starBoxWidth,
            height: starBoxHeight,
            display: "flex",
            gap: starBoxGap,
          }}
        >
          {Array.from({ length: stars }).map((_, index) => (
            <StarIcon
              key={index}
              sx={{ fontSize: starIconSize, color: "#FFA500" }}
            />
          ))}
        </Box>

        {/* Name Review */}
        <Typography
          sx={{
            fontFamily: "Outfit",
            fontWeight: 300,
            fontSize: fontSize,
            lineHeight: "100%",
            letterSpacing: "1%",
            textTransform: "capitalize",
          }}
        >
          {name}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReviewCard;
