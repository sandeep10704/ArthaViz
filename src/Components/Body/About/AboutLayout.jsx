import React from 'react'
import Aboutus from './Components/Aboutus'
import FeaturesRow from '../../CommonComponents/FeaturesRow'
import { Box } from '@mui/material'

const AboutLayout = () => {
  return (
    <> 
     <Box display="flex" flexDirection="column" gap="40px" padding={0} > 
  <FeaturesRow />
  <Aboutus />
</Box>

    </>
  )
}

export default AboutLayout