import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';

const TopBrands = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm')); 
  const isMedium = useMediaQuery(theme.breakpoints.down('md')); 

  const fontSize = isSmall ? '16px' : isMedium ? '24px' : '30.74px';
  const miniStoreSize = isSmall ? '22px' : isMedium ? '30px' : '40px';

  return (
    <Box
      sx={{
        width: '100%',
        height: isSmall ? 'auto' : '200px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: isSmall ? 'wrap' : 'nowrap',
        gap: (isSmall) ? 2 : 0,
        padding: isSmall ? '30px 20px' : '100px 190px',
        borderTop: '1px solid #E3E3E3',
        borderBottom: '1px solid #E3E3E3',
        backgroundColor: 'white',
        boxSizing: 'border-box',
      }}
    >
      {/* TECHLIGHT */}
      <Box>
        <Typography component="span" sx={{ display: 'inline', opacity: 0.4 }}>
          <Box
            component="span"
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 400,
              fontSize,
              lineHeight: '100%',
              letterSpacing: '8%',
              textTransform: 'uppercase',
            }}
          >
            TECH
          </Box>
          <Box
            component="span"
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 300,
              fontSize,
              lineHeight: '100%',
              letterSpacing: '8%',
              textTransform: 'uppercase',
            }}
          >
            LIGHT
          </Box>
        </Typography>
      </Box>

      {/* MiniStore */}
      <Typography
        sx={{
          fontFamily: 'Jost',
          fontWeight: 400,
          fontSize: miniStoreSize,
          lineHeight: '100%',
          letterSpacing: '0%',
          opacity: 0.4,
        }}
      >
        MiniStore.
      </Typography>

      {/* ULTRAS */}
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontWeight: 800,
          fontSize,
          lineHeight: '100%',
          letterSpacing: '8%',
          textTransform: 'uppercase',
          opacity: 0.4,
        }}
      >
        ULTRAS
      </Typography>

      {/* SWANKY */}
      <Typography
        sx={{
          fontFamily: 'Syne',
          fontWeight: 700,
          fontSize,
          lineHeight: '100%',
          letterSpacing: '8%',
          textTransform: 'uppercase',
          opacity: 0.4,
        }}
      >
        SWANKY
      </Typography>

      {/* EMILY */}
      <Typography
        sx={{
          fontFamily: 'Lora',
          fontWeight: 400,
          fontSize,
          lineHeight: '100%',
          letterSpacing: '8%',
          textTransform: 'uppercase',
          opacity: 0.4,
        }}
      >
        EMILY
      </Typography>
    </Box>
  );
};

export default TopBrands;
