import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import SearchBox from '../../../CommonComponents/SearchBox';
import Filters from '../../../CommonComponents/Filters';
import PostsMenu from './Components/PostsMenu';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPostData,
  updateSelectedFilters,
  applyFilterAndPaginate,
} from '../../../../store/postsSlice';

const PostsLayout = () => {
  const dispatch = useDispatch();
  const { filters, selectedFilters } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostData());
  }, [dispatch]);

  const handleFilterChange = (newFilters) => {
    dispatch(updateSelectedFilters(newFilters));
    dispatch(applyFilterAndPaginate(newFilters));
  };

  return (
    <Box sx={{ flexGrow: 1, padding: '16px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} sx={{ order: { xs: 1, md: 1 }, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SearchBox />
          <Filters data={filters} selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12} md={9} sx={{ order: { xs: 2, md: 2 } }}>
          <PostsMenu />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostsLayout;
