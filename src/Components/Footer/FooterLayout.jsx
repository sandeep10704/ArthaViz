import { Box, Divider } from '@mui/material'


import TopBrands from './Components/TopBrands'
import InstagramGallery from './Components/InstagramGallery'
import FooterMain from './Components/FooterMain'
import FooterBottom from './Components/FooterBottom'

const FooterLayout = () => {
  return (
    <Box bgcolor="#fff" color="#333">
    <TopBrands />
    <Divider />
    <InstagramGallery />
    <FooterMain />
    <FooterBottom />
  </Box>
  )
}

export default FooterLayout
