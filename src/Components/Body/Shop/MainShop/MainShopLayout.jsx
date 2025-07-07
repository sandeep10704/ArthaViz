import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from '../../../CommonComponents/SearchBox';
import Filters from '../../../CommonComponents/Filters';
import ProductShow from './Components/ProductShow';
import {
  fetchProductData,
  updateSelectedFilters,
  applyFilterAndPaginate,
} from "../../../../store/productSlice";

const MainShopLayout = () => {
  const dispatch = useDispatch();
  const { filters, selectedFilters } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  const handleFilterChange = (newSelectedFilters) => {
    dispatch(updateSelectedFilters(newSelectedFilters));
    dispatch(applyFilterAndPaginate(newSelectedFilters));
  };

  return (
    <Box sx={{ flexGrow: 1, padding: '16px' }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            order: { xs: 1, md: 2 },
            display: { xs: 'flex', md: 'block' },
            flexDirection: { xs: 'row', md: 'column' },
            gap: '16px',
            padding: { xs: '0 20px', md: '0' },
          }}
        >
          <SearchBox />
          <Filters
            data={filters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        </Grid>

        <Grid item xs={12} md={9} sx={{ order: { xs: 2, md: 1 } }}>
          <ProductShow />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainShopLayout;
