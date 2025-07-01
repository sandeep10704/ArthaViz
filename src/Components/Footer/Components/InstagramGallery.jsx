import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import ImagesAssets from "../../../Assets/ImagesAssets";
import { imageHoverBoxStyle } from "../../../Assets/CommonCss";

const instaImages = [
  ImagesAssets.Insta01, ImagesAssets.Insta02, ImagesAssets.Insta03,
  ImagesAssets.Insta04, ImagesAssets.Insta05, ImagesAssets.Insta06
];

const InstagramGallery = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMidScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box
      sx={{
        width: '100%',
        textAlign: 'center',
        py: isSmallScreen ? 2 : isMidScreen ? 8 : 15,
        background: '#fff'
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Outfit',
          fontWeight: 200,
          fontSize: isSmallScreen ? '18px' : isMidScreen ? '24px' : '30px',
          lineHeight: '100%',
          letterSpacing: '6%',
          textTransform: 'uppercase',
          color: '#272727',
          mb: isSmallScreen ? 2 : isMidScreen ? 3 : 4
        }}
      >
        INSTAGRAM #SHOPLITE
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={isSmallScreen ? '12px' : isMidScreen ? '24px' : '39px'}
        
      >
        {instaImages.map((src, i) => (
          <Box sx={{...imageHoverBoxStyle}}>
          <Box
            key={i}
            component="img"
            src={src}
            alt={`insta-${i}`}
            sx={{
              width: isSmallScreen ? '120px' : isMidScreen ? '180px' : '200px',
              height: isSmallScreen ? '120px' : isMidScreen ? '180px' : '200px',
              borderRadius: '10px',

              objectFit: 'cover',

            }}
          />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default InstagramGallery;
