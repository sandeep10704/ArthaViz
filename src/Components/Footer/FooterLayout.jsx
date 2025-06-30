import { Box, Divider } from '@mui/material'


import TopBrands from './Components/TopBrands'
import InstagramGallery from './Components/InstagramGallery'
import FooterMain from './Components/FooterMain'
import FooterBottom from './Components/FooterBottom'
import LatestPosts from './Components/LatestPosts'

import CustomersReviews from './Components/CustomersReviews'

const FooterLayout = () => {
  return (
    <Box bgcolor="#fff" color="#333">
    
<CustomersReviews/>
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
