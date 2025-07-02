import React, { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/200.css';
import '@fontsource/outfit/100.css';
import { cardHoverStyle, imageHoverBoxStyle } from "../../Assets/CommonCss";

const PostCard = ({ data }) => {
  const { cardHeading, textHeading, text, image } = data;
  const [expanded, setExpanded] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:1440px)");

  const baseWidth = 240;
  const baseImageWidth = 230;

  const scale = isSmallScreen ? 1 : (isMediumScreen ? (5 / 7) : 1);

  const cardWidth = `${baseWidth * scale}px`;
  const imageWidth = `${baseImageWidth * scale}px`;

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      width={cardWidth}
      height={expanded ?"460px" : "380px"}
      display="flex"
      flexDirection="column"
      gap="10px"
      padding={"10px"}
      sx={{...cardHoverStyle}}
    >
      {/* Card Heading and Image */}
      <Box>
        <Box
          px={1}
          height="18px"
          bgcolor="#FF6B4A"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="fit-content"
        >
          <Typography
            sx={{
              fontFamily: "Outfit",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "8%",
              textTransform: "uppercase",
              color: "white",
            }}
          >
            {cardHeading}
          </Typography>
        </Box>

        <Box
          width={imageWidth}
          height="216px"
          overflow="hidden"
          mb={1}
          sx={{...imageHoverBoxStyle}}
        >
          <img
            src={image}
            alt={textHeading}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      </Box>

      {/* Text Field */}
      <Box
        width={cardWidth}
        flex="1"
        display="flex"
        flexDirection="column"
        gap="6px"
      >
        <Typography
          sx={{
            fontFamily: "Outfit",
            fontWeight: 200,
            fontSize: "15px",
            lineHeight: "100%",
            letterSpacing: "6%",
            textTransform: "uppercase",
          }}
        >
          {textHeading}
        </Typography>

        <Typography
          sx={{
            fontFamily: "Outfit",
            fontWeight: 100,
            fontSize: "13px",
            lineHeight: "120%",
            letterSpacing: "1%",
            display: "-webkit-box",
            WebkitLineClamp: expanded ? "none" : 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {text}
        </Typography>

        <Typography
          onClick={handleToggle}
          sx={{
            fontFamily: "Outfit",
            fontWeight: 100,
            fontSize: "15px",
            lineHeight: "100%",
            letterSpacing: "1%",
            textTransform: "capitalize",
            textDecoration: "underline",
            cursor: "pointer",
            alignSelf: "flex-start",
          }}
        >
          {expanded ? "Show Less" : "Read More"}
        </Typography>
      </Box>
    </Box>
  );
};

export default PostCard;
