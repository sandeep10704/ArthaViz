import React from 'react'

import { Box, Grid } from '@mui/material';
import SearchBox from '../../../CommonComponents/SearchBox';
import Filters from '../../../CommonComponents/Filters';
import ProductShow from './Components/ProductShow';

const MainShopLayout = () => {
  const data = [
    { header: 'Categories', topics: ['All', 'Phones', 'Accessories', 'Tablets', 'Watches'] },
    { header: 'Tags', topics: ['White', 'Cheap', 'Mobile', 'Modern'] },
    { header: 'Brands', topics: ['Apple', 'Samsung', 'Green'] },
    { header: 'Filter by Price', topics: ['Less than $10', '$10- $20', '$20- $30', '$30- $40', '$40- $50'] },
  ];
  return (
 <Box sx={{ flexGrow: 1, padding: '16px' }}>
  <Grid container spacing={2}>
    {/* xs: Search + Filters above ProductShow, md+: right side */}
    <Grid
      item
      xs={12}
      md={3}
      sx={{
        order: { xs: 1, md: 2 }, // first in small, second in medium+
        display: { xs: 'flex', md: 'block' },
        flexDirection:{ xs: 'row', md: 'column' },
        gap: '16px',
        padding:{xs:" 0 20px",md:"0"}
      }}
    >
      <SearchBox/>
      <Filters data={data} />
    </Grid>

    {/* ProductShow */}
    <Grid
      item
      xs={12}
      md={9}
      sx={{
        order: { xs: 2, md: 1 }, // second in small, first in medium+
      }}
    >
      <ProductShow />
    </Grid>
  </Grid>
</Box>



  )
}

export default MainShopLayout;