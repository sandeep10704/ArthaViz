import { Box, Link } from "@mui/material";
import '@fontsource/outfit/200.css';
import ImagesAssets from "../../../Assets/ImagesAssets";

const commonImageStyles = {
  height: 15,
  filter: 'grayscale(100%)',
  mx: 0.5,
  verticalAlign: 'middle', 
};

const commonBoxStyles = {
  borderTop: "1px solid #ddd",
  px: 4,
  py: 2,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: 14,
  fontFamily: "Outfit",
  fontWeight: 200,
};

const FooterBottom = () => (
  <Box sx={commonBoxStyles}>
    <Box>
      We ship with: 
      <Box component="img" src={ImagesAssets.Amazon} alt="Amazon" sx={commonImageStyles} />
      <Box component="img" src={ImagesAssets.FlipKart} alt="FlipKart" sx={commonImageStyles} />
    </Box>
    <Box>
      Payment options: 
      <Box component="img" src={ImagesAssets.Visa} alt="Visa" sx={commonImageStyles} />
      <Box component="img" src={ImagesAssets.PayPal} alt="PayPal" sx={commonImageStyles} />
    </Box>
    <Box>
      © Copyright 2025 ShopLite. Design by <Link href="https://github.com/sandeep10704">Sandy</Link>
    </Box>
  </Box>
);

export default FooterBottom;
