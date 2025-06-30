import { Box, Divider } from '@mui/material'


import TopBrands from './Components/TopBrands'
import InstagramGallery from './Components/InstagramGallery'
import FooterMain from './Components/FooterMain'
import FooterBottom from './Components/FooterBottom'
import LatestPosts from './Components/LatestPosts'

const FooterLayout = () => {
  return (
    <Box bgcolor="#fff" color="#333">
    <LatestPosts/>
    <TopBrands />
    <Divider />
    <InstagramGallery />
    <FooterMain />
    <FooterBottom />
  </Box>
  )
}

export default FooterLayout
