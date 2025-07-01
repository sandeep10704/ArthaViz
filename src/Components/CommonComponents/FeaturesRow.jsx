import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import '@fontsource/outfit/100.css';
import ColorPalette from "../../Assets/ColorPalette";
import { cardHoverStyle, imageHoverBoxStyle } from "../../Assets/CommonCss";

const iconCss = {
  fontSize: 24,
  color: ColorPalette.orange,
       ...imageHoverBoxStyle, 
};

const features = [
  {
    icon: <LocalShippingOutlinedIcon sx={iconCss} />,
    heading: "FREE DELIVERY",
    text: "Consectetur adipis elit lorem ipsum dolor sit amet.",
  },
  {
    icon: <EmojiEventsOutlinedIcon sx={iconCss} />,
    heading: "QUALITY GUARANTEE",
    text: "Dolor sit amet orem ipsu mcons ectetur adipis elit.",
  },
  {
    icon: <LocalOfferOutlinedIcon sx={iconCss} />,
    heading: "DAILY OFFERS",
    text: "Amet consectetur adipis elit lorem ipsum dolor sit.",
  },
  {
    icon: <PaymentOutlinedIcon sx={iconCss} />,
    heading: "100% SECURE PAYMENT",
    text: "Rem Lopsum dolor sit amet, consectetur adipis elit.",
  },
];

const FeaturesRow = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMidScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: isSmallScreen ? "center" : "space-around",
        gap: isSmallScreen ? "16px" : "16px",
        mx: "auto",
        padding:"0 40px"
      }}
    >
      {features.map((feature, index) => (
        <Box
          key={index}
          sx={{
            width: isSmallScreen ? "90%" : isMidScreen ? "45%" : "300px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            ...cardHoverStyle,
            p:"2px"
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <Box
              sx={{
                width: "28px",
                height: "28px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {feature.icon}
            </Box>
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontWeight: 100,
                fontSize: "15px",
                lineHeight: "100%",
                letterSpacing: "6%",
                textTransform: "uppercase",
              }}
            >
              {feature.heading}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "Outfit",
              fontWeight: 200,
              fontSize: "10px",
              lineHeight: "100%",
              letterSpacing: "1%",
              ml: "35px",
            }}
          >
            {feature.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default FeaturesRow;
