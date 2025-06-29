import '@fontsource/outfit/100.css';
import { Box, Typography } from '@mui/material';
import CommonCss from '../../../Assets/CommonCss';

const TopInfo = () => {
  return (
    <Box
      display={{ xs: 'none', sm: 'flex' }} 
      borderBottom={CommonCss.line}
      sx={{
        width: '100%',
        height: '45px',
        fontFamily: 'Outfit',
        fontWeight: 100,
      }}
    >
      {/* Column 1 */}
      <Box
        flex={1}
        textAlign="center"
        p={2}
        borderRight={CommonCss.line}
      >
        <Typography variant="body1">Need help? Call us 112233344455</Typography>
      </Box>

      {/* Column 2 */}
      <Box
        flex={1}
        textAlign="center"
        p={2}
        borderRight={CommonCss.line}
      >
        <Typography variant="body1">Summer sale discount off 60%! Shop Now</Typography>
      </Box>

      {/* Column 3 */}
      <Box flex={1} textAlign="center" p={2}>
        <Typography variant="body1">2-3 business days delivery & free returns</Typography>
      </Box>
    </Box>
  );
};

export default TopInfo;
