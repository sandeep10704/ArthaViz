import { Box, Grid } from '@mui/material'
import React from 'react'
import ContactInfo from './Components/ContactInfo'
import ContactQuestions from './Components/ContactQuestions'
import StoreDetails from './Components/StoreDetails'
import ImagesAssets from '../../../Assets/ImagesAssets'

const Contact = () => {
  return (
    <Box>
      {/* First Row */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ContactInfo />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContactQuestions />
        </Grid>
      </Grid>

      {/* Second Row */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6} sx={{ maxWidth: 600, maxHeight: 600 }}>
          <Box
            component="img"
            src={ImagesAssets.Insta01}
            alt="Insta01"
            sx={{
              width: '90%',
              height: '70%',
              objectFit: 'cover',
              // padding:'15%'
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} paddingLeft={"30px"}>
          <StoreDetails />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Contact