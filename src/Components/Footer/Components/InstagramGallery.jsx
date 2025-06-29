import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import ImagesAssets from "../../../Assets/ImagesAssets";

const instaImages = [
  ImagesAssets.Insta01, ImagesAssets.Insta02, ImagesAssets.Insta03,
  ImagesAssets.Insta04, ImagesAssets.Insta05, ImagesAssets.Insta06
];

const InstagramGallery = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100%',
        textAlign: 'center',
        py: isSmallScreen ? 2 : 15,
        background: '#fff'
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Outfit',
          fontWeight: 200,
          fontSize: isSmallScreen ? '18px' : '30px',
          lineHeight: '100%',
          letterSpacing: '6%',
          textTransform: 'uppercase',
          color: '#272727',
          mb: isSmallScreen ? 2 : 4
        }}
      >
        INSTAGRAM #SHOPLITE
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={isSmallScreen ? '12px' : '39px'}
      >
        {instaImages.map((src, i) => (
          <Box
            key={i}
            component="img"
            src={src}
            alt={`insta-${i}`}
            sx={{
              width: isSmallScreen ? '120px' : '240px',
              height: isSmallScreen ? '120px' : '240px',
              borderRadius: '10px',
              objectFit: 'cover'
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default InstagramGallery;
