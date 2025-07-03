import React from 'react'
import PostsMenu from "./Components/PostsMenu" 
import SearchBox from '../../../CommonComponents/SearchBox'
import Filters from '../../../CommonComponents/Filters'
import { Box, Grid } from '@mui/material'
 const data = [
    { header: 'Categories', topics: ['All', 'Phones', 'Accessories', 'Tablets', 'Watches'] },
    { header: 'Tags', topics: ['White', 'Cheap', 'Mobile', 'Modern'] },
    { header: 'Social links', topics: ['Facebook', 'Instagram', 'Twitter','Youtube','Pinterest'] },
    
  ];
const PostsLayout = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: '16px' }}>
  <Grid container spacing={2}>
    {/* xs: Search + Filters above ProductShow, md+: left side */}
    <Grid
      item
      xs={12}
      md={3}
      sx={{
        order: { xs: 1, md: 1 }, // first in both xs and md+
        display: { xs: 'flex', md: 'block' },
        flexDirection: { xs: 'row', md: 'column' },
        gap: '16px',
        padding: { xs: "0 20px", md: "0" }
      }}
    >
      <SearchBox />
      <Filters data={data} />
    </Grid>

    {/* ProductShow */}
    <Grid
      item
      xs={12}
      md={9}
      sx={{
        order: { xs: 2, md: 2 }, // second in both xs and md+
      }}
    >
      <PostsMenu/>
    </Grid>
  </Grid>
</Box>

  )
}

export default PostsLayout
