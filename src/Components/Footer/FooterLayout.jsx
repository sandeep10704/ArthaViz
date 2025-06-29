import { Box, Container } from '@mui/material'
import React from 'react'
import FooterBrand from './Components/FooterBrand'
import FooterLinks from './Components/FooterLinks'
import FooterContact from './Components/FooterContact'

const FooterLayout = () => {
  return (
    <Box sx={{ backgroundColor: '#f8f8f8', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}>
          <FooterBrand />
          <FooterLinks />
          <FooterContact />
        </Box>
      </Container>
    </Box>
  )
}

export default FooterLayout
